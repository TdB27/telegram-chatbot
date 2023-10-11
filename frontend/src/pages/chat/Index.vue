<script setup>
import Sidebar from "./SideBar.vue";
import Content from "./Content.vue";
</script>

<template>
  <div class="card">
    <div id="chat-layout">
      <Sidebar class="col-4" />
      <Content class="col-8" />
    </div>
  </div>
</template>

<style scoped>
#chat-layout {
  display: flex;
  box-shadow: 0 4px 6px 0 rgba(85, 85, 85, 0.08),
    0 1px 20px 0 rgba(0, 0, 0, 0.07), 0px 1px 11px 0px rgba(0, 0, 0, 0.07);
}
</style>
