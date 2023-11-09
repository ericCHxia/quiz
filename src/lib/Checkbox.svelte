<script lang="ts">
	export let label = '';
	export let checked = false;
	export let disabled = false;
	export let highlight: boolean = false;
</script>

<div class="flex items-center">
	<input
		type="checkbox"
		on:click
		{checked}
		{disabled}
		class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
	/>
	<label
		for={label}
		class={'ml-2 px-1 py-1 w-full block text-sm font-medium ' + (highlight ? 'bg-green-500 rounded-sm text-white' : 'text-gray-700')}
	>
		{label}
	</label>
</div>
