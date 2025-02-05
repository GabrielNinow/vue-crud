<script setup lang="ts">
import axios from 'axios'
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  title: string
  isVisible: boolean
  selectedUser: {
    id?: number
    name: string
    email: string
    tel: string
    desc: string
  } | null
}>()

const emit = defineEmits<{
  (event: 'update:isVisible', value: boolean): void
  (event: 'confirmed', user: any): void
}>();

const name = ref('');
const email = ref('');
const tel = ref('');
const desc = ref('');
const emailError = ref('');
const nameError = ref('');
const telError = ref('');

watch(
  () => props.selectedUser,
  user => {
    if (user) {
      name.value = user.name;
      email.value = user.email;
      tel.value = user.tel;
      desc.value = user.desc;
    } else {
      resetForm();
    }
  },
);

function resetForm() {
  name.value = '';
  email.value = '';
  tel.value = '';
  desc.value = '';
  emailError.value = '';
  nameError.value = '';
  telError.value = '';
}

function validateEmail(value: string) {
  return /.+@.+\..+/.test(value);
}

function validateName(value: string) {
  return /^[a-zA-Z\s]+$/.test(value);
}

function validateTel(value: string) {
  return /^[0-9]+$/.test(value);
}

function close() {
  emit('update:isVisible', false);
  resetForm();
}

async function confirm() {
  emailError.value = '';
  nameError.value = '';
  telError.value = '';

  if (!validateEmail(email.value)) emailError.value = 'Invalid email.';
  if (!validateName(name.value)) nameError.value = 'Name cannot contain numbers.';
  if (!validateTel(tel.value)) telError.value = 'Phone number must contain only numbers.';

  if (emailError.value || nameError.value || telError.value) return;

  const formData = { name: name.value, email: email.value, tel: tel.value, desc: desc.value };

  try {
    let response;
    if (props.selectedUser?.id) {
      response = await axios.put(`http://localhost:3000/users/${props.selectedUser.id}`, formData);
    } else {
      response = await axios.post('http://localhost:3000/users', formData);
    }
    emit('confirmed', response.data);
  } catch (error) {
    console.error('Error:', error);
  }

  close();
}
</script>

<template>
  <div v-if="isVisible" class="modal is-active">
    <div class="modal-background" @click="close"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label for="name" class="label">Name</label>
          <p class="control has-icons-left">
            <input id="name" class="input" type="text" v-model="name" placeholder="John Doe" required />
            <span class="icon is-small is-left"><font-awesome-icon :icon="['fas', 'user']" /></span>
          </p>
          <p class="help is-danger" v-if="nameError">{{ nameError }}</p>
        </div>
        <div class="field">
          <label for="email" class="label">Email</label>
          <p class="control has-icons-left">
            <input id="email" class="input" type="email" v-model="email" placeholder="Johndoe@mail.com" required />
            <span class="icon is-small is-left"><font-awesome-icon :icon="['fas', 'envelope']" /></span>
          </p>
          <p class="help is-danger" v-if="emailError">{{ emailError }}</p>
        </div>
        <div class="field">
          <label for="tel" class="label">Telephone</label>
          <p class="control has-icons-left">
            <input id="tel" class="input" type="tel" v-model="tel" placeholder="+99 (99) 99999-9999" required />
            <span class="icon is-small is-left"><font-awesome-icon :icon="['fas', 'phone']" /></span>
          </p>
          <p class="help is-danger" v-if="telError">{{ telError }}</p>
        </div>
        <div class="field">
          <label for="desc" class="label">Description</label>
          <p class="control has-icons-left">
            <input id="desc" class="input" type="text" v-model="desc" placeholder="John Doe is a person that..." />
            <span class="icon is-small is-left"><font-awesome-icon :icon="['fas', 'comment']" /></span>
          </p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <div class="buttons">
          <button class="button is-success" @click="confirm">Confirm</button>
          <button class="button" @click="close">Cancel</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.modal.is-active { display: block; }
.modal-background { background: rgba(0, 0, 0, 0.5); }
</style>
