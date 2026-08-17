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
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-stone-800">📈 Reports</h1>
      <p class="text-sm text-stone-500">Statistics and progress overview</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <StatsCard icon="✅" label="Completion Rate" :value="`${overallCompletionRate}%`" subtitle="All tasks" color="text-green-700" />
      <StatsCard icon="🔴" label="High Priority" :value="highPriorityCount" subtitle="Active tasks" color="text-red-600" />
      <StatsCard icon="🔄" label="In Progress" :value="inProgressTasks" subtitle="Active tasks" color="text-amber-600" />
      <StatsCard icon="⚠️" label="Overdue" :value="store.overdueTasks" subtitle="Past due date" :color="store.overdueTasks > 0 ? 'text-red-600' : 'text-green-600'" />
    </div>

    <!-- Task Status Breakdown -->
    <div class="rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
      <h3 class="mb-4 text-sm font-bold text-stone-700">Task Status Breakdown</h3>
      <div class="grid grid-cols-4 gap-4">
        <div v-for="(count, status) in statusDistribution" :key="status" class="text-center">
          <div class="flex h-16 items-end justify-center">
            <div
              class="w-12 rounded-t-md transition-all duration-500"
              :class="[
                status === 'pending' ? 'bg-stone-300' : '',
                status === 'in-progress' ? 'bg-amber-400' : '',
                status === 'completed' ? 'bg-green-500' : '',
                status === 'skipped' ? 'bg-red-400' : '',
              ]"
              :style="{ height: `${Math.max(count * 4, 4)}px` }"
            />
          </div>
          <p class="mt-2 text-xl font-bold text-stone-800">{{ count }}</p>
          <p class="text-xs capitalize text-stone-400">{{ status.replace('-', ' ') }}</p>
        </div>
      </div>
    </div>

    <!-- Project Progress List -->
    <div class="rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
      <h3 class="mb-4 text-sm font-bold text-stone-700">Project Progress</h3>
      <div v-if="projectStats.length === 0" class="py-4 text-center text-sm text-stone-400">
        No projects to report on.
      </div>
      <ul v-else class="space-y-4">
        <li v-for="p in projectStats" :key="p.id" class="rounded-lg border border-stone-200 p-4">
          <div class="mb-2 flex items-center justify-between">
            <div>
              <h4 class="font-semibold text-stone-800">{{ p.name }}</h4>
              <p class="text-xs text-stone-400">{{ p.startDate }} → {{ p.endDate }}</p>
            </div>
            <div class="text-right">
              <p class="text-lg font-bold text-amber-700">{{ p.progress.percentage }}%</p>
              <p class="text-xs text-stone-400">{{ p.progress.completed }}/{{ p.progress.total }} tasks</p>
            </div>
          </div>
          <ProgressBar :percentage="p.progress.percentage" height="h-2" />
        </li>
      </ul>
    </div>
  </div>
</template>
