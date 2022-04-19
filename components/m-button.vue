<template>
  <button
    class="inline-block font-mono rounded text-white p-3 bg-purple-700"
    :type="type"
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
