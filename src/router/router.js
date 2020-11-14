import Vue from 'vue'
import Router from 'vue-router'

import Catalog from '../components/catalog/catalog'
import Cart from '../components/cart/cart'

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'catalog',
            component: Catalog
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart,
            props: true
        },
    ]
})

export default router 
