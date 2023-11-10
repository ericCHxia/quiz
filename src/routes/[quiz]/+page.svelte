<script lang="ts">
	import MultipleChoice from './MultipleChoice.svelte';
	import MultipleAnswer from './MultipleAnswer.svelte';
	import Matching from './Matching.svelte';
	import MultipleDropdowns from './MultipleDropdowns.svelte';
	import { page } from '$app/stores';
	import type { QuestionData } from '$lib/item';
	import { n, correctList } from '../../store';
	import AnswerResult from './AnswerResult.svelte';

	const q: QuestionData[] = $page.data.item;
	correctList.set(Array(q.length).fill(-1));
	if ($n < 0 || $n >= q.length) {
		$n = 0;
	}
</script>

<div class="flex mx-auto">
	{#each q as data, index}
		{#if index === $n}
			<div class="md:border-2 md:border-gray-200 p-4 rounded-lg max-w-screen-md mx-auto">
				{#if data}
					{#if data.type === 'multiple_choice_question' || data.type === 'true_false_question'}
						<MultipleChoice {data} />
					{:else if data.type === 'multiple_answers_question'}
						<MultipleAnswer {data} />
					{:else if data.type === 'matching_question'}
						<Matching {data} />
					{:else if data.type === 'multiple_dropdowns_question'}
						<MultipleDropdowns {data} />
					{/if}
				{/if}
			</div>
		{/if}
	{/each}
	<div class="hidden md:block md:ml-2 md:min-w-fit">
		<AnswerResult />
	</div>
</div>
