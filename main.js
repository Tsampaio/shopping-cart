let carts = document.querySelectorAll('.add-cart');

let totalItems;
let cart;
let updateCart;
let currentProduct;
let productName;

let products = [ 
    {
        name: "tshirt1",
        price: 15,
        inCart: 0
    },
    {
        name: "tshirt2",
        price: 20,
        inCart: 0
    },
    {
        name: "tshirt3",
        price: 15,
        inCart: 0
    },
    {
        name: "tshirt4",
        price: 20,
        inCart: 0
    }
];

for(let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click', () => {
        // console.log('button clicked');
        // console.log(carts[i].nextElementSibling.value);
        
        totalCost(carts[i], products[i].price );
        setItems(products[i], i);
        // console.log("Before adding " + typeof totalItems + " and value is " + totalItems);
        
    });
}

function setItems(items, index) {
    cartItems = localStorage.getItem('productsInCart');
    // console.log("initially totalItems is " + typeof totalItems);
    // console.log(totalItems);
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);
    console.log(typeof cartItems);
    
    if(cartItems != null) {
        currentProduct = products[index].name;
        console.log("current product is", currentProduct);
        console.log(cartItems[products[index].name]);
        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems,
                [currentProduct]: items
            }
        }

        cartItems[currentProduct].inCart += 1;
        
    } else {

        switch (index) {
            case 0:
                cartItems = { tshirt1: items };
              break;
            case 1:
                cartItems = { tshirt2: items };
                break;
            case 2:
                cartItems = { tshirt3: items };
                break;
            case 3:
                cartItems = { tshirt4: items };
                break;
            default:
                break;
        }
        console.log(cartItems);
        cartItems[Object.keys(cartItems)[0]].inCart = 1;
    }

    
    
    console.log("stored products");
   
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(el, price ) {
    cart = localStorage.getItem("totalCost");

    if(cart != null) {
        
        // console.log("total items updated");
        cart = parseInt(cart);
        // console.log("typeof cart is", typeof cart , " and value is ", cart);
        // console.log("typeof input is", typeof el.nextElementSibling.value , " and value is ", el.nextElementSibling.value);
        
        localStorage.setItem("totalCost", cart + price);
        document.querySelector('.cart span').textContent = cart + price;
    } else {
        localStorage.setItem("totalCost", price);
        document.querySelector('.cart span').textContent = price;
    }

    // localStorage.setItem("totalItems", totalItems + 1 );
    //     updateCart();
}

function displayCart() {
    cartItems = localStorage.getItem('productsInCart');

    cartItems = JSON.parse(cartItems);

    console.log(cartItems);
    console.log(typeof cartItems);
    console.log(Object.values(cartItems));
    let productContainer = document.querySelector('.products');
    productContainer.innerHTML = '';
    if( cartItems && productContainer ) {
        Object.values(cartItems).map( (item) => {
            return productContainer.innerHTML += `
            <div class="product"><ion-icon name="close-circle"></ion-icon><img src="./images/${item.name}.jpg" />${item.name}</div>
            <div class="price">$${item.price},00</div>
            <div class="quantity">${item.inCart}</div>
            <div class="total">$${item.inCart * item.price},00</div>
            `
        });
        
    }
}

function deleteProduct() {
    cartItems = localStorage.getItem('productsInCart');

    cartItems = JSON.parse(cartItems);

    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productName;

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent;
            console.log(productName);
            delete cartItems[productName];
            console.log(cartItems);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        })
    }
}

displayCart();
