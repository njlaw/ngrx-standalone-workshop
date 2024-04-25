import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CART_FEATURE_KEY, CartState } from './cart.reducer';
import { selectProductEntities } from '../product/product.selectors';
import { CartProduct } from '../model/product';

export const cartFeature = createFeatureSelector<CartState>(CART_FEATURE_KEY);

export const selectCartItems = createSelector(cartFeature, state => state.cartItems);
export const selectCartItemsCount = createSelector(selectCartItems, cartItems => cartItems.reduce((sum, cartItem) => sum + cartItem.quantity, 0));

export const selectCartProducts = createSelector(
  selectProductEntities,
  selectCartItems,
  (productEntities, cartItems) => {
    return cartItems.map(cartItem => {
      const product = productEntities[cartItem.productId];
      if (product == null) return undefined;
      return {
        ...product,
        quantity: cartItem.quantity,
      };
    }).filter((cartProduct): cartProduct is CartProduct => cartProduct != null);
  }
)

export const selectCartTotal = createSelector(selectCartProducts, (products) => {
  return products.reduce((total, product) => total + product.price * product.quantity, 0);
});
