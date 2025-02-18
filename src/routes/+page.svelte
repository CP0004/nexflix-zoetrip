<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { trans } from '$lib/stores/i18n';
	let { data } = $props();

	console.log('Page', data);
</script>

<Button>{$trans(data.lang, 'Click me')}</Button>
<h1>{$trans(data.lang, 'Hello')}</h1>
