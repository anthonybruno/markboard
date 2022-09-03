import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import Logo from '../components/m-logo.vue'

describe('Logo', () => {
  test('is heading with link', () => {
    const wrapper = shallowMount(Logo, {
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    })
    const title = wrapper.findComponent(Logo)
    expect(title.html()).toContain('<h1>')
    expect(title.html()).toContain('<a>')
  })
  test('has title', () => {
    const wrapper = shallowMount(Logo, {
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    })
    const title = wrapper.findComponent(Logo)
    expect(title.text()).toBe('Markboard')
  })
})
