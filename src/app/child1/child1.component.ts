import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-child1',
  templateUrl: './child1.component.html',
  styleUrls: ['./child1.component.css']
})
export class Child1Component implements OnInit {

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
  }

  addToCart(name: string, price: number, image?: string) {
    this.cartService.addToCart({ name, price, image });
    alert('Added ' + name + ' to your cart!');
  }

}
