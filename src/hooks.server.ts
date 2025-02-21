import type { Handle } from '@sveltejs/kit';
import { DEFAULT_LANG, DEFAULT_THEME } from '$lib/utils/constants';

const transformHtml = (html: string, lang: string, theme: string) => {
	return html
		.replace('<html', `<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}"`)
		.replace('<body', `<body class="${theme}"`);
};

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.lang = event.cookies.get('lang') ?? DEFAULT_LANG;
	event.locals.theme = event.cookies.get('theme') ?? DEFAULT_THEME;

	const getResponse = () =>
		resolve(event, {
			transformPageChunk: ({ html, done }) => {
				if (done) {
					return transformHtml(html, event.locals.lang, event.locals.theme);
				}
				return html;
			}
		});

	return await getResponse();
};
