<script setup lang="ts">
import { useUiStore } from '@/stores/ui'
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'

const ui = useUiStore()
</script>

<template>
  <div class="min-h-screen bg-[var(--color-bg)]">
    <!-- Mobile overlay -->
    <div
      v-if="ui.mobileSidebarOpen"
      class="fixed inset-0 z-30 bg-slate-900/60 backdrop-blur-sm lg:hidden"
      @click="ui.closeMobileSidebar"
    />

    <!-- Sidebar -->
    <AppSidebar
      :open="ui.sidebarOpen"
      :mobile-open="ui.mobileSidebarOpen"
    />

    <!-- Main area -->
    <div
      class="flex min-h-screen flex-col transition-[margin-left] duration-300 ease-in-out"
      :class="ui.sidebarOpen ? 'lg:ml-[260px]' : 'lg:ml-0'"
    >
      <AppHeader @toggle-sidebar="ui.toggleSidebar" @toggle-mobile="ui.toggleMobileSidebar" />

      <main class="flex-1 p-4 md:p-6 lg:p-8">
        <router-view />
      </main>
    </div>
  </div>
</template>