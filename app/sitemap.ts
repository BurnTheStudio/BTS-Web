import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { getAllProjects } from '@/lib/projects';
import { getAllCollaborations } from '@/lib/collaborations';
import { getAllPosts } from '@/lib/posts';
import { getAllLegalPages } from '@/lib/legal';
import { hasStudioContent } from '@/content/studio';
import { PROBLEMS } from '@/content/problems';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const isProduction = process.env.NODE_ENV === 'production';
  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  for (const problem of PROBLEMS) {
    routes.push({
      url: `${SITE_URL}/problems/${problem.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  const projects = await getAllProjects({ includeDrafts: !isProduction });
  if (projects.length > 0) {
    routes.push({
      url: `${SITE_URL}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    for (const project of projects) {
      routes.push({
        url: `${SITE_URL}/work/${project.slug}`,
        lastModified: new Date(project.updatedAt || project.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  const collabs = await getAllCollaborations({ includeDrafts: !isProduction });
  if (collabs.length > 0) {
    routes.push({
      url: `${SITE_URL}/collaborations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    for (const collab of collabs) {
      routes.push({
        url: `${SITE_URL}/collaborations/${collab.slug}`,
        lastModified: new Date(collab.updatedAt || collab.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  const posts = await getAllPosts({ includeDrafts: !isProduction });
  if (posts.length > 0) {
    routes.push({
      url: `${SITE_URL}/journal`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    for (const post of posts) {
      routes.push({
        url: `${SITE_URL}/journal/${post.slug}`,
        lastModified: new Date(post.updatedAt || post.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  if (hasStudioContent()) {
    routes.push({
      url: `${SITE_URL}/studio`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  const legalPages = await getAllLegalPages();
  for (const page of legalPages) {
    routes.push({
      url: `${SITE_URL}/legal/${page.slug}`,
      lastModified: new Date(page.updatedAt),
      changeFrequency: 'yearly',
      priority: 0.4,
    });
  }

  return routes;
}
