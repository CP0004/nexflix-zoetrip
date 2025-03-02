<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { PlayIcon, InfoIcon } from 'lucide-svelte';
	import { trans } from '$lib/stores/i18n';
	import { goto } from '$app/navigation';
	import { slugify } from '$lib/utils/utils';
	import type { MultipleMedia } from '$lib/types';
	import { getAppConfig } from '$lib/stores/app';

	let { trending }: { trending: MultipleMedia[] } = $props();
	const config = getAppConfig();
	const highestRated = $derived(() => {
		if (!trending || trending.length === 0) return null;
		return [...trending].sort((a, b) => b.vote_average - a.vote_average)[0];
	});
</script>

<div class="relative w-full h-[50vh] overflow-hidden">
	<div
		class="absolute inset-0 bg-cover bg-center"
		style="background-image: url({highestRated()?.media_type === 'live'
			? highestRated()?.backdrop_path
			: `${import.meta.env.VITE_IMAGE_URL}/${
					highestRated()?.backdrop_path || highestRated()?.poster_path
				}`})"
	>
		<div class="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
	</div>

	<div class="relative flex flex-col justify-end h-full p-6 md:p-12 lg:w-2/3 gap-4">
		<h1 class="text-3xl md:text-5xl font-bold mb-2">
			{highestRated()?.title || ''}
			<span class="text-primary font-semibold text-sm text-start">
				{$trans(config.lang, `Rating`)}
				{highestRated()?.vote_average
					? highestRated()?.vote_average.toFixed(1)
					: highestRated()?.popularity?.toFixed(1)}
			</span>
		</h1>

		<div class="flex gap-3">
			<Button
				onclick={() => {
					goto(
						`/details/${highestRated()?.media_type}/${slugify(highestRated()?.title || '')}?id=${highestRated()?.id}`
					);
				}}
				variant="default"
				class="gap-2"
			>
				<PlayIcon class="h-4 w-4" />
				{$trans(config.lang, `Play`)}
			</Button>
		</div>
	</div>
</div>
