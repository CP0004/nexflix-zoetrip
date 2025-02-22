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

interface MediaType {
	movie: 'popular' | 'top_rated' | 'now_playing' | 'upcoming';
	tv: 'popular' | 'top_rated' | 'airing_today' | 'on_the_air';
	person: 'popular';
}

export type {
	Config,
	Info,
	NavItem,
	TMDBResponse,
	MovieListItem,
	TVShowListItem,
	PersonListItem,
	MediaType
};
