<script lang="ts">
	export let label: string;
	export let checked: boolean;
	export let disabled: boolean;
	export let highlight: boolean = false;
</script>

<button
	class={'flex w-full text-left items-center border-2 sm:border-0 py-1 px-2 rounded-lg ' +
		(highlight ? 'bg-green-500' : '')}
	{disabled}
	on:click
>
	<input
		type="radio"
		class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
		{disabled}
		{checked}
	/>
	<label
		for={label}
		class={'ml-2 w-full block text-base sm:text-sm font-medium ' +
			(highlight ? 'text-white' : 'text-gray-700')}
	>
		{label}
	</label>
</button>
