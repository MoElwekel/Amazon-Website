import {card , removeFromCart, updateDeliveryOption} from '../../data/card.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deleveryObtions.js';
import {renderPaymentSummary} from './paymentSummary.js';



// This function generates the HTML for the order summary, including product details, delivery options, and quantity.
// It also attaches event listeners for deleting items and updating delivery options.
export function renderOrderSummury(){
  let cardSummaryHTML = '';
  // Loop through the cart array and generate HTML for each product
  card.forEach((cardItem) => {
    const productId = cardItem.productId;
  
    // Find the matching product in the products array
    const matchingProduct =getProduct(productId);

    // Find the delivery option that matches the deliveryOptionId
    const deliveryOptionId = cardItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption( deliveryOptionId);
    
    // Calculate the delivery date
    const today = dayjs();
    const deliverydate = today.add(deliveryOption.deliveryDays, 'day');
    const dateString = deliverydate.format('dddd, MMMM D');  
    // Generate the HTML for the product and its delivery options
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
             ${matchingProduct.getPrice()}
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

  // This function generates the HTML for the delivery options for a specific product.
  function deliveryOptionsHTML(matchingProduct , cardItem){
    let html = '';

    // Loop through the delivery options and generate HTML for each option
    deliveryOptions.forEach((deliveryOption) => {

      // Calculate the delivery date
      const today = dayjs();
      const deliverydate = today.add(deliveryOption.deliveryDays, 'day');
      const dateString = deliverydate.format('dddd, MMMM D');

      // Format the price to be in the format
      const priceString = deliveryOptions.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

      // Check if the delivery option is selected
      const isChecked = deliveryOption.id === Number(cardItem.deliveryOptionId);
      
      // Generate the HTML for the delivery option
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

  // Inject the generated HTML into the DOM
  document.querySelector('.js-order-summary').innerHTML = cardSummaryHTML;

  // Attach event listeners to delete links
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(`.js-card-item-container-${productId}`);
        container.remove();

        renderPaymentSummary();
      });
    });

  // Attach event listeners to delivery option radio buttons
  document.querySelectorAll('.js-delivery-option')
    .forEach((element)=> {
      element.addEventListener('click', ()=>{
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummury();
        renderPaymentSummary();
      });
    });
};



