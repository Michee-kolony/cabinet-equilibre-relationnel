import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-traitement',
  templateUrl: './traitement.component.html',
  styleUrls: ['./traitement.component.css']
})
export class TraitementComponent implements OnInit {

  searchTerm: string = '';
  demandes: any[] = [];
  loading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDemandes();
  }

  loadDemandes() {
    this.loading = true;

    this.http.get<any[]>('https://api-equilibre.cloud/demande').subscribe({
      next: (data) => {
        // 🔹 Filtrer uniquement les demandes traitées
        this.demandes = data
          .filter(d => d.status?.toLowerCase() === 'traitée')
          // 🔹 Trier par date récente
          .sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());

        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des demandes :', err);
        this.loading = false;
      }
    });
  }

  // 🔍 Recherche dynamique
  filteredDemandes() {
    if (!this.searchTerm) return this.demandes;

    const term = this.searchTerm.toLowerCase();
    return this.demandes.filter(d =>
      d.nom.toLowerCase().includes(term) ||
      d.email?.toLowerCase().includes(term) ||
      d.type?.toLowerCase().includes(term)
    );
  }

  // 🔹 Formatage de la date
  formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  }

}