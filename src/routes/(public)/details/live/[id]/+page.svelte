<script lang="ts">
    import { LivePlayerComp } from '$lib';
    
    let { data } = $props();
    const streamId = $derived(parseInt(data.id));
</script>

<div class="container mx-auto p-4">
    <div class="mb-6">
        <h1 class="text-2xl font-bold mb-2">Live Stream</h1>
        <p class="text-sm text-muted-foreground">Channel ID: {streamId}</p>
    </div>
    
    <div class="w-full max-w-4xl mx-auto">
        <LivePlayerComp {streamId} />
    </div>
</div> 