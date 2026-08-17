<script setup lang="ts">
defineProps<{
  icon: string
  label: string
  value: string | number
  subtitle?: string
  color?: string
}>()
</script>

<template>
  <div class="rounded-xl border border-amber-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-stone-500">{{ label }}</p>
        <p class="mt-1 text-2xl font-bold" :class="color || 'text-stone-800'">{{ value }}</p>
        <p v-if="subtitle" class="mt-1 text-xs text-stone-400">{{ subtitle }}</p>
      </div>
      <span class="text-3xl">{{ icon }}</span>
    </div>
  </div>
</template>
