<script lang="ts">
	import Select from '$lib/Select.svelte';
	import Question from './Question.svelte';
	import type { MatchingData } from '$lib/item';
	import { mulberry32 } from '$lib/utils';
	import { seed, correctList, n, status } from '../../store';

	export let data: MatchingData;
	let answers = Array(data.answers.length).fill(0);
	let items = ['[Select]', ...data.matching_list].map((answer, index) => ({
		label: answer,
		value: index
	}));
	const random = mulberry32($seed);
	items = [items[0], ...items.slice(1).sort(() => random() - 0.5)];
	let submitted = false;
	let correct: boolean[] = [];
	let disabled = false;

	function submit() {
		submitted = true;
		correct = answers.map(
			(answer, index) => data.matching_list[answer - 1] === data.answers[index].matching
		);
		$status[$n] = answers;
		$correctList[$n] = correct.every((c) => c) ? 1 : 0;
		disabled = true;
	}

	if ($correctList[$n]!=-1) {
		answers = $status[$n] as number[];
		submit();
	}
</script>

<Question on:submit={submit} correct={correct.every((c) => c)} {submitted}>
	<div slot="description">
		{@html data.text}
	</div>
	<div
		class="mt-4 grid sm:grid-cols-4 grid-cols-1 text-base sm:text-sm items-center sm:gap-x-2 gap-1"
	>
		{#each data.answers as answer, index}
			<div>
				{answer.text}
			</div>
			<div class="sm:col-span-3">
				<Select {disabled} {items} bind:value={answers[index]} />
			</div>
			{#if submitted}
				<div class="hidden sm:block" />
				{#if !correct[index]}
					<div class="sm:col-span-3">
						<p class="text-red-500">Incorrect</p>
						<p class="text-gray-500">Correct answer: {data.answers[index].matching}</p>
					</div>
				{:else}
					<div class="text-green-500 sm:col-span-3">Correct</div>
				{/if}
			{/if}
		{/each}
	</div>
	<div slot="correct" />
	<div slot="incorrect" />
</Question>
