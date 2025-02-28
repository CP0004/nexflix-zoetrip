import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { MovieDetails, TVShowDetails, PersonDetails } from '$lib/types';

export const GET: RequestHandler = async ({ params, url, locals }) => {
	const { category, id } = params;
	const language = locals.lang;


	if (!['movie', 'tv', 'person'].includes(category)) {
		console.error(`[API] Invalid category requested: ${category}`);
		throw error(400, `Invalid category. Must be one of: movie, tv, person`);
	}

	try {
		const apiUrl = `${import.meta.env.VITE_BASE_URL_TMDB}/${category}/${id}?language=${language}`;

		const response = await fetch(apiUrl, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${import.meta.env.VITE_API_KEY_TMDB}`
			}
		});

        console.log(response);
        

		if (!response.ok) {
			console.error(`[API] TMDB API error:`, {
				status: response.status,
				statusText: response.statusText
			});
			throw error(response.status, 'Failed to fetch data from TMDB');
		}

		const data: MovieDetails | TVShowDetails | PersonDetails = await response.json();
		return json(data);
	} catch (err) {
		console.error(`[API] Error fetching ${category} details from TMDB:`, err);
		throw error(500, 'Internal server error');
	}
}; 