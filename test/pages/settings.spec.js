// import formatDistance from 'date-fns/formatDistance'
import { mount } from '@vue/test-utils'
import SettingsPage from '@/pages/settings.vue'
import ButtonComponent from '@/components/m-button.vue'

describe('Settings page', () => {
  const factory = (data) => {
    return mount(SettingsPage, {
      stubs: {
        'm-button': ButtonComponent,
      },
    })
  }

  test('renders option to delete', () => {
    const page = factory()
    expect(page.findComponent(ButtonComponent).exists()).toBe(true)
  })
  test('displays confirmation to delete', async () => {
    const page = factory()
    await page.findComponent(ButtonComponent).trigger('click')
    expect(page.find('p').text()).toContain('Are you sure?')
  })
})
