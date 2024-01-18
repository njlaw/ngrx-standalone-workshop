import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from "@angular/core";
import { Rating } from "@angular-monorepo/api-interfaces";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";

@Component({
  selector: "ngrx-workshop-stars",
  standalone: true,
  styles: [
    `
      :host {
        display: inline-block;

        &.can-rate:hover {
          cursor: pointer;
        }
      }
    `,
  ],
  imports: [CommonModule, MatIconModule],
  template: `
    <mat-icon
      *ngFor="let star of availableOptions"
      (mouseenter)="starMouseEnter(star)"
      (mouseleave)="starMouseLeave()"
      (click)="rate(star)"
      [color]="rated || mouseOver ? 'accent' : 'primary'"
    >
      {{ star <= (starOver || rated || rating) ? "star" : "star_border" }}
    </mat-icon>
  `,
})
export class StarsComponent {
  @HostBinding("class.can-rate")
  @Input()
  canRate = false;

  @Input() rated: number | undefined | null = 0;
  @Input() rating = 0;

  @Output() ratingChange = new EventEmitter<Rating>();

  mouseOver = false;
  starOver = 0;

  readonly availableOptions: Rating[] = [1, 2, 3, 4, 5];

  @HostListener("mouseenter")
  onMouseEnter() {
    this.mouseOver = this.canRate;
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    this.mouseOver = false;
  }

  starMouseEnter(star: number) {
    this.starOver = this.canRate ? star : 0;
  }

  starMouseLeave() {
    this.starOver = 0;
  }

  rate(star: Rating) {
    if (!this.canRate) {
      return;
    }
    this.rated = star;
    this.ratingChange.emit(star);
  }
}
