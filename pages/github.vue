<script setup>
const query = gql`
  {
    viewer {
      repositories(first: 8, orderBy: { field: CREATED_AT, direction: DESC }) {
        totalCount
        nodes {
          id
          name
          createdAt
          description
          url
          forks {
            totalCount
          }
          watchers {
            totalCount
          }
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`;

const { data, error } = await useAsyncQuery(query);
// console.log(data);
console.log(error);
</script>

<template>
  <h1 class="text-3xl my-8">Codes sources de mes projets sur GitHub</h1>
  <p class="text-lg mb-8">
    Si vous voulez jeter un coup d'oeil à l'aspect technique de mes projets,
    vous êtes sur la bonne page ;)
  </p>
  <section class="grid grid-cols-2 gap-10">
    <div
      v-for="github in data?.viewer.repositories.nodes"
      :key="github.id"
      class="p-8 border-4 my-4 rounded-lg hover:bg-gray-50"
    >
      <a :href="github.url" target="_blank">
        <h2 class="text-2xl text-indigo-800 font-semibold mb-2 hover:underline">
          {{ github.name }}
        </h2>
      </a>
      <p>{{ github.description }}</p>
      <div class="mt-4">
        <Icon name="fontisto:star" size="1.1rem" class="text-indigo-700" />
        Stars: {{ github.stargazers.totalCount }}
        <Icon
          name="system-uicons:branch"
          size="1.1rem"
          class="text-indigo-700"
        />
        Forks: {{ github.forks.totalCount }}
        <Icon name="system-uicons:eye" size="1.1rem" class="text-indigo-700" />
        Watchers: {{ github.watchers.totalCount }}
      </div>
    </div>
  </section>
</template>
