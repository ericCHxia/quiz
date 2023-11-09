<script lang="ts">
	import { onMount } from 'svelte';
	import { mulberry32 } from '$lib/utils';
	import Question from './Question.svelte';
	import type { DropDownData } from '$lib/item';
	import { seed, correctList, n, status } from '../store';
	export let data: DropDownData;
	export let answers = Array(data.answers.length).fill('');
	let question: HTMLDivElement;
	onMount(() => {
		const question_inputs = question.querySelectorAll('.question_input');
		for (let i = 0; i < question_inputs.length; i++) {
			question_inputs[i].addEventListener('change', (event) => {
				answers[i] = (event.target as HTMLSelectElement)?.value || '';
			});
			const options = question_inputs[i].querySelectorAll('option');
			const random = mulberry32($seed);
			for (let j = 1; j < options.length; j++) {
				const random_index = Math.floor(random() * j) + 1;
				[
					options[j].innerHTML,
					options[j].value,
					options[random_index].innerHTML,
					options[random_index].value
				] = [
					options[random_index].innerHTML,
					options[random_index].value,
					options[j].innerHTML,
					options[j].value
				];
			}
		}
	});
	let submitted = false;
	let correct: boolean[] = [];
	function submit() {
		submitted = true;
		correct = answers.map((answer, index) => data.answers[index].value === answer);
		const question_inputs = question.querySelectorAll('.question_input');
		for (let i = 0; i < question_inputs.length; i++) {
			question_inputs[i].setAttribute('disabled', 'true');
		}
		$correctList[$n] = correct.every((c) => c) ? 1 : 0;
		$status[$n] = answers;
	}
	if ($correctList[$n] != -1) {
		answers = $status[$n] as string[];
		submit();
	}
</script>

<Question on:submit={submit} correct={correct.every((c) => c)} {submitted}>
	<div slot="description" bind:this={question}>
		{@html data.text}
	</div>
	<div slot="incorrect" class="mt-4 text-sm">
		<p class="text-red-600">Your answer is incorrect!</p>
		<p>The correct answers are:</p>
		<p>
			{#each data.answers as answer, index}
				<span class={correct[index] ? 'text-green-600' : 'text-red-600'}>
					{answer.label}
				</span>
				{#if index < data.answers.length - 1}, {/if}
			{/each}
		</p>
	</div>
</Question>
