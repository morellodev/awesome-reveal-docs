<script setup>
import { Reveal } from "@awesome-reveal/vue";
import { fade } from "@awesome-reveal/vue/keyframes";
</script>

<template>
  <Reveal as="article" :keyframes="fade()" :threshold="0.3">…</Reveal>
</template>
