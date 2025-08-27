import { DEFAULT_LANGUAGE, LANGUAGES, type Language } from '@/data/languages'

// Browser language detection
export const getBrowserLanguage = (): string => {
	if (typeof window === 'undefined') {
		return DEFAULT_LANGUAGE
	}

	const browserLang = navigator.language.split('-')[0]
	const supportedLanguages = LANGUAGES.map(lang => lang.code)
	
	if (supportedLanguages.includes(browserLang)) {
		return browserLang
	}
	
	return DEFAULT_LANGUAGE
}

// Get language from localStorage
export const getStoredLanguage = (): string | null => {
	if (typeof window === 'undefined') {
		return null
	}
	
	return localStorage.getItem('preferredLanguage')
}

// Store language preference
export const setStoredLanguage = (languageCode: string): void => {
	if (typeof window === 'undefined') {
		return
	}
	
	localStorage.setItem('preferredLanguage', languageCode)
}

// Get current language (priority: stored > browser > default)
export const getCurrentLanguage = (): string => {
	const stored = getStoredLanguage()
	if (stored && LANGUAGES.some(lang => lang.code === stored)) {
		return stored
	}
	
	return getBrowserLanguage()
}

// Detect language from URL path (if using URL-based routing)
export const getLanguageFromPath = (pathname: string): string => {
	const pathSegments = pathname.split('/').filter(Boolean)
	if (pathSegments.length > 0) {
		const firstSegment = pathSegments[0]
		if (LANGUAGES.some(lang => lang.code === firstSegment)) {
			return firstSegment
		}
	}
	return DEFAULT_LANGUAGE
}

// Check if a path includes a language code
export const hasLanguageInPath = (pathname: string): boolean => {
	const langCode = getLanguageFromPath(pathname)
	return langCode !== DEFAULT_LANGUAGE || pathname.startsWith(`/${DEFAULT_LANGUAGE}/`)
}

// Remove language code from path
export const removeLanguageFromPath = (pathname: string): string => {
	const pathSegments = pathname.split('/').filter(Boolean)
	if (pathSegments.length > 0 && LANGUAGES.some(lang => lang.code === pathSegments[0])) {
		return '/' + pathSegments.slice(1).join('/')
	}
	return pathname
}

// Add language code to path
export const addLanguageToPath = (pathname: string, languageCode: string): string => {
	if (languageCode === DEFAULT_LANGUAGE) {
		return removeLanguageFromPath(pathname)
	}
	
	const cleanPath = removeLanguageFromPath(pathname)
	return `/${languageCode}${cleanPath === '/' ? '' : cleanPath}`
}