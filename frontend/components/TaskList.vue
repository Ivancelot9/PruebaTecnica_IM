<!-- ========================================
@file       TaskList.vue
@project    To-Do App (Prueba Técnica)
@module     Frontend - Components
@purpose    Lista de tareas del usuario
@description
  - Muestra todas las tareas
  - Permite completar/desmarcar
  - Botón para editar y eliminar
======================================== -->

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
    <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">
      📋 Tus Tareas
    </h3>

    <!-- Cargando -->
    <div v-if="tasksStore.loading" class="text-gray-500 dark:text-gray-300">
      Cargando tareas...
    </div>

    <!-- Lista -->
    <ul v-else class="space-y-2">
      <li v-for="task in tasksStore.tasks" :key="task.id"
          class="flex items-center justify-between p-2 border rounded-md dark:border-gray-700">
        <div>
          <h4 :class="task.completed ? 'line-through text-gray-400' : 'text-gray-800 dark:text-white'">
            {{ task.title }}
          </h4>
          <p v-if="task.description" class="text-sm text-gray-500 dark:text-gray-400">
            {{ task.description }}
          </p>
        </div>

        <!-- Acciones -->
        <div class="flex space-x-2">
          <button @click="toggleComplete(task)"
                  class="px-2 py-1 rounded bg-green-500 hover:bg-green-600 text-white text-sm transform transition-transform duration-200 hover:scale-105">
            {{ task.completed ? 'Desmarcar' : 'Completar' }}
          </button>
          <button @click="$emit('edit', task)"
                  class="px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm transform transition-transform duration-200 hover:scale-105">
            Editar
          </button>
          <button @click="deleteTask(task.id)"
                  class="px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm transform transition-transform duration-200 hover:scale-105">
            Eliminar
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useTasksStore } from "~/stores/tasks";

const tasksStore = useTasksStore();

onMounted(() => {
  tasksStore.fetchTasks();
});

const toggleComplete = async (task) => {
  await tasksStore.updateTask(task.id, { completed: !task.completed });
};

const deleteTask = async (id) => {
  await tasksStore.deleteTask(id);
};
</script>
