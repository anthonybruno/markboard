<template>
  <button
    class="inline-block px-3 rounded-full border-2 border-black hover:text-white dark:text-white dark:border-neutral-50"
    :class="[
      {
        'hover:bg-black dark:hover:bg-neutral-50 dark:hover:text-neutral-900':
          isBase,
      },
      { 'hover:bg-emerald-800 hover:border-emerald-800': success },
      { 'hover:bg-rose-800 hover:border-rose-800': danger },
    ]"
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
    success: {
      type: Boolean,
      default: false,
    },
    danger: {
      type: Boolean,
      default: false,
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isBase() {
      const variants = [this.success, this.danger]
      return variants.includes(true) === false
    },
  },
}
</script>
