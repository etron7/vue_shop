<template> 
  <div class="catalog-item v-block">
      <!-- Card in modal-->
      <Popup
        popupTitle="Инфо"
        v-if="isPopupInfoVisible"
        @closePopup="closeInfoPopup"
       >
       <div class="popup-info">
        <h3 class="product-title">{{product_data.title}}</h3>
            <img class="product-img-popup" :src=" require('../../assets/images/' + product_data.image) ">
            <p>Цена: <span class="price">{{product_data.price}}₽</span></p>
            <p>Артикул: {{product_data.sku}}</p>
            <p>Категория: {{product_data.category}}</p>
            <p class="desc"><span class="desc-title">Описание:</span> {{product_data.description}}</p>
            <v-btn tile color="success btn" @click="addToCart">Купить</v-btn>
        </div>
       </Popup>
      <!-- Card -->
      <h3 class="product-title">{{product_data.title}}</h3>
        <img class="product-img" :src=" require('../../assets/images/' + product_data.image) ">
        <p>Цена: <span class="price">{{product_data.price}}₽</span></p>
        <p>Артикул: {{product_data.sku}}</p>
        <p>Категория: {{product_data.category}}</p>
        <v-btn tile color="success btn" @click="showPopupInfo">Инфо</v-btn>
        <v-btn tile color="success btn" @click="addToCart">Купить</v-btn>
  </div>
</template>

<script>
import Popup from '../extention/popup'

export default {

    name:"catalog-item",
    components: {
        Popup
    },
    props: {
        product_data: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            isPopupInfoVisible: false
        }
    },
    computed: {},
    methods: {
        showPopupInfo() {
            this.isPopupInfoVisible = true;
        },
        closeInfoPopup() {
            this.isPopupInfoVisible = false;
        },
        addToCart() {
            this.$emit('addToCart', this.product_data);
        }
    },
    mounted() {
    this.$set(this.product_data, 'quantity', 1)
  }
}
</script>

<style>
.catalog-item {
    margin: 0.2rem;
    padding: 1rem;
    line-height: 1.7rem;
    text-align: center;
}
img.product-img {
    width: 150px;
    margin: 5px;
}
img.product-img-popup {
    width: 250px;
    margin: 5px;
}
.btn {
    display: inline;
    background: teal;
    color: white;
    border: none;
    margin: 3px;
    padding: 0.5rem;
}
.btn:hover {
    background: #009688;
}
.product-title {
    color: teal;
    font-size: 1.5rem;
}
.price {
    color:red;
    font-size: 15px;
    font-weight: bold;
}
.desc-title {
    font-weight: bold;
}
p.desc {
    text-align: left;
    line-height: normal;
}
</style>
