import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/lab-logo")({
  head: () => ({ meta: [{ title: "Lab · Logo 3D — Moonlight" }] }),
  component: LabPage,
});

type Preset = "iron" | "steel" | "gunmetal";

const PRESETS: Record<Preset, { label: string; color: number; metalness: number; roughness: number; clearcoat: number; env: number }> = {
  iron:     { label: "Ferro metalizado", color: 0x9aa2ac, metalness: 1.0, roughness: 0.28, clearcoat: 0.22, env: 1.25 },
  steel:    { label: "Aço polido",       color: 0xccd4dd, metalness: 1.0, roughness: 0.09, clearcoat: 0.6, env: 1.4 },
  gunmetal: { label: "Gunmetal escuro",  color: 0x474d56, metalness: 1.0, roughness: 0.4, clearcoat: 0.22, env: 1.1 },
};

function LabPage() {
  return (
    <section className="relative min-h-screen pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="eyebrow">/ Lab · teste isolado</div>
        <h1 className="mt-3 font-display text-3xl md:text-4xl tracking-tight">
          Logo 3D — <span className="text-gradient">íman magnético</span> + skin metálica
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Passa o rato por cima: as peças afastam-se onde o cursor passa e voltam a unir-se ao sair.
          Arrasta para rodar. Escolhe o material e afina a força antes de aplicarmos no hero.
        </p>
      </div>
      <ClientOnly fallback={null}>
        <Stage />
      </ClientOnly>
    </section>
  );
}

