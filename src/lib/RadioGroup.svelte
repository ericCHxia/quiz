<script lang="ts">
	import type { ItemList } from './item';
	import Radio from './Radio.svelte';
	export let items: ItemList = [];
	$: item_list = items.map((item) => {
		if (typeof item === 'string') {
			return { label: item, value: item };
		}
		return item;
	});
	export let value: number = 0;
	export let disabled: boolean = false;
	export let highlight: number[] = [];
</script>

<div class="mt-4 space-y-2">
	{#each item_list as item}
			<Radio label={item.label} checked={value === item.value} disabled={disabled} on:click={() => value = item.value} highlight={highlight.includes(item.value)}/>
	{/each}
</div>
