import { POSTS, Post } from '@/content/posts';

export type { Post };

export async function getAllPosts(options?: { includeDrafts?: boolean }): Promise<Post[]> {
  if (options?.includeDrafts) {
    return POSTS;
  }
  return POSTS.filter((p) => !p.draft);
}

export async function getPublishedPosts(): Promise<Post[]> {
  return getAllPosts({ includeDrafts: false });
}

export async function hasPublishedPosts(): Promise<boolean> {
  const published = await getPublishedPosts();
  return published.length > 0;
}

export async function getPostBySlug(slug: string, options?: { includeDrafts?: boolean }): Promise<Post | null> {
  const all = await getAllPosts(options);
  return all.find((p) => p.slug === slug) || null;
}

export async function getPostsForProblem(problemId: string, options?: { includeDrafts?: boolean }): Promise<Post[]> {
  const all = await getAllPosts(options);
  return all.filter((p) => p.problemIds && p.problemIds.includes(problemId));
}

export async function getPostsForTopic(topic: string, options?: { includeDrafts?: boolean }): Promise<Post[]> {
  const all = await getAllPosts(options);
  return all.filter((p) => p.topics && p.topics.includes(topic));
}

export async function getRelatedPosts(currentPost: Post, limit = 2): Promise<Post[]> {
  const all = await getAllPosts();
  const others = all.filter((p) => p.slug !== currentPost.slug);

  const scored = others.map((post) => {
    let score = 0;
    if (currentPost.topics && post.topics) {
      for (const t of currentPost.topics) {
        if (post.topics.includes(t)) score += 2;
      }
    }
    if (currentPost.problemIds && post.problemIds) {
      for (const pId of currentPost.problemIds) {
        if (post.problemIds.includes(pId)) score += 3;
      }
    }
    return { post, score };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}
