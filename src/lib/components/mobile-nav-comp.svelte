<script lang="ts">
	import { NAV_ITEMS } from '$lib/utils/constants';
	import type { NavItem } from '$lib/types';

	const navItems: NavItem[] = NAV_ITEMS;
</script>

<nav
	class="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background md:hidden"
>
	{#each navItems.slice(0, 5) as { icon: Icon, href }}
		<a {href} class="flex h-full w-full items-center justify-center">
			<Icon class="h-6 w-6" />
		</a>
	{/each}
</nav>
