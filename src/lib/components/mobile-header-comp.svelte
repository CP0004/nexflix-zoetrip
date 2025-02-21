<script lang="ts">
	import { Heart, MessageCircle } from 'lucide-svelte';
	import { trans } from '$lib/stores/i18n';
	import { getAppConfig } from '$lib/stores/app';

	const appConfig = getAppConfig();
</script>

<nav
	class="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b bg-background px-4 md:hidden"
>
	<div class="text-xl font-semibold">{$trans(appConfig.lang, 'Instagram')}</div>
	<div class="flex gap-4">
		<Heart class="h-6 w-6" />
		<MessageCircle class="h-6 w-6" />
	</div>
</nav>
