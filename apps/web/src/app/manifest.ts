import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Haylix",
    short_name: "Haylix",
    description: "Global manufacturer marketplace",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f9fc",
    theme_color: "#0b1f4d",
    icons: []
  };
}
