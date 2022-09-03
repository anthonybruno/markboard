import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import ButtonLinkComponent from '../components/m-button-link.vue'

describe('ButtonLink', () => {
  test('renders a button', () => {
    const wrapper = shallowMount(ButtonLinkComponent, {
      stubs: {
        NuxtLink: RouterLinkStub,
      },
      propsData: {
        to: { name: 'index' },
      },
      slots: {
        default: 'I am a button label',
      },
    })

    const el = wrapper.find('a')
    expect(el.exists()).toBe(true)
    expect(el.text()).toBe('I am a button label')
  })
})
