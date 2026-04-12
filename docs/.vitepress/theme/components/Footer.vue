<template>
  <footer class="bg-primary" data-theme="dark">
    <Sponsors
      description="Vite+ es gratuito y de código abierto, hecho posible gracias a un equipo a tiempo completo y apasionados contribuyentes del código abierto."
      sponsorLinkText="Contribuir"
      sponsorLink="https://github.com/voidzero-dev/vite-plus/blob/main/CONTRIBUTING.md"
    />
    <section class="wrapper">
        <Footer
          heading="Lleva la productividad de tu equipo al siguiente nivel con Vite+"
          subheading=" "
          button-text="Primeros pasos"
          button-link="/guide"
        />
    </section>
  </footer>
</template>

<style scoped></style>
<script setup lang="ts">
import Sponsors from '@components/oss/Sponsors.vue';
import Footer from "@components/oss/Footer.vue";
</script>
