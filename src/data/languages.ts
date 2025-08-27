export interface Language {
	code: string
	name: string
	flag: string
	locale: string
	ogLocale: string
}

export const LANGUAGES: Language[] = [
	{
		code: 'en',
		name: 'English',
		flag: '🇺🇸',
		locale: 'en-GB',
		ogLocale: 'en_GB'
	},
	{
		code: 'es',
		name: 'Español',
		flag: '🇪🇸',
		locale: 'es-ES',
		ogLocale: 'es_ES'
	}
] as const

export const DEFAULT_LANGUAGE = 'en'

export const getLanguageByCode = (code: string): Language | undefined => {
	return LANGUAGES.find(lang => lang.code === code)
}

export const getDefaultLanguage = (): Language => {
	return LANGUAGES.find(lang => lang.code === DEFAULT_LANGUAGE) || LANGUAGES[0]
}

// Translations for common UI elements
export const translations = {
	en: {
		shareMessage: 'Share this post',
		readingTime: 'min read',
		relatedPosts: 'Related Posts',
		home: 'Home',
		about: 'About',
		tags: 'Tags',
		categories: 'Categories',
		blog: 'Blog',
		searchPlaceholder: 'Search posts...',
		noPostsFound: 'No posts found',
		language: 'Language'
	},
	es: {
		shareMessage: 'Compartir este post',
		readingTime: 'min de lectura',
		relatedPosts: 'Posts Relacionados',
		home: 'Inicio',
		about: 'Acerca de',
		tags: 'Etiquetas',
		categories: 'Categorías',
		blog: 'Blog',
		searchPlaceholder: 'Buscar posts...',
		noPostsFound: 'No se encontraron posts',
		language: 'Idioma'
	}
} as const

export type TranslationKey = keyof typeof translations.en
export type SupportedLanguage = keyof typeof translations

export const getTranslation = (lang: string, key: TranslationKey): string => {
	const langCode = lang as SupportedLanguage
	return translations[langCode]?.[key] || translations[DEFAULT_LANGUAGE][key]
}