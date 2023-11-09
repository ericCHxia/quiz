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
	{#each data.answers as answer, index}
		<div class="flex flex-row font-medium text-sm items-center">
			<div class="w-1/3">
				{answer.text}
			</div>
			<div class="w-2/3">
				<Select {items} bind:value={answers[index]} />
				{#if submitted}
					{#if !correct[index]}
						<div>
							<span class="text-red-500">Incorrect</span> - {data.answers[index].matching}
						</div>
					{/if}
				{/if}
			</div>
		</div>
	{/each}
</Question>
