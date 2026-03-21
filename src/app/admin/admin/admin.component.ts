import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isSidebarOpen = true;

  // 🔹 Nom et email récupérés depuis le localStorage
  adminName: string = '';
  adminEmail: string = '';
  adminInitials: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Récupérer l'utilisateur connecté depuis localStorage
    const adminData = localStorage.getItem('admin');
    if (adminData) {
      const admin = JSON.parse(adminData);
      this.adminName = admin.nom || '';
      this.adminEmail = admin.email || '';
      this.adminInitials = this.getInitials(this.adminName);
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  // 🔥 LOGOUT PRO
  logout() {
    // Supprimer les données
    localStorage.removeItem('token');
    localStorage.removeItem('admin');

    // Redirection vers login
    this.router.navigate(['/login']);
  }
}