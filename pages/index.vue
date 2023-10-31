<script setup>
const { data: posts } = await useAsyncData("latest-posts", () =>
  queryContent("/projets").sort({ data: 1 }).limit(3).find()
);

const query = gql`
  {
    viewer {
      repositories(first: 3, orderBy: { field: CREATED_AT, direction: DESC }) {
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
const { data: repos } = await useAsyncQuery(query);

let nextSectionId = ref("section1");
let direction = ref("down");

// ref pour chaque section pour l'animation des blocs
let section1 = ref(null);
let section2 = ref(null);
let section3 = ref(null);
let projects = ref(null);
let githubs = ref(null);

// Fonction pour faire défiler les sections
const scrollSection = () => {
  if (nextSectionId.value === "section1") {
    direction.value = "down";
    nextSectionId.value = "section2";
  } else if (nextSectionId.value === "section2") {
    if (direction.value === "down") {
      nextSectionId.value = "section3";
      direction.value = "up";
    } else {
      nextSectionId.value = "section1";
      direction.value = "down";
    }
  } else if (nextSectionId.value === "section3") {
    direction.value = "up";
    nextSectionId.value = "section2";
  }
  const sectionElement = document.getElementById(nextSectionId.value);
  sectionElement.scrollIntoView({ behavior: "smooth" });
};

onMounted(() => {
  const scrollButton = document.getElementById("scrollButton");
  scrollButton.addEventListener("click", scrollSection);

  let observer;

  if (typeof window !== "undefined") {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });
    // Observer les sections avec l'IntersectionObserver
    observer.observe(section1.value);
    observer.observe(section2.value);
    observer.observe(section3.value);
    observer.observe(projects.value);
    observer.observe(githubs.value);
  }
});
</script>

<template>
  <section
    id="section1"
    ref="section1"
    class="hide min-h-screen flex flex-col md:flex-row items-center justify-center"
  >
    <div class="md:w-2/4">
      <h1 class="text-5xl font-bold">Welcome to my dev world</h1>
      <p class="text-base text-gray-900 mt-3 italic">
        Sofiane EL BAR, développeur web et web mobile
      </p>
      <h2 class="text-3xl font-bold mt-8">Qui suis-je ?</h2>
      <p class="text-lg text-justify py-2">
        Développeur web full stack junior passionné et curieux d'apprendre, je
        suis à la recherche de nouvelles aventures dans le monde du
        développement. Mon enthousiasme pour la collaboration et mon désir de
        créer des applications qui apportent une réelle valeur font de moi un
        atout précieux pour votre équipe. Prêts à coder des solutions innovantes
        ensemble? 💻🚀
      </p>
    </div>
    <video
      src="~/assets/videos/sof.mp4"
      autoplay
      loop
      muted
      class="w-1/4 md:max-w-sm m-28 my-auto rounded-lg shadow-xl"
    >
      Désolé, votre navigateur ne prend pas en charge les vidéos intégrées.
    </video>
  </section>

  <section
    id="section2"
    ref="section2"
    class="min-h-screen flex flex-col justify-center"
  >
    <h2 class="text-3xl font-bold mt-8">Mes derniers projets</h2>
    <div ref="projects" class="hide grid md:grid-cols-3 pt-8 mb-10 gap-10">
      <Post :posts="posts" />
    </div>
  </section>

  <section
    id="section3"
    ref="section3"
    class="min-h-screen flex flex-col justify-center"
  >
    <h2 class="text-3xl font-bold mt-8">Mes derniers Repo Github</h2>
    <div ref="githubs" class="hide grid md:grid-cols-3 pt-8 mb-10 gap-10">
      <Repo :repos="repos" />
    </div>
  </section>

  <button id="scrollButton" class="fixed bottom-4 left-1/2">
    <img
      :src="
        direction === 'down' ? '/images/down-arrow.svg' : '/images/up-arrow.svg'
      "
      alt="Scroll arrow"
      class="w-12 h-12"
    />
  </button>
</template>

<style scoped>
.hide {
  opacity: 0;
  filter: blur(10px);
  transform: translateX(-100%);
  transition: all 1s;
}
.show {
  opacity: 1;
  filter: blur(0);
  transform: translateX(0);
}
</style>
