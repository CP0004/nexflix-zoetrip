<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { slugify, getImageUrl } from '$lib/utils/utils';
	import type { MultipleMedia } from '$lib/types';

	let { trend }: { trend: MultipleMedia } = $props();
</script>

<a href={`/details/${trend.media_type}/${slugify(trend.title)}?id=${trend.id}`}>
	<Card class="w-[250px] shrink-0">
		<CardHeader>
			<CardTitle class="truncate py-1">
				{trend.title}
			</CardTitle>
		</CardHeader>
		<CardContent>
			{#if trend.media_type}
				<Avatar class="relative w-full h-[300px] rounded-md">
					<AvatarImage
						src={getImageUrl(trend.poster_path || '')}
						alt={trend.title}
						class="object-cover"
						loading="lazy"
					/>
					<AvatarFallback>{trend.title[0]}</AvatarFallback>

					{#if trend.popularity}
						<Badge variant="secondary" class="absolute top-2 right-2">
							{trend.vote_average.toFixed(1) || trend.popularity.toFixed(1)}
						</Badge>
					{/if}
				</Avatar>
			{/if}
		</CardContent>
	</Card>
</a>
