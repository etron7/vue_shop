import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vuex.Store( {
    state: {
        products: [],
        cart: []
    },
    mutations: {
        // Product
        SET_PRODUCTS_TO_STATE: (state, products) => {
            state.products = products;
        },
        // If unic product in cart, inrement item quantity +1
        SET_CART: (state, product) => {
            if (state.cart.length) {
                let isProductExists = false;
                state.cart.map(function (item) {
                    if (item.sku === product.sku) {
                        isProductExists = true;
                        item.quantity++
                    }
                })
                // else add to cart
                if (!isProductExists) {
                    state.cart.push(product)
                }
            } else {
                state.cart.push(product)
            }
        },
        // Delete from cart
        REMOVE_FROM_CART: (state, index) => {
            state.cart.splice(index, 1)
        },
        // Increment/Decrement item cart
        PLUS:(state, index) => {
            state.cart[index].quantity++
        },
        MINUS:(state, index) => {
            if (state.cart[index].quantity > 1) {
                state.cart[index].quantity--
            }
        }
    },
    // Get data from API
    actions: {
        GET_PRODUCTS_FROM_API({commit}) {
            return axios('http://localhost:3000/products/', {
                method: "GET"
            })
            .then((products) => {
                commit('SET_PRODUCTS_TO_STATE', products.data);
                return products;
            })
            .catch((error) => {
                console.log(error)
                return error;
            })
        },
        // Add to Cart
        ADD_TO_CART({commit}, product) {
            commit('SET_CART', product);
        },
        DELETE_FROM_CART({commit}, index) {
            commit('REMOVE_FROM_CART', index)
        },
        PLUS_CART_ITEM({commit}, index) {
            commit('PLUS', index)
        },
        MINUS_CART_ITEM({commit}, index) {
            commit('MINUS', index)
        }
    },
    getters: {
        PRODUCTS(state) {
            return state.products;
        },
        CART(state) {
            return state.cart;
        }
    }
});

export default store;