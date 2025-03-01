import type { MultipleMediaResponse } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, locals }) => {
	const response = await fetch(`/api/trending/all`);

	if (!response.ok) {
		throw new Error(`Failed to fetch trending data`);
	}

	const results: MultipleMediaResponse = await response.json();

	return {
		trending: results
	};
};
