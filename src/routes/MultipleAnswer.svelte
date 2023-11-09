<script lang="ts">
	import CheckboxGroup from '$lib/CheckboxGroup.svelte';
	import Question from './Question.svelte';
	import type { ChoiceData } from '$lib/item';
	export let data: ChoiceData;

	const items = data.answers.map((answer, index) => ({
		label: answer.answer_text,
		value: index + 1
	}));
	items.sort(() => Math.random() - 0.5);
	let value: number[] = [];
	let submitted = false;
	let highlight: number[] = [];
	let correct = false;
	export let n = 0;
	function submit() {
		submitted = true;
		highlight = data.answers
			.filter((answer) => answer.correct)
			.map((answer) => data.answers.indexOf(answer) + 1);
		correct = highlight.length === value.length && highlight.every((v) => value.includes(v));
	}
</script>

<Question {n} on:submit={submit} bind:submitted bind:correct>
	<div slot="description">
		{@html data.text}
	</div>
	<CheckboxGroup {items} bind:value bind:disabled={submitted} {highlight} />
</Question>
