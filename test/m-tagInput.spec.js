import { mount } from '@vue/test-utils'
import TagInputComponent from '../components/m-tagInput.vue'
import InputComponent from '../components/m-input.vue'

describe('Tag Search Input', () => {
  const factory = () => {
    return mount(TagInputComponent, {
      stubs: {
        'm-input': InputComponent,
      },
      data() {
        return {
          query: 'ar',
        }
      },
      computed: {
        tags: () => [
          { name: 'arts' },
          { name: 'blogs' },
          { name: 'books' },
          { name: 'good-reads' },
          { name: 'tech' },
          { name: 'websites' },
        ],
        newestQuery: () => 'ar',
      },
    })
  }

  test('renders a input field', () => {
    const page = factory()
    const input = page.findComponent(InputComponent)
    expect(input.exists()).toBe(true)
  })
})
