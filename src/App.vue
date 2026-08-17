<script setup lang="ts">
import { useUiStore } from '@/stores/ui'
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'

const ui = useUiStore()
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-amber-50">
    <!-- Mobile overlay -->
    <div
      v-if="ui.mobileSidebarOpen"
      class="fixed inset-0 z-30 bg-black/40 lg:hidden"
      @click="ui.closeMobileSidebar"
    />

    <!-- Sidebar -->
    <AppSidebar
      :open="ui.sidebarOpen"
      :mobile-open="ui.mobileSidebarOpen"
      class="z-40"
    />

    <!-- Main area -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <AppHeader @toggle-sidebar="ui.toggleSidebar" @toggle-mobile="ui.toggleMobileSidebar" />

      <main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <router-view />
      </main>
    </div>
  </div>
</template>
