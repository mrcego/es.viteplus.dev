export default {
  run: {
    tasks: {
      'build:site': {
        command: 'vitepress build',
        cache: {
          input: [
            { auto: true },
            '!.vitepress/.temp/**',
            '!.vitepress/dist/**',
            '!node_modules',
            '!node_modules/.vite-temp/**',
          ],
          output: ['.vitepress/dist/**'],
        },
      },
    },
  },
};
