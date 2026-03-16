import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  isSidebarOpen = true;

  // Simuler profil admin
  adminName = "Michée Kolony";
  adminInitials = this.getInitials(this.adminName);

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  getInitials(name: string) {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  logout() {
    // Ici tu peux gérer la déconnexion (ex: clear token + router navigate)
    console.log('Déconnexion');
  }
}