import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  url = "https://api-equilibre.cloud/admin/login";

  showPassword = false;
  loading = false;

  popupMessage: string = '';
  popupType: 'success' | 'error' = 'success';
  showPopup = false;

  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  // 🔥 AUTO REDIRECTION SI CONNECTÉ
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const admin = localStorage.getItem('admin');

    if (token && admin && token !== 'null' && token !== 'undefined') {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (!this.username || !this.password) {
      this.showPopupMessage('Veuillez remplir tous les champs', 'error');
      return;
    }

    this.loading = true;

    this.http.post<any>(this.url, { email: this.username, password: this.password })
      .subscribe({
        next: (res) => {
          this.loading = false;

          localStorage.setItem('admin', JSON.stringify(res.admin));
          localStorage.setItem('token', res.token);

          this.showPopupMessage(res.message, 'success');

          setTimeout(() => {
            this.router.navigate(['/admin/dashboard']);
          }, 1500);
        },
        error: (err) => {
          this.loading = false;
          const msg = err.error?.message || 'Erreur lors de la connexion';
          this.showPopupMessage(msg, 'error');
        }
      });
  }

  showPopupMessage(message: string, type: 'success' | 'error') {
    this.popupMessage = message;
    this.popupType = type;
    this.showPopup = true;

    setTimeout(() => {
      this.showPopup = false;
    }, 3000);
  }

}