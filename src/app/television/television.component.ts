import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-television',
  templateUrl: './television.component.html',
  styleUrls: ['./television.component.css']
})
export class TelevisionComponent implements OnInit {

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
  }

  addToCart(name: string, price: number, image?: string) {
    this.cartService.addToCart({ name, price, image });
    alert('Added ' + name + ' to your cart!');
  }

}
