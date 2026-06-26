import { createFileRoute } from "@tanstack/react-router";
import { Index } from "./index";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Moonlight Comunicação Global — O Futuro Não Espera · Desde 1998" },
      { name: "description", content: "Software house portuguesa desde 1998: Software Development, BI & Marketing, IT Consulting, IoT/AR/VR e Suporte SLA. Produto próprio B.Analytics." },
    ],
  }),
  component: Index,
});
