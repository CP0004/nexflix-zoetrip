import type { Genre, MultipleMediaResponse } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const { category } = params;

	const trendingPromise = fetch(`/api/trending/${category}`).then((response) => {
		if (!response.ok) throw new Error(`Failed to fetch trending data`);
		return response.json();
	});

	if (category === 'movie' || category === 'tv' || category === 'live') {
		const genreResponse = await fetch(`/api/genre/categories/${category}`);
		if (!genreResponse.ok) {
			throw new Error(`Failed to fetch genre data`);
		}
		const genres: Genre[] = await genreResponse.json();

		const genrePromises = genres.map((genre) =>
			fetch(`/api/genre/by/${category}/${genre.id}`)
				.then((response) => {
					if (!response.ok) throw new Error(`Failed to fetch genre data for ${genre.name}`);
					return response.json();
				})
				.then((resultsGenreBy: MultipleMediaResponse) => ({
					name_genre: genre.name,
					id_genre: genre.id,
					results_genre: resultsGenreBy
				}))
		);

		const [trending, listGenreBy] = await Promise.all([
			trendingPromise,
			Promise.all(genrePromises)
		]);

		return {
			trending,
			genres: listGenreBy
		};
	}

	const trending = await trendingPromise;
	return {
		trending
	};
};
