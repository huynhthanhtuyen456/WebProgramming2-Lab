Vue.component('product', {
    template: `
        <div class="product">

            <div class="product-image">
                <a :href="image" target="_blank">
                    <img v-bind:src="image" v-bind:alt="altText">
                </a>
            </div>

            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="inventory > 10">In Stock</p>
                <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
                <p v-else :class="{ outOfStock: !inStock}">Out of Stock</p>
                <span v-show="onSale">On Sale!</span>

                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>

                <div class="color-box"
                    v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    :style="{ backgroundColor: variant.variantColor }"
                    @mouseover="updateProduct(index)">
                </div>

                <div>
                    <p>Sizes: </p>
                    <ul v-for="size in sizes" :key="size.sizeId">
                        <li>{{ size.size }}</li>
                    </ul>
                </div>

                <button 
                    @click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }">Add to Cart</button>
                <button @click="removeFromCart">Remove from Cart</button>
    
                <div class="cart">
                    <p>Cart({{cart}})</p>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            product: "Socks",
            description: "A pair of warm, fuzzy socks",
            selectedVariant: 0,
            altText: "A pair of socks",
            inventory: 5,
            onSale: true,
            details: ["80% cotton", "20% polyester", "Gender-nuetral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: "./assets/images/socks_green.jpg",
                    variantQuantity: 10,
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: "./assets/images/socks_blue.jpg",
                    variantQuantity: 0
                }
            ],
            sizes: [
                {
                    sizeId: 1,
                    size: "S"   
                },
                {
                    sizeId: 2,
                    size: "M"
                },
                {
                    sizeId: 3,
                    size: "L"
                },
                {
                    sizeId: 4,
                    size: "XL"
                },
                {
                    sizeId: 5,
                    size: "XXL"
                }
            ],
            cart: 0,
            brand: "Vue Mastery",
        }
    },
    methods: {
        addToCart: function () {
            if (this.inventory <= 0) {
                return
            }
            this.cart += 1;
            this.inventory -= 1;
        },
        removeFromCart: function () {
            if (this.cart <= 0) return;
            this.cart -= 1;
            this.inventory += 1;
        },
        updateProduct: function (index) {
            this.selectedVariant = index;
            console.log(index);
        }
    },
    computed: {
        title() {
            return this.onSale ? this.brand + ' ' + this.product + ' is On Sale' : this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
    }
})

var app = new Vue({
    el: '#app'
})
