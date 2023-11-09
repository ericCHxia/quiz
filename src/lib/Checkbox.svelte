<script lang="ts">
	export let label = '';
	export let checked = false;
	export let disabled = false;
	export let highlight: boolean = false;
</script>

<button
	class={'flex w-full text-left items-center border-2 sm:border-0 py-1 px-2 rounded-lg ' +
		(highlight ? 'bg-green-500' : '')}
	{disabled}
	on:click
>
	<input
		type="checkbox"
		{checked}
		{disabled}
		class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
	/>
	<label
		for={label}
		class={'ml-2 w-full block text-base sm:text-sm font-medium ' +
			(highlight ? 'text-white' : 'text-gray-700')}
	>
		{label}
	</label>
</button>
