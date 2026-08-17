<script setup lang="ts">
import { computed } from 'vue'
import { useProjectsStore } from '@/stores/projects'
import StatsCard from '@/components/StatsCard.vue'
import ProgressBar from '@/components/ProgressBar.vue'

const store = useProjectsStore()

const overallCompletionRate = computed(() => {
  const total = store.totalTasks
  const completed = store.completedTasks
  return total > 0 ? Math.round((completed / total) * 100) : 0
})

const highPriorityCount = computed(() => {
  return store.projects.reduce((sum, p) => {
    return sum + p.tasks.filter((t) => t.priority === 'high' && t.status !== 'completed').length
  }, 0)
})

const inProgressTasks = computed(() => {
  return store.projects.reduce((sum, p) => {
    return sum + p.tasks.filter((t) => t.status === 'in-progress').length
  }, 0)
})

const projectStats = computed(() => {
  return store.projects.map((p) => {
    const progress = store.getProgress(p.id)
    return {
      ...p,
      progress,
    }
  })
})

const statusDistribution = computed(() => {
  const counts: Record<string, number> = {
    pending: 0,
    'in-progress': 0,
    completed: 0,
    skipped: 0,
  }
  for (const p of store.projects) {
    for (const t of p.tasks) {
      counts[t.status] = (counts[t.status] || 0) + 1
    }
  }
  return counts
})

const statusMeta: Record<string, { label: string; bar: string; dot: string }> = {
  pending: { label: 'Pending', bar: 'bg-slate-300', dot: 'bg-slate-400' },
  'in-progress': { label: 'In Progress', bar: 'bg-amber-400', dot: 'bg-amber-500' },
  completed: { label: 'Completed', bar: 'bg-emerald-500', dot: 'bg-emerald-500' },
  skipped: { label: 'Skipped', bar: 'bg-rose-400', dot: 'bg-rose-500' },
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="animate-fade-in-up">
      <h1 class="font-heading text-2xl font-bold text-slate-900">Reports</h1>
      <p class="mt-1 text-sm text-slate-500">Statistics and progress overview</p>
    </div>

    <!-- Stats Grid -->
    <div class="stagger-children grid grid-cols-2 gap-4 md:grid-cols-4">
      <StatsCard icon="✅" label="Completion Rate" :value="`${overallCompletionRate}%`" subtitle="All tasks" color="text-emerald-700" />
      <StatsCard icon="🔴" label="High Priority" :value="highPriorityCount" subtitle="Active tasks" color="text-rose-600" />
      <StatsCard icon="🔄" label="In Progress" :value="inProgressTasks" subtitle="Active tasks" color="text-amber-600" />
      <StatsCard icon="⚠️" label="Overdue" :value="store.overdueTasks" subtitle="Past due date" :color="store.overdueTasks > 0 ? 'text-rose-600' : 'text-emerald-600'" />
    </div>

    <!-- Task Status Breakdown -->
    <div class="animate-fade-in-up rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 class="mb-4 font-heading text-sm font-semibold text-slate-700">Task Status Breakdown</h3>
      <div class="grid grid-cols-4 gap-4">
        <div v-for="(count, status) in statusDistribution" :key="status" class="text-center">
          <div class="flex h-16 items-end justify-center">
            <div
              class="w-12 rounded-t-md transition-all duration-500"
              :class="statusMeta[status].bar"
              :style="{ height: `${Math.max(count * 4, 4)}px` }"
            />
          </div>
          <p class="mt-2 font-heading text-xl font-bold text-slate-900">{{ count }}</p>
          <p class="text-xs text-slate-400">{{ statusMeta[status].label }}</p>
        </div>
      </div>
    </div>

    <!-- Project Progress List -->
    <div class="animate-fade-in-up rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 class="mb-4 font-heading text-sm font-semibold text-slate-700">Project Progress</h3>
      <div v-if="projectStats.length === 0" class="py-4 text-center text-sm text-slate-400">
        No projects to report on.
      </div>
      <ul v-else class="stagger-children space-y-4">
        <li v-for="p in projectStats" :key="p.id" class="rounded-lg border border-slate-200 p-4 transition-all duration-200 hover:border-amber-300 hover:shadow-sm">
          <div class="mb-2 flex items-center justify-between">
            <div class="min-w-0">
              <h4 class="truncate font-heading font-semibold text-slate-900">{{ p.name }}</h4>
              <p class="text-xs text-slate-400">{{ p.startDate }} → {{ p.endDate }}</p>
            </div>
            <div class="ml-3 shrink-0 text-right">
              <p class="font-heading text-lg font-bold text-amber-600">{{ p.progress.percentage }}%</p>
              <p class="text-xs text-slate-400">{{ p.progress.completed }}/{{ p.progress.total }} tasks</p>
            </div>
          </div>
          <ProgressBar :percentage="p.progress.percentage" height="h-2" />
        </li>
      </ul>
    </div>
  </div>
</template>