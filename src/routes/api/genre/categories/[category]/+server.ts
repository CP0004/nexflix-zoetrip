import { error, json } from '@sveltejs/kit';
import { MEDIA_TYPE } from '$lib/utils/constants';
import type { RequestHandler } from './$types';
import type { Genre, MediaType } from '$lib/types';
import { getFromCacheOrFetch } from '$lib/utils/cache';

export const GET: RequestHandler = async ({ params, locals }) => {
	const { category } = params;

	if (!MEDIA_TYPE.includes(category as MediaType)) {
		throw error(400, `Invalid category. Must be one of: ${MEDIA_TYPE.join(', ')}`);
	}

	try {
		// Use the cache system with a 30 minute expiry (genres don't change often)
		const cacheKey = `genre_categories_${category}_${locals.lang}`;
		
		const genres = await getFromCacheOrFetch<Genre[]>(
			cacheKey,
			async () => {
				const apiUrl = `${import.meta.env.VITE_BASE_URL_TMDB}/genre/${category}/list?language=${locals.lang}`;
				
				const response = await fetch(apiUrl, {
					headers: {
						accept: 'application/json',
						Authorization: `Bearer ${import.meta.env.VITE_API_KEY_TMDB}`
					}
				});

				if (!response.ok) {
					throw error(response.status, 'Failed to fetch data from TMDB');
				}

				const data: any = await response.json();
				return data['genres'] as Genre[];
			},
			30 * 60 * 1000 // 30 minutes for the cache
		);

		return json(genres);
	} catch (err) {
		console.error('Error fetching from TMDB:', err);
		throw error(500, 'Internal server error');
	}
};
