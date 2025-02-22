import {
	Home,
	Search,
	Compass,
	Video,
	MessageCircle,
	Heart,
	PlusSquare,
	Clapperboard,
	Monitor,
	Radio,
	UsersRound
} from 'lucide-svelte';
import type { NavItem } from '$lib/types';

const DEFAULT_THEME: string = 'light';

const DEFAULT_LANG: string = 'ar';

const NAV_ITEMS: NavItem[] = [
	{ icon: Home, label: 'Home', href: '/' },
	{ icon: Clapperboard, label: 'Movies', href: '/movie' },
	{ icon: Monitor, label: 'TV', href: '/tv' },
	{ icon: Radio, label: 'Live', href: '/live' },
	{ icon: UsersRound, label: 'Actors', href: '/person' },
	{ icon: Search, label: 'Search', href: '/search' }
];

export { DEFAULT_THEME, DEFAULT_LANG, NAV_ITEMS };
