/**
 * GPAA Lifetime Kit — marketing grid (consistent across partner co-brands).
 * Replace copy with final merchandising from GPAA as needed.
 */

export interface KitItem {
  title: string;
  description: string;
  badge?: string;
}

export const gpaaLifetimeKitItems: KitItem[] = [
  {
    title: "Lifetime GPAA Membership",
    badge: "Core",
    description:
      "Full member status with ongoing access to GPAA programs and community.",
  },
  {
    title: "Claims & Prospecting Access",
    description:
      "Member pathways to claims and field opportunities.",
  },
  {
    title: "Publications & Education",
    description:
      "Ongoing learning resources to sharpen skills in the field and online.",
  },
  {
    title: "Member Events & Network",
    description:
      "Connect with chapters and prospectors nationwide—online and in person.",
  },
  {
    title: "Field-Ready Support",
    description:
      "Trusted partner gear bundled and fulfilled when you complete checkout.",
  },
  {
    title: "Secure Checkout",
    badge: "Secure",
    description:
      "Industry-standard cart and checkout—cards, digital wallets.",
  },
];
