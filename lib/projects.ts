import { PROJECTS, Project } from '@/content/projects';

export type { Project };
export type Service = 'Product' | 'Design' | 'Engineering';

export async function getAllProjects(options?: { includeDrafts?: boolean }): Promise<Project[]> {
  if (options?.includeDrafts) {
    return PROJECTS;
  }
  return PROJECTS.filter((p) => !p.draft);
}

export async function getPublishedProjects(): Promise<Project[]> {
  return getAllProjects({ includeDrafts: false });
}

export async function hasPublishedProjects(): Promise<boolean> {
  const published = await getPublishedProjects();
  return published.length > 0;
}

export async function getFeaturedProjects(options?: { includeDrafts?: boolean }): Promise<Project[]> {
  const all = await getAllProjects(options);
  return all.filter((p) => p.featured).slice(0, 3);
}

export async function getProjectBySlug(slug: string, options?: { includeDrafts?: boolean }): Promise<Project | null> {
  const all = await getAllProjects(options);
  return all.find((p) => p.slug === slug) || null;
}

export async function getProjectsForProblem(problemId: string, options?: { includeDrafts?: boolean }): Promise<Project[]> {
  const all = await getAllProjects(options);
  return all.filter((p) => p.problemIds && p.problemIds.includes(problemId));
}
