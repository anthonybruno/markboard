import { shallowMount } from '@vue/test-utils'
import ButtonComponent from '../components/m-button.vue'

describe('Button', () => {
  test('renders a button', () => {
    const wrapper = shallowMount(ButtonComponent, {
      propsData: {
        label: 'I am a button',
      },
    })

    const el = wrapper.find('button')
    expect(el.exists()).toBe(true)
    expect(el.text()).toBe('I am a button')
  })

  test('has a success variant', () => {
    const wrapper = shallowMount(ButtonComponent, {
      propsData: {
        label: 'I am a button',
        success: true,
      },
    })

    const el = wrapper.find('button')
    expect(el.exists()).toBe(true)
    expect(el.classes()).toContain('hover:bg-emerald-800')
  })

  test('has a danger variant', () => {
    const wrapper = shallowMount(ButtonComponent, {
      propsData: {
        label: 'I am a button',
        danger: true,
      },
    })

    const el = wrapper.find('button')
    expect(el.exists()).toBe(true)
    expect(el.classes()).toContain('hover:bg-rose-800')
  })
})
