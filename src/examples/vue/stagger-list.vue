<script setup>
import { Reveal } from "@awesome-reveal/vue";
import { slide } from "@awesome-reveal/vue/keyframes";

defineProps(["items"]);
</script>

<template>
  <Reveal as="ul" :keyframes="slide()" :stagger="80">
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </Reveal>
</template>
