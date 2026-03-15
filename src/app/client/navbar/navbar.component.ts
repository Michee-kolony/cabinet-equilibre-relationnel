import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  mobileMenuOpen = false;

  toggleMenu(){
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMenu(){
    this.mobileMenuOpen = false;
  }

}