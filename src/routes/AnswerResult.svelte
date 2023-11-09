<script lang="ts">
	import { correctList,n } from '../store';
	function to_color(correct: number) {
		if (correct == -1) return 'bg-gray-200';
		if (correct == 1) return 'bg-green-400';
		return 'bg-red-400';
	}
</script>

<div class="grid grid-cols-10 md:grid-cols-5 lg:grid-cols-6 gap-1 border-2 rounded-md p-2">
	{#each $correctList as correct, index}
		<button class={'aspect-square rounded-sm px-1 ' + to_color(correct)} disabled={index==$n} on:click={() => $n=index}>
			{index+1}
        </button>
	{/each}
</div>
