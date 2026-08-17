import type { Project, Task } from '@/types'

const STORAGE_KEY = 'renovation-projects'

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9)
}

function getAll(): Project[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Project[]
  } catch {
    return []
  }
}

function saveAll(projects: Project[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

// Project CRUD
export function getProjects(): Project[] {
  return getAll()
}

export function getProjectById(id: string): Project | undefined {
  return getAll().find((p) => p.id === id)
}

export function createProject(data: Omit<Project, 'id' | 'tasks' | 'createdAt'>): Project {
  const projects = getAll()
  const project: Project = {
    ...data,
    id: generateId(),
    tasks: [],
    createdAt: new Date().toISOString(),
  }
  projects.push(project)
  saveAll(projects)
  return project
}

export function updateProject(id: string, data: Partial<Omit<Project, 'id' | 'tasks' | 'createdAt'>>): Project | undefined {
  const projects = getAll()
  const idx = projects.findIndex((p) => p.id === id)
  if (idx === -1) return undefined
  projects[idx] = { ...projects[idx], ...data }
  saveAll(projects)
  return projects[idx]
}

export function deleteProject(id: string): boolean {
  const projects = getAll()
  const filtered = projects.filter((p) => p.id !== id)
  if (filtered.length === projects.length) return false
  saveAll(filtered)
  return true
}

// Task CRUD
export function addTask(projectId: string, data: Omit<Task, 'id' | 'createdAt'>): Task | undefined {
  const projects = getAll()
  const project = projects.find((p) => p.id === projectId)
  if (!project) return undefined
  const task: Task = {
    ...data,
    id: generateId(),
    createdAt: new Date().toISOString(),
  }
  project.tasks.push(task)
  saveAll(projects)
  return task
}

export function updateTask(projectId: string, taskId: string, data: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | undefined {
  const projects = getAll()
  const project = projects.find((p) => p.id === projectId)
  if (!project) return undefined
  const taskIdx = project.tasks.findIndex((t) => t.id === taskId)
  if (taskIdx === -1) return undefined
  project.tasks[taskIdx] = { ...project.tasks[taskIdx], ...data }
  saveAll(projects)
  return project.tasks[taskIdx]
}

export function deleteTask(projectId: string, taskId: string): boolean {
  const projects = getAll()
  const project = projects.find((p) => p.id === projectId)
  if (!project) return false
  const before = project.tasks.length
  project.tasks = project.tasks.filter((t) => t.id !== taskId)
  if (project.tasks.length === before) return false
  saveAll(projects)
  return true
}

export function getTaskById(projectId: string, taskId: string): Task | undefined {
  const project = getProjectById(projectId)
  return project?.tasks.find((t) => t.id === taskId)
}

// Helpers
export function getTasksDueTomorrow(): Array<{ project: Project; task: Task }> {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowStr = tomorrow.toISOString().split('T')[0]

  const results: Array<{ project: Project; task: Task }> = []
  const projects = getAll()
  for (const project of projects) {
    for (const task of project.tasks) {
      if (task.scheduledDate === tomorrowStr || task.dueDate === tomorrowStr) {
        results.push({ project, task })
      }
    }
  }
  return results
}

export function getProjectProgress(projectId: string): { completed: number; total: number; percentage: number } {
  const project = getProjectById(projectId)
  if (!project) return { completed: 0, total: 0, percentage: 0 }
  const total = project.tasks.length
  const completed = project.tasks.filter((t) => t.status === 'completed').length
  return {
    completed,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  }
}

export function getAllTasksForDate(date: string): Array<{ project: Project; task: Task }> {
  const results: Array<{ project: Project; task: Task }> = []
  const projects = getAll()
  for (const project of projects) {
    for (const task of project.tasks) {
      if (task.scheduledDate === date || task.dueDate === date) {
        results.push({ project, task })
      }
    }
  }
  return results
}

export function getAllTasksInRange(startDate: string, endDate: string): Array<{ project: Project; task: Task }> {
  const results: Array<{ project: Project; task: Task }> = []
  const projects = getAll()
  for (const project of projects) {
    for (const task of project.tasks) {
      const taskDate = task.scheduledDate || task.dueDate
      if (taskDate >= startDate && taskDate <= endDate) {
        results.push({ project, task })
      }
    }
  }
  return results
}

export function isStorageEmpty(): boolean {
  return getAll().length === 0
}
