<script lang="ts">
	import { Heart, MessageCircle } from 'lucide-svelte';
</script>

<nav
	class="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b bg-background px-4 md:hidden"
>
	<img src="/logo_1024x277.png" alt="logo" class="w-24" />
	<div class="flex gap-4">
		<Heart class="h-6 w-6" />
		<MessageCircle class="h-6 w-6" />
	</div>
</nav>
