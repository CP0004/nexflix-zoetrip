import type { LayoutServerLoad } from './$types';
import { DEFAULT_LANG, DEFAULT_THEME } from '$lib/utils/constants';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	if (!cookies.get('lang')) {
		cookies.set('lang', DEFAULT_LANG, {
			path: '/'
		});
	}

	if (!cookies.get('theme')) {
		cookies.set('theme', DEFAULT_THEME, {
			path: '/'
		});
	}

	return {
		lang: locals.lang,
		theme: locals.theme
	};
};
