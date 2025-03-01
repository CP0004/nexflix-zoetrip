<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { CardMultipleMediaComp } from '$lib';
	import { Button } from '$lib/components/ui/button';
	import { PlayIcon, InfoIcon } from 'lucide-svelte';
	import { trans } from '$lib/stores/i18n';

	let { data } = $props();

	const trending = data.trending.results;

	const highestRated = $derived(() => {
		if (!trending || trending.length === 0) return null;
		return [...trending].sort((a, b) => b.vote_average - a.vote_average)[0];
	});
</script>

{#if highestRated()}
	<div class="relative w-full h-[70vh] overflow-hidden rounded-md">
		<div
			class="absolute inset-0 bg-cover bg-center"
			style="background-image: url({import.meta.env.VITE_IMAGE_URL}/{highestRated()
				?.backdrop_path || highestRated()?.poster_path})"
		>
			<div class="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
		</div>

		<div class="relative flex flex-col justify-end h-full p-6 md:p-12 lg:w-2/3 gap-4">
			<h1 class="text-3xl md:text-5xl font-bold mb-2">
				{highestRated()?.title || ''}
				<span class="text-primary font-semibold text-sm">
					{highestRated()?.vote_average.toFixed(1)}
					{$trans(data.config.lang, `Rating`)}
				</span>
			</h1>

			<div class="flex gap-3">
				<Button variant="default" class="gap-2">
					<PlayIcon class="h-4 w-4" />
					{$trans(data.config.lang, `Play`)}
				</Button>
				<Button variant="secondary" class="gap-2">
					<InfoIcon class="h-4 w-4" />
					{$trans(data.config.lang, `More Info`)}
				</Button>
			</div>
		</div>
	</div>
{/if}

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
