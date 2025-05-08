import {card , removeFromCart, updateDeliveryOption} from '../data/card.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions} from '../data/deleveryObtions.js';


hello();

const today = dayjs();
const deliverydate = today.add(7, 'day');
// Format the date to be in the format of "dddd, MMMM D"
console.log(deliverydate.format('dddd, MMMM D'));


let cardSummaryHTML = '';

card.forEach((cardItem) => {
  const productId = cardItem.productId;
  
  let matchingProduct;
  
  // search for the product in the product array to get the product details
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }

  });

   // Find the delivery option that matches the deliveryOptionId
  const deliveryOptionId = cardItem.deliveryOptionId;
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === Number(deliveryOptionId)) {
      deliveryOption = option;
    }
  });
  const today = dayjs();
  const deliverydate = today.add(deliveryOption.deliveryDays, 'day');
  const dateString = deliverydate.format('dddd, MMMM D');  
  
  cardSummaryHTML += `
    <div class="cart-item-container js-card-item-container-${productId}" 
      data-product-id="${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cardItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cardItem)}
        </div>
      </div>
    </div>
  `;

});
 



// Function to create the delivery options HTML
function deliveryOptionsHTML(matchingProduct , cardItem){
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
    // Generate the HTML
    // Set the delivery date 
    const today = dayjs();
    const deliverydate = today.add(deliveryOption.deliveryDays, 'day');
    const dateString = deliverydate.format('dddd, MMMM D');
    // Format the price to be in the format
    const priceString = deliveryOptions.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`;
    // Check if the delivery option is selected
    const isChecked = deliveryOption.id === Number(cardItem.deliveryOptionId);
    
    html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''} 
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString}  Shipping
          </div>
        </div>
      </div>
    `
  });
  return html;
};

document.querySelector('.js-order-summary').innerHTML = cardSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(`.js-card-item-container-${productId}`);
    container.remove();
  });
});

document.querySelectorAll('.js-delivery-option')
  .forEach((element)=> {
    element.addEventListener('click', ()=>{
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
    });
  });



