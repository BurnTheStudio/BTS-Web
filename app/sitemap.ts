import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { getAllProjects } from '@/lib/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publishedProjects = await getAllProjects();

  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];

  if (publishedProjects.length > 0) {
    routes.push({
      url: `${SITE_URL}/work`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    });

    for (const project of publishedProjects) {
      routes.push({
        url: `${SITE_URL}/work/${project.slug}`,
        lastModified: new Date(project.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return routes;
}
