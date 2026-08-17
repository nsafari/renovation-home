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
    <div>
      <h1 class="text-2xl font-bold text-stone-800">🏠 Dashboard</h1>
      <p class="text-sm text-stone-500">Welcome back! Here's your renovation overview.</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <StatsCard icon="🔨" label="Total Projects" :value="store.totalProjects" color="text-amber-700" />
      <StatsCard icon="🚧" label="Active Projects" :value="store.activeProjects" color="text-blue-700" />
      <StatsCard icon="✅" label="Completed Tasks" :value="`${store.completedTasks}/${store.totalTasks}`" color="text-green-700" />
      <StatsCard icon="⚠️" label="Overdue Tasks" :value="store.overdueTasks" :color="store.overdueTasks > 0 ? 'text-red-600' : 'text-green-600'" />
    </div>

    <!-- Overall Progress -->
    <div class="rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
      <h3 class="mb-3 text-sm font-bold text-stone-700">📊 Overall Progress</h3>
      <ProgressBar :percentage="totalProgress" height="h-4" show-label />
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <!-- Tomorrow's Tasks -->
      <TomorrowTasks />

      <!-- Recent Projects -->
      <div class="rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-lg font-bold text-stone-800">🔨 Recent Projects</h3>
          <router-link to="/projects" class="text-sm font-medium text-amber-600 hover:text-amber-700">
            View All →
          </router-link>
        </div>
        <div v-if="recentProjects.length === 0" class="py-4 text-center text-sm text-stone-400">
          No projects yet. Create one to get started!
        </div>
        <ul v-else class="space-y-3">
          <li v-for="project in recentProjects" :key="project.id">
            <router-link
              :to="`/projects/${project.id}`"
              class="block rounded-lg border border-stone-200 p-3 transition-all hover:border-amber-300 hover:shadow-sm"
            >
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-semibold text-stone-800">{{ project.name }}</h4>
                <span class="text-xs text-stone-400">{{ store.getProgress(project.id).percentage }}%</span>
              </div>
              <ProgressBar :percentage="store.getProgress(project.id).percentage" class="mt-2" />
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
