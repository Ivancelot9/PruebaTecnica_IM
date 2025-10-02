<!-- ========================================
@file       TaskForm.vue
@project    To-Do App (Prueba Técnica)
@module     Frontend - Components
@purpose    Formulario para crear/editar tareas
@description
  - Captura título, descripción y categoría
  - Envía al store para crear o actualizar tarea
======================================== -->

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
    <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">
      ✍️ {{ editingTask ? "Editar Tarea" : "Nueva Tarea" }}
    </h3>

    <form @submit.prevent="submitTask" class="space-y-3">
      <!-- Título -->
      <div>
        <input v-model="title" type="text" placeholder="Título de la tarea"
               required
               class="w-full p-2 rounded border dark:bg-gray-700 dark:text-white dark:border-gray-600" />
      </div>

      <!-- Descripción -->
      <div>
        <textarea v-model="description" placeholder="Descripción (opcional)"
                  class="w-full p-2 rounded border dark:bg-gray-700 dark:text-white dark:border-gray-600"></textarea>
      </div>

      <!-- Categoría -->
      <div>
        <input v-model="category" type="text" placeholder="Categoría (ej: trabajo, personal)"
               class="w-full p-2 rounded border dark:bg-gray-700 dark:text-white dark:border-gray-600" />
      </div>

      <!-- Botón -->
      <button type="submit"
              class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow transform transition-transform duration-200 hover:scale-105">
        {{ editingTask ? "Actualizar" : "Agregar" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useTasksStore } from "~/stores/tasks";

const tasksStore = useTasksStore();

const title = ref("");
const description = ref("");
const category = ref("");
const editingTask = ref(null);

// ✅ Definir bien la prop
const props = defineProps({
  taskToEdit: { type: Object, default: null }
});

// ✅ Escuchar cambios en la prop
watch(() => props.taskToEdit, (newTask) => {
  if (newTask) {
    title.value = newTask.title;
    description.value = newTask.description || "";
    category.value = newTask.category || "";
    editingTask.value = newTask;
  } else {
    editingTask.value = null;
    title.value = "";
    description.value = "";
    category.value = "";
  }
}, { immediate: true });

const submitTask = async () => {
  if (editingTask.value) {
    await tasksStore.updateTask(editingTask.value.id, {
      title: title.value,
      description: description.value,
      category: category.value,
    });
    editingTask.value = null;
  } else {
    await tasksStore.addTask({
      title: title.value,
      description: description.value,
      category: category.value,
    });
  }

  // Reset
  title.value = "";
  description.value = "";
  category.value = "";
};
</script>
