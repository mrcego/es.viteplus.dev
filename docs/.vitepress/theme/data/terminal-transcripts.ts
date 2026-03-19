export type TerminalTone = 'base' | 'muted' | 'brand' | 'accent' | 'success' | 'warning';

export interface TerminalSegment {
  text: string;
  tone?: TerminalTone;
  bold?: boolean;
}

export interface TerminalLine {
  segments: TerminalSegment[];
  tone?: TerminalTone;
}

export interface TerminalTranscript {
  id: string;
  label: string;
  title: string;
  command: string;
  prompt?: string;
  lineDelay?: number;
  completionDelay?: number;
  lines: TerminalLine[];
}

export const terminalTranscripts: TerminalTranscript[] = [
  {
    id: 'create',
    label: 'create',
    title: 'Andamiaje de un proyecto',
    command: 'vp create',
    lineDelay: 220,
    completionDelay: 900,
    lines: [
      {
        segments: [
          { text: '◇ ', tone: 'accent' },
          { text: 'Selecciona una plantilla ', tone: 'muted' },
          { text: 'vite:application', tone: 'brand' },
        ],
      },
      {
        segments: [
          { text: '◇ ', tone: 'accent' },
          { text: 'Directorio del proyecto ', tone: 'muted' },
          { text: 'vite-app', tone: 'brand' },
        ],
      },
      {
        segments: [
          { text: '• ', tone: 'muted' },
          { text: 'Node ', tone: 'muted' },
          { text: '24.14.0', tone: 'brand' },
          { text: '  pnpm ', tone: 'muted' },
          { text: '10.28.0', tone: 'accent' },
        ],
      },
      {
        segments: [
          { text: '✓ ', tone: 'success' },
          { text: 'Dependencias instaladas', tone: 'base' },
          { text: ' en 1.1s', tone: 'muted' },
        ],
      },
      {
        segments: [
          { text: '→ ', tone: 'brand' },
          { text: 'Siguiente: ', tone: 'muted' },
          { text: 'cd vite-app && vp dev', tone: 'accent' },
        ],
      },
    ],
  },
  {
    id: 'dev',
    label: 'dev',
    title: 'Inicia el desarrollo local',
    command: 'vp dev',
    lineDelay: 220,
    completionDelay: 1100,
    lines: [
      {
        segments: [
          { text: 'VITE+ ', tone: 'brand' },
          { text: 'listo en ', tone: 'muted' },
          { text: '68ms', tone: 'base' },
        ],
      },
      {
        segments: [
          { text: '→ ', tone: 'brand' },
          { text: 'Local ', tone: 'muted' },
          { text: 'http://localhost:5173/', tone: 'accent' },
        ],
      },
      {
        segments: [
          { text: '→ ', tone: 'muted' },
          { text: 'Red ', tone: 'muted' },
          { text: '--host', tone: 'base' },
          { text: ' para exponer', tone: 'muted' },
        ],
      },
      {
        segments: [
          { text: '[hmr] ', tone: 'accent' },
          { text: 'actualizado ', tone: 'muted' },
          { text: 'src/App.tsx', tone: 'brand' },
          { text: ' en 14ms', tone: 'muted' },
        ],
      },
    ],
  },
  {
    id: 'check',
    label: 'check',
    title: 'Verifica todo el proyecto',
    command: 'vp check',
    lineDelay: 220,
    completionDelay: 1100,
    lines: [
      {
        segments: [
          { text: 'pass: ', tone: 'accent' },
          { text: 'Los 42 archivos están correctamente formateados', tone: 'base' },
          { text: ' (88ms, 16 threads)', tone: 'muted' },
        ],
      },
      {
        segments: [
          { text: 'pass: ', tone: 'accent' },
          { text: 'No se encontraron advertencias, errores de lint o de tipo', tone: 'base' },
          { text: ' en 42 archivos', tone: 'muted' },
          { text: ' (184ms, 16 threads)', tone: 'muted' },
        ],
      },
    ],
  },
  {
    id: 'test',
    label: 'test',
    title: 'Ejecuta pruebas con feedback rápido',
    command: 'vp test',
    lineDelay: 220,
    completionDelay: 1100,
    lines: [
      {
        segments: [
          { text: 'RUN ', tone: 'muted' },
          { text: 'test/button.spec.ts', tone: 'brand' },
          { text: ' (3 pruebas)', tone: 'muted' },
        ],
      },
      {
        segments: [
          { text: '✓ ', tone: 'success' },
          { text: 'el botón renderiza el estado de carga', tone: 'base' },
        ],
      },
      {
        segments: [
          { text: '✓ ', tone: 'success' },
          { text: '12 pruebas pasadas', tone: 'base' },
          { text: ' en 4 archivos', tone: 'muted' },
        ],
      },
      {
        segments: [
          { text: 'Duración ', tone: 'muted' },
          { text: '312ms', tone: 'accent' },
          { text: ' (transformación 22ms, pruebas 31ms)', tone: 'muted' },
        ],
      },
    ],
  },
  {
    id: 'build',
    label: 'build',
    title: 'Genera un build de producción',
    command: 'vp build',
    lineDelay: 220,
    completionDelay: 1100,
    lines: [
      {
        segments: [
          { text: 'Rolldown ', tone: 'brand' },
          { text: 'construyendo para producción', tone: 'muted' },
        ],
      },
      {
        segments: [
          { text: '✓ ', tone: 'success' },
          { text: '128 módulos transformados', tone: 'base' },
        ],
      },
      {
        segments: [
          { text: 'dist/assets/index-B6h2Q8.js', tone: 'accent' },
          { text: '  46.2 kB  gzip: 14.9 kB', tone: 'muted' },
        ],
      },
      {
        segments: [
          { text: 'dist/assets/index-H3a8K2.css', tone: 'brand' },
          { text: '  5.1 kB  gzip: 1.6 kB', tone: 'muted' },
        ],
      },
      {
        segments: [
          { text: '✓ ', tone: 'success' },
          { text: 'Construido en ', tone: 'muted' },
          { text: '421ms', tone: 'base' },
        ],
      },
    ],
  },
];
