class Card {
  cardItems ;
  #localStorageKey ;


  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage(){
    this.cardItems = JSON.parse(localStorage.getItem(this.#localStorageKey))|| [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
  }


  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cardItems));
  }

  addToCart(productId) {
    let matchingItem;
    // Check if the product is already in the cart
    // If it is, increase the quantity by 1
    this.cardItems.forEach((cardItem) => {
      if (cardItem.productId === productId) {
        matchingItem = cardItem;
      }
    });
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cardItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCard = [];
  
    this.cardItems.forEach((cardItem) => {
      if (cardItem.productId !== productId) {
        newCard.push(cardItem);
      }
    });
  
    this.cardItems = newCard;
    this.saveToStorage();
  }

   //function to ubdate the delivery option in the card 
   updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    // Check if the product is already in the cart
    // If it is, increase the quantity by 1
    this.cardItems.forEach((cardItem) => {
      if (cardItem.productId === productId) {
        matchingItem = cardItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }

}




const card = new Card('card-oop');
const businessCard =new Card('business-card');





console.log(card);
console.log(businessCard);



console.log(businessCard instanceof Card); // true

