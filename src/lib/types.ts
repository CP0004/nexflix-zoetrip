interface Config {
	lang: string;
	theme: string;
	info: Info;
}

interface Info {
	ip: string;
	city: string;
	region: string;
	country: string;
	loc: string;
	org: string;
	timezone: string;
}

interface NavItem {
	icon: typeof import('lucide-svelte').Icon;
	label: string;
	href: string;
}

interface TMDBResponse<T> {
	page: number;
	results: T[];
	total_pages: number;
	total_results: number;
}

interface MovieListItem {
	id: number;
	title: string;
	overview: string;
	poster_path: string | null;
	backdrop_path: string | null;
	release_date: string;
	vote_average: number;
	vote_count: number;
	popularity: number;
	original_language: string;
	genre_ids: number[];
	adult: boolean;
	video: boolean;
}

interface TVShowListItem {
	id: number;
	name: string;
	overview: string;
	poster_path: string | null;
	backdrop_path: string | null;
	first_air_date: string;
	vote_average: number;
	vote_count: number;
	popularity: number;
	original_language: string;
	genre_ids: number[];
	origin_country: string[];
	adult: boolean;
}

interface PersonListItem {
	id: number;
	name: string;
	profile_path: string | null;
	adult: boolean;
	popularity: number;
	known_for_department: string;
	gender: number;
	known_for: (MovieListItem | TVShowListItem)[];
}

// interface MediaType {
// 	movie: 'popular' | 'top_rated' | 'now_playing' | 'upcoming';
// 	tv: 'popular' | 'top_rated' | 'airing_today' | 'on_the_air';
// 	person: 'popular';
// }

type SortBy =
	| 'original_title.asc'
	| 'original_title.desc'
	| 'popularity.asc'
	| 'popularity.desc'
	| 'revenue.asc'
	| 'revenue.desc'
	| 'primary_release_date.asc'
	| 'primary_release_date.desc'
	| 'vote_average.asc'
	| 'vote_average.desc'
	| 'vote_count.asc'
	| 'vote_count.desc';

interface Genre {
	id: number;
	name: string;
}

interface ProductionCompany {
	id: number;
	logo_path: string | null;
	name: string;
	origin_country: string;
}

interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

interface SpokenLanguage {
	english_name: string;
	iso_639_1: string;
	name: string;
}

interface MovieDetails {
	adult: boolean;
	backdrop_path: string | null;
	belongs_to_collection: {
		id: number;
		name: string;
		poster_path: string | null;
		backdrop_path: string | null;
	} | null;
	budget: number;
	genres: Genre[];
	homepage: string | null;
	id: number;
	imdb_id: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

interface TVEpisode {
	id: number;
	name: string;
	overview: string;
	vote_average: number;
	vote_count: number;
	air_date: string;
	episode_number: number;
	episode_type: string;
	production_code: string;
	runtime: number | null;
	season_number: number;
	show_id: number;
	still_path: string | null;
}

interface TVSeason {
	air_date: string;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: string | null;
	season_number: number;
	vote_average: number;
}

interface Network {
	id: number;
	logo_path: string | null;
	name: string;
	origin_country: string;
}

interface TVShowDetails {
	adult: boolean;
	backdrop_path: string | null;
	created_by: {
		id: number;
		credit_id: string;
		name: string;
		gender: number;
		profile_path: string | null;
	}[];
	episode_run_time: number[];
	first_air_date: string;
	genres: Genre[];
	homepage: string | null;
	id: number;
	in_production: boolean;
	languages: string[];
	last_air_date: string;
	last_episode_to_air: TVEpisode | null;
	next_episode_to_air: TVEpisode | null;
	name: string;
	networks: Network[];
	number_of_episodes: number;
	number_of_seasons: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	seasons: TVSeason[];
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
	type: string;
	vote_average: number;
	vote_count: number;
}

interface PersonDetails {
	adult: boolean;
	also_known_as: string[];
	biography: string;
	birthday: string | null;
	deathday: string | null;
	gender: number;
	homepage: string | null;
	id: number;
	imdb_id: string;
	known_for_department: string;
	name: string;
	place_of_birth: string | null;
	popularity: number;
	profile_path: string | null;
}

type MediaType = 'movie' | 'tv' | 'person' | 'all' | 'live';

interface MultipleMedia {
	id: number;
	title: string;
	poster_path: string | null;
	backdrop_path: string | null;
	media_type: MediaType;
	popularity: number;
	vote_average: number;
	adult: boolean;
}

interface MultipleMediaResponse {
	page: number;
	results: MultipleMedia[];
	total_pages: number;
	total_results: number;
}

export type {
	Config,
	Info,
	NavItem,
	MultipleMediaResponse,
	MultipleMedia,
	TMDBResponse,
	MovieListItem,
	TVShowListItem,
	PersonListItem,
	MediaType,
	SortBy,
	MovieDetails,
	TVShowDetails,
	PersonDetails,
	Genre,
	ProductionCompany,
	ProductionCountry,
	SpokenLanguage
};
