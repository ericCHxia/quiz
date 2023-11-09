<script lang="ts">
	import MultipleChoice from './MultipleChoice.svelte';
	import MultipleAnswer from './MultipleAnswer.svelte';
	import Matching from './Matching.svelte';
	import MultipleDropdowns from './MultipleDropdowns.svelte';
	import { page } from '$app/stores';
	import type { QuestionData } from '$lib/item';
	import { onMount } from 'svelte';

	const n = parseInt($page.url.searchParams.get('n') ?? '0');
	let q: QuestionData[] = [];
	let data: QuestionData | null = null;
	onMount(async () => {
		q = await (await fetch('/quiz.json')).json();
		if (n < 0 || n >= q.length) {
			window.location.href = '/';
		}
		data = q[n];
	});
</script>

<div class="lg:border-2 lg:border-gray-200 p-4 rounded-lg">
	{#if data}
		{#if data.type === 'multiple_choice_question' || data.type === 'true_false_question'}
			<MultipleChoice {data} {n} />
		{:else if data.type === 'multiple_answers_question'}
			<MultipleAnswer {data} {n} />
		{:else if data.type === 'matching_question'}
			<Matching {data} {n} />
		{:else if data.type === 'multiple_dropdowns_question'}
			<MultipleDropdowns {data} {n} />
		{/if}
	{/if}
</div>
