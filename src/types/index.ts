export interface Project {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold'
  tasks: Task[]
  createdAt: string
}

export interface Task {
  id: string
  projectId: string
  title: string
  description: string
  dueDate: string
  scheduledDate: string
  status: 'pending' | 'in-progress' | 'completed' | 'skipped'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
}
