import { Component, OnInit } from '@angular/core';

interface Demande {
  id: number;
  nom: string;
  prenom: string;
  sexe: 'Homme' | 'Femme';
  etatCivil: 'Célibataire' | 'Marié(e)' | 'Divorcé(e)' | 'Veuf(ve)';
  email: string;
  telephone: string;
  statut: 'Nouveau' | 'En cours' | 'Traité' | 'En attente';
  dateDemande: Date;
}

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css']
})
export class DemandesComponent implements OnInit {
  demandes: Demande[] = [];
  demandesFiltrees: Demande[] = [];
  recherche: string = '';
  filtreSexe: string = '';
  filtreEtatCivil: string = '';

  ngOnInit(): void {
    // Initialisation des 6 demandes
    this.demandes = [
      {
        id: 1,
        nom: 'Dupont',
        prenom: 'Jean',
        sexe: 'Homme',
        etatCivil: 'Marié(e)',
        email: 'jean.dupont@email.com',
        telephone: '06 12 34 56 78',
        statut: 'Nouveau',
        dateDemande: new Date('2024-01-15')
      },
      {
        id: 2,
        nom: 'Martin',
        prenom: 'Sophie',
        sexe: 'Femme',
        etatCivil: 'Célibataire',
        email: 'sophie.martin@email.com',
        telephone: '07 23 45 67 89',
        statut: 'En cours',
        dateDemande: new Date('2024-01-14')
      },
      {
        id: 3,
        nom: 'Lefebvre',
        prenom: 'Pierre',
        sexe: 'Homme',
        etatCivil: 'Divorcé(e)',
        email: 'pierre.lefebvre@email.com',
        telephone: '06 34 56 78 90',
        statut: 'Traité',
        dateDemande: new Date('2024-01-13')
      },
      {
        id: 4,
        nom: 'Bernard',
        prenom: 'Marie',
        sexe: 'Femme',
        etatCivil: 'Marié(e)',
        email: 'marie.bernard@email.com',
        telephone: '07 45 67 89 01',
        statut: 'En attente',
        dateDemande: new Date('2024-01-12')
      },
      {
        id: 5,
        nom: 'Petit',
        prenom: 'Thomas',
        sexe: 'Homme',
        etatCivil: 'Célibataire',
        email: 'thomas.petit@email.com',
        telephone: '06 56 78 90 12',
        statut: 'Nouveau',
        dateDemande: new Date('2024-01-11')
      },
      {
        id: 6,
        nom: 'Dubois',
        prenom: 'Isabelle',
        sexe: 'Femme',
        etatCivil: 'Veuf(ve)',
        email: 'isabelle.dubois@email.com',
        telephone: '07 67 89 01 23',
        statut: 'En cours',
        dateDemande: new Date('2024-01-10')
      }
    ];
    
    this.demandesFiltrees = [...this.demandes];
  }

  // Obtenir l'initiale du nom
  getInitials(nom: string, prenom: string): string {
    return (prenom.charAt(0) + nom.charAt(0)).toUpperCase();
  }

  // Obtenir la couleur de fond en fonction du nom
  getGradientColor(nom: string): string {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-green-500 to-green-600',
      'from-red-500 to-red-600',
      'from-yellow-500 to-yellow-600',
      'from-indigo-500 to-indigo-600',
      'from-pink-500 to-pink-600',
      'from-teal-500 to-teal-600'
    ];
    
    // Utiliser la somme des codes ASCII pour déterminer la couleur
    const sum = nom.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  }

  // Obtenir la couleur du statut
  getStatutColor(statut: string): string {
    switch(statut) {
      case 'Nouveau': return 'bg-blue-100 text-blue-800';
      case 'En cours': return 'bg-yellow-100 text-yellow-800';
      case 'Traité': return 'bg-green-100 text-green-800';
      case 'En attente': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  // Filtrer les demandes
  filtrerDemandes(): void {
    this.demandesFiltrees = this.demandes.filter(demande => {
      let correspond = true;
      
      // Filtre de recherche
      if (this.recherche) {
        const searchTerm = this.recherche.toLowerCase();
        correspond = correspond && (
          demande.nom.toLowerCase().includes(searchTerm) ||
          demande.prenom.toLowerCase().includes(searchTerm) ||
          demande.email.toLowerCase().includes(searchTerm)
        );
      }
      
      // Filtre par sexe
      if (this.filtreSexe) {
        correspond = correspond && demande.sexe === this.filtreSexe;
      }
      
      // Filtre par état civil
      if (this.filtreEtatCivil) {
        correspond = correspond && demande.etatCivil === this.filtreEtatCivil;
      }
      
      return correspond;
    });
  }

  // Mettre à jour la recherche
  onRechercheChange(event: any): void {
    this.recherche = event.target.value;
    this.filtrerDemandes();
  }

  // Mettre à jour le filtre sexe
  onFiltreSexeChange(event: any): void {
    this.filtreSexe = event.target.value;
    this.filtrerDemandes();
  }

  // Mettre à jour le filtre état civil
  onFiltreEtatCivilChange(event: any): void {
    this.filtreEtatCivil = event.target.value;
    this.filtrerDemandes();
  }

  // Réinitialiser les filtres
  resetFiltres(): void {
    this.recherche = '';
    this.filtreSexe = '';
    this.filtreEtatCivil = '';
    this.demandesFiltrees = [...this.demandes];
  }

  // Formater la date
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  // Voir la demande
  voirDemande(id: number): void {
    console.log('Voir demande:', id);
    // Ajoutez ici votre logique pour voir la demande
    alert(`Affichage de la demande ${id}`);
  }

// Ajoutez ces méthodes dans votre composant

// Obtenir le nombre de demandes par statut
getDemandesParStatut(statut: string): number {
  return this.demandes.filter(d => d.statut === statut).length;
}

// Obtenir la couleur du point de statut
getStatutDotColor(statut: string): string {
  switch(statut) {
    case 'Nouveau': return 'bg-blue-500';
    case 'En cours': return 'bg-yellow-500';
    case 'Traité': return 'bg-green-500';
    case 'En attente': return 'bg-orange-500';
    default: return 'bg-gray-500';
  }
}

}