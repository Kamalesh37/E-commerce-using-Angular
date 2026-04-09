import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: any = null;
  loading: boolean = true;
  error: string | null = null;
  aboutBullets: string[] = [];
  mockRating: number = 4.5;
  mockReviewsCount: string = "1,245";
  selectedQuantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getProductById(id).subscribe({
        next: (data) => {
          this.product = data;
          this.generateAboutItem(this.product);
          const numId = parseInt(this.product.id) || 1;
          this.mockRating = 4 + (numId % 10) / 10; 
          this.mockReviewsCount = (numId * 123 + 45).toLocaleString();
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load product details.';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }

  generateAboutItem(product: any) {
    const brand = product.brand || 'Premium';
    const type = product.category || 'Device';
    
    this.aboutBullets = [
      `Ultimate Processing Power: Enjoy lightning-fast performance capable of handling your most demanding applications seamlessly.`,
      `Stunning Visuals: the ${product.name} features an advanced display delivering crisp, vibrant colors with deep contrasts.`,
      `All-Day Battery Life: Engineered for efficiency, ensuring you stay connected and productive without reaching for the charger.`,
      `Premium ${brand} Build Quality: Crafted with high-end, durable materials featuring a sleek, ergonomic finish.`,
      `Seamless Connectivity: Includes the latest Wi-Fi and bluetooth standards, alongside a versatile array of universal ports.`
    ];
  }

  updateQuantity(event: any) {
    this.selectedQuantity = parseInt(event.target.value) || 1;
  }

  get calculatedPrice(): number {
    if (!this.product) return 0;
    return this.product.price * this.selectedQuantity;
  }

  get calculatedActualPrice(): number {
    if (!this.product) return 0;
    return this.product.actualPrice * this.selectedQuantity;
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart({
        productId: this.product.id,
        name: this.product.name,
        price: this.product.price,
        image: this.product.image,
        quantity: this.selectedQuantity
      });
      alert('Added ' + this.selectedQuantity + ' ' + this.product.name + '(s) to your cart!');
    }
  }
}
