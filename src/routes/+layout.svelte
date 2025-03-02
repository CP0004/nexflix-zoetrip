<script lang="ts">
	import '../app.css';
	import { MobileNavComp, DesktopNavComp, MobileHeaderComp } from '$lib';
	import { setAppConfig } from '$lib/stores/app';

	let { children, data } = $props();
	setAppConfig(data.config);
</script>

<div dir={data.config.lang === 'en' ? 'ltr' : 'rtl'}>
	<header>
		<MobileHeaderComp />
		<MobileNavComp />
		<DesktopNavComp />
	</header>

	<main
		class="min-h-screen bg-background pt-14 pb-16 md:pt-0 md:pb-0 rtl:md:mr-[72px] rtl:lg:mr-[245px] ltr:md:ml-[72px] ltr:lg:ml-[245px]"
	>
		<div class="mx-auto p-2 md:p-4">
			{@render children()}
		</div>
	</main>
</div>
