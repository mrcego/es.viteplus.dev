import type { TerminalTranscript } from './terminal-transcripts';

export const featureRunTranscripts: TerminalTranscript[] = [
  {
    id: 'cold',
    label: 'Caché Vacía',
    title: 'La primera ejecución construye la librería compartida y la aplicación',
    command: 'vp run --cache build',
    lineDelay: 180,
    completionDelay: 1200,
    lines: [
      {
        segments: [{ text: '# La primera ejecución construye la librería compartida y la aplicación', tone: 'muted' }],
      },
      {
        segments: [{ text: '$ vp pack', tone: 'muted' }],
      },
      {
        segments: [{ text: '$ vp build', tone: 'muted' }],
      },
      {
        segments: [
          { text: 'vp run:', tone: 'brand', bold: true },
          { text: ' 0/2 aciertos de caché (0%).', tone: 'muted' },
        ],
      },
    ],
  },
  {
    id: 'no-changes',
    label: 'Repetición Completa',
    title: 'Sin cambios se repiten ambas tareas desde la caché',
    command: 'vp run --cache build',
    lineDelay: 180,
    completionDelay: 1200,
    lines: [
      {
        segments: [{ text: '# Sin cambios se repiten ambas tareas desde la caché', tone: 'muted' }],
      },
      {
        segments: [
          { text: '$ vp pack ', tone: 'muted' },
          { text: '✓ ', tone: 'success' },
          { text: 'acierto de caché, repitiendo', tone: 'base' },
        ],
      },
      {
        segments: [
          { text: '$ vp build ', tone: 'muted' },
          { text: '✓ ', tone: 'success' },
          { text: 'acierto de caché, repitiendo', tone: 'base' },
        ],
      },
      {
        segments: [
          { text: 'vp run:', tone: 'brand', bold: true },
          { text: ' 2/2 aciertos de caché (100%), 1.24s ahorrados.', tone: 'muted' },
        ],
      },
    ],
  },
  {
    id: 'app-change',
    label: 'Repetición Parcial',
    title: 'Los cambios en la aplicación solo vuelven a ejecutar su construcción',
    command: 'vp run --cache build',
    lineDelay: 180,
    completionDelay: 1200,
    lines: [
      {
        segments: [{ text: '# Los cambios en la aplicación solo vuelven a ejecutar su construcción', tone: 'muted' }],
      },
      {
        segments: [
          { text: '$ vp pack ', tone: 'muted' },
          { text: '✓ ', tone: 'success' },
          { text: 'acierto de caché, repitiendo', tone: 'base' },
        ],
      },
      {
        segments: [
          { text: '$ vp build ', tone: 'muted' },
          { text: '✗ ', tone: 'base' },
          { text: 'fallo de caché: ', tone: 'muted' },
          { text: "'src/main.ts'", tone: 'base' },
          { text: ' modificado, ejecutando', tone: 'muted' },
        ],
      },
      {
        segments: [
          { text: 'vp run:', tone: 'brand', bold: true },
          { text: ' 1/2 aciertos de caché (50%), 528ms ahorrados.', tone: 'muted' },
        ],
      },
    ],
  },
  {
    id: 'shared-change',
    label: 'Reconstrucción Completa',
    title: 'Los cambios en la API compartida reconstruyen la librería y la aplicación',
    command: 'vp run --cache build',
    lineDelay: 180,
    completionDelay: 1200,
    lines: [
      {
        segments: [{ text: '# Los cambios en la API compartida reconstruyen la librería y la aplicación', tone: 'muted' }],
      },
      {
        segments: [
          { text: '$ vp pack ', tone: 'muted' },
          { text: '✗ ', tone: 'base' },
          { text: 'fallo de caché: ', tone: 'muted' },
          { text: "'src/index.ts'", tone: 'base' },
          { text: ' modificado, ejecutando', tone: 'muted' },
        ],
      },
      {
        segments: [
          { text: '$ vp build ', tone: 'muted' },
          { text: '✗ ', tone: 'base' },
          { text: 'fallo de caché: ', tone: 'muted' },
          { text: "'src/routes.ts'", tone: 'base' },
          { text: ' modificado, ejecutando', tone: 'muted' },
        ],
      },
      {
        segments: [
          { text: 'vp run:', tone: 'brand', bold: true },
          { text: ' 0/2 aciertos de caché (0%).', tone: 'muted' },
        ],
      },
    ],
  },
];
