import { getCollection } from 'astro:content'
import { DEFAULT_LANGUAGE } from '@/data/languages'

export const getCategories = async (language: string = DEFAULT_LANGUAGE) => {
	const posts = await getPosts(undefined, language)
	const categories = new Set(posts.map((post) => post.data.category))
	return Array.from(categories)
}

export const getPosts = async (max?: number, language: string = DEFAULT_LANGUAGE) => {
	try {
		// Try to get language-specific collection first
		const collectionName = `blog_${language}` as any
		let posts = await getCollection(collectionName)
		
		// If no language-specific collection, fall back to main blog collection
		if (!posts || posts.length === 0) {
			posts = await getCollection('blog')
			// Filter by language if specified in frontmatter
			posts = posts.filter(post => 
				!post.data.language || post.data.language === language
			)
		}
		
		return posts
			.filter((post) => !post.data.draft)
			.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
			.slice(0, max)
	} catch (error) {
		// Fallback to main collection if language-specific collection doesn't exist
		const posts = await getCollection('blog')
		return posts
			.filter((post) => !post.data.draft)
			.filter(post => !post.data.language || post.data.language === language)
			.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
			.slice(0, max)
	}
}

export const getTags = async (language: string = DEFAULT_LANGUAGE) => {
	const posts = await getPosts(undefined, language)
	const tags = new Set()
	posts.forEach((post) => {
		post.data.tags.forEach((tag) => {
			tags.add(tag.toLowerCase())
		})
	})

	return Array.from(tags)
}

export const getPostByTag = async (tag: string, language: string = DEFAULT_LANGUAGE) => {
	const posts = await getPosts(undefined, language)
	const lowercaseTag = tag.toLowerCase()
	return posts.filter((post) => {
		return post.data.tags.some((postTag) => postTag.toLowerCase() === lowercaseTag)
	})
}

export const filterPostsByCategory = async (category: string, language: string = DEFAULT_LANGUAGE) => {
	const posts = await getPosts(undefined, language)
	return posts.filter((post) => post.data.category.toLowerCase() === category)
}

// Get all posts across all languages
export const getAllPosts = async (max?: number) => {
	const posts = await getCollection('blog')
	return posts
		.filter((post) => !post.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
		.slice(0, max)
}

// Get available languages for the site based on existing posts
export const getAvailableLanguages = async () => {
	const posts = await getAllPosts()
	const languages = new Set(posts.map(post => post.data.language || DEFAULT_LANGUAGE))
	return Array.from(languages)
}
