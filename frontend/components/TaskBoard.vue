<!-- ========================================
@file       TaskBoard.vue
@project    To-Do App (Prueba Técnica)
@module     Frontend - Components
@purpose    Tablero estilo Trello con drag & drop 
======================================== -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div
      v-for="col in columns"
      :key="col.status"
      class="bg-gray-800 rounded-lg shadow p-4 min-h-[300px]"
      @dragover.prevent
      @dragenter.prevent
      @drop.stop.prevent="onDrop(col.status)"
    >
      <h3 class="font-bold text-lg mb-3" :class="col.color">{{ col.label }}</h3>

      <div class="space-y-3">
        <div
          v-for="task in filteredTasks(col.status)"
          :key="task.id"
          class="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 shadow cursor-move transition
                 hover:scale-105"
          :class="task.id === lastMovedId ? 'ring-2 ring-blue-400' : ''"
          draggable="true"
          @dragstart="onDragStart(task.id)"
        >
          <h4 class="font-semibold text-gray-800 dark:text-white">
            {{ task.title }}
          </h4>
          <p v-if="task.description" class="text-sm text-gray-600 dark:text-gray-300">
            {{ task.description }}
          </p>

          <div class="flex space-x-2 mt-2">
            <button
              @click="$emit('edit', task)"
              class="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Editar
            </button>
            <button
              @click="deleteTask(task.id)"
              class="px-2 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTasksStore } from '~/stores/tasks'

const tasksStore = useTasksStore()

// Columnas del tablero
const columns = [
  { status: 'pending',  label: '📌 Pendiente',    color: 'text-pink-400'   },
  { status: 'progress', label: '🏗 En Progreso',  color: 'text-yellow-400' },
  { status: 'completed',label: '✅ Completado',   color: 'text-green-400'  }
]

// id de la tarjeta arrastrada y resaltado del último movimiento
const draggedTaskId = ref(null)
const lastMovedId = ref(null)

const filteredTasks = (status) => {
  if (status === 'completed') return tasksStore.tasks.filter(t => t.completed)
  if (status === 'progress')  return tasksStore.tasks.filter(t => !t.completed && t.category === 'progreso')
  // pending
  return tasksStore.tasks.filter(t => !t.completed && t.category !== 'progreso')
}

const onDragStart = (id) => {
  draggedTaskId.value = id
}

const onDrop = async (status) => {
  // si no hay algo arrastrado, no hagas nada
  if (!draggedTaskId.value) return
  const id = draggedTaskId.value

  // Calcula la actualización según columna de destino
  let updates = {}
  if (status === 'completed') {
    updates = { completed: true,  category: null }
  } else if (status === 'progress') {
    updates = { completed: false, category: 'progreso' }
  } else { // pending
    updates = { completed: false, category: null }
  }

  // Actualiza en BD y en el store (no hagas fetch extra)
  await tasksStore.updateTask(id, updates)

  // Resalta la tarjeta movida
  lastMovedId.value = id
  setTimeout(() => (lastMovedId.value = null), 1200)

  // Limpia el drag actual
  draggedTaskId.value = null
}

const deleteTask = async (id) => {
  await tasksStore.deleteTask(id)
}
</script>
