<script lang="ts">
	export let label: string;
	export let checked: boolean;
	export let disabled: boolean;
	export let highlight: boolean=false;
</script>

<div class="flex items-center">
	<input
		type="radio"
		class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
		{disabled}
		{checked}
		on:click
	/>
	<label
		for={label}
		class={'ml-2 px-1 py-1 w-full block text-sm font-medium ' + (highlight
			? 'bg-green-500 rounded-sm text-white'
			: 'text-gray-700')}
	>
		{label}
	</label>
</div>
