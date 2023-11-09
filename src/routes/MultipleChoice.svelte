<script lang="ts">
	import RadioGroup from '$lib/RadioGroup.svelte';
	import Question from './Question.svelte';
	import type { ChoiceData } from '$lib/item';
	import { seed } from '../store';
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
		correct = data.answers[value - 1].correct;
		highlight = [data.answers.findIndex((answer) => answer.correct) + 1];
	}
</script>

<Question on:next on:previous on:submit={submit} bind:submitted bind:correct>
	<div slot="description">
		{@html data.text}
	</div>
	<RadioGroup {items} bind:value bind:disabled={submitted} {highlight} />
</Question>
