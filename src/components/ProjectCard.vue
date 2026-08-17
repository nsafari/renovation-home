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
  planning: 'bg-stone-100 text-stone-600',
  'in-progress': 'bg-amber-100 text-amber-700',
  completed: 'bg-green-100 text-green-700',
  'on-hold': 'bg-red-100 text-red-600',
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
    class="block rounded-xl border border-amber-200 bg-white p-5 shadow-sm transition-all hover:border-amber-300 hover:shadow-md"
  >
    <div class="mb-3 flex items-start justify-between">
      <div class="flex-1 min-w-0">
        <h3 class="truncate text-lg font-bold text-stone-800">{{ project.name }}</h3>
        <p class="mt-1 line-clamp-2 text-sm text-stone-500">{{ project.description }}</p>
      </div>
      <span
        :class="['ml-2 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium', statusColors[project.status]]"
      >
        {{ statusLabels[project.status] }}
      </span>
    </div>

    <div class="mb-3 flex items-center gap-4 text-xs text-stone-400">
      <span>📅 {{ project.startDate }}</span>
      <span>→</span>
      <span>{{ project.endDate }}</span>
    </div>

    <ProgressBar :percentage="progress.percentage" show-label />

    <div class="mt-3 flex items-center justify-between text-xs text-stone-400">
      <span>🔨 {{ progress.total }} tasks</span>
      <span>✅ {{ progress.completed }} completed</span>
    </div>
  </router-link>
</template>
