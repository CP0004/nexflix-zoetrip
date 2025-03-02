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

		if (category === 'live') {
			const genres = await getFromCacheOrFetch<Genre[]>(
				cacheKey,
				async () => {
					const apiUrl = `${import.meta.env.VITE_BASE_URL_IPTV}&action=get_live_categories`;
					const response = await fetch(apiUrl, {
						headers: {
							accept: 'application/json'
						}
					});
					if (!response.ok) {
						throw new Error('Failed to fetch IPTV categories');
					}

					const result = await response.json();

					const categories: Genre[] = result.map((category: any) => ({
						id: category.category_id,
						name: category.category_name
					}));

					const filteredCategories = categories.filter((category: Genre) =>
						[
							'32',
							'3',
							'172',
							'200',
							'5',
							'298',
							'42',
							'64',
							'66',
							'323',
							'33',
							'6',
							'37',
							'16',
							'13',
							'234',
							'98',
							'97',
							'299'
						].includes(`${category.id}`)
					);

					return filteredCategories;
				},
				30 * 60 * 1000 // 30 minutes for the cache
			);

			return json(genres);
		} else {
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
		}
	} catch (err) {
		console.error('Error fetching from TMDB:', err);
		throw error(500, 'Internal server error');
	}
};
