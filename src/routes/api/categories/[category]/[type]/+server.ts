import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { TMDBResponse, MovieListItem, TVShowListItem, PersonListItem } from '$lib/types';

export const GET: RequestHandler = async ({ params, url }) => {
	const { category, type } = params;
	const page = url.searchParams.get('page') || '1';
	const language = url.searchParams.get('language') || 'en';

	if (!['movie', 'tv', 'person'].includes(category)) {
		throw error(400, `Invalid category. Must be one of: movie, tv, person`);
	}

	if (
		!['popular', 'top_rated', 'now_playing', 'upcoming', 'airing_today', 'on_the_air'].includes(
			type
		)
	) {
		throw error(
			400,
			`Invalid category. Must be one of: popular, top_rated, now_playing, upcoming, airing_today, on_the_air`
		);
	}

	try {
		const response = await fetch(
			`${import.meta.env.VITE_BASE_URL_TMDB}/${category}/${type}?language=${language}&page=${page}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${import.meta.env.VITE_API_KEY_TMDB}`
				}
			}
		);

		if (!response.ok) {
			throw error(response.status, 'Failed to fetch data from TMDB');
		}

		const data: TMDBResponse<MovieListItem | TVShowListItem | PersonListItem> =
			await response.json();

		return json(data);
	} catch (err) {
		console.error('Error fetching from TMDB:', err);
		throw error(500, 'Internal server error');
	}
};
