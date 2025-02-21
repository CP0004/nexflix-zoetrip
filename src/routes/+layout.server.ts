import type { LayoutServerLoad } from './$types';
import { DEFAULT_LANG, DEFAULT_THEME } from '$lib/utils/constants';
import { getIpInfo } from '$lib/utils/utils';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	if (!cookies.get('lang') || !cookies.get('theme')) {
		cookies.set('lang', DEFAULT_LANG, {
			path: '/'
		});
		cookies.set('theme', DEFAULT_THEME, {
			path: '/'
		});
	}

	return {
		config: {
			lang: locals.lang,
			theme: locals.theme,
			info: (await getIpInfo()) || {}
		}
	};
};
