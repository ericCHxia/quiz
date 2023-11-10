<script lang="ts">
	import { page } from "$app/stores";
	import Select from "$lib/Select.svelte";
	interface Quiz {
		short: string;
		name: string;
	}
	const quiz:Quiz[] = $page.data.quiz;
	const items = quiz.map((q) => {
		return { value: q.short, label: q.name };
	});
	let value: string=quiz[0].short;
</script>

<div class="flex mx-auto">
	<div class="md:border-2 md:border-gray-200 p-4 rounded-lg max-w-screen-md mx-auto">
		<div class="flex flex-col space-y-2">
			<div class="flex-grow">
				<p class="text-lg font-bold sm:text-base">Quiz</p>
				<Select items={items} bind:value={value} />
			</div>
			<div class="flex-grow sm:self-end">
				<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto">
					<a href="/{encodeURIComponent(value)}">Start</a>
				</button>
			</div>
		</div>
	</div>
</div>


