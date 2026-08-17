<script setup lang="ts">
import { useProjectsStore } from '@/stores/projects'
import ProjectCard from '@/components/ProjectCard.vue'

const store = useProjectsStore()
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-stone-800">🔨 Projects</h1>
        <p class="text-sm text-stone-500">Manage your home renovation projects</p>
      </div>
      <router-link
        to="/projects/new"
        class="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-amber-700"
      >
        <span>➕</span>
        New Project
      </router-link>
    </div>

    <!-- Empty state -->
    <div v-if="store.projects.length === 0" class="rounded-xl border-2 border-dashed border-stone-300 py-12 text-center">
      <span class="text-5xl">🏗️</span>
      <h3 class="mt-4 text-lg font-bold text-stone-600">No projects yet</h3>
      <p class="mt-1 text-sm text-stone-400">Create your first renovation project to get started.</p>
      <router-link
        to="/projects/new"
        class="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
      >
        ➕ Create Project
      </router-link>
    </div>

    <!-- Project grid -->
    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard v-for="project in store.projects" :key="project.id" :project="project" />
    </div>
  </div>
</template>
