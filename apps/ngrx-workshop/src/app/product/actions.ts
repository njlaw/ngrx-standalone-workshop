import { createActionGroup, props } from '@ngrx/store';
import { BasicProduct } from '@angular-monorepo/api-interfaces';

export const productApiActions = createActionGroup({
  source: 'Product API',
  events: {
    productsFetchSuccess: props<{ products: BasicProduct[] }>(),
    productsFetchError: props<{ errorMessage: string }>(),
  }
})
