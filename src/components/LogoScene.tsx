import { useEffect, useRef } from "react";
import { ClientOnly } from "@tanstack/react-router";

/**
 * Moonlight fractured-logo hero visual.
 * - Metallic skin (iron), seamless at rest (fragments inflated to hide seams).
 * - Magnetic repel: pieces drift away from the cursor and ease back.
 * - Front-facing, no auto-spin; static + non-interactive under reduced-motion.
 * - Static merged proxy = stable raycast target (no jitter) + supersampled render.
 */
const IRON = { color: 0x9aa2ac, metalness: 1.0, roughness: 0.28, clearcoat: 0.22, clearcoatRoughness: 0.12, env: 1.25 };

export function LogoScene({ className = "" }: { className?: string }) {
  return (
    <ClientOnly fallback={<div className={className} />}>
      <Canvas className={className} />
    </ClientOnly>
  );
}

function Canvas({ className }: { className: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      const { mergeGeometries } = await import("three/examples/jsm/utils/BufferGeometryUtils.js");
      const gsap = (await import("gsap")).default;
      if (disposed || !mountRef.current) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mount = mountRef.current;
      const width = mount.clientWidth || 1;
      const height = mount.clientHeight || 1;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setSize(width, height);
      // Higher supersampling → sharper metal, far less pixelation.
      renderer.setPixelRatio(Math.min(Math.max(window.devicePixelRatio, 2), 3));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      mount.appendChild(renderer.domElement);
      renderer.domElement.style.touchAction = "pan-y";

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
      scene.environment = envRT.texture;

      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      camera.position.set(0, 0, 6);

      scene.add(new THREE.AmbientLight(0xffffff, 0.28));
      const key = new THREE.DirectionalLight(0xffffff, 1.7); key.position.set(4, 6, 5); scene.add(key);
      const fill = new THREE.DirectionalLight(0xdfe6ff, 0.55); fill.position.set(-3, 1, 6); scene.add(fill);
      const rim = new THREE.DirectionalLight(0x8b5cf6, 1.4); rim.position.set(-6, -2, -4); scene.add(rim);
      const rim2 = new THREE.DirectionalLight(0x38bdf8, 0.8); rim2.position.set(6, -3, -3); scene.add(rim2);

      const material = new THREE.MeshPhysicalMaterial({
        color: IRON.color, metalness: IRON.metalness, roughness: IRON.roughness,
        clearcoat: IRON.clearcoat, clearcoatRoughness: IRON.clearcoatRoughness, envMapIntensity: IRON.env,
      });

      const group = new THREE.Group();
      group.rotation.y = 0;      // straight front-facing
      group.rotation.x = -0.2;   // tilt top back so the wordmark reads clearly
      scene.add(group);

      type Piece = { mesh: any; home: any; dir: any; target: any };
      const pieces: Piece[] = [];
      let proxyMesh: any = null;   // invisible merged mesh = stable raycast target

      new GLTFLoader().load("/mlogo3dtest.glb", (gltf: any) => {
        if (disposed) return;
        const root = gltf.scene;
        const cells: any[] = [];
        root.traverse((o: any) => {
          if (!o.isMesh) return;
          if (o.name === "Curve" || !/^Curve_cell/.test(o.name)) { o.visible = false; return; }
          cells.push(o);
        });

        const meshes: any[] = [];
        for (const m of cells) { m.material = material; m.scale.setScalar(1.08); meshes.push(m); }

        const box = new THREE.Box3();
        for (const m of meshes) box.expandByObject(m);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const scale = 2.75 / Math.max(size.x, size.y, size.z);
        root.position.sub(center);
        group.add(root);
        group.scale.setScalar(scale);

        const centerLocal = new THREE.Vector3();
        for (const m of meshes) centerLocal.add(m.position);
        centerLocal.multiplyScalar(1 / meshes.length);

        for (const mesh of meshes) {
          const home = mesh.position.clone();
          const dir = home.clone().sub(centerLocal).normalize();
          if (!isFinite(dir.x) || dir.lengthSq() < 1e-6) dir.set(0, 1, 0);
          pieces.push({ mesh, home, dir, target: home.clone() });
        }

        // Invisible merged mesh = STATIC raycast target (stable cursor point, no
        // jitter). Fragments are always the visible, defined surface.
        try {
          const geoms = meshes.map((m: any) => { m.updateMatrix(); const g = m.geometry.clone(); g.applyMatrix4(m.matrix); g.deleteAttribute("normal"); g.deleteAttribute("uv"); return g; });
          const merged = mergeGeometries(geoms, false);
          for (const g of geoms) g.dispose();
          if (merged) { const rm = new THREE.MeshBasicMaterial(); rm.visible = false; proxyMesh = new THREE.Mesh(merged, rm); root.add(proxyMesh); }
        } catch { /* raycast falls back to no-hit */ }

        if (!reduce) {
          for (const p of pieces) {
            p.mesh.position.copy(p.home).addScaledVector(p.dir, 0.8 + Math.random() * 0.7);
            p.mesh.rotation.set((Math.random() - 0.5) * 0.9, (Math.random() - 0.5) * 0.9, (Math.random() - 0.5) * 0.9);
          }
          gsap.to(pieces.map((p) => p.mesh.position), { x: (i: number) => pieces[i].home.x, y: (i: number) => pieces[i].home.y, z: (i: number) => pieces[i].home.z, duration: 1.8, ease: "power2.out", stagger: { each: 0.0012, from: "center" } });
          gsap.to(pieces.map((p) => p.mesh.rotation), { x: 0, y: 0, z: 0, duration: 2.0, ease: "power2.out", stagger: { each: 0.0012, from: "center" } });
        }
      });

      // Pointer (tracked on window so it works across the hero column)
      const ndc = new THREE.Vector2(0, 0);
      let hovering = false;
      const raycaster = new THREE.Raycaster();
      const localHit = new THREE.Vector3();
      const sHit = new THREE.Vector3();
      let hitAmt = 0;
      const away = new THREE.Vector3();

      const onMove = (e: PointerEvent) => {
        const r = renderer.domElement.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) { hovering = false; return; }
        ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
        hovering = true;
      };
      if (!reduce) window.addEventListener("pointermove", onMove);

      const tick = () => {
        let rawHit = false;
        if (hovering && proxyMesh) {
          raycaster.setFromCamera(ndc, camera);
          const hits = raycaster.intersectObject(proxyMesh, false);
          if (hits.length) { localHit.copy(hits[0].point); (proxyMesh.parent as any).worldToLocal(localHit); rawHit = true; }
        }
        if (rawHit) { if (hitAmt < 0.001) sHit.copy(localHit); else sHit.lerp(localHit, 0.16); hitAmt += (1 - hitAmt) * 0.1; }
        else hitAmt += (0 - hitAmt) * 0.07;

        const R = 0.306, maxPush = 0.198; // −10% radius & force
        for (const p of pieces) {
          if (hitAmt > 0.01) {
            away.copy(p.home).sub(sHit);
            const d = away.length();
            if (d < R) { const u = 1 - d / R; const fall = u * u * (3 - 2 * u); away.multiplyScalar(1 / (d || 1e-3)); p.target.copy(p.home).addScaledVector(away, maxPush * fall * hitAmt); }
            else p.target.copy(p.home);
          } else p.target.copy(p.home);
          p.mesh.position.lerp(p.target, 0.1);
        }
        renderer.render(scene, camera);
      };
      gsap.ticker.add(tick);

      const onResize = () => {
        const w = mount.clientWidth, h = mount.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);

      cleanup = () => {
        gsap.ticker.remove(tick);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("pointermove", onMove);
        for (const p of pieces) p.mesh.geometry?.dispose();
        if (proxyMesh) { proxyMesh.geometry.dispose(); proxyMesh.material.dispose(); }
        material.dispose(); envRT.dispose(); pmrem.dispose(); renderer.dispose();
        if (renderer.domElement.parentElement === mount) mount.removeChild(renderer.domElement);
      };
    })();

    return () => { disposed = true; cleanup(); };
  }, []);

  return <div ref={mountRef} className={className} />;
}
