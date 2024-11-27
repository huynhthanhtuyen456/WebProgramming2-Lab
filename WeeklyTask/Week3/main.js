var app = new Vue({
    el: '#app',
    data: {
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
    }
})