<script lang="ts">
	import '../app.css';
	import {
		Home,
		Search,
		Compass,
		Video,
		MessageCircle,
		Heart,
		PlusSquare,
		User,
		Menu
	} from 'lucide-svelte';
	import { cn } from '$lib/utils/utils';
	import { trans } from '$lib/stores/i18n';

	let { children, data } = $props();

	const navItems = [
		{ icon: Home, label: 'Home', href: '/' },
		{ icon: Search, label: 'Search', href: '/search' },
		{ icon: Compass, label: 'Explore', href: '/explore' },
		{ icon: Video, label: 'Reels', href: '/reels' },
		{ icon: MessageCircle, label: 'Messages', href: '/messages' },
		{ icon: Heart, label: 'Notifications', href: '/notifications' },
		{ icon: PlusSquare, label: 'Create', href: '/create' },
		{ icon: User, label: 'Profile', href: '/profile' }
	];

	const isRTL = $derived(data.lang === 'ar');
</script>

<div class={isRTL ? 'rtl' : 'ltr'}>
	<header>
		<!-- Mobile Navigation (Bottom Bar) -->
		<nav
			class="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background md:hidden"
		>
			{#each navItems.slice(0, 5) as { icon: Icon, href }}
				<a {href} class="flex h-full w-full items-center justify-center">
					<Icon class="h-6 w-6" />
				</a>
			{/each}
		</nav>
		<!-- Mobile Top Bar -->
		<nav
			class="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b bg-background px-4 md:hidden"
		>
			<div class="text-xl font-semibold">{$trans(data.lang, 'Instagram')}</div>
			<div class="flex gap-4">
				<Heart class="h-6 w-6" />
				<MessageCircle class="h-6 w-6" />
			</div>
		</nav>

		<!-- Tablet/Desktop Navigation Rail -->
		<nav
			class={cn(
				'fixed top-0 h-screen w-[72px] border-r bg-background md:flex md:flex-col lg:w-[245px]',
				isRTL ? 'right-0 border-l' : 'left-0 border-r',
				'hidden md:flex'
			)}
		>
			<div class="p-4 lg:p-6">
				<span class="hidden text-xl font-semibold lg:block">{$trans(data.lang, 'Instagram')}</span>
				<span class="text-xl font-semibold lg:hidden">Ig</span>
			</div>

			<div class={cn('flex flex-1 flex-col gap-2 p-3', isRTL ? 'items-end' : 'items-start')}>
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
						<span class="hidden lg:block">{$trans(data.lang, label)}</span>
					</a>
				{/each}
			</div>

			<div class="p-3">
				<button
					class={cn(
						'flex w-full items-center gap-4 rounded-md p-3 transition-colors hover:bg-accent',
						'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
						isRTL ? 'flex-row-reverse' : 'flex-row'
					)}
				>
					<Menu class="h-6 w-6" />
					<span class="hidden lg:block">{$trans(data.lang, 'More')}</span>
				</button>
			</div>
		</nav>
	</header>

	<!-- Main Content Area -->
	<main
		class={cn(
			'min-h-screen bg-background pt-14 pb-16 md:pt-0 md:pb-0',
			isRTL ? 'md:mr-[72px] lg:mr-[245px]' : 'md:ml-[72px] lg:ml-[245px]'
		)}
	>
		<div class="mx-auto max-w-6xl p-4">
			{@render children()}
		</div>
	</main>
</div>
