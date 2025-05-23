import {renderOrderSummury} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProducts ,loadProductsFetch} from '../data/products.js';
import {loadCard} from '../data/card.js'
//import '../data/card-calss.js';
//import '../data/backend-pactice.js';

async function loadPage(){
  try {
    // throw 'error1';
    console.log('load page');
    await loadProductsFetch();  

    const value = await new Promise((resolve,reject)=>{
      // throw 'error2';
      loadCard(()=>{
        //reject('error3');
        console.log('finish loading the card');
        resolve('value3');
      });
    });

  }catch (error){
    console.error('Unexpected error');
  }

  //Initial call to render the order summary
  renderOrderSummury();

  // Initial call to render the payment summary
  renderPaymentSummary();
}
loadPage();
/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve)=>{
    loadCard(()=>{
      console.log('finish loading the card');
      resolve();
    });
  }),
]).then((values)=>{
  console.log(values);
  //Initial call to render the order summary
  renderOrderSummury();

  // Initial call to render the payment summary
  renderPaymentSummary();
});
*/
/*
new Promise((resolve)=>{
  console.log('start promise')
  loadProducts(()=>{
    console.log('finish loading the prouducts')
    resolve('val1');
  });

}).then((value)=>{
  console.log('next step');
  console.log(value);
  return new Promise((resolve)=>{
    loadCard(()=>{
      console.log('finish loading the card');
      resolve();
    });
  });

}).then(()=>{
  console.log('next step');

  //Initial call to render the order summary
  renderOrderSummury();

  // Initial call to render the payment summary
  renderPaymentSummary();
  console.log('displaying the page completed');
})
*/

// loadProducts(()=>{
//   loadCard( () => {
//     // Initial call to render the order summary
//     renderOrderSummury();

//     // Initial call to render the payment summary
//     renderPaymentSummary();
//   }); 
// });

