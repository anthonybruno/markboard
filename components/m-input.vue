<template>
  <div class="input">
    <input
      :id="id"
      ref="input"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      class="block w-full p-1 py-2 text-lg font-mono border-transparent bg-transparent dark:text-white"
      @input="$emit('input', $event.target.value)"
      @keyup.down="$emit('down')"
      @keyup.up="$emit('up')"
      @keyup.esc="$emit('esc')"
      @keyup.enter="$emit('enter', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    id: {
      type: String,
      default: null,
    },
    refName: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'text',
      required: true,
      validator(value) {
        return ['text', 'email', 'password', 'url'].includes(value)
      },
    },
    search: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
