<script lang="ts">
	import Select from '$lib/Select.svelte';
	import Question from './Question.svelte';
	import type { MatchingData } from '$lib/item';
	export let data: MatchingData;

	let answers = Array(data.answers.length).fill(0);
	let items = ['[Select]', ...data.matching_list].map((answer, index) => ({
		label: answer,
		value: index
	}));
	items = [items[0], ...items.slice(1).sort(() => Math.random() - 0.5)];
	let submitted = false;
	let correct: boolean[] = [];
	export let n = 0;
	function submit() {
		submitted = true;
		correct = answers.map(
			(answer, index) => data.matching_list[answer - 1] === data.answers[index].matching
		);
	}
</script>

<Question {n} on:submit={submit} correct={correct.every((c) => c)} {submitted}>
	<div slot="description">
		{@html data.text}
	</div>
	<div class="mt-4 grid sm:grid-cols-4 grid-cols-1 text-sm items-center sm:gap-x-2 gap-1">
		{#each data.answers as answer, index}
			<div>
				{answer.text}
			</div>
			<div class="sm:col-span-3">
				<Select {items} bind:value={answers[index]} />
				{#if submitted}
					{#if !correct[index]}
						<div>
							<span class="text-red-500">Incorrect</span> - {data.answers[index].matching}
						</div>
					{/if}
				{/if}
			</div>
		{/each}
	</div>
</Question>
