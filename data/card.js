export const card = [];


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
