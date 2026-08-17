import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Project, Task } from '@/types'
import * as storage from '@/services/storage'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>(storage.getProjects())

  const activeProject = ref<Project | null>(null)

  function loadProjects() {
    projects.value = storage.getProjects()
  }

  function getProjectById(id: string): Project | undefined {
    return projects.value.find((p) => p.id === id)
  }

  function createProject(data: Omit<Project, 'id' | 'tasks' | 'createdAt'>): Project {
    const project = storage.createProject(data)
    loadProjects()
    return project
  }

  function updateProject(id: string, data: Partial<Omit<Project, 'id' | 'tasks' | 'createdAt'>>): Project | undefined {
    const result = storage.updateProject(id, data)
    loadProjects()
    return result
  }

  function deleteProject(id: string): boolean {
    const result = storage.deleteProject(id)
    loadProjects()
    return result
  }

  function addTask(projectId: string, data: Omit<Task, 'id' | 'createdAt'>): Task | undefined {
    const result = storage.addTask(projectId, data)
    loadProjects()
    return result
  }

  function updateTask(projectId: string, taskId: string, data: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | undefined {
    const result = storage.updateTask(projectId, taskId, data)
    loadProjects()
    return result
  }

  function deleteTask(projectId: string, taskId: string): boolean {
    const result = storage.deleteTask(projectId, taskId)
    loadProjects()
    return result
  }

  function getProgress(projectId: string) {
    return storage.getProjectProgress(projectId)
  }

  const totalProjects = computed(() => projects.value.length)

  const activeProjects = computed(() =>
    projects.value.filter((p) => p.status === 'in-progress').length
  )

  const completedProjects = computed(() =>
    projects.value.filter((p) => p.status === 'completed').length
  )

  const totalTasks = computed(() =>
    projects.value.reduce((sum, p) => sum + p.tasks.length, 0)
  )

  const completedTasks = computed(() =>
    projects.value.reduce(
      (sum, p) => sum + p.tasks.filter((t) => t.status === 'completed').length,
      0
    )
  )

  const overdueTasks = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    return projects.value.reduce((sum, p) => {
      return (
        sum +
        p.tasks.filter(
          (t) => t.status !== 'completed' && t.dueDate < today
        ).length
      )
    }, 0)
  })

  return {
    projects,
    activeProject,
    loadProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    addTask,
    updateTask,
    deleteTask,
    getProgress,
    totalProjects,
    activeProjects,
    completedProjects,
    totalTasks,
    completedTasks,
    overdueTasks,
  }
})
