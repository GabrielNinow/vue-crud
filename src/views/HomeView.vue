<script setup lang="ts">
import { ref } from 'vue'
import ModalComponent from '../components/modal.vue'

const isModalOpen = ref(false)
const modalTitle = ref('My Modal')

function openModal() {
  isModalOpen.value = true
}

function handleConfirm() {
  console.log('Confirmed!')
}
</script>

<template>
  <div>
    <button class="button is-success" @click="openModal">Open Modal</button>

    <ModalComponent
      :title="modalTitle"
      :isVisible="isModalOpen"
      @update:isVisible="isModalOpen = $event"
      @confirmed="handleConfirm"
    />
  </div>
</template>
