# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Wayne Goosen's personal blog built with Astro, featuring Tina CMS for content management. The site is deployed at https://waynegoosen.com/.

## Commands

```bash
# Development (starts Tina CMS alongside Astro dev server)
pnpm dev

# Development without Tina CMS
pnpm start

# Build for production
pnpm build

# Preview production build
pnpm preview

# Linting and formatting
pnpm lint
pnpm format
pnpm format:check

# Generate TypeScript types for Astro modules
pnpm sync
```

## Architecture

### Content System

- **Blog posts**: Located in `src/content/blog/` as `.mdx` files
- **Content schema**: Defined in `src/content/config.ts` using Zod validation
- **Categories**: Must be defined in `src/data/categories.ts` - Zod validates at build time
- **Frontmatter requirements**: title (max 60 chars), description (max 158 chars), pubDate, heroImage, category, tags
- **Draft mode**: Set `draft: true` in frontmatter to hide posts

### Key Directories

- `src/components/` - Astro components (icons in `icons/`, MDX components in `mdx/`)
- `src/layouts/` - BaseLayout.astro and BlogPost.astro
- `src/pages/` - File-based routing (posts at `/post/[slug]`, categories at `/category/[category]/[page]`)
- `src/utils/` - Helper functions (post queries, reading time, slugify)
- `src/data/` - Site configuration and categories
- `tina/` - Tina CMS configuration

### Configuration Files

- `astro.config.mjs` - Astro config with MDX, sitemap, tailwind, partytown integrations
- `tailwind.config.cjs` - Custom theme with Manrope font, dark mode via class
- `src/data/site.config.ts` - Site metadata (author, title, description, pagination)

### Post Utilities (`src/utils/post.ts`)

- `getPosts(max?)` - Get published posts sorted by date
- `getCategories()` - Get all used categories
- `getTags()` - Get all tags (lowercase normalized)
- `getPostByTag(tag)` - Filter posts by tag
- `filterPostsByCategory(category)` - Filter posts by category
