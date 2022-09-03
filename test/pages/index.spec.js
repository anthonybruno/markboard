// import formatDistance from 'date-fns/formatDistance'
import { mount, RouterLinkStub } from '@vue/test-utils'
import IndexPage from '@/pages/index.vue'
import BookmarkComponent from '@/components/m-bookmark.vue'
import BookmarkFormComponent from '@/components/m-bookmark-form.vue'
import ButtonComponent from '@/components/m-button.vue'
import ButtonLinkComponent from '@/components/m-button-link.vue'
import InputComponent from '@/components/m-input.vue'
import TagInputComponent from '@/components/m-tagInput.vue'

describe('Index page', () => {
  const factory = (propsData, computedData) => {
    return mount(IndexPage, {
      stubs: {
        NuxtLink: RouterLinkStub,
        'm-bookmark': BookmarkComponent,
        'm-bookmark-form': BookmarkFormComponent,
        'm-tagInput': TagInputComponent,
        'm-input': InputComponent,
        'm-button': ButtonComponent,
        'm-button-link': ButtonLinkComponent,
      },
      computed: {
        ...computedData,
      },
    })
  }

  test('renders bookmark form if empty', () => {
    const page = factory(null, {
      activeEditBookmark: () => null,
      bookmarks: () => [],
      addMode: () => false,
    })

    expect(page.findComponent(BookmarkFormComponent).exists()).toBe(true)
  })

  test('renders bookmarks', () => {
    const page = factory(null, {
      activeEditBookmark: () => null,
      bookmarks: () => [
        {
          url: 'https://www.penguin.co.uk/books/357838/brave-new-world-by-huxley-aldous/9780099518471',
          tags: ['books'],
          title: 'Brave New World',
          createdAt: 1661794539663,
          id: 'GqRB6B6YODFFFpJqWWqj',
          lastUpdated: 1661794539663,
        },
      ],
      addMode: () => false,
    })

    expect(page.findComponent(BookmarkComponent).exists()).toBe(true)
  })
})
