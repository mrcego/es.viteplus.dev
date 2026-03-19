<script setup lang="ts">
import FeatureRunTerminal from './FeatureRunTerminal.vue';
</script>

<template>
  <section id="feature-run" class="wrapper border-t grid md:grid-cols-2 md:divide-x divide-nickel">
    <div class="px-5 py-6 md:p-10 flex flex-col justify-between gap-15">
      <div class="flex flex-col gap-5">
        <span class="text-grey text-xs font-mono uppercase tracking-wide">Vite+ run</span>
        <h4 class="text-white">Vite Task para monorepos y scripts</h4>
        <p class="text-white/70 text-base max-w-[25rem] text-pretty">
          Ejecuta comandos integrados y scripts de
          <code class="mx-1 outline-none bg-nickel/50 text-aqua">package.json</code> con
          caché automatizada y ejecución consciente de dependencias.
        </p>
        <ul class="checkmark-list">
          <li>Seguimiento de entrada automatizado para tareas cacheables</li>
          <li>Ejecución consciente de dependencias en los paquetes del workspace</li>
          <li>
            Ejecución familiar de scripts mediante
            <code class="mx-1 outline-none bg-nickel/50 text-aqua">vp run</code>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex flex-col min-h-[22rem] sm:min-h-[30rem]">
      <div class="bg-viteplus pl-5 sm:pl-10 h-full overflow-clip flex flex-col justify-center py-6">
        <FeatureRunTerminal />
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-viteplus {
  background-image: url('@local-assets/backgrounds/viteplus.jpg');
  background-size: cover;
  background-position: center;
}
</style>
