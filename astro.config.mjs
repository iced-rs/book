// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { fileURLToPath } from 'url';
import path from 'path';
// https://astro.build/config
export default defineConfig({
	site: 'https://book.iced.rs/',
	base: 'iced-docs',
	integrations: [
		starlight({
			title: 'Iced',
			logo: {
				dark: './src/assets/logo.svg',
				light: './src/assets/logo.svg',
				replacesTitle: false,
			},
			social: {
				github: 'https://github.com/iced-rs/iced',
				discord: 'https://discord.gg/3xZJ65GAhd',
				discourse: 'https://discourse.iced.rs',
			},
			editLink: {
				baseUrl:
				  process.env.NODE_ENV === 'development'
					? `vscode://file/${path.dirname(fileURLToPath(import.meta.url))}`
					: 'https://github.com/iced-rs/book/edit/main',
			  },
			sidebar: [
				{
					label: 'Getting Started',
					autogenerate: { directory: 'getting-started' }
				},
				{
					label: 'Core Concepts',
					autogenerate: { directory: 'core-concepts' }
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
