let carts = document.querySelectorAll('.add-cart');

let totalItems;
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
        
        cartNumbers(products[i]);
        totalCost(products[i]);
        
        // console.log("Before adding " + typeof totalItems + " and value is " + totalItems);
        
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if( productNumbers ) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    // console.log("initially totalItems is " + typeof totalItems);
    // console.log(totalItems);
    cartItems = JSON.parse(cartItems);

    console.log(cartItems);
    console.log(product.name);
    console.log("My actions is ", action);
    if( action ) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");
    } else if( productNumbers ) {
        
        // cartItems[product.name].inCart += 1;
        // console.log(cartItems[product.name]);
        // console.log(cartItems[product.name].inCart);
        // console.log("Product is ", product , "and incart is", cartItems[product.name].inCart);
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
        console.log("this is true");
    } else {
        
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    console.log(product);

    setItems(product);
    
}

function setItems(product) {
    // console.log("Inside setitems items is", items);
    // console.log("Inside setitems index is", index);

    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    // console.log("initially totalItems is " + typeof totalItems);
    // console.log(totalItems);
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);
    console.log(typeof cartItems);
    console.log(product.name);
    
    if(cartItems != null) {
        currentProduct = product.name;
        console.log("current product is", currentProduct);
        // console.log(cartItems[products[index].name]);
        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        } 
        // else {
        //     cartItems[currentProduct] = product
            
        // }

        cartItems[currentProduct].inCart += 1;
        // document.querySelector('.cart span').textContent = productNumbers + 1;
        
    } else {
        product.inCart = 1;

        cartItems = { 
            [product.name]: product
        };

        // switch (index) {
        //     case 0:
        //         cartItems = { tshirt1: product };
        //       break;
        //     case 1:
        //         cartItems = { tshirt2: product };
        //         break;
        //     case 2:
        //         cartItems = { tshirt3: product };
        //         break;
        //     case 3:
        //         cartItems = { tshirt4: product };
        //         break;
        //     default:
        //         break;
        // }
        // console.log(cartItems);
        // cartItems[Object.keys(cartItems)[0]].inCart = 1;
        // document.querySelector('.cart span').textContent = productNumbers + 1;
    }

    console.log("stored products");
   
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost( product, action ) {
    let cart = localStorage.getItem("totalCost");

    if( action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price);
    } else if(cart != null) {
        
        // console.log("total items updated");
        cart = parseInt(cart);
        // console.log("typeof cart is", typeof cart , " and value is ", cart);
        // console.log("typeof input is", typeof el.nextElementSibling.value , " and value is ", el.nextElementSibling.value);
        
        localStorage.setItem("totalCost", cart + product.price);
        //document.querySelector('.cart span').textContent = cart + price;
    } else {
        localStorage.setItem("totalCost", product.price);
        // document.querySelector('.cart span').textContent = price;
    }

    // localStorage.setItem("totalItems", totalItems + 1 );
    //     updateCart();
}

function displayCart() {
    cartItems = localStorage.getItem('productsInCart');

    cartItems = JSON.parse(cartItems);

    console.log(cartItems);
    // console.log(typeof cartItems);
    // console.log(Object.values(cartItems));
    let productContainer = document.querySelector('.products');
    
    if( cartItems && productContainer ) {
        console.log(Object.keys(cartItems).length);
        productContainer.innerHTML = '';

        Object.values(cartItems).map( (item, index) => {
            productContainer.innerHTML += 
            `<div class="product"><ion-icon name="close-circle"></ion-icon><img src="./images/${item.name}.jpg" /><span>${item.name}</span></div>
            <div class="price">$${item.price},00</div>
            <div class="quantity">
                <ion-icon class="decrease " name="arrow-dropleft-circle"></ion-icon>
                    <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>   
            </div>
            <div class="total">$${item.inCart * item.price},00</div>`;

        });

        deleteButtons();
        manageQuantity();
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) {
        

        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent;
            console.log(currentProduct);

            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent;
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let productName;

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent;
            console.log(productName);
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            console.log(cartItems);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
            onLoadCartNumbers();
        })
    }
}

onLoadCartNumbers();
displayCart();
