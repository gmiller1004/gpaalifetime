import type { MetadataRoute } from "next";

const icon = "/brands/gpaa-gold-life.png";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GPAA Gold Life",
    short_name: "Gold Life",
    description:
      "GPAA Lifetime Membership bundles with Minelab, Garrett, and Gold Cube — secure checkout.",
    icons: [
      {
        src: icon,
        sizes: "1200x1200",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
