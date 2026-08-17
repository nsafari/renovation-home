<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

defineEmits<{
  (e: 'toggle-sidebar'): void
  (e: 'toggle-mobile'): void
}>()

const route = useRoute()

const pageTitle = computed(() => {
  if (route.path === '/projects/new') return 'New Project'
  if (/^\/projects\/[^/]+\/edit$/.test(route.path)) return 'Edit Project'
  if (route.params.id) return 'Project Details'
  const titles: Record<string, string> = {
    '/': 'Dashboard',
    '/projects': 'Projects',
    '/schedule': 'Schedule',
    '/reports': 'Reports',
  }
  return titles[route.path] || 'ReBuild Manager'
})
</script>

<template>
  <header class="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm md:px-8">
    <div class="flex items-center gap-3">
      <!-- Mobile hamburger -->
      <button
        class="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 lg:hidden"
        aria-label="Toggle navigation"
        @click="$emit('toggle-mobile')"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Desktop collapse -->
      <button
        class="hidden rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 lg:block"
        aria-label="Collapse sidebar"
        @click="$emit('toggle-sidebar')"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <h2 class="font-heading text-xl font-bold text-slate-900">{{ pageTitle }}</h2>
    </div>

    <div class="flex items-center gap-4">
      <button
        class="relative rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        aria-label="Notifications"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <span class="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-amber-500" />
      </button>
    </div>
  </header>
</template>