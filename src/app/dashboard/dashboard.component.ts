import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userName: string = 'User';
  orders: any[] = [];
  cartItems: CartItem[] = [];
  loading: boolean = true;
  error: string | null = null;
  private cartSub!: Subscription;

  constructor(private apiService: ApiService, private router: Router, public cartService: CartService) { }

  ngOnInit(): void {
    if (!this.apiService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.cartSub = this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
    
    this.apiService.getUserOrders().subscribe({
      next: (res) => {
        if (res.success && res.orders) {
          this.orders = res.orders;
          if (this.orders.length > 0 && this.orders[0].customer_name) {
            this.userName = this.orders[0].customer_name;
          }
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load order history.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  logout() {
    this.apiService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
  }
}
