import { getContext, setContext } from 'svelte';
import type { Config } from '$lib/types';

const APP_CONTEXT_KEY = 'app-config';

const setAppConfig = (data: Config): Config => setContext<Config>(APP_CONTEXT_KEY, data);
const getAppConfig = (): Config => getContext<Config>(APP_CONTEXT_KEY);

export { setAppConfig, getAppConfig };
