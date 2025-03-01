import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { MediaType, MultipleMediaResponse, TMDBResponse, MultipleMedia } from '$lib/types';
import { MEDIA_TYPE } from '$lib/utils/constants';

export const GET: RequestHandler = async ({ params, locals }) => {
	const { category } = params;

	if (!MEDIA_TYPE.includes(category as MediaType)) {
		throw error(400, `Invalid category. Must be one of: ${MEDIA_TYPE.join(', ')}`);
	}

	try {
		const apiUrl = `${import.meta.env.VITE_BASE_URL_TMDB}/trending/${category}/week?language=${locals.lang}`;

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
			media_type: result.media_type,
			popularity: result.popularity,
			adult: result.adult,
			vote_average: result.vote_average
		}));

		const responseData: MultipleMediaResponse = {
			page: data.page,
			results,
			total_pages: data.total_pages,
			total_results: data.total_results
		};

		return json(responseData as MultipleMediaResponse);
	} catch (err) {
		throw error(500, 'Internal server error');
	}
};
