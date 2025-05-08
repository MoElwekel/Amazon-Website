import {card} from '../../data/card.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deleveryObtions.js';
import { formatCurrency } from '../utils/money.js';



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

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;












};