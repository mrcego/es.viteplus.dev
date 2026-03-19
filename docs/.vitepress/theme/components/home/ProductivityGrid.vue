<script setup lang="ts">
import RiveAnimation from '@components/shared/RiveAnimation.vue';
import focusOnShippingAnimation from '@local-assets/animations/514_x_246_focus_on_shipping_v2.riv';
import stayFastAtScaleAnimation from '@local-assets/animations/561_x_273_stay_fast_at_scale.riv';
import productivitySecurityImage from '@local-assets/productivity-security.png';
import tileOxc from '@local-assets/tiles/oxc.png';
import tileVite from '@local-assets/tiles/vite.png';
import tileVitest from '@local-assets/tiles/vitest.png';
</script>

<template>
  <section
    class="wrapper wrapper--ticks border-t grid lg:grid-cols-2 divide-x divide-y divide-stroke"
  >
    <div class="p-5 sm:p-10 flex flex-col gap-3">
      <h5 class="text-balance sm:text-pretty">Un stack confiable en el que estandarizar</h5>
      <p class="sm:max-w-[28rem] text-pretty mb-12 sm:mb-16">
        Vite+ se basa en estándares establecidos de código abierto de la industria y es mantenido por los mismos
        expertos detrás de estos proyectos.
      </p>
      <div class="flex flex-col gap-6 sm:pr-10 -mx-5 sm:mx-0 divide-y sm:divide-y-0 divide-stroke">
        <div class="flex flex-col gap-6 pt-6 pb-6 sm:pb-0 px-5 sm:px-0 sm:pt-0 first:pt-0">
          <img loading="lazy" :src="tileVite" alt="Vite" class="w-24 flex-shrink-0 sm:hidden" />
          <div class="flex flex-row sm:items-center gap-6">
            <img
              loading="lazy"
              :src="tileVite"
              alt="Vite"
              class="w-24 flex-shrink-0 hidden sm:block"
            />
            <div
              class="relative flex flex-col flex-1 sm:pl-6 before:content-none sm:before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-full before:w-px before:bg-stroke"
            >
              <p class="text-primary font-medium text-base sm:text-xl">69m+</p>
              <p class="leading-tight text-base">Descargas semanales en npm</p>
            </div>
            <div
              class="relative flex flex-col flex-shrink-0 pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-full before:w-px before:bg-stroke"
            >
              <p class="text-primary font-medium text-base sm:text-xl">78.7k</p>
              <p class="leading-tight text-base">Estrellas en GitHub</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-6 pt-6 pb-6 sm:pb-0 px-5 sm:px-0 sm:pt-0 first:pt-0">
          <img loading="lazy" :src="tileVitest" alt="Vitest" class="w-24 flex-shrink-0 sm:hidden" />
          <div class="flex flex-row sm:items-center gap-6">
            <img
              loading="lazy"
              :src="tileVitest"
              alt="Vitest"
              class="w-24 flex-shrink-0 hidden sm:block"
            />
            <div
              class="relative flex flex-col flex-1 sm:pl-6 before:content-none sm:before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-full before:w-px before:bg-stroke"
            >
              <p class="text-primary font-medium text-base sm:text-xl">35m+</p>
              <p class="leading-tight text-base">Weekly npm downloads</p>
            </div>
            <div
              class="relative flex flex-col flex-shrink-0 pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-full before:w-px before:bg-stroke"
            >
              <p class="text-primary font-medium text-base sm:text-xl">16.1k</p>
              <p class="leading-tight text-base">GitHub stars</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-6 pt-6 pb-6 sm:pb-0 px-5 sm:px-0 sm:pt-0 first:pt-0">
          <img loading="lazy" :src="tileOxc" alt="Oxc" class="w-24 flex-shrink-0 sm:hidden" />
          <div class="flex flex-row sm:items-center gap-6">
            <img
              loading="lazy"
              :src="tileOxc"
              alt="Oxc"
              class="w-24 flex-shrink-0 hidden sm:block"
            />
            <div
              class="relative flex flex-col flex-1 sm:pl-6 before:content-none sm:before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-full before:w-px before:bg-stroke"
            >
              <p class="text-primary font-medium text-base sm:text-xl">5m+</p>
              <p class="leading-tight text-base">Weekly npm downloads</p>
            </div>
            <div
              class="relative flex flex-col flex-shrink-0 pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-full before:w-px before:bg-stroke"
            >
              <p class="text-primary font-medium text-base sm:text-xl">19.8k</p>
              <p class="leading-tight text-base">GitHub stars</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-5 sm:p-10 flex flex-col gap-3 border-r-0">
      <h5>Mantente rápido a escala</h5>
      <p class="max-w-[26rem] text-pretty">
        Con componentes de bajo nivel escritos en Rust, Vite+ ofrece un rendimiento de escala empresarial: hasta
        <span class="text-primary">40 veces más rápidas las construcciones</span> que webpack,
        <span class="text-primary">~50 a ~100 veces más rápido el linter</span> que ESLint, y
        <span class="text-primary">hasta 30 veces más rápido el formateo</span> que Prettier.
      </p>
      <RiveAnimation
        :desktop-src="stayFastAtScaleAnimation"
        :desktop-width="561"
        :desktop-height="273"
        canvas-class="w-full mt-10"
      />
    </div>
    <div class="p-5 sm:p-10 flex flex-col gap-3">
      <h5>Enfócate en entregar, no en las herramientas</h5>
      <ul class="list-disc pl-3 flex flex-col gap-2 marker:text-ruby mt-1">
        <li class="leading-tight">Deja de perder tiempo en el mantenimiento de herramientas</li>
        <li class="leading-tight">Mejora la movilidad de los desarrolladores entre equipos</li>
        <li class="leading-tight">
          Estandariza las mejores prácticas para flujos de trabajo humanos y asistidos por IA
        </li>
      </ul>
      <RiveAnimation
        :desktop-src="focusOnShippingAnimation"
        :desktop-width="514"
        :desktop-height="246"
        canvas-class="w-full mt-10"
      />
    </div>
    <div class="p-5 sm:p-10 flex flex-col gap-3">
      <h5>Seguridad en la cadena de suministro</h5>
      <p class="max-w-[20rem] text-pretty">
        El desarrollo de Vite+ sigue rigurosas prácticas de seguridad y evaluamos sus dependencias en todo el toolchain unificado.
      </p>
      <img
        loading="lazy"
        class="w-full"
        :src="productivitySecurityImage"
        alt="Vite+ evalúa todas las dependencias con rigurosas prácticas de seguridad"
      />
    </div>
  </section>
</template>

<style scoped></style>
