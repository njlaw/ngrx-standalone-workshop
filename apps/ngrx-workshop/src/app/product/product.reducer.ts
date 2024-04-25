import { createFeature, createReducer, on } from '@ngrx/store';
import { ProductModel } from '../model/product';
import { productApiActions } from './actions';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface ProductState {
  products: EntityState<ProductModel>;
}

export const productAdapter = createEntityAdapter<ProductModel>();

const initialState: ProductState = {
  products: productAdapter.getInitialState(),
};

export const productFeature = createFeature({
  name: 'product',
  reducer: createReducer(
    initialState,
    on(productApiActions.productsFetchSuccess, (state, { products }) => ({
      ...state,
      products: productAdapter.upsertMany(products, state.products),
    })),
    on(productApiActions.singleProductFetchedSuccess, (state, { product }) => {
      return {
        ...state,
        products: productAdapter.upsertOne(product, state.products),
      };
    }),
  ),
});
