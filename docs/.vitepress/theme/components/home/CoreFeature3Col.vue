<script setup lang="ts">
import nodeIcon from '@local-assets/icons/node.png';
import reactIcon from '@local-assets/icons/react.png';
import solidIcon from '@local-assets/icons/solid.png';
import svelteIcon from '@local-assets/icons/svelte.png';
import vueIcon from '@local-assets/icons/vue.png';

import StackedBlock from './StackedBlock.vue';
</script>

<template>
  <section
    class="wrapper border-t grid grid-rows-3 lg:grid-rows-1 lg:grid-cols-3 lg:h-80 divide-y lg:divide-y-0 lg:divide-x"
  >
    <div class="p-5 lg:p-10 flex flex-col justify-between">
      <div class="flex flex-col gap-3 h-30 lg:h-auto">
        <h5>Gestiona tu entorno de ejecución y gestor de paquetes</h5>
        <p>
          <span class="pr-1">Usa</span> <code>node</code> automáticamente, con el gestor de paquetes
          correcto seleccionado para cada proyecto.
        </p>
      </div>
      <div class="flex items-center gap-4 flex-wrap">
        <StackedBlock :src="nodeIcon" alt="node" href="https://nodejs.org" />
        <div class="flex flex-wrap gap-2">
          <code>pnpm</code>
          <code>npm</code>
          <code>yarn</code>
          <code>bun</code>
        </div>
      </div>
    </div>
    <div class="p-5 lg:p-10 flex flex-col justify-between">
      <div class="flex flex-col gap-3 h-30 lg:h-auto">
        <h5>Simplifica el desarrollo diario</h5>
        <p>Un archivo de configuración y un flujo consistente de comandos en todo tu stack.</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <code>vp env</code>
        <code>vp install</code>
        <code>vp dev</code>
        <code>vp check</code>
        <code>vp build</code>
        <code>vp run</code>
      </div>
    </div>
    <div class="p-5 lg:p-10 flex flex-col justify-between">
      <div class="flex flex-col gap-3 h-30 lg:h-auto">
        <h5>Potenciando tus frameworks favoritos</h5>
        <p>Soporta todos los frameworks construidos sobre Vite.</p>
      </div>
      <div class="flex gap-3 items-center">
        <ul class="stacked-blocks">
          <StackedBlock :src="reactIcon" alt="react" href="https://react.dev" />
          <StackedBlock :src="vueIcon" alt="vue" href="https://vuejs.org" />
          <StackedBlock :src="svelteIcon" alt="svelte" href="https://svelte.dev" />
          <StackedBlock :src="solidIcon" alt="solid" href="https://solidjs.com" />
        </ul>
        <p class="text-base text-primary">+ 20 más</p>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
