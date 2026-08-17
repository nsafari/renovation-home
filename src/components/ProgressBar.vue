<script setup lang="ts">
defineProps<{
  percentage: number
  height?: string
  showLabel?: boolean
}>()
</script>

<template>
  <div class="w-full">
    <div v-if="showLabel" class="mb-1 flex items-center justify-between text-xs">
      <span class="font-medium text-slate-500">Progress</span>
      <span class="font-heading font-bold text-amber-600">{{ percentage }}%</span>
    </div>
    <div :class="['w-full overflow-hidden rounded-full bg-slate-200', height || 'h-2.5']">
      <div
        class="h-full rounded-full transition-all duration-500 ease-out"
        :class="[
          percentage === 100
            ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
            : percentage >= 60
              ? 'bg-gradient-to-r from-amber-500 to-amber-400'
              : 'bg-gradient-to-r from-orange-500 to-amber-500',
        ]"
        :style="{ width: `${percentage}%` }"
      />
    </div>
  </div>
</template>