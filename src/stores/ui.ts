import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const sidebarOpen = ref(true)
  const mobileSidebarOpen = ref(false)
  const currentView = ref('dashboard')

  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value
  }

  function toggleMobileSidebar() {
    mobileSidebarOpen.value = !mobileSidebarOpen.value
  }

  function closeMobileSidebar() {
    mobileSidebarOpen.value = false
  }

  function setView(view: string) {
    currentView.value = view
  }

  return {
    sidebarOpen,
    mobileSidebarOpen,
    currentView,
    toggleSidebar,
    toggleMobileSidebar,
    closeMobileSidebar,
    setView,
  }
})
