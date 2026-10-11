<script setup>
import { vReveal } from "@awesome-reveal/vue";
import { slide } from "@awesome-reveal/vue/keyframes";

const fromLeft = slide({ direction: "left" });
</script>

<template>
  <section v-reveal="{ keyframes: fromLeft, duration: 800 }">…</section>
</template>
