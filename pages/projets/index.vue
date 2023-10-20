<script setup>
const { data: posts } = await useAsyncData("posts", () =>
  queryContent("/projets").find()
);
</script>

<template>
  <h1 class="text-3xl my-8">Divers projets</h1>

  Voici une liste non exhaustive de mes projets web, qu'ils soient personnels ou
  professionels

  <section class="grid md:grid-cols-3 mt-8 gap-10">
    <Post :posts="posts" />
  </section>
</template>
