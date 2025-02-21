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

export type { Config, Info, NavItem };
