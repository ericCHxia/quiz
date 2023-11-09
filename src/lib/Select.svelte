<script lang="ts">
	import type {ItemList} from "./item"
	export let items: ItemList = [];
	$: item_list = items.map((item) => {
		if (typeof item === 'string') {
			return { label: item, value: item };
		}
		return item;
	});
	export let value: any;
</script>

<select
	bind:value
	class="block w-full question_input"
>
	{#each item_list as item}
		<option value={item.value} class="font-medium text-gray-700">{item.label}</option>
	{/each}
</select>
