import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Demande {
  _id: string;
  nom: string;
  sexe: string;
  ville: string;
  telephone: string;
  civilite: string;
  status: string;
  createAt: string;
}

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css']
})
export class DemandesComponent implements OnInit {

  url = "https://api-equilibre.cloud/demande";

  demandes: Demande[] = [];
  demandesFiltrees: Demande[] = [];
  loading: boolean = true;

  // Civilités fixes
  civilites: string[] = ['Célibataire', 'En couple', 'Marié(e)', 'Séparé(e)'];

  recherche: string = '';
  filtreSexe: string = '';
  filtreEtatCivil: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDemandes();
  }

  // Récupérer les demandes depuis le backend
  getDemandes() {
    this.http.get<Demande[]>(this.url).subscribe({
      next: (data) => {
        // Trier du plus récent au plus ancien
        this.demandes = data.sort((a, b) =>
          new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
        );
        this.demandesFiltrees = [...this.demandes];
        this.loading = false;
      },
      error: (err) => console.error(err)
    });
  }

  // Filtrage
  filtrerDemandes(): void {
    this.demandesFiltrees = this.demandes.filter(d => {
      let ok = true;

      if (this.recherche) {
        ok = ok && d.nom.toLowerCase().includes(this.recherche.toLowerCase());
      }
      if (this.filtreSexe) {
        ok = ok && d.sexe === this.filtreSexe;
      }
      if (this.filtreEtatCivil) {
        ok = ok && d.civilite === this.filtreEtatCivil;
      }

      return ok;
    });
  }

  onRechercheChange(e: any) {
    this.recherche = e.target.value;
    this.filtrerDemandes();
  }

  onFiltreSexeChange(e: any) {
    this.filtreSexe = e.target.value;
    this.filtrerDemandes();
  }

  onFiltreEtatCivilChange(e: any) {
    this.filtreEtatCivil = e.target.value;
    this.filtrerDemandes();
  }

  // Couleurs des statuts
  getStatutColor(statut: string): string {
    switch(statut.toLowerCase()) {
      case 'en attente': return 'bg-orange-100 text-orange-800';
      case 'en cours': return 'bg-yellow-100 text-yellow-800';
      case 'traite': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  // Time ago
  getTimeAgo(date: string): string {
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diff < 60) return "À l'instant";
    if (diff < 3600) return `il y a ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} h`;
    if (diff < 172800) return "il y a 1 jour";
    if (diff < 604800) return `il y a ${Math.floor(diff / 86400)} jours`;
    if (diff < 2592000) return `il y a ${Math.floor(diff / 604800)} semaines`;

    return past.toLocaleDateString('fr-FR');
  }

  // Initiales du nom
  getInitials(nom: string): string {
    return nom.substring(0, 2).toUpperCase();
  }

  // Action sur la demande
  voirDemande(id: string) {
    alert("Demande ID: " + id);
  }
}