<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { trans } from '$lib/stores/i18n';

	let { data } = $props();

	// Helper function to get image URL
	const getImageUrl = (path: string) => (path ? `https://image.tmdb.org/t/p/w500${path}` : '');

	// Helper function to format date
	const formatDate = (date: string) => (date ? new Date(date).toLocaleDateString() : '');
</script>

<div>
	{#each data.popularData as { category, data: categoryData }}
		<section>
			<h2 class="text-2xl font-bold mb-4 capitalize">
				{$trans(data.config.lang, `${category}`)}
			</h2>

			<ScrollArea
				dir={data.config.lang === 'ar' ? 'rtl' : 'ltr'}
				orientation="horizontal"
				class="w-full whitespace-nowrap rounded-md border"
			>
				<div class="flex gap-4 p-4">
					{#each categoryData.results as item}
						<Card class="w-[250px] shrink-0">
							<CardHeader>
								<CardTitle>
									{item.title || item.name}
								</CardTitle>
								{#if category !== 'person'}
									<CardDescription>
										{formatDate(item.release_date || item.first_air_date)}
									</CardDescription>
								{/if}
							</CardHeader>
							<CardContent>
								{#if category === 'person'}
									<Avatar class="w-full h-[300px] rounded-md">
										<AvatarImage
											src={getImageUrl(item.profile_path)}
											alt={item.name}
											class="object-cover"
										/>
										<AvatarFallback>{item.name[0]}</AvatarFallback>
									</Avatar>
									<div class="mt-2">
										<Badge variant="secondary">
											{item.known_for_department}
										</Badge>
									</div>
								{:else}
									<div class="relative aspect-[16/9]">
										<img
											src={getImageUrl(item.poster_path)}
											alt={item.title || item.name}
											class="rounded-md object-cover w-full h-full"
										/>
										{#if item.vote_average}
											<Badge variant="secondary" class="absolute top-2 right-2">
												{item.vote_average.toFixed(1)}
											</Badge>
										{/if}
									</div>
								{/if}
							</CardContent>
						</Card>
					{/each}
				</div>
			</ScrollArea>
		</section>
	{/each}
</div>
