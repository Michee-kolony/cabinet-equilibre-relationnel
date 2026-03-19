import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-publier',
  templateUrl: './publier.component.html',
  styleUrl: './publier.component.css'
})
export class PublierComponent implements OnInit {

  url = "https://api-equilibre.cloud/actualites";
  loading = true;

  actualites: any[] = [];
  showModal = false;
  
  titre = "";
  soustitre = "";
  description = "";
  image = "";
  facebook = "";
  twitter = "";
  tiktok = "";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getActualites();
  }

  // 🔥 GET (tri du plus récent)
  getActualites() {
    this.http.get<any[]>(this.url).subscribe(data => {
      this.actualites = data.sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      
      );
      this.loading = false;
    });
  }

deleteActualite(id: string) {
  // Demande confirmation à l'utilisateur
  if (!confirm("Êtes-vous sûr de vouloir supprimer cette actualité ?")) {
    return;
  }

  // Appel DELETE vers l'API
  this.http.delete(`${this.url}/${id}`).subscribe({
    next: () => {
      alert('Actualité supprimée avec succès');

      // Rafraîchir la liste des actualités
      this.getActualites();
    },
    error: (err) => {
      console.error(err);
      alert('Erreur lors de la suppression. Veuillez réessayer.');
    }
  });
}


publieractu() {
  // Convertir les sauts de ligne en <br> pour l'affichage HTML
  const descriptionFormattee = this.description.replace(/\n/g, '<br>');

  const actu = {
    titre: this.titre,
    soustitre: this.soustitre,
    description: descriptionFormattee, // on envoie la version formatée
    image: this.image,
    facebook: this.facebook,
    twitter: this.twitter,
    tiktok: this.tiktok
  };

  // Vérification des champs obligatoires
  if (!this.titre || !this.soustitre || !this.description || !this.image) {
    alert('Veuillez remplir tous les champs obligatoires !');
    return;
  }

  // Envoi POST vers l'API
  this.http.post('https://api-equilibre.cloud/actualites', actu).subscribe({
    next: (res: any) => {
      alert('Actualité publiée avec succès');

      // Réinitialiser les champs
      this.titre = '';
      this.soustitre = '';
      this.description = '';
      this.image = '';
      this.facebook = '';
      this.twitter = '';
      this.tiktok = '';

      // Fermer le modal si tu utilises showModal
      if (this.showModal) {
        this.showModal = false;
      }

      // Rafraîchir la liste des actualités
      this.getActualites();
    },
    error: (err) => {
      console.error(err);
      alert('Erreur lors de la publication. Veuillez réessayer.');
    }
  });
}

  

  // 🔥 OPEN MODAL
  openModal() {
    this.showModal = true;
  }

  // 🔥 CLOSE MODAL
  closeModal() {
    this.showModal = false;
  }

 


  // 🔥 FORMAT DATE SIMPLE
  formatDate(date: string) {
    return new Date(date).toLocaleDateString();
  }
}