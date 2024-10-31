<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import ModalComponent from '@/components/modal.vue'

const users = ref([])
const modalTitle = ref('Add User')
const isModalOpen = ref(false)
const selectedUser = ref(null)

watch( () => isModalOpen.value, () => {
  if (isModalOpen.value === false) {
    fetchUsers()
  }
})

const fetchUsers = async () => {
  try {
    const response = await fetch('http://localhost:3000/users')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    users.value = await response.json()
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

async function openModal(id: number) {
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    selectedUser.value = data
    modalTitle.value = 'Update User'
    isModalOpen.value = true
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

const deleteUser = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    users.value = users.value.filter(user => user.id !== id)
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}

const handleUserConfirmed = (user: any) => {
  if (user.id) {
    const index = users.value.findIndex(u => u.id === user.id)
    if (index !== -1) {
      users.value[index] = user
    }
  } else {
    users.value.push(user)
  }
  closeModal()
}

function closeModal() {
  isModalOpen.value = false
  selectedUser.value = null
}

const openAddUserModal = () => {
  selectedUser.value = null
  modalTitle.value = 'Add User'
  isModalOpen.value = true
}

onMounted(fetchUsers)
</script>

<template>
  <button class="button is-pulled-left is-half is-success" @click="openAddUserModal">
    Add User
  </button>
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
    @confirmed="handleUserConfirmed"
  />
</template>

<style scoped>
button {
  margin: 0 0.5rem;
}
</style>
