import type { IPTVCategory, IPTVChannel, IPTVCredentials, IPTVResponse } from '$lib/types';

// Default IPTV credentials
export const DEFAULT_IPTV_CREDENTIALS: IPTVCredentials = {
	name: 'Random',
	username: '50005000',
	password: '562611731736',
	url: 'iptvsmarters.ltd',
	port: 80
};

// Base URL for IPTV API calls
const getBaseUrl = (credentials: IPTVCredentials = DEFAULT_IPTV_CREDENTIALS) => {
	return `http://${credentials.url}:${credentials.port}/player_api.php?username=${credentials.username}&password=${credentials.password}`;
};

// Fetch IPTV categories
export async function fetchIPTVCategories(
	credentials: IPTVCredentials = DEFAULT_IPTV_CREDENTIALS
): Promise<IPTVCategory[]> {
	const url = `${getBaseUrl(credentials)}&action=get_live_categories`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch IPTV categories');
	}

	return await response.json();
}

// Fetch channels for a specific category
export async function fetchChannelsByCategory(
	categoryId: string,
	credentials: IPTVCredentials = DEFAULT_IPTV_CREDENTIALS
): Promise<IPTVChannel[]> {
	const url = `${getBaseUrl(credentials)}&action=get_live_streams&category_id=${categoryId}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch channels for category ${categoryId}`);
	}

	return await response.json();
}

// Fetch all live channels
export async function fetchAllLiveChannels(
	credentials: IPTVCredentials = DEFAULT_IPTV_CREDENTIALS
): Promise<IPTVChannel[]> {
	const url = `${getBaseUrl(credentials)}&action=get_live_streams`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch all live channels');
	}

	return await response.json();
}

// Get streaming URL for a specific channel
export function getChannelStreamUrl(
	streamId: number,
	credentials: IPTVCredentials = DEFAULT_IPTV_CREDENTIALS
): string {
	return `http://${credentials.url}:${credentials.port}/live/${credentials.username}/${credentials.password}/${streamId}.m3u8`;
}

// Get information about a specific channel by its ID
export async function getChannelById(
	channelId: number,
	credentials: IPTVCredentials = DEFAULT_IPTV_CREDENTIALS
): Promise<IPTVChannel | undefined> {
	// Use direct API call to get a specific stream
	const url = `${getBaseUrl(credentials)}&action=get_live_streams&stream_id=${channelId}`;
	
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch channel with ID ${channelId}`);
	}
	
	const data = await response.json();
	// If the API returns an array, return the first item or undefined if empty
	return Array.isArray(data) && data.length > 0 ? data[0] : undefined;
}

// Format IPTV data to match the MultipleMedia format used in the app
export function formatIPTVChannelsToMultipleMedia(channels: IPTVChannel[]) {
	return channels.map((channel) => ({
		id: channel.stream_id,
		title: channel.name,
		poster_path: channel.stream_icon,
		backdrop_path: channel.stream_icon,
		media_type: 'live',
		popularity: 0,
		vote_average: 0,
		adult: false
	}));
}
