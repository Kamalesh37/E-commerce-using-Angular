import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, Subject } from 'rxjs';
import { ApiService } from './api.service';

export interface CartItem {
  id: string | number; // String if locale, number if db
  productId?: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  user_id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();
  private authSub!: Subscription;

  constructor(private apiService: ApiService) {
    this.initCart();
  }

  private initCart() {
    if (this.apiService.isLoggedIn()) {
      this.fetchCloudCart();
    } else {
      this.loadLocalCart();
    }
  }

  public syncLocalToCloud() {
    this.loadLocalCart(); // ensure loaded
    if (this.cartItems.length > 0) {
      this.apiService.syncCart(this.cartItems).subscribe({
        next: (cloudItems) => {
          this.cartItems = cloudItems;
          this.cartSubject.next([...this.cartItems]);
          localStorage.removeItem('app_cart'); // clear local
        },
        error: (err) => console.error('Failed to sync guest cart', err)
      });
    } else {
      this.fetchCloudCart();
    }
  }

  public fetchCloudCart() {
    this.apiService.getCart().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.cartSubject.next([...this.cartItems]);
      },
      error: (err) => console.error('Failed to fetch cloud cart', err)
    });
  }

  private loadLocalCart() {
    const savedCart = localStorage.getItem('app_cart');
    if (savedCart) {
      try {
        this.cartItems = JSON.parse(savedCart);
        this.cartSubject.next([...this.cartItems]);
      } catch (e) {
        console.error('Failed to load local cart', e);
      }
    }
  }

  private saveLocalCart() {
    localStorage.setItem('app_cart', JSON.stringify(this.cartItems));
    this.cartSubject.next([...this.cartItems]);
  }

  addToCart(item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number, productId?: number }) {
    if (this.apiService.isLoggedIn()) {
      // cloud logic
      this.apiService.addCartItem(item).subscribe({
        next: (updatedCartItems) => {
          this.cartItems = updatedCartItems;
          this.cartSubject.next([...this.cartItems]);
        },
        error: (err) => console.error('Cloud add failed', err)
      });
    } else {
      // local logic
      const existingItem = this.cartItems.find(i => i.name === item.name);
      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        this.cartItems.push({
          ...item,
          productId: item.productId,
          id: Math.random().toString(36).substring(2, 9),
          quantity: item.quantity || 1
        });
      }
      this.saveLocalCart();
    }
  }

  removeFromCart(id: string | number) {
    if (this.apiService.isLoggedIn()) {
      this.apiService.removeCartItem(id).subscribe({
        next: (updated) => {
          this.cartItems = updated;
          this.cartSubject.next([...this.cartItems]);
        }
      });
    } else {
      this.cartItems = this.cartItems.filter(item => item.id !== id);
      this.saveLocalCart();
    }
  }

  updateQuantity(id: string | number, diff: number) {
    if (this.apiService.isLoggedIn()) {
      this.apiService.updateCartItem(id, diff).subscribe({
        next: (updated) => {
          this.cartItems = updated;
          this.cartSubject.next([...this.cartItems]);
        }
      });
    } else {
      const item = this.cartItems.find(i => i.id === id);
      if (item) {
        item.quantity += diff;
        if (item.quantity <= 0) {
          this.removeFromCart(id as string);
        } else {
          this.saveLocalCart();
        }
      }
    }
  }

  clearCart() {
    if (this.apiService.isLoggedIn()) {
      this.apiService.clearCart().subscribe({
        next: () => {
          this.cartItems = [];
          this.cartSubject.next([]);
        }
      });
    } else {
      this.cartItems = [];
      this.saveLocalCart();
    }
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + (+item.quantity), 0);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (+item.price * +item.quantity), 0);
  }
}
