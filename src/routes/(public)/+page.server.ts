import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, locals }) => {
	const categories = ['movie', 'tv', 'person'];
	const sort_by = 'revenue.desc';

	const fetchPopular = async (category: string) => {
		const response = await fetch(
			`/api/categories/${category}?language=${locals.lang}&adult=${false}&sort_by=${sort_by}`
		);
		if (!response.ok) {
			throw new Error(`Failed to fetch ${category} data`);
		}
		return response.json();
	};

	const results = await Promise.all(
		categories.map(async (category) => ({
			category,
			data: await fetchPopular(category)
		}))
	);

	return {
		popularData: results
	};
};
