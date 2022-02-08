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
        return ['primary', 'secondary'].includes(value)
      },
    },
  },
}
</script>

<style scoped>
button {
  appearance: none;
  border: 0;
  background-color: #3d405b;
  color: #fff;
  padding: 5px 10px;
  font-size: 18px;
  cursor: pointer;
}
</style>
