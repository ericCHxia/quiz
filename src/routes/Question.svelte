<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { n, correctList } from '../store';
	import Model from '$lib/Model.svelte';
	import AnswerResult from './AnswerResult.svelte';

	const dispatch = createEventDispatcher();
	function submit() {
		dispatch('submit');
	}

	export let correct = false;
	export let submitted = false;
	let open=false;

	function next() {
		$n += 1;
	}

	function previous() {
		$n -= 1;
	}
</script>
<Model bind:open={open}>
	<AnswerResult />
</Model>
<div class="grid grid-cols-1 content-between h-full">
	<div>
		<div class="font-bold text-lg sm:text-base">
			Question {$n + 1}
		</div>

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
	</div>
	<div class="mt-4 grid-cols-3 grid gap-1 md:grid-cols-none md:flex md:justify-end">
		<button
			class="btn py-2 text-white bg-gray-400 hover:bg-gray-500 md:hidden"
			on:click={previous}
			disabled={$n == 0}
		>
			Previous
		</button>

		<button
			class="btn py-2 text-white bg-gray-400 hover:bg-gray-500 md:hidden"
			on:click={() => open = true}
		>
			Show
		</button>

		<button
			class="btn py-2 text-white bg-gray-400 hover:bg-gray-500 md:hidden"
			on:click={next}
			disabled={$n == $correctList.length - 1}
		>
			Next
		</button>
		{#if submitted}
			<button
				class="hidden md:block btn py-2 text-white bg-gray-400 hover:bg-gray-500"
				on:click={next}
				disabled={$n == $correctList.length - 1}
			>
				Next
			</button>
		{:else}
			<button
				class="btn py-2 text-white bg-indigo-600 hover:bg-indigo-700 col-span-3"
				on:click={submit}
			>
				Submit
			</button>
		{/if}
	</div>
</div>
