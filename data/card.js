export let card = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2
},{
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}];


export function addToCart(productId) {
  let matchingItem;
  // Check if the product is already in the cart
  // If it is, increase the quantity by 1
  card.forEach((cardItem) => {
    if (cardItem.productId === productId) {
      matchingItem = cardItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    card.push({
      productId: productId,
      quantity: 1,
    });
  }
};


export function removeFromCart(productId) {
  const newCard = [];

  card.forEach((cardItem) => {
    if (cardItem.productId !== productId) {
      newCard.push(cardItem);
    }
  });

  card = newCard;
};




