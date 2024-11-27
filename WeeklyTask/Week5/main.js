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
                <b v-if="recommend.option">This product is recommended for you!</b>
                <p v-if="inventory > 10">In Stock</p>
                <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
                <p v-else :class="{ outOfStock: !inStock}">Out of Stock</p>
                <p>Shipping: {{ shipping }}</p>
                <span v-show="onSale">On Sale!</span>

                <product-details :details="details"></product-details>

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

            </div>

            <div>
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{ review.name }}</p>
                        <p>Rating: {{ review.rating }}</p>
                        <p>{{ review.review }}</p>
                    </li>
                </ul>
            </div>

            <product-review @review-submitted="addReview"></product-review>
            <product-recommend @recommend-submitted="addRecommend"></product-recommend>
        </div>
    `,
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        id: {
            type: Number,
            required: true,
        }
    },
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
            brand: "Vue Mastery",
            reviews: [],
            recommend: {},
        }
    },
    methods: {
        addToCart: function () {
            this.$emit('add-to-cart', this.id);
        },
        removeFromCart: function () {
            this.$emit('remove-to-cart', this.id);
        },
        updateProduct: function (index) {
            this.selectedVariant = index;
        },
        addReview(productReview) {
            this.reviews.push(productReview);
        },
        addRecommend(productRecommend) {
            this.recommend = productRecommend;
        },
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
        shipping() {
            if (this.premium) {
                return "Free";
            }
            return 2.99
        },
    }
})

Vue.component("product-details", {
    template: `
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `,
    props: {
        details: {
            type: Array,
            required: true
        }
    },
});

Vue.component("product-review", {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>

            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name" placeholder="name">
            </p>
            
            <p>
                <label for="review">Review:</label>      
                <textarea id="review" v-model="review"></textarea>
            </p>
            
            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>
                
            <p>
                <input type="submit" value="Submit">  
            </p>    
            
        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: Number(this.rating),
                  }
                  this.$emit('review-submitted', productReview)
                  this.name = null
                  this.review = null
                  this.rating = null
                  this.errors = []
            }
            else {
                if(!this.name) this.errors.push("Name required.");
                if(!this.review) this.errors.push("Review required."); 
                if(!this.rating) this.errors.push("Rating required.");
            }
        },
    },
});

Vue.component("product-recommend", {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>

            <p>Would you recommend this product?</p>
            <input type="radio" id="yes" v-model.number="option" name="option" value="true">
            <label for="yes">Yes</label><br>
            <input type="radio" id="no" v-model.number="option" name="option" value="no">
            <label for="no">No</label><br>
                
            <p>
                <input type="submit" value="Submit">  
            </p>    
            
        </form>
    `,
    data() {
        return {
            option: false,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.option) {
                let productRecommend = {
                    option: this.option,
                  }
                  this.$emit('recommend-submitted', productRecommend)
                  this.option = null
                  this.errors = []
            }
            else {
                if(!this.option) this.errors.push("You must select an option.");
            }
        },
    },
});

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
    },
    methods: {
        updateCart(id) {
            if (this.inventory <= 0) {
                return
            }
            console.log(this.cart)
            this.cart.push(id);
            this.inventory -= 1;
        },
        removeCart(id) {
            if (this.cart <= 0) return;
            while (this.cart.indexOf(id) !== -1) {
                this.cart.splice(this.cart.indexOf(id), 1);
            }
            this.inventory += 1;
        }
    }
})
