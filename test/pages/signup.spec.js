// import formatDistance from 'date-fns/formatDistance'
import { mount, RouterLinkStub } from '@vue/test-utils'
import SignupPage from '@/pages/signup.vue'
import ButtonComponent from '@/components/m-button.vue'

describe('Settings page', () => {
  const factory = (routeName) => {
    return mount(SignupPage, {
      stubs: {
        NuxtLink: RouterLinkStub,
        'm-button': ButtonComponent,
      },
      mocks: {
        $route: {
          name: routeName,
        },
      },
    })
  }

  test('renders option to login', () => {
    const page = factory('login')
    expect(page.vm.isSignup).toBe(false)
    expect(page.vm.signupOrLogin).toBe('Log in')
  })

  test('renders option to sign up', () => {
    const page = factory('signup')
    expect(page.vm.isSignup).toBe(true)
    expect(page.vm.signupOrLogin).toBe('Sign up')
  })
})
