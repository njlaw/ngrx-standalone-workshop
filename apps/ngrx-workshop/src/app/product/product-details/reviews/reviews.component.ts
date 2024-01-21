import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AsyncPipe, CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { reviewsStore } from "./reviews.store";

@Component({
  selector: "ngrx-workshop-reviews",
  standalone: true,
  templateUrl: "./reviews.component.html",
  styleUrl: "./reviews.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    AsyncPipe,
  ],
  providers: [reviewsStore],
})
export class ReviewsComponent {
  readonly reviewsStore = inject(reviewsStore);
}
