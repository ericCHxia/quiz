<script lang="ts">
	import Checkbox from './Checkbox.svelte';
	import type { ItemList } from './item';
	export let items: ItemList = [];
	$: item_list = items.map((item) => {
		if (typeof item === 'string') {
			return { label: item, value: item };
		}
		return item;
	});
	export let value: any[] = [];
	export let disabled = false;
	export let highlight: number[] = [];

	function click(item: { value: any }) {
		if (value.includes(item.value)) {
			value = value.filter((v) => v !== item.value);
		} else {
			value = [...value, item.value];
		}
	}
</script>

<div class="mt-4 space-y-2">
	{#each item_list as item}
		<Checkbox
			label={item.label}
			checked={value.includes(item.value)}
			on:click={() => click(item)}
            {disabled}
            highlight={highlight.includes(item.value)}
		/>
	{/each}
</div>
