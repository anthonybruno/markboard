// import formatDistance from 'date-fns/formatDistance'
import { mount, RouterLinkStub } from '@vue/test-utils'
import BookmarkComponent from '../components/m-bookmark.vue'
import ButtonLinkComponent from '../components/m-button-link.vue'
import ButtonComponent from '../components/m-button.vue'

describe('Bookmark', () => {
  const factory = (propsData) => {
    return mount(BookmarkComponent, {
      stubs: {
        NuxtLink: RouterLinkStub,
        'm-button-link': ButtonLinkComponent,
        'm-button': ButtonComponent,
      },
      propsData: {
        id: 'wiki',
        title: 'Wikipedia.org',
        created: 1661794539663,
        url: 'https://wikipedia.org',
        ...propsData,
      },
    })
  }

  test('renders a bookmark', () => {
    const wrapper = factory({
      tags: ['foo', 'bar'],
    })

    const el = wrapper.find('div')
    expect(el.exists()).toBe(true)
    expect(el.text()).toContain('Wikipedia.org')

    const tag = wrapper.findComponent(ButtonLinkComponent)
    expect(tag.exists()).toBe(true)
  })

  test('optionally renders tags', () => {
    const bookmark = factory()
    const tags = bookmark.findComponent(ButtonLinkComponent)
    expect(tags.exists()).toBe(false)
  })
})
