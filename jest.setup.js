// eslint-disable-next-line no-unused-vars
import Vue from 'vue'
import { formatDistance } from 'date-fns'
import { config } from '@vue/test-utils'

// Mock Nuxt components
config.stubs['nuxt-link'] = '<a><slot /></a>'

Vue.use(formatDistance)

console.log(Vue.options.components)
