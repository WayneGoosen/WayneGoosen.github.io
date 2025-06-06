import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { remarkReadingTime } from './src/utils/readTime.ts';
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: 'https://waynegoosen.com/',
  // Write here your website url
  markdown: {
    remarkPlugins: [remarkReadingTime],
    drafts: true,
    shikiConfig: {
      theme: 'material-theme-palenight',
      wrap: true
    }
  },
  integrations: [mdx({
    syntaxHighlight: 'shiki',
    shikiConfig: {
      experimentalThemes: {
        light: 'dracula',
        dark: 'material-theme-palenight'
      },
      wrap: true
    },
    drafts: true
  }), sitemap(), tailwind(), 
  partytown({ 
    config: { 
      forward: ['dataLayer.push']
    }
  })]
});