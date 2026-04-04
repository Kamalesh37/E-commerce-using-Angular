import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    const savedCart = localStorage.getItem('app_cart');
    if (savedCart) {
      try {
        this.cartItems = JSON.parse(savedCart);
        this.cartSubject.next([...this.cartItems]);
      } catch (e) {
        console.error('Failed to load cart', e);
      }
    }
  }

  private saveCart() {
    localStorage.setItem('app_cart', JSON.stringify(this.cartItems));
    this.cartSubject.next([...this.cartItems]);
  }

  addToCart(item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) {
    const existingItem = this.cartItems.find(i => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += item.quantity || 1;
    } else {
      this.cartItems.push({
        ...item,
        id: Math.random().toString(36).substring(2, 9),
        quantity: item.quantity || 1
      });
    }
    this.saveCart();
  }

  removeFromCart(id: string) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.saveCart();
  }

  updateQuantity(id: string, diff: number) {
    const item = this.cartItems.find(i => i.id === id);
    if (item) {
      item.quantity += diff;
      if (item.quantity <= 0) {
        this.removeFromCart(id);
      } else {
        this.saveCart();
      }
    }
  }

  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
