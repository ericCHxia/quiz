<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { n } from '../store'

	const dispatch = createEventDispatcher();
	function submit() {
		dispatch('submit');
	}

	export let correct = false;
	export let submitted = false;

	function next() {
		dispatch('next');
	}

	function previous() {
		dispatch('previous');
	}
</script>

<div class="font-medium text-base sm:text-sm">
	<slot name="description" />
</div>

<slot />

{#if submitted}
	{#if correct}
		<slot name="correct">
			<div class="mt-4 text-green-600 text-sm">Your answer is correct!</div>
		</slot>
	{:else}
		<slot name="incorrect">
			<div class="mt-4 text-sm text-red-600">Your answer is incorrect!</div>
		</slot>
	{/if}
{/if}

<div class="mt-4 flex justify-end">
	{#if $n > 0}
		<button
			class="btn text-white bg-gray-400 hover:bg-gray-500 mr-2"
			on:click={previous}
		>
			Previous
		</button>
	{/if}
	{#if submitted}
		<button
			class="btn text-white bg-gray-400 hover:bg-gray-500"
			on:click={next}
		>
			Next
		</button>
	{:else}
		<button class="btn text-white bg-indigo-600 hover:bg-indigo-700" on:click={submit}>
			Submit
		</button>
	{/if}
</div>
