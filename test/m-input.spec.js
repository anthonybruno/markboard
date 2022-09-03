import { shallowMount } from '@vue/test-utils'
import InputComponent from '../components/m-input.vue'

describe('Input', () => {
  test('renders an input', () => {
    const wrapper = shallowMount(InputComponent, {
      propsData: {
        value: 'I am an input',
        label: 'Input title',
        id: 'foo',
        placeholder: 'Input placeholder',
        type: 'text',
      },
    })

    const div = wrapper.find('div')
    expect(div.exists()).toBe(true)
    expect(div.classes()).toContain('input')
    expect(div.classes('input')).toBe(true)
  })

  test('can be passed a value', () => {
    const wrapper = shallowMount(InputComponent, {
      propsData: {
        value: 'I am an input',
        label: 'Input title',
        id: 'foo',
        placeholder: 'Input placeholder',
        type: 'text',
      },
    })

    expect(wrapper.props().value).toBe('I am an input')
  })
})
