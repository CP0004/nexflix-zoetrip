import { error, json } from '@sveltejs/kit';
import { SORT_BY_OPTIONS } from '$lib/utils/constants';
import type { RequestHandler } from './$types';
import type {
	TMDBResponse,
	MovieListItem,
	TVShowListItem,
	PersonListItem,
	SortBy
} from '$lib/types';

export const GET: RequestHandler = async ({ params, url }) => {
	const { category } = params;
	const page = url.searchParams.get('page') || '1';
	const language = url.searchParams.get('language') || 'en-US';
	const adult = url.searchParams.get('adult') || 'false';
	const include_video = url.searchParams.get('include_video') || 'false';
	const sort_by = url.searchParams.get('sort_by') || 'popularity.desc';

	if (!SORT_BY_OPTIONS.includes(sort_by as SortBy)) {
		throw error(400, `Invalid sort_by. Must be one of: list`);
	}

	if (!['movie', 'tv', 'person'].includes(category)) {
		throw error(400, `Invalid category. Must be one of: movie, tv, person`);
	}

	try {
		let apiUrl =
			`${import.meta.env.VITE_BASE_URL_TMDB}/discover/${category}?` +
			`language=${language}&` +
			`page=${page}&` +
			`include_adult=${adult}&` +
			`include_video=${include_video}&` +
			`sort_by=${sort_by}`;

		const response = await fetch(apiUrl, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${import.meta.env.VITE_API_KEY_TMDB}`
			}
		});

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
