<script setup lang="ts">
defineEmits<{
  (e: 'toggle-sidebar'): void
  (e: 'toggle-mobile'): void
}>()
</script>

<template>
  <header class="flex h-16 items-center justify-between border-b border-amber-200 bg-white px-4 shadow-sm lg:px-6">
    <div class="flex items-center gap-3">
      <button
        class="rounded p-1 text-stone-600 hover:bg-amber-100 lg:hidden"
        @click="$emit('toggle-mobile')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <button
        class="hidden rounded p-1 text-stone-600 hover:bg-amber-100 lg:block"
        @click="$emit('toggle-sidebar')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div class="flex items-center gap-2">
        <span class="text-2xl">🏠</span>
        <h1 class="text-xl font-bold text-amber-800">ReBuild Manager</h1>
      </div>
    </div>
    <div class="text-sm text-stone-500 hidden md:block">
      Home Renovation Project Manager
    </div>
  </header>
</template>
