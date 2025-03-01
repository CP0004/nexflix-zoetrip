import { Home, Search, Clapperboard, Monitor, Radio, UsersRound } from 'lucide-svelte';
import type { MediaType, NavItem, SortBy } from '$lib/types';

const DEFAULT_THEME: string = 'dark'; // light or dark

const DEFAULT_LANG: string = 'ar'; // ar or en

const NAV_ITEMS: NavItem[] = [
	{ icon: Home, label: 'Home', href: '/' },
	{ icon: Clapperboard, label: 'Movie', href: '/movie' },
	{ icon: Monitor, label: 'Tv', href: '/tv' },
	{ icon: Radio, label: 'Live', href: '/live' },
	{ icon: UsersRound, label: 'Person', href: '/person' },
	{ icon: Search, label: 'Search', href: '/search' }
];

const SORT_BY_OPTIONS: SortBy[] = [
	'original_title.asc',
	'original_title.desc',
	'popularity.asc',
	'popularity.desc',
	'revenue.asc',
	'revenue.desc',
	'primary_release_date.asc',
	'primary_release_date.desc',
	'vote_average.asc',
	'vote_average.desc',
	'vote_count.asc',
	'vote_count.desc'
];

const MEDIA_TYPE: MediaType[] = ['movie', 'tv', 'person', 'all', 'live'];

export { DEFAULT_THEME, DEFAULT_LANG, NAV_ITEMS, SORT_BY_OPTIONS, MEDIA_TYPE };
