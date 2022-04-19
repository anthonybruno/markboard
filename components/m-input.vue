<template>
  <div class="input">
    <label v-if="label" :for="id" class="block font-bold pt-5 pb-3">
      {{ label }}
    </label>
    <input
      :id="id"
      ref="input"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      class="py-2 px-3 mb-3 text-lg font-mono border rounded border-slate-400"
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
        return ['text', 'email', 'password'].includes(value)
      },
    },
  },
}
</script>
