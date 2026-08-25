import type { MetadataRoute } from "next";

import { isSeptMemberOnly } from "@/lib/septmember-cutover";
import { getSiteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();
  const septOnly = isSeptMemberOnly();

  const pages: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  if (!septOnly) {
    pages.push(
      {
        url: `${base}/minelab`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.95,
      },
      {
        url: `${base}/garrett`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.95,
      },
      {
        url: `${base}/goldcube`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.95,
      },
      {
        url: `${base}/septmember`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.9,
      }
    );
  }

  pages.push(
    {
      url: `${base}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.35,
    },
    {
      url: `${base}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.35,
    }
  );

  return pages;
}
