<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { CardMultipleMediaComp, CoverMultipleMediaComp } from '$lib';
	import { trans } from '$lib/stores/i18n';

	let { data } = $props();
	const trending = $derived(data.trending.results);
</script>

<CoverMultipleMediaComp {trending} />
<div class="px-6 py-8 bg-background">
	<h2 class="text-xl font-semibold mb-4">
		{$trans(data.config.lang, `Trending Now`)}
	</h2>

	<ScrollArea
		dir={data.config?.lang === 'ar' ? 'rtl' : 'ltr'}
		orientation="horizontal"
		class="w-full"
	>
		<div class="flex gap-4 pb-4">
			{#each trending as trend}
				<CardMultipleMediaComp {trend} />
			{/each}
		</div>
	</ScrollArea>
</div>
