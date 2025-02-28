<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import { Separator } from '$lib/components/ui/separator';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { trans } from '$lib/stores/i18n';
	import type { MovieDetails, TVShowDetails, PersonDetails } from '$lib/types';

	let { data } = $props();

	// Helper function to get image URL with size parameter
	const getImageUrl = (path: string | null, size = 'original') => {
		if (!path) return 'https://dummyimage.com/500x750';
		return `https://image.tmdb.org/t/p/${size}${path}`;
	};

	// Helper function to format date
	const formatDate = (date: string | null) => {
		if (!date) return '-';
		return new Date(date).toLocaleDateString(data.config.lang === 'ar' ? 'ar-SA' : 'en-US');
	};

	// Helper function to format runtime
	const formatRuntime = (minutes: number) => {
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;
		return `${hours}h ${remainingMinutes}m`;
	};

	// Derived values based on category
	let isMovie = data.category === 'movie';
	let isTv = data.category === 'tv';
	let isPerson = data.category === 'person';

	// Type guard functions
	const isMovieDetails = (details: MovieDetails | TVShowDetails | PersonDetails): details is MovieDetails => {
		return isMovie;
	};

	const isTVShowDetails = (details: MovieDetails | TVShowDetails | PersonDetails): details is TVShowDetails => {
		return isTv;
	};

	const isPersonDetails = (details: MovieDetails | TVShowDetails | PersonDetails): details is PersonDetails => {
		return isPerson;
	};

	let details = data.details as MovieDetails | TVShowDetails | PersonDetails;
</script>

<div class="container mx-auto py-8 px-4">
	<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
		<!-- Left Column: Image -->
		<div class="md:col-span-1">
			{#if isPersonDetails(details)}
				<Avatar class="w-full h-auto aspect-[2/3] rounded-lg">
					<AvatarImage
						src={getImageUrl(details.profile_path)}
						alt={details.name}
						class="object-cover"
					/>
					<AvatarFallback>{details.name[0] ?? '?'}</AvatarFallback>
				</Avatar>
			{:else}
				<img
					src={getImageUrl(details.poster_path)}
					alt={isMovieDetails(details) ? details.title : details.name}
					class="w-full rounded-lg shadow-lg"
				/>
			{/if}
		</div>

		<!-- Right Column: Details -->
		<div class="md:col-span-2">
			<Card>
				<CardHeader>
					<CardTitle class="text-3xl">
						{isMovieDetails(details) ? details.title : details.name}
					</CardTitle>
					<CardDescription>
						{#if isMovieDetails(details)}
							<div class="flex flex-wrap gap-2 items-center">
								<span>{formatDate(details.release_date)}</span>
								<Separator orientation="vertical" class="h-4" />
								<span>{formatRuntime(details.runtime)}</span>
								<Separator orientation="vertical" class="h-4" />
								<span>{details.vote_average.toFixed(1)} ★</span>
							</div>
						{:else if isTVShowDetails(details)}
							<div class="flex flex-wrap gap-2 items-center">
								<span>{formatDate(details.first_air_date)}</span>
								<Separator orientation="vertical" class="h-4" />
								<span>{details.number_of_seasons} Seasons</span>
								<Separator orientation="vertical" class="h-4" />
								<span>{details.vote_average.toFixed(1)} ★</span>
							</div>
						{:else}
							<div class="flex flex-wrap gap-2 items-center">
								<span>{details.known_for_department}</span>
								{#if details.birthday}
									<Separator orientation="vertical" class="h-4" />
									<span>Born: {formatDate(details.birthday)}</span>
								{/if}
							</div>
						{/if}
					</CardDescription>
				</CardHeader>

				<CardContent>
					<!-- Overview/Biography -->
					<div class="space-y-4">
						<h3 class="text-lg font-semibold">
							{isPersonDetails(details) ? 'Biography' : 'Overview'}
						</h3>
						<p class="text-muted-foreground">
							{isPersonDetails(details) ? details.biography : details.overview}
						</p>

						<!-- Additional Details -->
						{#if isMovieDetails(details) || isTVShowDetails(details)}
							<div class="mt-6">
								<h3 class="text-lg font-semibold mb-2">Genres</h3>
								<div class="flex flex-wrap gap-2">
									{#each details.genres as genre}
										<Badge variant="secondary">
											{genre.name}
										</Badge>
									{/each}
								</div>
							</div>

							{#if isMovieDetails(details)}
								<div class="mt-6">
									<h3 class="text-lg font-semibold mb-2">Production Companies</h3>
									<ScrollArea class="h-20">
										<div class="space-y-2">
											{#each details.production_companies as company}
												<div class="flex items-center gap-2">
													{#if company.logo_path}
														<img
															src={getImageUrl(company.logo_path, 'w92')}
															alt={company.name}
															class="h-8 object-contain"
														/>
													{/if}
													<span>{company.name}</span>
												</div>
											{/each}
										</div>
									</ScrollArea>
								</div>
							{:else if isTVShowDetails(details)}
								<div class="mt-6">
									<h3 class="text-lg font-semibold mb-2">Networks</h3>
									<div class="flex flex-wrap gap-4">
										{#each details.networks as network}
											{#if network.logo_path}
												<img
													src={getImageUrl(network.logo_path, 'w92')}
													alt={network.name}
													class="h-8 object-contain"
												/>
											{/if}
										{/each}
									</div>
								</div>
							{/if}
						{:else if isPersonDetails(details)}
							<div class="mt-6">
								<h3 class="text-lg font-semibold mb-2">Personal Info</h3>
								<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
									{#if details.place_of_birth}
										<div>
											<span class="font-medium">Place of Birth:</span>
											<p class="text-muted-foreground">{details.place_of_birth}</p>
										</div>
									{/if}
									{#if details.also_known_as?.length}
										<div>
											<span class="font-medium">Also Known As:</span>
											<ScrollArea class="h-20">
												<ul class="list-none space-y-1">
													{#each details.also_known_as as name}
														<li class="text-muted-foreground">{name}</li>
													{/each}
												</ul>
											</ScrollArea>
										</div>
									{/if}
								</div>
							</div>
						{/if}
					</div>
				</CardContent>
			</Card>
		</div>
	</div>
</div>
