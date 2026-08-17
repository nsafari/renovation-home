<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useUiStore } from '@/stores/ui'

defineProps<{
  open: boolean
  mobileOpen: boolean
}>()

const route = useRoute()
const ui = useUiStore()

const navItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/projects', label: 'Projects', icon: '🏠' },
  { path: '/schedule', label: 'Schedule', icon: '📅' },
  { path: '/reports', label: 'Reports', icon: '📈' },
]

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col bg-[#1e293b] transition-transform duration-300 ease-in-out',
      mobileOpen ? 'translate-x-0' : '-translate-x-full',
      open ? 'lg:translate-x-0' : 'lg:-translate-x-full',
    ]"
  >
    <!-- Logo -->
    <div class="border-b border-slate-700/50 p-6">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 shadow-lg shadow-amber-500/20">
          <span class="text-xl">🔨</span>
        </div>
        <div>
          <h1 class="font-heading text-lg font-bold tracking-tight text-white">ReBuild</h1>
          <p class="text-xs font-medium text-slate-400">Manager</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 space-y-1 overflow-y-auto p-4">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200"
        :class="[
          isActive(item.path)
            ? '-ml-[2px] border-l-2 border-amber-400 bg-amber-500/10 text-amber-400'
            : 'text-slate-400 hover:bg-slate-800 hover:text-white',
        ]"
        @click="ui.closeMobileSidebar"
      >
        <span class="text-lg">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </router-link>
    </nav>

    <!-- Footer -->
    <div class="border-t border-slate-700/50 p-4">
      <div class="flex items-center gap-3 px-4 py-2">
        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700">
          <span class="text-sm">👤</span>
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium text-white">User</p>
          <p class="text-xs text-slate-400">Builder</p>
        </div>
      </div>
    </div>
  </aside>
</template>