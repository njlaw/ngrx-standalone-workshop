import { createFeature, createReducer, on } from '@ngrx/store';
import { ProductModel } from '../model/product';
import { productApiActions } from './actions';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { LoadingState } from '../shared/request-status';
import { RequestStatus } from '../shared/call-state';
import { productsOpened } from './product-list/actions';

export interface ProductState {
  products: EntityState<ProductModel>;
  productsRequestStatus: RequestStatus,
}

export const productAdapter = createEntityAdapter<ProductModel>();

const initialState: ProductState = {
  products: productAdapter.getInitialState(),
  productsRequestStatus: LoadingState.IDLE,
};

export const productFeature = createFeature({
  name: 'product',
  reducer: createReducer(
    initialState,
    on(productsOpened, (state) => ({
      ...state,
      productsRequestStatus: LoadingState.PENDING,
    })),
    on(productApiActions.productsFetchSuccess, (state, { products }) => ({
      ...state,
      products: productAdapter.upsertMany(products, state.products),
      productsRequestStatus: LoadingState.FULFILLED,
    })),
    on(productApiActions.productsFetchError, (state, { errorMessage }) => ({
      ...state,
      productsRequestStatus: { errorMessage },
    })),
    on(productApiActions.singleProductFetchedSuccess, (state, { product }) => {
      return {
        ...state,
        products: productAdapter.upsertOne(product, state.products),
      };
    }),
  ),
});
