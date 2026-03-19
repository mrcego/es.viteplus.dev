<script setup lang="ts">
import rolldownIcon from '@assets/icons/rolldown-light.svg';
import viteIcon from '@assets/icons/vite-light.svg';
</script>

<template>
  <section
    id="feature-dev-build"
    class="wrapper border-t grid md:grid-cols-2 divide-x divide-nickel"
  >
    <div class="px-5 py-6 md:p-10 flex flex-col justify-between gap-15">
      <div class="flex flex-col gap-5">
        <span class="text-grey text-xs font-mono uppercase tracking-wide"
          >Vite+ dev y build</span
        >
        <h4 class="text-white">Construcciones increíblemente rápidas</h4>
        <p class="text-white/70 text-base max-w-[25rem] text-pretty">
          Inicia servidores de desarrollo y crea builds de producción con una velocidad extrema. Mantente enfocado y acelera tu CI.
        </p>
        <ul class="checkmark-list">
          <li>
            Siempre instantáneo
            <code class="mr-1 outline-none bg-nickel/50 text-vite"
              >Hot Module Replacement (HMR)</code
            >
          </li>
          <li>Build de producción 40 veces más rápido que webpack</li>
          <li>Modo dev de bundle completo opcional para aplicaciones grandes</li>
          <li>Enorme ecosistema de plugins</li>
        </ul>
      </div>
      <div class="px-3 py-1.5 bg-slate rounded w-fit flex gap-2 items-center">
        <span class="text-grey text-sm font-mono hidden md:inline">Impulsado por</span>
        <a href="https://vite.dev/" target="_blank">
          <figure class="project-icon">
            <img loading="lazy" :src="viteIcon" alt="Vite" class="w-[20px] h-[12px]" />
            <figcaption>Vite</figcaption>
          </figure>
        </a>
        <span class="text-grey text-sm font-mono">&amp;</span>
        <a href="https://rolldown.rs/" target="_blank">
          <figure class="project-icon">
            <img loading="lazy" :src="rolldownIcon" alt="Rolldown" class="w-[20px] h-[12px]" />
            <figcaption>Rolldown</figcaption>
          </figure>
        </a>
      </div>
    </div>
    <div class="flex flex-col min-h-[22rem] sm:min-h-[30rem]">
      <div class="bg-vite pl-10 h-full flex flex-col justify-center overflow-clip">
        <div
          class="mr-5 sm:mr-10 px-5 py-6 relative bg-slate rounded-tl rounded-bl outline-1 outline-offset-[2px] outline-white/20 font-mono text-sm leading-[1.5rem] text-white"
        >
          <div class="text-white">$ vp build</div>
          <div class="h-4" />
          <div class="text-grey">
            VITE+ <span class="terminal-blue">construyendo para producción</span>
          </div>
          <div class="text-grey">
            <span class="text-zest">✓</span> Transformados <span class="text-white">128 módulos</span>
          </div>
          <div class="h-4" />
          <div class="text-grey">
            <span class="text-white">dist/index.html</span>
            <span class="inline-block w-2" aria-hidden="true"></span>
            <span class="terminal-blue">0.42 kB</span>
          </div>
          <div class="text-grey">
            <span class="text-white">dist/assets/index.css</span>
            <span class="inline-block w-2" aria-hidden="true"></span>
            <span class="terminal-blue">5.1 kB</span>
          </div>
          <div class="text-grey">
            <span class="text-white">dist/assets/index.js</span>
            <span class="inline-block w-2" aria-hidden="true"></span>
            <span class="terminal-blue">46.2 kB</span>
          </div>
          <div class="text-grey">
            <span class="text-zest">✓</span> Construido en <span class="text-white">421ms</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-vite {
  background-image: url('@local-assets/backgrounds/vite.jpg');
  background-size: cover;
  background-position: center;
}
</style>
