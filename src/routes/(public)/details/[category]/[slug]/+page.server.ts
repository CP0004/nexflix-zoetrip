import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { MovieDetails, TVShowDetails, PersonDetails } from '$lib/types';

export const load: PageServerLoad = async ({ params, fetch, url, locals }) => {
	const id = url.searchParams.get('id');
	const category = params.category;
	const language = locals.lang;


	if (!id || !['movie', 'tv', 'person'].includes(category)) {
		console.error(`[Page Server] Invalid slug format:`, { id, category });
		throw error(400, 'Invalid URL format. Expected: {category}-{id}');
	}

	try {
		const response = await fetch(`/api/details/${category}/${id}?language=${language}`);

		if (!response.ok) {
			console.error(`[Page Server] API error:`, {
				status: response.status,
				statusText: response.statusText
			});
			throw error(response.status, 'Failed to fetch details');
		}

		const details: MovieDetails | TVShowDetails | PersonDetails = await response.json();

		return {
			details,
			category
		};
	} catch (err) {
		console.error(`[Page Server] Error loading details:`, err);
		throw error(500, 'Failed to load details');
	}
};
