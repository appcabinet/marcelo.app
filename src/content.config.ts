import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
	loader: glob({ base: './src/content/notes', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		published: z.coerce.date(),
		updated: z.coerce.date().optional(),
		tags: z.array(z.string()).optional(),
		readingTime: z.string().optional(),
		noteType: z.enum(['note', 'article', 'essay']).optional().default('note'),
		aside: z.boolean().optional().default(false),
		draft: z.boolean().optional().default(false),
	}),
});

export const collections = { notes };
