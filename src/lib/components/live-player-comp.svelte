<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { getChannelStreamUrl } from '$lib/utils/iptv';
    
    export let streamId: number;
    
    let videoElement: HTMLVideoElement;
    let hls: any;
    
    // Helper function to check if HLS.js is available
    function getHls(): any {
        return (window as any).Hls;
    }
    
    onMount(async () => {
        // Check if HLS.js is supported
        const Hls = getHls();
        if (!Hls) {
            console.error('HLS.js is not loaded. Make sure to include it in your HTML.');
            return;
        }
        
        // Check if HLS is supported by the browser natively
        if (Hls.isSupported()) {
            hls = new Hls();
            const streamUrl = getChannelStreamUrl(streamId);
            hls.loadSource(streamUrl);
            hls.attachMedia(videoElement);
            
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoElement.play().catch((error: Error) => {
                    console.error('Error playing video:', error);
                });
            });
            
            hls.on(Hls.Events.ERROR, (_event: any, data: any) => {
                console.error('HLS error:', data);
                if (data.fatal) {
                    switch(data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.log('Network error, trying to recover...');
                            hls.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.log('Media error, trying to recover...');
                            hls.recoverMediaError();
                            break;
                        default:
                            // Cannot recover
                            hls.destroy();
                            break;
                    }
                }
            });
        } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
            // For browsers that support HLS natively like Safari
            videoElement.src = getChannelStreamUrl(streamId);
            videoElement.addEventListener('loadedmetadata', () => {
                videoElement.play().catch((error: Error) => {
                    console.error('Error playing video:', error);
                });
            });
        } else {
            console.error('HLS is not supported by your browser');
        }
    });
    
    onDestroy(() => {
        if (hls) {
            hls.destroy();
        }
    });
</script>

<div class="video-container w-full h-full relative">
    <video 
        bind:this={videoElement}
        class="w-full h-full" 
        controls 
        autoplay 
        muted
        playsinline
    >
        <track kind="captions" />
    </video>
</div>

<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
</svelte:head>

<style>
    .video-container {
        aspect-ratio: 16/9;
        background-color: #000;
    }
</style> 