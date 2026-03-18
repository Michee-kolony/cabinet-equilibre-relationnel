import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  url = "http://api-equilibre.cloud/admin/login";
  showPassword = false;
  loading = false;           // Pour le spinner
  popupMessage: string = ''; // Message à afficher dans le popup
  popupType: 'success' | 'error' = 'success'; // Type de popup (success ou error)
  showPopup = false;         // Affichage du popup

  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

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

          // Stocker dans localStorage
          localStorage.setItem('admin', JSON.stringify(res.admin));
          localStorage.setItem('token', res.token);

          this.showPopupMessage(res.message, 'success');

          // Redirection après 1.5s pour laisser le temps de voir le popup
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
    }, 3000); // Popup disparaît après 3s
  }
}