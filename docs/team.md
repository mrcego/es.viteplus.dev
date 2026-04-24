---
layout: page
title: Conoce al Equipo
description: El desarrollo de Vite+ está guiado por un equipo internacional.
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamPageSection,
  VPTeamMembers
} from '@voidzero-dev/vitepress-theme'
import { core } from './_data/team'
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Conoce al Equipo</template>
    <template #lead>
      Los miembros del equipo que trabajan en Vite+ y son responsables de su desarrollo, mantenimiento y compromiso con la comunidad.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="core" />
</VPTeamPage>
