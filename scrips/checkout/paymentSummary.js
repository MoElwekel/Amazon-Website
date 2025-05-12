import {card} from '../../data/card.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deleveryObtions.js';
import { formatCurrency } from '../utils/money.js';
import { addOrder } from '../../data/orders.js';


export function renderPaymentSummary() {
  let productPriceCents = 0;
  let ShippingPriceCents = 0;

  card.forEach(cardItem => {

    const product = getProduct(cardItem.productId);
    productPriceCents += product.priceCents * cardItem.quantity;

    const deliveryOption = getDeliveryOption(cardItem.deliveryOptionId);
    ShippingPriceCents += deliveryOption.priceCents;

  });

  const totalBeforeTaxCents = productPriceCents + ShippingPriceCents;
  const taxCents = totalBeforeTaxCents* 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;



  const paymentSummaryHTML = 
  `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">
        $${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        $${formatCurrency(ShippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary 
      js-place-order">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try {
        const response = await fetch ( 'https://supersimplebackend.dev/orders',{
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({
            cart : card,
          })
        });
        const order = await response.json();
        addOrder(order);
      }catch (error) {
        console.log('Error placing the order');
      }

      window.location.href = 'orders.html';
    });
};