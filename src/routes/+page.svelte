<script lang="ts">
	import MultipleChoice from './MultipleChoice.svelte';
	import MultipleAnswer from './MultipleAnswer.svelte';
	import Matching from './Matching.svelte';
	import MultipleDropdowns from './MultipleDropdowns.svelte';
	import { page } from '$app/stores';
	import type { QuestionData } from '$lib/item';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { n, correctList } from '../store'
	$n = parseInt($page.url.searchParams.get('n') ?? '0')

	let q: QuestionData[] = [];
	onMount(async () => {
		q = await (await fetch('/quiz.json')).json();
		if ($n < 0 || $n >= q.length) {
			window.location.href = '/';
		}
		correctList.set(Array(q.length).fill(-1));
	});
	function next() {
		const url = new URL(window.location.href);
		url.searchParams.set('n', `${$n + 1}`);
		goto(url.href);
		$n++;
	}
	function previous() {
		const url = new URL(window.location.href);
		url.searchParams.set('n', `${$n - 1}`);
		goto(url.href);
		$n--;
	}
</script>

{#each q as data, index}
	{#if index === $n}
		<div class="lg:border-2 lg:border-gray-200 p-4 rounded-lg">
			{#if data}
				{#if data.type === 'multiple_choice_question' || data.type === 'true_false_question'}
					<MultipleChoice on:next={next} on:previous={previous} {data}/>
				{:else if data.type === 'multiple_answers_question'}
					<MultipleAnswer on:next={next} on:previous={previous} {data}/>
				{:else if data.type === 'matching_question'}
					<Matching on:next={next} on:previous={previous} {data}/>
				{:else if data.type === 'multiple_dropdowns_question'}
					<MultipleDropdowns on:next={next} on:previous={previous} {data}/>
				{/if}
			{/if}
		</div>
	{/if}
{/each}
