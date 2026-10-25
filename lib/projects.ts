import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

export const ServiceSchema = z.enum(['Product', 'Design', 'Engineering']);
export type Service = z.infer<typeof ServiceSchema>;

export const ProjectFrontmatterSchema = z.object({
  title: z.string().min(1, 'Project title is required'),
  slug: z.string().min(1, 'Project slug is required'),
  year: z.union([z.number(), z.string()]),
  summary: z.string().min(1, 'Project summary is required'),
  services: z.array(ServiceSchema).min(1, 'At least one service is required'),
  problemIds: z.array(z.string()).optional(),
  client: z.string().optional(),
  cover: z.string().min(1, 'Cover image path is required'),
  coverAlt: z.string().min(1, 'Cover image alt text is required'),
  featured: z.boolean().default(false),
  publishedAt: z.string().min(1, 'publishedAt is required'),
  links: z.array(z.object({ label: z.string(), href: z.string() })).optional(),
  stack: z.array(z.string()).optional(),
  draft: z.boolean().default(false),
});

export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;

export interface Project extends ProjectFrontmatter {
  content: string;
}

const PROJECTS_DIRECTORY = path.join(process.cwd(), 'content/projects');

function getProjectFiles(): string[] {
  if (!fs.existsSync(PROJECTS_DIRECTORY)) {
    return [];
  }
  return fs.readdirSync(PROJECTS_DIRECTORY).filter((file) => file.endsWith('.mdx'));
}

export async function getAllProjects(options?: { includeDrafts?: boolean }): Promise<Project[]> {
  const isProduction = process.env.NODE_ENV === 'production';
  const includeDrafts = options?.includeDrafts ?? false;

  const files = getProjectFiles();

  const projects: Project[] = files.map((fileName) => {
    const filePath = path.join(PROJECTS_DIRECTORY, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const parseResult = ProjectFrontmatterSchema.safeParse(data);
    if (!parseResult.success) {
      throw new Error(
        `Invalid frontmatter in "${fileName}": ${JSON.stringify(parseResult.error.format(), null, 2)}`
      );
    }

    return {
      ...parseResult.data,
      content,
    };
  });

  // Filter out drafts if requested or in production
  const filtered = projects.filter((project) => {
    if (isProduction) {
      return !project.draft;
    }
    return includeDrafts ? true : !project.draft;
  });

  // Sort by publishedAt descending
  filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return filtered;
}

export async function getFeaturedProjects(options?: {
  includeDrafts?: boolean;
}): Promise<Project[]> {
  const projects = await getAllProjects(options);
  return projects.filter((project) => project.featured).slice(0, 3);
}

export async function getProjectBySlug(
  slug: string,
  options?: { includeDrafts?: boolean }
): Promise<Project | null> {
  const isProduction = process.env.NODE_ENV === 'production';
  // Allow viewing draft in development so layout is inspectable locally
  const includeDrafts = options?.includeDrafts ?? (!isProduction);

  const files = getProjectFiles();

  for (const fileName of files) {
    const filePath = path.join(PROJECTS_DIRECTORY, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const parseResult = ProjectFrontmatterSchema.safeParse(data);
    if (parseResult.success && parseResult.data.slug === slug) {
      if (isProduction && parseResult.data.draft) {
        return null;
      }
      if (!includeDrafts && parseResult.data.draft) {
        return null;
      }
      return {
        ...parseResult.data,
        content,
      };
    }
  }

  return null;
}
