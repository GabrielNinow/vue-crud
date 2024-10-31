<script setup lang="ts">
import { ref } from 'vue';
import ModalComponent from '../components/modal.vue';
import TableComponent from '../components/table.vue';

const isModalOpen = ref(false);
const modalTitle = ref('Create User');
const selectedUser = ref(null);
const users = ref([]);

function openModal() {
  isModalOpen.value = true;
}

function updateTable(newUser) {
  if (newUser) {
    users.value.push(newUser);
  } else {
    fetchUsers();
  }
}

const fetchUsers = async () => {
  try {
    const response = await fetch('http://localhost:3000/users');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    users.value = await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

</script>

<template>
  <div>
    <button class="button is-success" @click="openModal">Open Modal</button>

    <TableComponent :users="users" />

    <ModalComponent
      :title="modalTitle"
      :isVisible="isModalOpen"
      :selectedUser="selectedUser"
      @update:isVisible="isModalOpen = $event"
      @confirmed="updateTable"
    />
  </div>
</template>
