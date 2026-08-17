<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Task } from '@/types'

const props = defineProps<{
  task?: Task
  projectId: string
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', data: Omit<Task, 'id' | 'createdAt'>): void
}>()

const form = ref({
  title: '',
  description: '',
  dueDate: '',
  scheduledDate: '',
  status: 'pending' as Task['status'],
  priority: 'medium' as Task['priority'],
})

const errors = ref<Record<string, string>>({})

watch(
  () => props.visible,
  (val) => {
    if (val) {
      if (props.task) {
        form.value = {
          title: props.task.title,
          description: props.task.description,
          dueDate: props.task.dueDate,
          scheduledDate: props.task.scheduledDate,
          status: props.task.status,
          priority: props.task.priority,
        }
      } else {
        form.value = {
          title: '',
          description: '',
          dueDate: '',
          scheduledDate: '',
          status: 'pending',
          priority: 'medium',
        }
      }
      errors.value = {}
    }
  }
)

function validate(): boolean {
  errors.value = {}
  if (!form.value.title.trim()) errors.value.title = 'Title is required'
  if (!form.value.dueDate) errors.value.dueDate = 'Due date is required'
  return Object.keys(errors.value).length === 0
}

function handleSubmit() {
  if (!validate()) return
  emit('save', {
    ...form.value,
    projectId: props.projectId,
  })
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" @click.self="$emit('close')">
        <div class="w-full max-w-lg rounded-xl bg-white shadow-2xl">
          <!-- Header -->
          <div class="flex items-center justify-between border-b border-stone-200 px-6 py-4">
            <h3 class="text-lg font-bold text-stone-800">
              {{ task ? '✏️ Edit Task' : '➕ New Task' }}
            </h3>
            <button class="rounded p-1 text-stone-400 hover:bg-stone-100" @click="$emit('close')">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Form -->
          <form class="px-6 py-4 space-y-4" @submit.prevent="handleSubmit">
            <!-- Title -->
            <div>
              <label class="mb-1 block text-sm font-medium text-stone-700">Title *</label>
              <input
                v-model="form.title"
                type="text"
                :class="[
                  'w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors',
                  errors.title ? 'border-red-500 bg-red-50' : 'border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500',
                ]"
                placeholder="e.g., Install new faucet"
              />
              <p v-if="errors.title" class="mt-1 text-xs text-red-500">{{ errors.title }}</p>
            </div>

            <!-- Description -->
            <div>
              <label class="mb-1 block text-sm font-medium text-stone-700">Description</label>
              <textarea
                v-model="form.description"
                rows="2"
                class="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                placeholder="Optional description..."
              />
            </div>

            <!-- Dates row -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="mb-1 block text-sm font-medium text-stone-700">Scheduled Date *</label>
                <input
                  v-model="form.scheduledDate"
                  type="date"
                  class="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium text-stone-700">Due Date *</label>
                <input
                  v-model="form.dueDate"
                  type="date"
                  :class="[
                    'w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors',
                    errors.dueDate ? 'border-red-500 bg-red-50' : 'border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500',
                  ]"
                />
                <p v-if="errors.dueDate" class="mt-1 text-xs text-red-500">{{ errors.dueDate }}</p>
              </div>
            </div>

            <!-- Priority & Status row -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="mb-1 block text-sm font-medium text-stone-700">Priority</label>
                <select
                  v-model="form.priority"
                  class="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                >
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🔴 High</option>
                </select>
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium text-stone-700">Status</label>
                <select
                  v-model="form.status"
                  class="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                >
                  <option value="pending">⏳ Pending</option>
                  <option value="in-progress">🔄 In Progress</option>
                  <option value="completed">✅ Completed</option>
                  <option value="skipped">⏭️ Skipped</option>
                </select>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex justify-end gap-3 pt-2">
              <button
                type="button"
                class="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50"
                @click="$emit('close')"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 transition-colors"
              >
                {{ task ? 'Save Changes' : 'Create Task' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
