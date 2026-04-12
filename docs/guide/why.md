# ¿Por qué Vite+?

En el ecosistema de JavaScript actual, los desarrolladores necesitan un entorno de ejecución como Node.js, un gestor de paquetes como pnpm, un servidor de desarrollo, un linter, un formateador, un ejecutor de pruebas, un empaquetador, un ejecutor de tareas y un número creciente de archivos de configuración.

Vite demostró que las herramientas frontend podrían volverse drásticamente más rápidas repensando la arquitectura en lugar de aceptar el statu quo. Vite+ aplica esa misma idea al resto del flujo de trabajo de desarrollo local y los unifica todos en un único paquete que acelera y simplifica el desarrollo.

## El problema que Vite+ está resolviendo

El ecosistema de herramientas de JavaScript ha visto su buena dosis de fragmentación y cambios constantes. Las aplicaciones web siguen creciendo y, como resultado, el rendimiento, la complejidad y las inconsistencias de las herramientas se han convertido en verdaderos cuellos de botella a medida que los proyectos crecen.

Estos cuellos de botella se amplifican en organizaciones con múltiples equipos, cada uno usando una pila de herramientas diferente. La gestión de dependencias, la infraestructura de construcción y la calidad del código se convierten en responsabilidades fragmentadas, manejadas equipo por equipo y a menudo no asumidas como una prioridad por nadie. Como resultado, las dependencias se desincronizan, las construcciones se vuelven más lentas y la calidad del código disminuye. Arreglar esos problemas más tarde requiere significativamente más esfuerzo, ralentiza a todos y aparta a los equipos del desarrollo de productos.

## Qué se incluye en Vite+

Vite+ reúne las herramientas necesarias para el desarrollo web moderno en un único toolchain integrado. En lugar de ensamblar y mantener un toolchain personalizado, Vite+ proporciona un punto de entrada consistente que gestiona el entorno de ejecución, las dependencias, el servidor de desarrollo, las verificaciones de calidad del código, las pruebas y las construcciones en un solo lugar.

- **[Vite](https://vite.dev/)** y **[Rolldown](https://rolldown.rs/)** para el desarrollo y la construcción de aplicaciones.
- **[Vitest](https://vitest.dev/)** para las pruebas.
- **[Oxlint](https://oxc.rs/docs/guide/usage/linter.html)** y **[Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html)** para el linting y formateo.
- **[tsdown](https://tsdown.dev/)** para la construcción de librerías o ejecutables independientes.
- **[Vite Task](https://github.com/voidzero-dev/vite-task)** para la orquestación de tareas.

En la práctica, esto significa que los desarrolladores interactúan con un flujo de trabajo consistente: `vp dev`, `vp check`, `vp test` y `vp build`.

Este toolchain unificado reduce la sobrecarga de configuración, mejora el rendimiento y facilita a los equipos el mantenimiento de herramientas consistentes en todos los proyectos.

## Rápido y escalable por defecto

Vite+ está construido sobre herramientas modernas como Vite, Rolldown, Oxc, Vitest y Vite Task para mantener tus proyectos rápidos y escalables a medida que tu base de código crece. Al usar Rust, podemos acelerar las tareas comunes por [10 veces o a veces incluso por 100 veces](https://voidzero.dev/posts/announcing-vite-plus-alpha#performance-scale). Sin embargo, muchos toolchains basados en Rust son incompatibles con las herramientas existentes o no son extensibles usando JavaScript.

Vite+ conecta Rust con JavaScript a través de [NAPI-RS](https://napi.rs/), lo que le permite proporcionar una interfaz familiar, fácil de configurar y extensible en JavaScript con una excelente experiencia de desarrollador compatible con el ecosistema.

Unificar el toolchain tiene beneficios de rendimiento más allá de simplemente usar herramientas más rápidas por sí solas. Por ejemplo, muchos desarrolladores configuran su linter con herramientas "conscientes del tipo" (type aware), lo que requiere que se ejecute una verificación de tipos completa durante la etapa de linting. Con `vp check` puedes formatear, hacer lint y verificar los tipos de tu código, todo en una sola pasada, acelerando las verificaciones estáticas el doble en comparación con ejecutar las reglas de lint conscientes del tipo y las verificaciones de tipos por separado.

## Totalmente Open Source

Vite+ es totalmente de código abierto y no es un nuevo framework ni una plataforma cerrada. Vite+ se integra con el ecosistema de Vite existente y los frameworks construidos sobre él, incluyendo React, Vue, Svelte y otros. Puede usar pnpm, npm, yarn o Bun como gestor de paquetes, y gestiona el entorno de ejecución de Node.js por ti.

Siempre damos la bienvenida a las contribuciones de la comunidad. Consulta nuestras [Guías de Contribución](https://github.com/voidzero-dev/vite-plus/blob/main/CONTRIBUTING.md) para involucrarte.

