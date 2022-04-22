export default function ({ store, route, redirect }) {
  // If the user is not authenticated
  if (store.state.userId === null) return redirect('login')
}
