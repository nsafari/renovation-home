<script setup lang="ts">
import { ref, computed } from 'vue'
import * as storage from '@/services/storage'
import type { Task } from '@/types'

const selectedDate = ref(new Date().toISOString().split('T')[0])

const weekStart = computed(() => {
  const d = new Date(selectedDate.value)
  d.setDate(d.getDate() - d.getDay())
  return d.toISOString().split('T')[0]
})

const weekDays = computed(() => {
  const days: Array<{ date: string; dayName: string; dayNum: number; isToday: boolean; tasks: Array<{ project: { id: string; name: string }; task: Task }> }> = []
  const start = new Date(weekStart.value)
  const today = new Date().toISOString().split('T')[0]

  for (let i = 0; i < 7; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    const dateStr = d.toISOString().split('T')[0]
    days.push({
      date: dateStr,
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNum: d.getDate(),
      isToday: dateStr === today,
      tasks: storage.getAllTasksForDate(dateStr),
    })
  }
  return days
})

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function prevWeek() {
  const d = new Date(selectedDate.value)
  d.setDate(d.getDate() - 7)
  selectedDate.value = d.toISOString().split('T')[0]
}

function nextWeek() {
  const d = new Date(selectedDate.value)
  d.setDate(d.getDate() + 7)
  selectedDate.value = d.toISOString().split('T')[0]
}

function goToToday() {
  selectedDate.value = new Date().toISOString().split('T')[0]
}

const statusColors: Record<string, string> = {
  pending: 'border-l-stone-400 bg-stone-50',
  'in-progress': 'border-l-amber-500 bg-amber-50',
  completed: 'border-l-green-500 bg-green-50',
  skipped: 'border-l-red-400 bg-red-50',
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-stone-800">📅 Schedule</h1>
      <p class="text-sm text-stone-500">View your tasks organized by date</p>
    </div>

    <!-- Controls -->
    <div class="flex items-center gap-3">
      <button
        class="rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-600 hover:bg-stone-50"
        @click="prevWeek"
      >
        ← Prev
      </button>
      <button
        class="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700 hover:bg-amber-100"
        @click="goToToday"
      >
        Today
      </button>
      <button
        class="rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-600 hover:bg-stone-50"
        @click="nextWeek"
      >
        Next →
      </button>
      <span class="ml-2 text-sm text-stone-500">
        Week of {{ new Date(weekStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}
      </span>
    </div>

    <!-- Calendar Grid -->
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-7">
      <div
        v-for="(day, idx) in weekDays"
        :key="day.date"
        :class="[
          'rounded-xl border p-3 transition-all',
          day.isToday
            ? 'border-amber-400 bg-amber-50 shadow-md ring-2 ring-amber-200'
            : 'border-stone-200 bg-white hover:border-stone-300',
        ]"
      >
        <!-- Day header -->
        <div class="mb-2 flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-stone-400">{{ dayNames[idx] }}</p>
            <p
              :class="[
                'text-lg font-bold',
                day.isToday ? 'text-amber-700' : 'text-stone-700',
              ]"
            >
              {{ day.dayNum }}
            </p>
          </div>
          <span
            v-if="day.tasks.length > 0"
            class="flex h-6 w-6 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-800"
          >
            {{ day.tasks.length }}
          </span>
        </div>

        <!-- Tasks -->
        <ul v-if="day.tasks.length > 0" class="space-y-1.5">
          <li
            v-for="item in day.tasks"
            :key="item.task.id"
            :class="[
              'rounded-md border-l-3 p-1.5 text-xs',
              statusColors[item.task.status],
            ]"
          >
            <p class="font-medium text-stone-800 truncate">{{ item.task.title }}</p>
            <p class="text-stone-400 truncate">{{ item.project.name }}</p>
          </li>
        </ul>

        <p v-else class="py-2 text-center text-xs text-stone-300">No tasks</p>
      </div>
    </div>
  </div>
</template>
