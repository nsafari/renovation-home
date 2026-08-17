<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'
import type { Task } from '@/types'
import TaskItem from '@/components/TaskItem.vue'
import TaskForm from '@/components/TaskForm.vue'
import ProgressBar from '@/components/ProgressBar.vue'

const route = useRoute()
const router = useRouter()
const store = useProjectsStore()

const projectId = computed(() => route.params.id as string)
const project = computed(() => store.getProjectById(projectId.value))
const progress = computed(() => store.getProgress(projectId.value))

const showTaskForm = ref(false)
const editingTask = ref<Task | undefined>(undefined)

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

const sortedTasks = computed(() => {
  if (!project.value) return []
  return [...project.value.tasks].sort((a, b) => {
    const order: Record<string, number> = { 'in-progress': 0, pending: 1, skipped: 2, completed: 3 }
    return (order[a.status] ?? 4) - (order[b.status] ?? 4)
  })
})

function openNewTask() {
  editingTask.value = undefined
  showTaskForm.value = true
}

function openEditTask(task: Task) {
  editingTask.value = task
  showTaskForm.value = true
}

function handleSaveTask(data: Omit<Task, 'id' | 'createdAt'>) {
  if (editingTask.value) {
    store.updateTask(projectId.value, editingTask.value.id, data)
  } else {
    store.addTask(projectId.value, data)
  }
  showTaskForm.value = false
}

function handleToggleStatus(task: Task) {
  const nextStatus: Record<string, Task['status']> = {
    pending: 'completed',
    'in-progress': 'completed',
    completed: 'pending',
    skipped: 'pending',
  }
  store.updateTask(projectId.value, task.id, { status: nextStatus[task.status] })
}

function handleDeleteTask(task: Task) {
  if (confirm(`Delete task "${task.title}"?`)) {
    store.deleteTask(projectId.value, task.id)
  }
}

function handleDeleteProject() {
  if (confirm(`Delete project "${project.value?.name}" and all its tasks?`)) {
    store.deleteProject(projectId.value)
    router.push('/projects')
  }
}
</script>

<template>
  <div v-if="project" class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-bold text-stone-800">{{ project.name }}</h1>
          <span :class="['rounded-full px-2.5 py-0.5 text-xs font-medium', statusColors[project.status]]">
            {{ statusLabels[project.status] }}
          </span>
        </div>
        <p class="mt-1 text-sm text-stone-500">{{ project.description }}</p>
        <div class="mt-2 flex items-center gap-3 text-xs text-stone-400">
          <span>📅 {{ project.startDate }} → {{ project.endDate }}</span>
          <span>🕐 Created {{ new Date(project.createdAt).toLocaleDateString() }}</span>
        </div>
      </div>
      <div class="flex gap-2">
        <router-link
          :to="`/projects/${project.id}/edit`"
          class="inline-flex items-center gap-1 rounded-lg border border-stone-300 px-3 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50"
        >
          ✏️ Edit
        </router-link>
        <button
          class="inline-flex items-center gap-1 rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          @click="handleDeleteProject"
        >
          🗑️ Delete
        </button>
      </div>
    </div>

    <!-- Progress -->
    <div class="rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-sm font-bold text-stone-700">Project Progress</h3>
        <span class="text-sm font-bold text-amber-700">{{ progress.percentage }}%</span>
      </div>
      <ProgressBar :percentage="progress.percentage" height="h-3" />
      <div class="mt-2 flex items-center gap-4 text-xs text-stone-400">
        <span>✅ {{ progress.completed }} completed</span>
        <span>📋 {{ progress.total }} total</span>
        <span>⏳ {{ progress.total - progress.completed }} remaining</span>
      </div>
    </div>

    <!-- Tasks -->
    <div>
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-bold text-stone-800">🔨 Tasks ({{ project.tasks.length }})</h2>
        <button
          class="inline-flex items-center gap-1 rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white hover:bg-amber-700 transition-colors"
          @click="openNewTask"
        >
          ➕ Add Task
        </button>
      </div>

      <div v-if="sortedTasks.length === 0" class="rounded-xl border-2 border-dashed border-stone-300 py-8 text-center">
        <span class="text-4xl">📝</span>
        <h3 class="mt-3 text-base font-bold text-stone-600">No tasks yet</h3>
        <p class="mt-1 text-sm text-stone-400">Add tasks to track your renovation work.</p>
      </div>

      <ul v-else class="space-y-2">
        <TaskItem
          v-for="task in sortedTasks"
          :key="task.id"
          :task="task"
          @toggle-status="handleToggleStatus"
          @edit="openEditTask"
          @delete="handleDeleteTask"
        />
      </ul>
    </div>

    <!-- Task Form Modal -->
    <TaskForm
      :task="editingTask"
      :project-id="projectId"
      :visible="showTaskForm"
      @close="showTaskForm = false"
      @save="handleSaveTask"
    />
  </div>

  <!-- Not found -->
  <div v-else class="py-12 text-center">
    <span class="text-5xl">🔍</span>
    <h2 class="mt-4 text-xl font-bold text-stone-600">Project not found</h2>
    <p class="mt-1 text-sm text-stone-400">This project may have been deleted.</p>
    <router-link
      to="/projects"
      class="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
    >
      ← Back to Projects
    </router-link>
  </div>
</template>
