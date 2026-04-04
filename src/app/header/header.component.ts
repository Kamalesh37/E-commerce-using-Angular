import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isDarkTheme: boolean = false;
  cartCount: number = 0;
  isMobileMenuOpen: boolean = false;

  constructor(public themeService: ThemeService, public cartService: CartService) { }

  ngOnInit(): void {
    this.themeService.isDarkTheme$.subscribe(isDark => {
      this.isDarkTheme = isDark;
    });
    this.cartService.cart$.subscribe(items => {
      this.cartCount = this.cartService.getTotalItems();
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
