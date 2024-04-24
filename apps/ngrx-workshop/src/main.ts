import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { routes } from "./app/router/routes";
import { provideHttpClient } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideStore } from '@ngrx/store';
import { productReducer } from './app/product/product.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { ProductEffects } from './app/product/product.effects';
import * as errorEffects from './app/error/error.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideStore({
      product: productReducer,
    }),
    provideEffects(ProductEffects, errorEffects),
    provideStoreDevtools(),
  ],
}).catch(err => console.error('Caught an unhandled error during application bootstrap:', err));
