<script setup lang="ts">
import type { Project } from '@/types'
import { useProjectsStore } from '@/stores/projects'
import ProgressBar from './ProgressBar.vue'

const props = defineProps<{
  project: Project
}>()

const store = useProjectsStore()
const progress = store.getProgress(props.project.id)

const statusColors: Record<string, string> = {
  planning: 'bg-slate-100 text-slate-600',
  'in-progress': 'bg-amber-100 text-amber-700',
  completed: 'bg-emerald-100 text-emerald-700',
  'on-hold': 'bg-rose-100 text-rose-600',
}

const statusLabels: Record<string, string> = {
  planning: 'Planning',
  'in-progress': 'In Progress',
  completed: 'Completed',
  'on-hold': 'On Hold',
}
</script>

<template>
  <router-link
    :to="`/projects/${project.id}`"
    class="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md"
  >
    <div class="mb-3 flex items-start justify-between gap-3">
      <div class="min-w-0 flex-1">
        <h3 class="truncate font-heading text-lg font-semibold text-slate-900">{{ project.name }}</h3>
        <p class="mt-1 line-clamp-2 text-sm text-slate-500">{{ project.description }}</p>
      </div>
      <span
        :class="['ml-2 shrink-0 rounded-full px-2.5 py-1 text-xs font-medium', statusColors[project.status]]"
      >
        {{ statusLabels[project.status] }}
      </span>
    </div>

    <div class="mb-3 flex items-center gap-2 text-xs text-slate-400">
      <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <span>{{ project.startDate }}</span>
      <span class="text-slate-300">→</span>
      <span>{{ project.endDate }}</span>
    </div>

    <ProgressBar :percentage="progress.percentage" show-label />

    <div class="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
      <span class="flex items-center gap-1.5">
        <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        {{ progress.total }} tasks
      </span>
      <span class="flex items-center gap-1.5 font-medium text-emerald-600">
        <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        {{ progress.completed }} done
      </span>
    </div>
  </router-link>
</template>