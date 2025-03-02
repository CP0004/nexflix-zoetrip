import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type {
	MediaType,
	MultipleMediaResponse,
	TMDBResponse,
	MultipleMedia,
	IPTVChannel
} from '$lib/types';
import { MEDIA_TYPE } from '$lib/utils/constants';
import { getFromCacheOrFetch } from '$lib/utils/cache';

export const GET: RequestHandler = async ({ params, locals }) => {
	const { id, category } = params;

	if (!id) {
		throw error(400, 'Invalid id');
	}

	if (!MEDIA_TYPE.includes(category as MediaType)) {
		throw error(400, `Invalid category. Must be one of: ${MEDIA_TYPE.join(', ')}`);
	}

	try {
		// Use the cache system for data
		const cacheKey = `genre_by_${category}_${id}_${locals.lang}`;

		if (category === 'live') {
			const responseData = await getFromCacheOrFetch<MultipleMediaResponse>(
				cacheKey,
				async () => {
					const apiUrl = `${import.meta.env.VITE_BASE_URL_IPTV}&action=get_live_streams&category_id=${id}`;

					const response = await fetch(apiUrl, {
						headers: {
							accept: 'application/json'
						}
					});

					if (!response.ok) {
						throw error(response.status, 'Failed to fetch data from TMDB');
					}

					const data: IPTVChannel[] = await response.json();
					const results: MultipleMedia[] = data.map((result) => ({
						id: result.stream_id,
						title: result.name,
						poster_path: result.stream_icon,
						backdrop_path: result.stream_icon,
						media_type: category,
						popularity: Math.random() * (10 - 3) + 3,
						adult: false,
						vote_average: Math.random() * (100 - 20) + 20
					}));

					return {
						page: 1,
						results,
						total_pages: 1,
						total_results: results.length
					} as MultipleMediaResponse;
				},
				30 * 60 * 1000 // 30 minutes for the cache
			);

			return json(responseData);
		} else {
			const responseData = await getFromCacheOrFetch<MultipleMediaResponse>(
				cacheKey,
				async () => {
					const apiUrl = `${import.meta.env.VITE_BASE_URL_TMDB}/discover/${category}?include_adult=false&include_video=false&language=${locals.lang}&page=1&with_genres=${id}`;

					const response = await fetch(apiUrl, {
						headers: {
							accept: 'application/json',
							Authorization: `Bearer ${import.meta.env.VITE_API_KEY_TMDB}`
						}
					});

					if (!response.ok) {
						throw error(response.status, 'Failed to fetch data from TMDB');
					}

					const data: TMDBResponse<any> = await response.json();
					const results: MultipleMedia[] = data.results.map((result) => ({
						id: result.id,
						title: result.title || result.name,
						poster_path: result.poster_path || result.profile_path,
						backdrop_path: result.backdrop_path || result.profile_path,
						media_type: result.media_type || category,
						popularity: result.popularity,
						adult: result.adult,
						vote_average: result.vote_average || 0
					}));

					return {
						page: data.page,
						results,
						total_pages: data.total_pages,
						total_results: data.total_results
					} as MultipleMediaResponse;
				},
				30 * 60 * 1000 // 30 minutes for the cache
			);

			return json(responseData);
		}
	} catch (err) {
		throw error(500, 'Internal server error');
	}
};
