<script lang="ts">
  import FrontIcon from "./icons/FrontIcon.svelte";
  import ProjectsIcon from "./icons/ProjectsIcon.svelte";
  import CoursesIcon from "./icons/CoursesIcon.svelte";
  import ContactIcon from "./icons/ContactIcon.svelte";
  import TipIcon from "./icons/TipIcon.svelte";


  const { class: className } = $props<{ class?: string | undefined }>();

</script>

<div class={`input hidden md:flex ${className}`}>
    <a class="value" rel="external" href="https://www.flashsoft.eu">
      <FrontIcon />
      Front
    </a>
    <a class="value" rel="external" href="https://www.flashsoft.eu/projects">
      <ProjectsIcon/>
      Projects
    </a>
    <a class="value" rel="external" href="https://www.flashsoft.eu/certs">
      <CoursesIcon />
      Courses
    </a>
    <a class="value" rel="external" href="https://flashsoft.eu/#section-contact">
      <ContactIcon />
      Contact
    </a>
    <a class="value" href="/tip-me">
      <TipIcon />
      Tip
    </a>
  </div>

  <style lang="scss" scoped>
    .input {
    flex-direction: row;
    width: fit-content;
    background-color: #1d1d1d;
    justify-content: center;
    border-radius: 5px;
    gap: 7.5px;
    margin-bottom: 1rem;
    padding-left: 4px;
    padding-right: 4px;
    transition: all 0.2s ease;
    border: 1px solid rgba(49, 15, 68, 0.4196078431);
    font-size: 0.85rem;
    position: relative;
    left: 1rem;
    top: 0.4rem;
    height: 2.6rem;
}

.value {
  background-color: transparent;
  border: none;
  padding: 10px;
  color: aliceblue;
  display: flex;
  position: relative;
  gap: 5px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.value:not(:active):hover,
.active,
.value:focus {
  background-color: #21262cad;
}

.value:focus,
.value:active {
  background-color: #1a1f24;
  outline: none;
}

.value::before {
  content: "";
  position: absolute;
  top: 35px;
  right: 0px;
  width: 100%;
  height: 1px;
  background-color: #0a01303f;
  border-radius: 5px;
  opacity: 0;
}

.value:focus::before,
.value:active::before {
  opacity: 1;
}

  </style>
