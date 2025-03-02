import type { Genre, MultipleMediaGenreResponse, MultipleMediaResponse } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const { category } = params;

	// أول طلب للبيانات الشائعة
	const trendingPromise = fetch(`/api/trending/${category}`)
		.then(response => {
			if (!response.ok) throw new Error(`Failed to fetch trending data`);
			return response.json();
		});
	
	// معالجة البيانات المتعلقة بالأنواع بشكل متوازي
	if (category === 'movie' || category === 'tv') {
		// طلب قائمة الأنواع
		const genreResponse = await fetch(`/api/genre/categories/${category}`);
		if (!genreResponse.ok) {
			throw new Error(`Failed to fetch genre data`);
		}
		const genres: Genre[] = await genreResponse.json();
		
		// استخدام Promise.all لجلب جميع بيانات الأنواع بشكل متوازي بدلاً من متسلسل
		const genrePromises = genres.map(genre => 
			fetch(`/api/genre/by/${category}/${genre.id}`)
				.then(response => {
					if (!response.ok) throw new Error(`Failed to fetch genre data for ${genre.name}`);
					return response.json();
				})
				.then((resultsGenreBy: MultipleMediaResponse) => ({
					name_genre: genre.name,
					id_genre: genre.id,
					results_genre: resultsGenreBy
				}))
		);
		
		// انتظار جميع الطلبات بشكل متوازي
		const [trending, listGenreBy] = await Promise.all([
			trendingPromise,
			Promise.all(genrePromises)
		]);
		
		return {
			trending,
			genres: listGenreBy
		};
	}

	// إذا لم يكن الفئة فيلم أو تلفزيون، ارجع فقط البيانات الشائعة
	const trending = await trendingPromise;
	return {
		trending
	};
};
