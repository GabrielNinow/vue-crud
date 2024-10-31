<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios';
import ModalComponent from '@/components/modal.vue'

const users = ref([]);
const modalTitle = ref('Update User');
const isModalOpen = ref(false);
const selectedUser = ref(null);

async function openModal(id: number) {
  try {
    const response = await axios.get(`http://localhost:3000/users/${id}`);
    selectedUser.value = response.data;
    isModalOpen.value = true;
  } catch (error) {
    console.error('Error fetching user data:', error);
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

onMounted(fetchUsers);

const deleteUser = async (id: number) => {
  try {
    const response = await axios.delete(`http://localhost:3000/users/${id}`);

    if (response.status < 200 || response.status > 299) {
      throw new Error('Network response was not ok');
    }

    users.value = users.value.filter(user => user.id !== id);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}
</script>

<template>
  <table class="table">
    <thead>
    <tr>
      <th><abbr title="id">ID</abbr></th>
      <th><abbr title="name">Name</abbr></th>
      <th><abbr title="email">Email</abbr></th>
      <th><abbr title="phone">Phone</abbr></th>
      <th><abbr title="desc">Description</abbr></th>
      <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="user in users" :key="user.id">
      <td>{{ user.id }}</td>
      <td>{{ user.name }}</td>
      <td>{{ user.email }}</td>
      <td>{{ user.tel }}</td>
      <td>{{ user.desc }}</td>
      <td>
        <button @click="openModal(user.id)" title="Edit User">
          <font-awesome-icon :icon="['fas', 'pen']" />
        </button>
        <button @click="deleteUser(user.id)" title="Delete User">
          <font-awesome-icon :icon="['fas', 'circle-xmark']" />
        </button>
      </td>
    </tr>
    </tbody>
  </table>
  <ModalComponent
    :title="modalTitle"
    :isVisible="isModalOpen"
    :selectedUser="selectedUser"
  @update:isVisible="isModalOpen = $event"
  />
</template>

<style scoped>

button{
  margin: 0 0.5rem;
}

</style>
