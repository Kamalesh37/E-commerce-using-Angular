import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../cart.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

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

  customerName: string = '';
  customerEmail: string = '';

  constructor(public cartService: CartService, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  processPayment(event: Event) {
    event.preventDefault();
    if (this.cartItems.length === 0) return;
    
    if (!this.apiService.isLoggedIn()) {
      alert('Please Login or Register to complete checkout.');
      this.router.navigate(['/login']);
      return;
    }
    
    this.isProcessing = true;

    // Create an array of HTTP observables
    import('rxjs').then(({ forkJoin }) => {
      const orderRequests = this.cartItems.map(item => {
        return this.apiService.postOrder({
          customer_name: this.customerName || 'Dashboard User',
          customer_email: this.customerEmail || 'user@example.com',
          product_id: item.productId || 1,
          quantity: item.quantity,
          total_price: item.price * item.quantity
        });
      });

      forkJoin(orderRequests).subscribe({
        next: (responses) => {
          this.isProcessing = false;
          this.paymentSuccess = true;
          this.cartService.clearCart();
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000);
        },
        error: (err) => {
          this.isProcessing = false;
          alert('Checkout failed! Please ensure you are logged in and product references are valid.');
          console.error(err);
        }
      });
    });
  }
}
