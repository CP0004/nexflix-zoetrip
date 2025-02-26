import {
	Home,
	Search,
	Clapperboard,
	Monitor,
	Radio,
	UsersRound
} from 'lucide-svelte';
import type { NavItem } from '$lib/types';

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

export { DEFAULT_THEME, DEFAULT_LANG, NAV_ITEMS };
