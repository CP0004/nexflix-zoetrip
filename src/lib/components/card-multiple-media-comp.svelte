<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { slugify, getImageUrl } from '$lib/utils/utils';
	import type { MultipleMedia } from '$lib/types';

	let { trend }: { trend: MultipleMedia } = $props();
</script>

<a href={`/details/${trend.media_type}/${slugify(trend.title)}?id=${trend.id}`}>
	<Card class="w-[200px] shrink-0 p-0">
		<CardContent class="p-1">
			{#if trend.media_type}
				<Avatar class="relative w-full h-[300px] rounded-md">
					<AvatarImage
						src={trend.media_type === 'live'
							? trend.backdrop_path
							: getImageUrl(trend.poster_path || '')}
						alt={trend.title}
						class="object-cover"
						loading="lazy"
					/>
					<AvatarFallback>{trend.title[0]}</AvatarFallback>

					{#if trend.popularity}
						<Badge variant="secondary" class="absolute top-2 start-2">
							{trend.vote_average ? trend.vote_average.toFixed(1) : trend.popularity.toFixed(1)}
						</Badge>
					{/if}
					<CardTitle
						class="bg-gradient-to-t from-background text-center absolute truncate py-1 start-0 bottom-0 end-0"
					>
						{trend.title}
					</CardTitle>
				</Avatar>
			{/if}
		</CardContent>
	</Card>
</a>
