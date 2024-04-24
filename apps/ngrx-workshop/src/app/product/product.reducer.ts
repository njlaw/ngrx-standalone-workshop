import { createReducer, on } from '@ngrx/store';
import { ProductModel } from '../model/product';
import { productApiActions } from './actions';

export interface GlobalState {
  product: ProductState;
}

export interface ProductState {
  products: ProductModel[];
}

const initialState: ProductState = {
  products: [],
};

export const productReducer = createReducer<ProductState>(
  initialState,
  on(productApiActions.productsFetchSuccess, (state, { products }) => ({
    ...state,
    products: [...products],
  })),
  on(productApiActions.productsFetchError, state => ({
    ...state,
    products: [],
  })),
);
