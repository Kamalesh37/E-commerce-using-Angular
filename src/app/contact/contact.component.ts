import { Component, ElementRef, ViewChild } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  scrollLeft() {
    if (this.scrollContainer && this.scrollContainer.nativeElement) {
      this.scrollContainer.nativeElement.scrollBy({ left: -400, behavior: 'smooth' });
    }
  }

  scrollRight() {
    if (this.scrollContainer && this.scrollContainer.nativeElement) {
      this.scrollContainer.nativeElement.scrollBy({ left: 400, behavior: 'smooth' });
    }
  }
}
