<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import { cn } from '$lib/utils/utils';
	import { trans } from '$lib/stores/i18n';
	import { NAV_ITEMS } from '$lib/utils/constants';
	import type { NavItem } from '$lib/types';
	import { getAppConfig } from '$lib/stores/app';

	const navItems: NavItem[] = NAV_ITEMS;
	const appConfig = getAppConfig();
</script>

<nav
	class={cn(
		'fixed top-0 h-screen w-[72px] border-r bg-background md:flex md:flex-col lg:w-[245px]',
		'ltr:left-0 border-r rtl:right-0 border-l',
		'hidden md:flex'
	)}
>
	<div class="p-4 lg:p-6">
		<img src="/logo_1024x277.png" alt="logo" class="hidden w-2/4 lg:block" />
		<img src="/logo.png" alt="logo" class="h-8 w-8 lg:hidden" />
	</div>

	<div class={cn('flex flex-1 flex-col gap-2 p-3', 'ltr:items-start rtl:items-end')}>
		{#each navItems as { icon: Icon, label, href }}
			<a
				{href}
				class={cn(
					'w-full flex items-center gap-4 rounded-md p-3 transition-colors hover:bg-accent',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
					'flex-row'
				)}
			>
				<Icon class="h-6 w-6" />
				<span class="hidden lg:block">{$trans(appConfig.lang, label)}</span>
			</a>
		{/each}
	</div>

	<div class="p-3">
		<button
			class={cn(
				'flex w-full items-center gap-4 rounded-md p-3 transition-colors hover:bg-accent',
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
				'flex-row'
			)}
		>
			<Menu class="h-6 w-6" />
			<span class="hidden lg:block">{$trans(appConfig.lang, 'More')}</span>
		</button>
	</div>
</nav>
