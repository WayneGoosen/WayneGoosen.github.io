import { DEFAULT_LANGUAGE, getLanguageByCode, getTranslation } from './languages'

interface SiteConfig {
	author: string
	title: string
	description: string
	lang: string
	ogLocale: string
	shareMessage: string
	paginationSize: number
	defaultLanguage: string
}

// Base site configuration
export const siteConfig: SiteConfig = {
	author: 'WayneGoosen', // Site author
	title: 'Wayne Goosen | Blog', // Site title
	description: 'Wayne Goosen Personal Blog.', // Description to display in the meta tags
	lang: 'en-GB',
	ogLocale: 'en_GB',
	shareMessage: 'Share this post', // Message to share a post on social media
	paginationSize: 6, // Number of posts per page
	defaultLanguage: DEFAULT_LANGUAGE
}

// Get site config for a specific language
export const getSiteConfig = (languageCode: string = DEFAULT_LANGUAGE) => {
	const language = getLanguageByCode(languageCode)
	if (!language) {
		return siteConfig
	}

	return {
		...siteConfig,
		lang: language.locale,
		ogLocale: language.ogLocale,
		shareMessage: getTranslation(languageCode, 'shareMessage')
	}
}
