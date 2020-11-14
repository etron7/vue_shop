<template>
<!-- Карточка товара в корзине-->
  <div class="cart-item v-block">
        <h2 class="product-title">{{cart_item_data.title}}</h2>
        <img class="product-img" :src=" require('../../assets/images/' + cart_item_data.image) ">
        <p>Цена: <span class="price">{{cart_item_data.price}}</span></p>
        <p>Артикул: {{cart_item_data.sku}}</p>
        <p>Категория: {{cart_item_data.category}}</p>
        <p>Кол-во:
          <v-btn fab x-small @click="minusItem"><v-icon>mdi-minus</v-icon></v-btn>
           {{cart_item_data.quantity}}
           <v-btn fab x-small @click="plusItem"><v-icon>mdi-plus</v-icon></v-btn>
        </p>
        <v-btn tile color="mx-2" @click="deleteFromCart">Удалить</v-btn>
  </div>
</template>

<script>

export default {
  name: "cart-item",
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  // Price float fix
  filters: {
        // priceFix
    },
  computed: {},
  methods: {
    // Кол-во - 1 +
    minusItem() {
      this.$emit('minus')
    },
    plusItem() {
      this.$emit('plus')
    },
    // Удалить из корзины
    deleteFromCart() {
      this.$emit('deleteFromCart')
    }
  }
}
</script>

<style>
.cart-item {
  width:900px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0.2rem;
  padding: 1rem;
}
/* Mobile */
@media (max-width: 900px) {
.cart-item  {
    width: 300px;
    display: block;
    line-height: 2rem;
  }
}
.btn-quant{
  padding: 5px;
  cursor: pointer;
}
</style>