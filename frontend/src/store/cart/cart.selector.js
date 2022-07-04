import { createSelector } from "reselect";

// extract off just the slice state
const selectCartReducer = (state) => state.cart;

// getting the actual cart items
export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

// getting cart is open
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

// setting the logic of cart count selector
export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

// setting the logic of cart total selector
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);
