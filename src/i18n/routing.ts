import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
	// Supported locales (max 4)
	locales: ['en', 'ja', 'ko', 'es'],

	// Default locale
	defaultLocale: 'en',

	// URL prefix strategy: default locale without prefix
	localePrefix: 'as-needed',

	// Enable automatic locale detection
	localeDetection: true,
})

export type Locale = (typeof routing.locales)[number]
