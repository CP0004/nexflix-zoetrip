import {
	Home,
	Search,
	Compass,
	Video,
	MessageCircle,
	Heart,
	PlusSquare,
	User
} from 'lucide-svelte';
import type { NavItem } from '$lib/types';

const DEFAULT_THEME: string = 'light';

const DEFAULT_LANG: string = 'ar';

const NAV_ITEMS: NavItem[] = [
	{ icon: Home, label: 'Home', href: '/' },
	{ icon: Search, label: 'Search', href: '/search' },
	{ icon: Compass, label: 'Explore', href: '/explore' },
	{ icon: Video, label: 'Reels', href: '/reels' },
	{ icon: MessageCircle, label: 'Messages', href: '/messages' },
	{ icon: Heart, label: 'Notifications', href: '/notifications' },
	{ icon: PlusSquare, label: 'Create', href: '/create' },
	{ icon: User, label: 'Profile', href: '/profile' }
];

export { DEFAULT_THEME, DEFAULT_LANG, NAV_ITEMS };
    