function Stage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [preset, setPreset] = useState<Preset>("iron");
  const [push, setPush] = useState(0.22);
  const [radius, setRadius] = useState(0.34);
  const [loading, setLoading] = useState(true);

  // live-tunable values read by the render loop without re-init
  const cfg = useRef({ push, radius });
  cfg.current = { push, radius };
  const materialRef = useRef<any>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
      const { mergeGeometries } = await import("three/examples/jsm/utils/BufferGeometryUtils.js");
      const gsap = (await import("gsap")).default;
      if (disposed || !mountRef.current) return;

      const mount = mountRef.current;
      const width = mount.clientWidth;
      const height = mount.clientHeight;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setSize(width, height);
      // Supersample: render at ≥1.75× even on 1× displays → crisp fragment
      // edges + far less specular shimmer on the metal.
      renderer.setPixelRatio(Math.min(Math.max(window.devicePixelRatio, 1.75), 2.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      mount.appendChild(renderer.domElement);
      renderer.domElement.style.touchAction = "none";

      const scene = new THREE.Scene();

      // Environment for realistic metallic reflections
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
      scene.environment = envRT.texture;

      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      camera.position.set(0, 0, 6);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.rotateSpeed = 0.5;

      scene.add(new THREE.AmbientLight(0xffffff, 0.28));
      const key = new THREE.DirectionalLight(0xffffff, 1.7);
      key.position.set(4, 6, 5);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xdfe6ff, 0.55);
      fill.position.set(-3, 1, 6);
      scene.add(fill);
      const rim = new THREE.DirectionalLight(0x8b5cf6, 1.4); // violet brand rim
      rim.position.set(-6, -2, -4);
      scene.add(rim);
      const rim2 = new THREE.DirectionalLight(0x38bdf8, 0.8); // cool blue counter-rim
      rim2.position.set(6, -3, -3);
      scene.add(rim2);

      const material = new THREE.MeshPhysicalMaterial({ ...presetProps(PRESETS[preset]) });
      materialRef.current = material;
      let proxyMesh: any = null;  // static invisible merged mesh (stable raycast target)

      const group = new THREE.Group();
      scene.add(group);

      type Piece = { mesh: any; home: any; dir: any; centroid: any; target: any };
      const pieces: Piece[] = [];

      const loader = new GLTFLoader();
      loader.load(
        "/mlogo3dtest.glb",
        (gltf: any) => {
          if (disposed) return;
          const root = gltf.scene;

          // Candidate fragments = the fractured cells (skip the single
          // un-fractured "Curve" mesh).
          const cells: any[] = [];
          root.traverse((o: any) => {
            if (!o.isMesh) return;
            if (o.name === "Curve" || !/^Curve_cell/.test(o.name)) { o.visible = false; return; }
            cells.push(o);
          });

          const meshes: any[] = [];
          for (const m of cells) {
            m.material = material;
            m.castShadow = m.receiveShadow = false;
            m.scale.setScalar(1.08); // inflate slightly so fragments overlap → seams hidden at rest
            meshes.push(m);
          }

          // Center + scale using only the kept fragments
          const box = new THREE.Box3();
          for (const m of meshes) box.expandByObject(m);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const scale = 2.75 / Math.max(size.x, size.y, size.z);
          root.position.sub(center);
          group.add(root);
          group.scale.setScalar(scale);

          // Model centre in root-local space (mean of fragment positions)
          const centerLocal = new THREE.Vector3();
          for (const m of meshes) centerLocal.add(m.position);
          centerLocal.multiplyScalar(1 / meshes.length);

          for (const mesh of meshes) {
            const home = mesh.position.clone();
            const dir = home.clone().sub(centerLocal).normalize();
            if (!isFinite(dir.x) || dir.lengthSq() < 1e-6) dir.set(0, 1, 0);
            pieces.push({ mesh, home, dir, centroid: home, target: home.clone() });
          }

          // Invisible merged mesh = a STATIC raycast target so the cursor point
          // can't jitter as fragments move (kills the feedback vibration).
          try {
            const geoms = meshes.map((m: any) => { m.updateMatrix(); const g = m.geometry.clone(); g.applyMatrix4(m.matrix); g.deleteAttribute("normal"); g.deleteAttribute("uv"); return g; });
            const merged = mergeGeometries(geoms, false);
            for (const g of geoms) g.dispose();
            if (merged) {
              const rayMat = new THREE.MeshBasicMaterial();
              rayMat.visible = false; // raycastable but never rendered
              proxyMesh = new THREE.Mesh(merged, rayMat);
              root.add(proxyMesh);
            }
          } catch (e) { console.warn("merge failed", e); }

          setLoading(false);

          // GSAP intro: assemble from a gently exploded state → home
          for (const p of pieces) {
            p.mesh.position.copy(p.home).addScaledVector(p.dir, 0.8 + Math.random() * 0.7);
            p.mesh.rotation.set((Math.random() - 0.5) * 0.9, (Math.random() - 0.5) * 0.9, (Math.random() - 0.5) * 0.9);
          }
          gsap.to(pieces.map((p) => p.mesh.position), {
            x: (i: number) => pieces[i].home.x,
            y: (i: number) => pieces[i].home.y,
            z: (i: number) => pieces[i].home.z,
            duration: 1.8,
            ease: "power2.out",
            stagger: { each: 0.0012, from: "center" },
          });
          gsap.to(pieces.map((p) => p.mesh.rotation), {
            x: 0, y: 0, z: 0, duration: 2.0, ease: "power2.out", stagger: { each: 0.0012, from: "center" },
          });
        },
        undefined,
        (err: any) => { console.error("GLB load error", err); setLoading(false); }
      );

      // Cursor → raycast against the real fragments, then repel pieces away from it
      const ndc = new THREE.Vector2(0, 0);
      let hovering = false;
      const raycaster = new THREE.Raycaster();
      const localHit = new THREE.Vector3();
      const sHit = new THREE.Vector3(); // smoothed cursor point (kills depth jitter)
      let hitAmt = 0;                   // eased hover strength 0→1
      const away = new THREE.Vector3();

      const onMove = (e: PointerEvent) => {
        const r = renderer.domElement.getBoundingClientRect();
        ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
        hovering = true;
      };
      const onLeave = () => { hovering = false; };
      renderer.domElement.addEventListener("pointermove", onMove);
      renderer.domElement.addEventListener("pointerleave", onLeave);

      const tick = () => {
        const { push: pushF, radius: radF } = cfg.current;
        controls.update();

        // Raycast the STATIC merged proxy (not the moving fragments) → the
        // cursor point can't jump as pieces move, so no feedback vibration.
        let rawHit = false;
        if (hovering && proxyMesh) {
          raycaster.setFromCamera(ndc, camera);
          const hits = raycaster.intersectObject(proxyMesh, false);
          if (hits.length) {
            localHit.copy(hits[0].point);
            (proxyMesh.parent as any).worldToLocal(localHit); // root-local
            rawHit = true;
          }
        }
        // Smooth the cursor point + ease the hover strength → no flicker/vibration
        if (rawHit) {
          if (hitAmt < 0.001) sHit.copy(localHit);
          else sHit.lerp(localHit, 0.16);
          hitAmt += (1 - hitAmt) * 0.1;
        } else {
          hitAmt += (0 - hitAmt) * 0.07;
        }
        // Idle rotation only when fully released
        if (hitAmt < 0.01) group.rotation.y += 0.0009;

        const R = radF;          // repel radius (root-local units)
        const maxPush = pushF;   // max displacement (root-local units)

        for (const p of pieces) {
          if (hitAmt > 0.01) {
            away.copy(p.home).sub(sHit);
            const d = away.length();
            if (d < R) {
              const u = 1 - d / R;
              const fall = u * u * (3 - 2 * u); // smoothstep → no hard pop
              away.multiplyScalar(1 / (d || 1e-3));
              p.target.copy(p.home).addScaledVector(away, maxPush * fall * hitAmt);
            } else {
              p.target.copy(p.home);
            }
          } else {
            p.target.copy(p.home);
          }
          // translation-only magnetic drift (no spin → no shaking)
          p.mesh.position.lerp(p.target, 0.1);
        }
        renderer.render(scene, camera);
      };
      gsap.ticker.add(tick);

      const onResize = () => {
        const w = mount.clientWidth, h = mount.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);

      cleanup = () => {
        gsap.ticker.remove(tick);
        window.removeEventListener("resize", onResize);
        renderer.domElement.removeEventListener("pointermove", onMove);
        renderer.domElement.removeEventListener("pointerleave", onLeave);
        controls.dispose();
        for (const p of pieces) p.mesh.geometry?.dispose();
        if (proxyMesh) { proxyMesh.geometry.dispose(); proxyMesh.material.dispose(); }
        material.dispose();
        envRT.dispose();
        pmrem.dispose();
        renderer.dispose();
        if (renderer.domElement.parentElement === mount) mount.removeChild(renderer.domElement);
      };
    })();

    return () => { disposed = true; cleanup(); };
    // re-init only when preset changes (rebuilds material). push/radius are live via ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset]);

  return (
    <div className="relative mt-8">
      <div ref={mountRef} className="relative mx-auto h-[68vh] w-full max-w-6xl cursor-grab active:cursor-grabbing" />
      {loading && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground animate-pulse">A carregar logo…</div>
        </div>
      )}

      {/* Controls */}
      <div className="mx-auto mt-6 max-w-3xl px-6">
        <div className="glass-elev rounded-2xl p-5 flex flex-wrap items-center justify-center gap-3">
          {(Object.keys(PRESETS) as Preset[]).map((k) => (
            <button
              key={k}
              onClick={() => setPreset(k)}
              className={`rounded-full px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${preset === k ? "bg-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"}`}
            >
              {PRESETS[k].label}
            </button>
          ))}
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span>Força</span>
            <input type="range" min={0.1} max={0.7} step={0.02} value={push} onChange={(e) => setPush(+e.target.value)} />
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span>Raio</span>
            <input type="range" min={0.2} max={1.0} step={0.05} value={radius} onChange={(e) => setRadius(+e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}

function presetProps(p: (typeof PRESETS)[Preset]) {
  return { color: p.color, metalness: p.metalness, roughness: p.roughness, clearcoat: p.clearcoat, clearcoatRoughness: 0.12, envMapIntensity: p.env };
}
