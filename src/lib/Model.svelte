<script lang="ts">
	export let open = false;

	const closeModel = () => {
		open = false;
	};
</script>

<div
	class={`fixed md:hidden z-0 inset-0 overflow-y-auto ${open ? '' : 'hidden'}`}
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
>
	<!-- bg bur layer -->
	<div class="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" aria-hidden="true" />
	<div class="flex items-center justify-center min-h-screen text-center sm:block sm:p-0">
		<div
			class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
		>
			<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
				<slot />
			</div>
			<div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
				<button
					type="button"
					class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
					on:click={closeModel}
				>
					Close
				</button>
			</div>
		</div>
	</div>
</div>
