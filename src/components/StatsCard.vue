<script setup lang="ts">
const props = defineProps<{
  icon: string
  label: string
  value: string | number
  subtitle?: string
  color?: string
}>()

const iconBg: Record<string, string> = {
  'text-amber-700': 'bg-amber-100',
  'text-amber-600': 'bg-amber-100',
  'text-blue-700': 'bg-blue-100',
  'text-green-700': 'bg-emerald-100',
  'text-green-600': 'bg-emerald-100',
  'text-red-600': 'bg-rose-100',
}
</script>

<template>
  <div class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <p class="text-sm font-medium text-slate-500">{{ label }}</p>
        <p class="mt-1 font-heading text-3xl font-bold tracking-tight" :class="color || 'text-slate-900'">
          {{ value }}
        </p>
        <p v-if="subtitle" class="mt-1 text-xs text-slate-400">{{ subtitle }}</p>
      </div>
      <span
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xl"
        :class="iconBg[color || ''] || 'bg-slate-100'"
      >
        {{ icon }}
      </span>
    </div>
  </div>
</template>