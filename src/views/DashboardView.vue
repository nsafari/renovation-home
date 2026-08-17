<script setup lang="ts">
import { computed } from 'vue'
import { useProjectsStore } from '@/stores/projects'
import StatsCard from '@/components/StatsCard.vue'
import TomorrowTasks from '@/components/TomorrowTasks.vue'
import ProgressBar from '@/components/ProgressBar.vue'

const store = useProjectsStore()

const totalProgress = computed(() => {
  const total = store.totalTasks
  const completed = store.completedTasks
  return total > 0 ? Math.round((completed / total) * 100) : 0
})

const recentProjects = computed(() => {
  return [...store.projects]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="animate-fade-in-up">
      <h1 class="font-heading text-2xl font-bold text-slate-900">Dashboard</h1>
      <p class="mt-1 text-sm text-slate-500">Welcome back! Here's your renovation overview.</p>
    </div>

    <!-- Stats Grid -->
    <div class="stagger-children grid grid-cols-2 gap-4 md:grid-cols-4">
      <StatsCard icon="🔨" label="Total Projects" :value="store.totalProjects" color="text-amber-700" />
      <StatsCard icon="🚧" label="Active Projects" :value="store.activeProjects" color="text-blue-700" />
      <StatsCard icon="✅" label="Completed Tasks" :value="`${store.completedTasks}/${store.totalTasks}`" color="text-emerald-700" />
      <StatsCard icon="⚠️" label="Overdue Tasks" :value="store.overdueTasks" :color="store.overdueTasks > 0 ? 'text-rose-600' : 'text-emerald-600'" />
    </div>

    <!-- Overall Progress -->
    <div class="animate-fade-in-up rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div class="mb-3 flex items-center justify-between">
        <h3 class="font-heading text-sm font-semibold text-slate-700">Overall Progress</h3>
        <span class="font-heading text-sm font-bold text-amber-600">{{ totalProgress }}%</span>
      </div>
      <ProgressBar :percentage="totalProgress" height="h-4" />
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <!-- Tomorrow's Tasks -->
      <TomorrowTasks />

      <!-- Recent Projects -->
      <div class="animate-fade-in-up rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="font-heading text-lg font-semibold text-slate-900">Recent Projects</h3>
          <router-link to="/projects" class="text-sm font-medium text-amber-600 transition-colors hover:text-amber-700">
            View All →
          </router-link>
        </div>
        <div v-if="recentProjects.length === 0" class="py-4 text-center text-sm text-slate-400">
          No projects yet. Create one to get started!
        </div>
        <ul v-else class="stagger-children space-y-3">
          <li v-for="project in recentProjects" :key="project.id">
            <router-link
              :to="`/projects/${project.id}`"
              class="block rounded-lg border border-slate-200 p-3 transition-all duration-200 hover:border-amber-300 hover:shadow-sm"
            >
              <div class="mb-2 flex items-center justify-between">
                <h4 class="truncate text-sm font-semibold text-slate-800">{{ project.name }}</h4>
                <span class="ml-2 shrink-0 font-heading text-xs font-bold text-amber-600">
                  {{ store.getProgress(project.id).percentage }}%
                </span>
              </div>
              <ProgressBar :percentage="store.getProgress(project.id).percentage" />
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>