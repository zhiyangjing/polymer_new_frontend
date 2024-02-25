<script setup lang="ts">
import {ref} from 'vue'
import Manage from './components/manage.vue'
import Detail from "./components/detail.vue"
const is_manage = ref(true)

</script>

<template>
  <div class="whole">
    <div v-if="is_manage" >
      <Manage @go_back="is_manage = false"></Manage>
    </div>
    <div v-if="!is_manage">
       <Detail @go_back="is_manage = true"></Detail>
    </div> 
  </div>
</template>

<style scoped>
.whole {

}
</style>


<!--
  @FILE index,
  @author: Zackary,
  @description: none,
  @CREATED:  2024-02-22 21:49:11,
-->