import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-child2',
  templateUrl: './child2.component.html',
  styleUrls: ['./child2.component.css']
})
export class Child2Component implements OnInit {

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
  }

  addToCart(name: string, price: number, image?: string) {
    this.cartService.addToCart({ name, price, image });
    alert('Added ' + name + ' to your cart!');
  }

}
