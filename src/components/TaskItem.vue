<script setup lang="ts">
import type { Task } from '@/types'

const props = defineProps<{
  task: Task
  projectName?: string
}>()

const emit = defineEmits<{
  (e: 'toggle-status', task: Task): void
  (e: 'edit', task: Task): void
  (e: 'delete', task: Task): void
}>()

const statusIcons: Record<string, string> = {
  pending: '⏳',
  'in-progress': '🔄',
  completed: '✅',
  skipped: '⏭️',
}

const priorityColors: Record<string, string> = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-red-100 text-red-600',
}

const priorityLabels: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

function handleToggle() {
  emit('toggle-status', props.task)
}
</script>

<template>
  <div
    :class="[
      'group flex items-center gap-3 rounded-lg border p-3 transition-all',
      task.status === 'completed'
        ? 'border-green-200 bg-green-50/50'
        : 'border-stone-200 bg-white hover:border-amber-300 hover:shadow-sm',
    ]"
  >
    <!-- Status toggle -->
    <button
      :class="[
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all',
        task.status === 'completed'
          ? 'border-green-500 bg-green-500 text-white'
          : 'border-stone-300 hover:border-amber-500 hover:bg-amber-50',
      ]"
      @click="handleToggle"
    >
      <span v-if="task.status === 'completed'" class="text-sm">✓</span>
    </button>

    <!-- Task info -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2">
        <h4
          :class="[
            'text-sm font-medium',
            task.status === 'completed' ? 'text-stone-400 line-through' : 'text-stone-800',
          ]"
        >
          {{ task.title }}
        </h4>
        <span :class="['rounded-full px-2 py-0.5 text-[10px] font-bold uppercase', priorityColors[task.priority]]">
          {{ priorityLabels[task.priority] }}
        </span>
      </div>
      <p v-if="task.description" class="mt-0.5 truncate text-xs text-stone-400">
        {{ task.description }}
      </p>
      <div class="mt-1 flex items-center gap-3 text-xs text-stone-400">
        <span>{{ statusIcons[task.status] }} {{ task.status }}</span>
        <span>📅 Scheduled: {{ task.scheduledDate || 'Not set' }}</span>
        <span>⏰ Due: {{ task.dueDate || 'Not set' }}</span>
        <span v-if="projectName" class="font-medium text-amber-600">🏠 {{ projectName }}</span>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
      <button
        class="rounded p-1.5 text-stone-400 hover:bg-amber-100 hover:text-amber-700"
        title="Edit"
        @click="$emit('edit', task)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
      <button
        class="rounded p-1.5 text-stone-400 hover:bg-red-100 hover:text-red-600"
        title="Delete"
        @click="$emit('delete', task)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  </div>
</template>
