<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { trans } from '$lib/stores/i18n';
	
	let { data } = $props();
</script>

<Button>{$trans(data.config.lang, 'Click me')}</Button>
<h1>{$trans(data.config.lang, 'Hello')}</h1>
