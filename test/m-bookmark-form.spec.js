// import formatDistance from 'date-fns/formatDistance'
import { mount, RouterLinkStub } from '@vue/test-utils'
import BookmarkFormComponent from '../components/m-bookmark-form.vue'
import ButtonComponent from '../components/m-button.vue'
import ButtonLinkComponent from '../components/m-button-link.vue'
import InputComponent from '../components/m-input.vue'
import TagInputComponent from '../components/m-tagInput.vue'

describe('Bookmark Form', () => {
  const factory = (propsData) => {
    return mount(BookmarkFormComponent, {
      stubs: {
        NuxtLink: RouterLinkStub,
        'm-tagInput': TagInputComponent,
        'm-input': InputComponent,
        'm-button': ButtonComponent,
        'm-button-link': ButtonLinkComponent,
      },
      propsData: {
        id: 'GqRB6B6YODFFFpJqWWqj',
        title: 'Wikipedia.org',
        created: 1661794539663,
        url: 'https://wikipedia.org',
        ...propsData,
      },
    })
  }

  test('renders form in edit mode', () => {
    const wrapper = factory({
      edit: true,
      tags: ['foo', 'bar'],
    })

    const editButton = wrapper.findComponent(ButtonComponent)
    expect(editButton.text()).toContain('Cancel')
  })

  test('renders form in add mode', () => {
    const wrapper = factory()

    const editButton = wrapper.findComponent(ButtonComponent)
    expect(editButton.text()).toContain('Add')
  })
})
