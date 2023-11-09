
<script>
    import "../app.css";
	import Header from "./Header.svelte";
	let isDark = false;
	let opened = false;

	function toggleTheme() {
		isDark = !isDark;
	}
	function toggleOpened() {
		opened = !opened;
	}
</script>

<div class="relative bg-white">
	<!-- <Header /> -->
	<main class="flex flex-col items-center justify-center min-h-screen py-2">
		<slot></slot>
	</main>
</div>