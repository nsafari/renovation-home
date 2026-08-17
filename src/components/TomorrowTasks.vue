<script setup lang="ts">
import { computed } from 'vue'
import * as storage from '@/services/storage'

const tomorrowTasks = computed(() => storage.getTasksDueTomorrow())

const statusIcons: Record<string, string> = {
  pending: '⏳',
  'in-progress': '🔄',
  completed: '✅',
  skipped: '⏭️',
}

const priorityColors: Record<string, string> = {
  low: 'bg-slate-100 text-slate-600',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-rose-100 text-rose-600',
}
</script>

<template>
  <div class="animate-fade-in-up rounded-xl border border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-5 shadow-sm">
    <div class="mb-4 flex items-center gap-2">
      <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/15 text-lg">🔔</span>
      <h3 class="font-heading text-lg font-semibold text-amber-800">Tomorrow's Tasks</h3>
    </div>

    <div v-if="tomorrowTasks.length === 0" class="py-4 text-center text-sm text-slate-400">
      <p>No tasks scheduled for tomorrow. 🎉</p>
    </div>

    <ul v-else class="stagger-children space-y-2">
      <li
        v-for="{ project, task } in tomorrowTasks"
        :key="task.id"
        class="flex items-center gap-3 rounded-lg bg-white/80 p-3 shadow-sm transition-all duration-200 hover:bg-white hover:shadow-md"
      >
        <span class="text-lg">{{ statusIcons[task.status] }}</span>
        <div class="min-w-0 flex-1">
          <p
            :class="[
              'truncate text-sm font-medium',
              task.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-800',
            ]"
          >
            {{ task.title }}
          </p>
          <p class="truncate text-xs text-slate-400">{{ project.name }}</p>
        </div>
        <span
          :class="[
            'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
            priorityColors[task.priority],
          ]"
        >
          {{ task.priority }}
        </span>
      </li>
    </ul>
  </div>
</template>