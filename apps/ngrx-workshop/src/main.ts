import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { routes } from "./app/router/routes";
import { provideHttpClient } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideState, provideStore } from '@ngrx/store';
import { productReducer } from './app/product/product.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { ProductEffects } from './app/product/product.effects';
import * as cartEffects from './app/cart/cart.effects';
import * as errorEffects from './app/error/error.effects';
import { CART_FEATURE_KEY, cartReducer } from './app/cart/cart.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideStore({
      product: productReducer,
    }),
    provideState(CART_FEATURE_KEY, cartReducer),
    provideEffects(ProductEffects, errorEffects, cartEffects),
    provideStoreDevtools(),
  ],
}).catch(err => console.error('Caught an unhandled error during application bootstrap:', err));
