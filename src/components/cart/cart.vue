<template>
<!-- Cart -->
  <div class="container">
      <div class="cart">
        <router-link :to="{name: 'catalog'}" title="Каталог">
          <div class="link-cart">
            <!-- Link cart to catalog -->
            <v-btn
              class="mx-2 border-white"
              fab
              color="teal"
            >
              <v-icon>mdi-format-list-bulleted-square</v-icon>
            </v-btn>
          </div>
        </router-link>
        <!-- link end -->
          <h2 class="title">Корзина</h2>
            <!-- Total price text -->
            <div class="cart-total v-block">
              <p>Всего: {{cartTotalCost}}₽</p>
            </div>
            <p class="cart-text" v-if="!cart_data.length">Корзина пуста</p>
              <CartItem
                v-for="(item, index) in cart_data"
                :key="item.sku"
                :cart_item_data="item"
                @deleteFromCart="deleteFromCart(index)"
                @minus="minus(index)"
                @plus="plus(index)"
              />
      </div>
</div>
</template>

<script>
import CartItem from './cart-item'
import {mapActions} from 'vuex'

export default {
  name:"cart-item",
  components: {
    CartItem
  },
  props: {
    cart_data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    cartTotalCost() {
      let result = []
      // If in cart product true,  item price *  item quantity
        if (this.cart_data.length) {
            for (let item of this.cart_data) {
          result.push(item.price * item.quantity)
        }
      // Total price 
        result = result.reduce(function (sum, element) {
          return sum + element;
        })
          return result;
      } else {
        return 0
      }

    }
  },
  methods: {
    ...mapActions ([
        'DELETE_FROM_CART',
        'MINUS_CART_ITEM',
        'PLUS_CART_ITEM'
      ]),
      minus(index) {
        this.MINUS_CART_ITEM(index)
      },
      plus(index) {
        this.PLUS_CART_ITEM(index)
      },
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index)
    }
  }
}
</script>

<style>
.cart-total {
  bottom: 0;
  padding: 1rem;
  justify-content: center;
  background: teal;
  color: white;
  margin: auto;
  margin-bottom: 1rem;
  width: fit-content;
}
.cart-text{
  text-align: center;
}
</style> 
