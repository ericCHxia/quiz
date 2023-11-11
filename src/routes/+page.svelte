<script lang="ts">
	import { page } from '$app/stores';
	import Select from '$lib/Select.svelte';
	interface Quiz {
		short: string;
		name: string;
	}
	const quiz: Quiz[] = $page.data.quiz;
	const items = quiz.map((q) => {
		return { value: q.short, label: q.name };
	});
	let value: string = quiz[0].short;
</script>

<div class="flex mx-auto">
	<div class="md:border-2 md:border-gray-200 p-4 rounded-lg max-w-screen-md mx-auto">
		<div class="flex flex-col space-y-2">
			<div class="flex-grow">
				<p class="text-lg font-bold sm:text-base">Quiz</p>
				<Select {items} bind:value />
			</div>
			<div class="flex-grow sm:self-end">
				<a
					href="/{encodeURIComponent(value)}"
					class="btn block w-full sm:w-auto py-1 text-white bg-indigo-600 hover:bg-indigo-700"
				>
					Start
				</a>
			</div>
		</div>
	</div>
</div>
