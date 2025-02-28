import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Info } from '$lib/types';
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getIpInfo = async (): Promise<Info> => {
	const resIp = await fetch('https://api.ipify.org?format=json');
	const { ip }: { ip: string } = await resIp.json();
	const resIpInfo = await fetch(`https://ipinfo.io/${ip}/json`);
	const ipInfoData: Info = await resIpInfo.json();
	return ipInfoData;
};

// convert text to slug plus support for arabic and english
export const slugify = (text: string): string => {
	if (!text) return '-';
	return text.toLowerCase().replace(/ /g, '-');
};
