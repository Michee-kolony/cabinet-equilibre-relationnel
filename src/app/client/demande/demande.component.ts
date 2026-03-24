import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {

  url = "https://api-equilibre.cloud/demande";

  loading: boolean = false;

  showPopup: boolean = false;
  popupType: 'success' | 'error' = 'success';
  message: string = '';

  formData: any = {
    nom: '',
    age: '',
    sexe: '',
    ville: '',
    telephone: '',
    taille: '',
    couleur: '',
    couleuryeux: '',
    civilite: '',
    preoccupation: '',
    attente: ''
  };

  constructor(private http: HttpClient, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Faire une demande');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ✅ VALIDATION
  validerFormulaire(): boolean {
    for (let key in this.formData) {
      if (!this.formData[key] || this.formData[key].toString().trim() === '') {
        this.showMessage("⚠️ Tous les champs sont obligatoires", 'error');
        return false;
      }
    }
    return true;
  }

  // 🚀 ENVOI
  envoyerDemande() {

    // ❌ stop si formulaire invalide
    if (!this.validerFormulaire()) {
      return;
    }

    this.loading = true;
    this.showPopup = false;

    this.http.post(this.url, this.formData).subscribe({

      next: () => {
        this.loading = false;

        this.showMessage("Demande envoyée avec succès", 'success');

        // reset
        this.formData = {
          nom: '',
          age: '',
          sexe: '',
          ville: '',
          telephone: '',
          taille: '',
          couleur: '',
          couleuryeux: '',
          civilite: '',
          preoccupation: '',
          attente: ''
        };
      },

      error: (err) => {
        this.loading = false;

        // 🔥 différencier les erreurs API
        if (err.status === 0) {
          this.showMessage("Problème de connexion au serveur", 'error');
        } else if (err.status === 400) {
          this.showMessage("Données invalides", 'error');
        } else {
          this.showMessage("Erreur serveur, réessayez", 'error');
        }

        console.error(err);
      }
    });
  }

  // 🔔 POPUP
  showMessage(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.popupType = type;
    this.showPopup = true;

    setTimeout(() => {
      this.showPopup = false;
    }, 3000);
  }

}