<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>pakala &ndash; {$page.status}</title>
</svelte:head>

<div class="py-8 sm:py-16 md:py-24">
	<h1 class="text-6xl text-orange-500 dark:text-orange-400">
		pakala nanpa {$page.status}!
	</h1>

	<p class="mt-4">
		{#if $page.status === 404}
			lipu ni li lon ala.
		{:else}
			ijo mi li pakala!
		{/if}
	</p>

	{#if $page.error?.closest?.length}
		<h2 class="mt-6 text-2xl">ken la sina wile e lipu ni:</h2>

		<ul class="mt-2 flex flex-wrap gap-1">
			{#each $page.error?.closest as word}
				<li>
					<a href="/{word}" class="inline-block px-2 py-1 interactable">
						{word}
					</a>
				</li>
			{/each}
		</ul>
	{/if}

	<p class="mt-6">
		<a href="/" class="inline-block px-2 py-1 interactable">
			o tawa e lipu suli
		</a>
	</p>
</div>
