export const state = () => ({
  list: [],
  loading: false
})

export const getters = {
  initials (state) {
    const user = state.auth.user
    if (!user) {
      return ''
    }
    if (!user.name) {
      return ''
    }
    const [firstName, lastName] = user.name.split(' ')
    if (!lastName) {
      return `${firstName.split('')[0]}`
    }
    return `${firstName.split('')[0]}${lastName.split('')[0]}`
  },

  authUser (state) {
    return state.auth ? state.auth.user : null
  }
}

export const mutations = {
  setLoading (state, loading) {
    state.loading = loading
  }
}
