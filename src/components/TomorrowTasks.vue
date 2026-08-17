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
</script>

<template>
  <div class="rounded-xl border border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-5 shadow-sm">
    <div class="mb-4 flex items-center gap-2">
      <span class="text-2xl">🔔</span>
      <h3 class="text-lg font-bold text-amber-800">Tomorrow's Tasks</h3>
    </div>

    <div v-if="tomorrowTasks.length === 0" class="py-4 text-center text-sm text-stone-400">
      <p>No tasks scheduled for tomorrow. 🎉</p>
    </div>

    <ul v-else class="space-y-2">
      <li
        v-for="{ project, task } in tomorrowTasks"
        :key="task.id"
        class="flex items-center gap-3 rounded-lg bg-white/80 p-3 shadow-sm"
      >
        <span class="text-lg">{{ statusIcons[task.status] }}</span>
        <div class="flex-1 min-w-0">
          <p
            :class="[
              'text-sm font-medium',
              task.status === 'completed' ? 'text-stone-400 line-through' : 'text-stone-800',
            ]"
          >
            {{ task.title }}
          </p>
          <p class="text-xs text-stone-400">🏠 {{ project.name }}</p>
        </div>
        <span
          :class="[
            'rounded-full px-2 py-0.5 text-[10px] font-bold uppercase',
            task.priority === 'high' ? 'bg-red-100 text-red-600' : task.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700',
          ]"
        >
          {{ task.priority }}
        </span>
      </li>
    </ul>
  </div>
</template>
