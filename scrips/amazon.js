import {card, addToCart} from '../data/card.js';
import {products,loadProducts} from '../data/products.js';
import { formatCurrency } from './utils/money.js';


loadProducts(renderProductsGrid);

function renderProductsGrid() {
  let productsHTML = '';

  products.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container js-product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()} 

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id ="${product.id}">
          Add to Cart
        </button>
      </div>
      `;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  function ubdateCartQuantity() {
    let cartQuantity = 0;

    card.forEach((cardItem) => {
      cartQuantity +=cardItem.quantity;
    });
    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  };

  let timer =0;
  function displayAddedToCart(productId) {
    const addedToCart = document.querySelector(`.js-added-to-cart-${productId}`);
    // If the timer is already set, clear it
    // before setting a new one. This prevents the opacity from being set to 0
    if (timer) {
      clearTimeout(timer);
    };
    addedToCart.style.opacity = '1';
    timer = setTimeout(() => {
      addedToCart.style.opacity = '0';
      timer = 0;
    }, 2000);
  };


  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', (event) => {
        const productId = button.dataset.productId;
        
        displayAddedToCart(productId);
        addToCart(productId);
        ubdateCartQuantity();

      });
  });

}





