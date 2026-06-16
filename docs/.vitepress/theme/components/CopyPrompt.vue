<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { onBeforeUnmount, ref } from 'vue';

const DEFAULT_PROMPT = `Quiero usar Vite+ en mi proyecto. Vite+ es el toolchain unificado para la web detrás de la CLI \`vp\` — una herramienta que combina Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt y Vite Task, además de gestión del entorno de ejecución y del gestor de paquetes.

Primero, lee https://es.viteplus.dev/llms-full.txt para aprender los comandos y la configuración de Vite+.

Instala la CLI \`vp\`:
- macOS / Linux: curl -fsSL https://vite.plus | bash
- Windows (PowerShell): irm https://vite.plus/ps1 | iex

Luego abre una nueva terminal y ejecuta \`vp help\`. Para crear un nuevo proyecto ejecuta \`vp create\`; para mover un proyecto Vite existente a Vite+ ejecuta \`vp migrate\`.

Comandos del día a día: \`vp install\` (dependencias), \`vp dev\` (servidor de desarrollo), \`vp check\` (formatear + lint + validación de tipos), \`vp test\` (pruebas) y \`vp build\` (construcción para producción).

Ayúdame a configurarlo y explícame cualquier cosa que deba saber.`;

const props = withDefaults(
  defineProps<{
    prompt?: string;
    label?: string;
  }>(),
  {
    prompt: DEFAULT_PROMPT,
    label: 'Copiar Prompt',
  },
);

const state = ref<'idle' | 'copied' | 'error'>('idle');
let resetTimer: ReturnType<typeof setTimeout> | null = null;

const flash = (next: 'copied' | 'error') => {
  state.value = next;
  if (resetTimer) {
    clearTimeout(resetTimer);
  }
  resetTimer = setTimeout(() => {
    state.value = 'idle';
    resetTimer = null;
  }, 1600);
};

const copyPrompt = async (event: MouseEvent) => {
  if (event.detail > 0) {
    (event.currentTarget as HTMLElement | null)?.blur();
  }
  try {
    await navigator.clipboard.writeText(props.prompt);
    flash('copied');
  } catch {
    flash('error');
  }
};

onBeforeUnmount(() => {
  if (resetTimer) {
    clearTimeout(resetTimer);
  }
});
</script>

<template>
  <button
    type="button"
    class="button"
    :aria-label="`${label} para configurar Vite+ con un asistente de IA`"
    @click="copyPrompt"
  >
    <Icon
      :icon="
        state === 'copied' ? 'lucide:check' : state === 'error' ? 'lucide:x' : 'lucide:clipboard'
      "
      class="size-4"
      aria-hidden="true"
    />
    <span>{{ state === 'copied' ? '¡Copiado!' : state === 'error' ? 'No se pudo copiar' : label }}</span>
  </button>
</template>

<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
