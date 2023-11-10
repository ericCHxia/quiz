<script lang="ts">
	import { correctList, n } from '../../store';
	function to_color(correct: number) {
		if (correct == -1) return 'bg-gray-100';
		if (correct == 1) return 'bg-green-400';
		return 'bg-red-400';
	}
</script>
<div class="border-2 rounded-md p-4">
    <p class="text-lg font-bold sm:text-base">Answer Sheet</p>
    <div class="grid grid-cols-10 md:grid-cols-6 gap-1">
        {#each $correctList as correct, index}
            <button class={'aspect-square rounded-sm px-1 ' + to_color(correct) + (index==$n?' outline outline-green-500':'')} disabled={index==$n} on:click={() => $n=index}>
                {index+1}
            </button>
        {/each}
    </div>
</div>

