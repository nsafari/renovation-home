<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'
import type { Project } from '@/types'

const route = useRoute()
const router = useRouter()
const store = useProjectsStore()

const isEdit = computed(() => !!route.params.id)
const projectId = computed(() => route.params.id as string)

const form = ref({
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  status: 'planning' as Project['status'],
})

const errors = ref<Record<string, string>>({})

onMounted(() => {
  if (isEdit.value) {
    const project = store.getProjectById(projectId.value)
    if (project) {
      form.value = {
        name: project.name,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate,
        status: project.status,
      }
    } else {
      router.push('/projects')
    }
  }
})

function validate(): boolean {
  errors.value = {}
  if (!form.value.name.trim()) errors.value.name = 'Project name is required'
  if (!form.value.startDate) errors.value.startDate = 'Start date is required'
  if (!form.value.endDate) errors.value.endDate = 'End date is required'
  if (form.value.startDate && form.value.endDate && form.value.startDate > form.value.endDate) {
    errors.value.endDate = 'End date must be after start date'
  }
  return Object.keys(errors.value).length === 0
}

function handleSubmit() {
  if (!validate()) return

  if (isEdit.value) {
    store.updateProject(projectId.value, form.value)
    router.push(`/projects/${projectId.value}`)
  } else {
    const project = store.createProject(form.value)
    router.push(`/projects/${project.id}`)
  }
}

const statusOptions: Array<{ value: Project['status']; label: string }> = [
  { value: 'planning', label: '📋 Planning' },
  { value: 'in-progress', label: '🚧 In Progress' },
  { value: 'completed', label: '✅ Completed' },
  { value: 'on-hold', label: '⏸️ On Hold' },
]
</script>

<template>
  <div class="mx-auto max-w-2xl space-y-6">
    <!-- Header -->
    <div>
      <router-link to="/projects" class="mb-2 inline-flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700">
        ← Back to Projects
      </router-link>
      <h1 class="text-2xl font-bold text-stone-800">
        {{ isEdit ? '✏️ Edit Project' : '➕ New Project' }}
      </h1>
    </div>

    <!-- Form -->
    <form class="space-y-5 rounded-xl border border-amber-200 bg-white p-6 shadow-sm" @submit.prevent="handleSubmit">
      <!-- Name -->
      <div>
        <label class="mb-1 block text-sm font-medium text-stone-700">Project Name *</label>
        <input
          v-model="form.name"
          type="text"
          :class="[
            'w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors',
            errors.name ? 'border-red-500 bg-red-50' : 'border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500',
          ]"
          placeholder="e.g., Kitchen Renovation"
        />
        <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
      </div>

      <!-- Description -->
      <div>
        <label class="mb-1 block text-sm font-medium text-stone-700">Description</label>
        <textarea
          v-model="form.description"
          rows="3"
          class="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          placeholder="Describe your renovation project..."
        />
      </div>

      <!-- Dates -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="mb-1 block text-sm font-medium text-stone-700">Start Date *</label>
          <input
            v-model="form.startDate"
            type="date"
            :class="[
              'w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors',
              errors.startDate ? 'border-red-500 bg-red-50' : 'border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500',
            ]"
          />
          <p v-if="errors.startDate" class="mt-1 text-xs text-red-500">{{ errors.startDate }}</p>
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-stone-700">End Date *</label>
          <input
            v-model="form.endDate"
            type="date"
            :class="[
              'w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors',
              errors.endDate ? 'border-red-500 bg-red-50' : 'border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500',
            ]"
          />
          <p v-if="errors.endDate" class="mt-1 text-xs text-red-500">{{ errors.endDate }}</p>
        </div>
      </div>

      <!-- Status -->
      <div>
        <label class="mb-1 block text-sm font-medium text-stone-700">Status</label>
        <select
          v-model="form.status"
          class="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
        >
          <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-3 pt-2">
        <router-link
          to="/projects"
          class="rounded-lg border border-stone-300 px-4 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-50"
        >
          Cancel
        </router-link>
        <button
          type="submit"
          class="rounded-lg bg-amber-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-amber-700"
        >
          {{ isEdit ? 'Save Changes' : 'Create Project' }}
        </button>
      </div>
    </form>
  </div>
</template>
