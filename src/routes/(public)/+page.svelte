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
	import { slugify } from '$lib/utils/utils';

	let { data } = $props();

	// Helper function to get image URL
	const getImageUrl = (path: string) => (path ? `https://image.tmdb.org/t/p/w500${path}` : '');

	// Helper function to format date
	const formatDate = (date: string) => (date ? new Date(date).toLocaleDateString() : '');
</script>

<div>
	{#each data.popularData as { category, data: categoryData }}
		<section>
			<h2 class="text-2xl font-bold mt-4 mb-2 capitalize">
				{$trans(data.config.lang, `${category}`)}
			</h2>

			<ScrollArea
				dir={data.config.lang === 'ar' ? 'rtl' : 'ltr'}
				orientation="horizontal"
				class="w-full whitespace-nowrap rounded-md border"
			>
				<div class="flex gap-4 p-4">
					{#each categoryData.results as item}
						<a href={`/details/${category}/${slugify(item.title || item.name)}?id=${item.id}`}>
							<Card class="w-[250px] shrink-0">
								<CardHeader>
									<CardTitle class="truncate py-1">
										{item.title || item.name}
									</CardTitle>
									{#if category !== 'person'}
										<CardDescription>
											{formatDate(item.release_date || item.first_air_date || '-')}
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
												loading="lazy"
												src={getImageUrl(item.backdrop_path)}
												alt={item.title || item.name}
												onerror={(e) => {
													if (e.target instanceof HTMLImageElement) {
														e.target.src = getImageUrl(item.poster_path);
														// if poster_path is also not available or error, show a default image
														if (
															item.poster_path === null ||
															e.target.src === '' ||
															e.target.src === null ||
															e.target.src === undefined
														) {
															e.target.src = 'https://dummyimage.com/300';
														}
													}
												}}
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
						</a>
					{/each}
				</div>
			</ScrollArea>
		</section>
	{/each}
</div>
