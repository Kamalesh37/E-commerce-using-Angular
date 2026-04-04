import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  isProcessing: boolean = false;
  paymentSuccess: boolean = false;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  processPayment(event: Event) {
    event.preventDefault();
    if (this.cartItems.length === 0) return;
    
    this.isProcessing = true;
    
    // Simulate API Network call
    setTimeout(() => {
      this.isProcessing = false;
      this.paymentSuccess = true;
      this.cartService.clearCart();
    }, 2000);
  }
}
