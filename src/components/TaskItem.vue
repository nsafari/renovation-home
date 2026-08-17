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

const statusColors: Record<string, string> = {
  pending: 'bg-slate-100 text-slate-600',
  'in-progress': 'bg-amber-100 text-amber-700',
  completed: 'bg-emerald-100 text-emerald-700',
  skipped: 'bg-rose-100 text-rose-600',
}

const priorityDot: Record<string, string> = {
  low: 'bg-slate-400',
  medium: 'bg-amber-500',
  high: 'bg-rose-500',
}

function handleToggle() {
  emit('toggle-status', props.task)
}
</script>

<template>
  <div
    :class="[
      'group flex items-center gap-3 rounded-lg border p-3 transition-all duration-200',
      task.status === 'completed'
        ? 'border-emerald-200 bg-emerald-50/50'
        : 'border-slate-200 bg-white hover:border-amber-300 hover:shadow-sm',
    ]"
  >
    <!-- Status toggle -->
    <button
      :class="[
        'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200',
        task.status === 'completed'
          ? 'border-emerald-500 bg-emerald-500 text-white'
          : 'border-slate-300 hover:border-amber-500 hover:bg-amber-50',
      ]"
      :aria-label="task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'"
      @click="handleToggle"
    >
      <svg
        v-if="task.status === 'completed'"
        class="h-3 w-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
      </svg>
    </button>

    <!-- Priority dot -->
    <span
      class="h-2 w-2 shrink-0 rounded-full"
      :class="priorityDot[task.priority]"
      :title="`${task.priority} priority`"
    />

    <!-- Task info -->
    <div class="min-w-0 flex-1">
      <div class="flex items-center gap-2">
        <h4
          :class="[
            'text-sm font-medium',
            task.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-800',
          ]"
        >
          {{ task.title }}
        </h4>
        <span :class="['rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide', statusColors[task.status]]">
          {{ task.status }}
        </span>
      </div>
      <p v-if="task.description" class="mt-0.5 truncate text-xs text-slate-400">
        {{ task.description }}
      </p>
      <div class="mt-1 flex items-center gap-3 text-xs text-slate-400">
        <span class="flex items-center gap-1">
          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {{ task.dueDate || 'No due date' }}
        </span>
        <span v-if="projectName" class="font-medium text-amber-600">{{ projectName }}</span>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex shrink-0 gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
      <button
        class="rounded p-1.5 text-slate-400 transition-colors hover:bg-amber-100 hover:text-amber-700"
        title="Edit"
        @click="$emit('edit', task)"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </button>
      <button
        class="rounded p-1.5 text-slate-400 transition-colors hover:bg-rose-100 hover:text-rose-600"
        title="Delete"
        @click="$emit('delete', task)"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  </div>
</template>