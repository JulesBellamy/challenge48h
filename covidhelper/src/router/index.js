import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'connexion',
      component: require('@/components/Connexion').default
    },
    {
      path: '/menu',
      name: 'menu',
      component: require('@/components/Menu').default
    },
    {
      path: '/profil',
      name: 'profil',
      component: require('@/components/Profil').default
    },
    {
      path: '/postoffer',
      name: 'postoffer',
      component: require('@/components/PostOffer').default
    },
  ]
})
