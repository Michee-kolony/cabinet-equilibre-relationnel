import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.css']
})
export class CookieConsentComponent implements OnInit {
  showModal = false;

  ngOnInit() {
    // Vérifie si l'utilisateur a déjà répondu
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      this.showModal = true;
    }
  }

  acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    this.showModal = false;
  }

  declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    this.showModal = false;
  }
}