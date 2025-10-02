<!-- ========================================
@file       login.vue
@project    To-Do App (Prueba Técnica)
@module     Frontend - Pages
@purpose    Página de autenticación con login/registro en el mismo formulario
@description
  - Alterna entre modo login y registro
  - Cambia textos, colores y flujo sin cambiar de página
  - Valida email y contraseña mínima
  - Usa SweetAlert2 para notificaciones bonitas
======================================== -->

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <div 
      class="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-md transition-all duration-500"
    >
      <!-- Título dinámico -->
      <h2 class="text-2xl font-bold text-center"
          :class="isRegister ? 'text-green-600' : 'text-blue-600'">
        {{ isRegister ? "Crea tu Cuenta" : "Bienvenido, Inicia Sesión" }}
      </h2>

      <!-- Formulario -->
      <form @submit.prevent="isRegister ? onRegister() : onLogin()" class="space-y-4">
        <!-- Nombre solo en registro -->
        <div v-if="isRegister">
          <label class="block text-sm font-medium">Nombre</label>
          <input v-model="name" type="text" required
            class="w-full p-2 rounded-md border dark:bg-gray-700 dark:text-white" />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium">Email</label>
          <input v-model="email" type="email" required
            class="w-full p-2 rounded-md border dark:bg-gray-700 dark:text-white" />
        </div>

        <!-- Contraseña -->
        <div>
          <label class="block text-sm font-medium">Contraseña</label>
          <input v-model="password" type="password" required minlength="6"
            class="w-full p-2 rounded-md border dark:bg-gray-700 dark:text-white" />
        </div>

        <!-- Botón dinámico -->
        <button type="submit"
          :class="isRegister 
            ? 'w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow' 
            : 'w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow'">
          {{ isRegister ? "Registrarse" : "Login" }}
        </button>
      </form>

      <!-- Toggle -->
      <p class="text-center text-sm text-gray-600 dark:text-gray-300">
        {{ isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?" }}
        <button @click="isRegister = !isRegister" class="text-blue-500 hover:underline">
          {{ isRegister ? "Inicia sesión aquí" : "Regístrate aquí" }}
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import Swal from "sweetalert2";

const router = useRouter();
const authStore = useAuthStore();

const isRegister = ref(false);
const name = ref("");
const email = ref("");
const password = ref("");

// Validación simple de email
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

// Login
const onLogin = async () => {
  if (!validateEmail(email.value)) {
    return Swal.fire({ icon: "error", title: "Correo inválido", text: "Introduce un email válido." });
  }

  const success = await authStore.login(email.value, password.value);

  if (success) {
    Swal.fire({ icon: "success", title: "¡Bienvenido!", text: "Has iniciado sesión correctamente." });
    router.push("/dashboard");
  } else {
    Swal.fire({ icon: "error", title: "Error", text: authStore.error || "Credenciales inválidas." });
  }
};

// Registro
const onRegister = async () => {
  if (!validateEmail(email.value)) {
    return Swal.fire({ icon: "error", title: "Correo inválido", text: "Introduce un email válido." });
  }
  if (password.value.length < 6) {
    return Swal.fire({ icon: "error", title: "Contraseña muy corta", text: "Debe tener al menos 6 caracteres." });
  }

  const success = await authStore.register(name.value, email.value, password.value);

  if (success) {
    Swal.fire({ icon: "success", title: "Cuenta creada", text: "Ya puedes usar tu nueva cuenta." });
    router.push("/dashboard");
  } else {
    Swal.fire({ icon: "error", title: "Error", text: authStore.error || "No se pudo registrar el usuario." });
  }
};
</script>
