<script lang="ts">
	import RadioGroup from '$lib/RadioGroup.svelte';
	import Question from './Question.svelte';
	import type { ChoiceData } from '$lib/item';
	import { seed, correctList, n, status } from '../../store';
	import { mulberry32 } from '$lib/utils';

	export let data: ChoiceData;
	
	let items = data.answers.map((answer, index) => ({
		label: answer.answer_text,
		value: index + 1
	}));
	const random = mulberry32($seed);
	items.sort(() => random() - 0.5);
	let value = 0;
	let submitted = false;
	let highlight: number[] = [];
	let correct = false;
	function submit() {
		submitted = true;
		correct = value > 0 ? data.answers[value - 1].correct: false;
		highlight = [data.answers.findIndex((answer) => answer.correct) + 1];
		$correctList[$n] = correct ? 1 : 0;
		$status[$n] = value;
	}
	if ($correctList[$n]!=-1) {
		value = $status[$n] as number;
		submit();
	}
</script>

<Question on:submit={submit} bind:submitted bind:correct>
	<div slot="description">
		{@html data.text}
	</div>
	<RadioGroup {items} bind:value bind:disabled={submitted} {highlight} />
</Question>
