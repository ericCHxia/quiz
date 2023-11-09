import { writable, readable } from 'svelte/store';

export const n = writable(0);
export const correctList = writable([] as number[]);
export const seed = readable(Date.now());
type statusType = string[][]|number[][]|number[]|string[];
export const status = writable([] as statusType);