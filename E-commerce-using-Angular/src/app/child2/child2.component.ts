import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-child2',
  templateUrl: './child2.component.html',
  styleUrls: ['./child2.component.css']
})
export class Child2Component implements OnInit {

  products: any[] = [];

  constructor(public cartService: CartService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getMobiles().subscribe(data => {
      this.products = data;
    });
  }

  addToCart(name: string, price: number, image?: string, qty: any = 1, dbId: any = null) {
    const quantity = parseInt(qty) || 1;
    this.cartService.addToCart({ productId: dbId, name, price, image, quantity });
    alert(`Added ${quantity} ${name}(s) to your cart!`);
  }

}
