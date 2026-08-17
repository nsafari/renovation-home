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
  { to: '/', icon: '📊', label: 'Dashboard' },
  { to: '/projects', icon: '🔨', label: 'Projects' },
  { to: '/schedule', icon: '📅', label: 'Schedule' },
  { to: '/reports', icon: '📈', label: 'Reports' },
]

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-amber-200 bg-gradient-to-b from-amber-900 to-stone-900 text-white transition-transform duration-300',
      mobileOpen ? 'translate-x-0' : '-translate-x-full',
      'lg:relative lg:translate-x-0',
      open ? 'lg:w-64' : 'lg:w-0 lg:overflow-hidden lg:border-0',
    ]"
  >
    <!-- Logo -->
    <div class="flex h-16 items-center gap-3 border-b border-amber-700/50 px-6">
      <span class="text-3xl">🏗️</span>
      <div>
        <h2 class="font-bold text-amber-100">ReBuild</h2>
        <p class="text-xs text-amber-300">Manager v1.0</p>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto px-3 py-4">
      <ul class="space-y-1">
        <li v-for="item in navItems" :key="item.to">
          <router-link
            :to="item.to"
            :class="[
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              isActive(item.to)
                ? 'bg-amber-700/50 text-amber-100'
                : 'text-amber-200 hover:bg-amber-800/50 hover:text-white',
            ]"
            @click="ui.closeMobileSidebar"
          >
            <span class="text-lg">{{ item.icon }}</span>
            {{ item.label }}
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Footer -->
    <div class="border-t border-amber-700/50 px-6 py-4 text-xs text-amber-400">
      <p>Build your dream home</p>
    </div>
  </aside>
</template>
