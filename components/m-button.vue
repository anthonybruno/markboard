<template>
  <button
    :type="type"
    :class="['btn', `btn-${variant}`]"
    @click.prevent="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    label: {
      type: String,
      default: null,
      required: true,
    },
    type: {
      type: String,
      default: 'button',
      validator(value) {
        return ['button', 'submit'].includes(value)
      },
    },
    variant: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'secondary', 'google', 'github'].includes(value)
      },
    },
  },
}
</script>

<style scoped>
button {
  font-family: monospace;
  appearance: none;
  border: 0;
  background-color: #bb4430;
  color: #fff;
  padding: 5px 10px;
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;
}

.btn-google {
  background-color: #4285f4;
}
.btn-github {
  background-color: #181717;
}
</style>
