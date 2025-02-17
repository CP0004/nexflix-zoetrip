import { derived, writable, get } from 'svelte/store';
import { translations } from '$lib/utils/translations';

export const locale = writable<string>('ar');
export const locales = ['en', 'ar'];

function t(locale: string, key: string, vars: Record<string, string> = {}): string {
	if (!key) throw new Error('no key provided to $t()');

	let text: string;

	if (locale === 'en') {
		// For English, always use the key as the translated text
		text = key;
	} else {
		// For Arabic, use the value as the translated text if it exists
		// If not, use the key (input from user) as is
		text = translations[key] || key;
	}

	// Replace any passed in variables in the translation string.
	Object.keys(vars).forEach((k) => {
		const regex = new RegExp(`::${k}::`, 'g');
		text = text.replace(regex, vars[k]);
	});

	return text;
}

export const trans = derived(
	locale,
	($locale: string) =>
		(locale: string = $locale, key: string, vars: Record<string, string> = {}) =>
			t(locale, key, vars)
);

export function getMissingTranslations(): string[] {
	const currentLocale = get(locale);
	const missingTranslations: string[] = [];

	// For English, we don't need to check for missing translations
	if (currentLocale === 'en') {
		return missingTranslations;
	}

	// Check for missing translations in the current locale and add them to the missingTranslations array
	for (const key in translations) {
		if (Object.prototype.hasOwnProperty.call(translations, key) && !translations[key]) {
			missingTranslations.push(key);
		}
	}

	return missingTranslations;
}

// Set the locale to a new value if it is supported
export function setLocale(newLocale: string): void {
	if (locales.includes(newLocale)) {
		locale.set(newLocale);
	} else {
		console.error(`Unsupported locale: ${newLocale}`);
	}
}
