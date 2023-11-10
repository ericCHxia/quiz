<script lang="ts">
	import CheckboxGroup from '$lib/CheckboxGroup.svelte';
	import Question from './Question.svelte';
	import type { ChoiceData } from '$lib/item';
	import { mulberry32 } from '$lib/utils';
	import { seed, correctList, n, status } from '../../store';
	export let data: ChoiceData;

	const items = data.answers.map((answer, index) => ({
		label: answer.answer_text,
		value: index + 1
	}));
	const random = mulberry32($seed);
	items.sort(() => random() - 0.5);
	let value: number[] = [];
	let submitted = false;
	let highlight: number[] = [];
	let correct = false;
	function submit() {
		submitted = true;
		highlight = data.answers
			.filter((answer) => answer.correct)
			.map((answer) => data.answers.indexOf(answer) + 1);
		correct = highlight.length === value.length && highlight.every((v) => value.includes(v));
		$correctList[$n] = correct ? 1 : 0;
		$status[$n] = value;
	}
	if ($correctList[$n] != -1) {
		value = $status[$n] as number[];
		submit();
	}
</script>

<Question on:submit={submit} bind:submitted bind:correct>
	<div slot="description">
		{@html data.text}
	</div>
	<CheckboxGroup {items} bind:value bind:disabled={submitted} {highlight} />
</Question>
