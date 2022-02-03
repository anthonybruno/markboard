<template>
  <div class="input">
    <label v-if="label" :for="id">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
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

<style scoped>
label {
  display: block;
  font-weight: bold;
  padding-top: 10px;
  padding-bottom: 3px;
}
input {
  padding: 5px 10px;
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
