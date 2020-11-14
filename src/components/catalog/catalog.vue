<template>
<!-- Catalog -->
  <div class="catalog">
      <router-link :to="{name: 'cart', params: {cart_data: CART}}">
          <div class="link-cart">
            <!-- link to cart -->
                <v-btn
                class="mx-2 border-white"
                fab
                color="teal"
                >
                <v-icon>
                    mdi-cart
                </v-icon>
                {{CART.length}}
                </v-btn>

              </div>
      </router-link>
      
      <h2 class="title">Каталог</h2>

    <!-- Search input -->
      <div class="search">
          <v-text-field
            v-model="search"
            label="Поиск"
          ></v-text-field>
      </div>

      <div class="wrapper-empty"></div>
      <div class="wrapper-empty"></div>
      
      <!-- Select filter by category -->
        <div class="filters">
            <Select
                :selected="selected"
                :options="categories"
                @select="sortByCategories"
            />
            <!-- Range-slider filter by price -->
            <div class="range-slider">
                <p class="range-title">Фильтр по цене: {{minPrice}} - {{maxPrice}}</p>
                <input type="range" min="0" max="10000" step="10" 
                    v-model.number="minPrice"
                    @change="setRangeSlider"
                >
                <input type="range" min="0" max="10000" step="10" 
                    v-model.number="maxPrice"
                    @change="setRangeSlider"
                >
            </div>
        </div>
        
        <div class="wrapper-empty"></div>

        <!-- Product list -->
        <div class="catalog-items">
            <CatalogItem
                v-for="product in filteredProducts"
                :key="product.sku"
                :product_data="product"
                @addToCart="addToCart"
            />
        </div>

        <div class="wrapper-empty"></div>

  </div>
</template>

<script>
import CatalogItem from '../catalog/catalog-item'
import {mapActions, mapGetters} from 'vuex'
import Select from '../extention/select'

export default {
    name:"catalog",
    components: {
        CatalogItem,
        Select
    },
    props: {},
    data() {
        return {
            categories: [
                {name: 'Все', value: 'all'},
                {name: 'Q1', value: 'q1'},
                {name: 'Q2', value: 'q2'},
            ],
            selected: 'Все',
            sortedProducts: [],
            search: '',
            // Filter price
            minPrice: 0,
            maxPrice: 10000,
            }
    },
    computed:{
        ...mapGetters([
            'PRODUCTS',
            'CART'
        ]),
        // Sorted product and search
        filteredProducts() {
            if (this.sortedProducts.length) {
                // return this.sortedProducts
                return this.sortedProducts.filter((product) => {
                return product.title.match(this.search);
            });
            } else {
                // Default product
               return this.PRODUCTS
            }
        },
    },
    methods:{
        ...mapActions([
            'GET_PRODUCTS_FROM_API',
            'ADD_TO_CART'
        ]),
        // Range sliders change fix
        setRangeSlider() {
            if (this.minPrice > this.maxPrice) {
                let tmp = this.maxPrice;
                this.maxPrice = this.minPrice;
                this.minPrice = tmp;
            }
            this.sortByCategories()
        },
        // Filter product
        sortByCategories(category) {
            let ctx = this;
            this.sortedProducts = [...this.PRODUCTS]
            // Filter by price
            this.sortedProducts = this.sortedProducts.filter(function (item) {
                return item.price >= ctx.minPrice && item.price <= ctx.maxPrice
            })
            // Filter by category
            if (category) {
                this.sortedProducts = this.sortedProducts.filter(function (e) {
                    ctx.selected === category.name // category name in select
                    return e.category === category.name
                })
            }
        },
        addToCart(data) {
            this.ADD_TO_CART(data)
        },
    },
    mounted() {
        this.GET_PRODUCTS_FROM_API()
        .then((response) => {
            if (response.data) {
                console.log('Data loaded!')
                // base sort
                this.sortByCategories()
            }
        })
    }
}
</script>

<style>
.catalog {
     max-width: 900px;
}
.catalog-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.link-cart {
    position: absolute;
    top:5px;
    right: 5px;
}
/* Filters */
.filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
/* Price filter */
.range-slider {
    width:200px;
    text-align: center;
    position: relative;
}
.range-slider svg, .range-slider input[type=range] {
    position: absolute;
    right:35px
}
input[type=range]::-webkit-slider-thumb {
    z-index: 2;
    position: relative;
    top: 2px;
    margin-top: -7px;
}
p.range-title {
    margin: 0.3rem;
}
</style>