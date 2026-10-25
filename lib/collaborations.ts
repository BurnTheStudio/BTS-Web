import { COLLABORATIONS, Collaboration } from '@/content/collaborations';

export type { Collaboration };

export async function getAllCollaborations(options?: { includeDrafts?: boolean }): Promise<Collaboration[]> {
  if (options?.includeDrafts) {
    return COLLABORATIONS;
  }
  return COLLABORATIONS.filter((c) => !c.draft);
}

export async function getPublishedCollaborations(): Promise<Collaboration[]> {
  return getAllCollaborations({ includeDrafts: false });
}

export async function hasPublishedCollaborations(): Promise<boolean> {
  const published = await getPublishedCollaborations();
  return published.length > 0;
}

export async function getCollaborationBySlug(slug: string, options?: { includeDrafts?: boolean }): Promise<Collaboration | null> {
  const all = await getAllCollaborations(options);
  return all.find((c) => c.slug === slug) || null;
}

export async function getCollaborationsForProblem(problemId: string, options?: { includeDrafts?: boolean }): Promise<Collaboration[]> {
  const all = await getAllCollaborations(options);
  return all.filter((c) => c.problemIds && c.problemIds.includes(problemId));
}
