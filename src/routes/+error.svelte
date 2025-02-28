<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { AlertCircle } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { trans } from '$lib/stores/i18n';

	let { data } = $props();

	const errorTitle = $derived(() => {
		if (page.status === 404) return 'Page Not Found';
		if (page.status === 500) return 'Server Error';
		return 'An Error Occurred';
	});
</script>

<div class="container h-screen mx-auto flex items-center justify-center px-4">
	<Card class="w-full max-w-md">
		<CardHeader>
			<div class="flex items-center gap-2">
				<AlertCircle class="h-5 w-5 text-destructive" />
				<CardTitle class="text-destructive">{$trans(data.config.lang, `${errorTitle()}`)}</CardTitle
				>
			</div>
			<CardDescription class="mt-2">
				{$trans(data.config.lang, `${page.status}`)}
			</CardDescription>
		</CardHeader>
		<CardContent>
			<p class="text-muted-foreground">
				{$trans(data.config.lang, `${page.error?.message}`)}
			</p>
		</CardContent>
		<CardFooter class="flex justify-between gap-4">
			<Button
				variant="outline"
				class="w-full"
				onclick={() => {
					history.back();
				}}
			>
				{$trans(data.config.lang, `Go Back`)}
			</Button>
			<Button
				class="w-full"
				onclick={() => {
					goto('/');
				}}
			>
				{$trans(data.config.lang, `Go to Home`)}
			</Button>
		</CardFooter>
	</Card>
</div>