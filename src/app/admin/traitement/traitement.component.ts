import { Component } from '@angular/core';

@Component({
  selector: 'app-traitement',
  templateUrl: './traitement.component.html',
  styleUrls: ['./traitement.component.css']
})
export class TraitementComponent {

  searchTerm: string = '';

  demandes = [
    {
      nom: 'Jean Mukendi',
      email: 'jean@gmail.com',
      type: 'Demande de rendez-vous',
      date: '12 Mars 2026'
    },
    {
      nom: 'Marie Nzambe',
      email: 'marie@gmail.com',
      type: 'Consultation',
      date: '11 Mars 2026'
    },
    {
      nom: 'Paul Kabasele',
      email: 'paul@gmail.com',
      type: 'Information service',
      date: '10 Mars 2026'
    }
  ];


  filteredDemandes() {

    if (!this.searchTerm) {
      return this.demandes;
    }

    return this.demandes.filter(d =>
      d.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      d.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      d.type.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

  }

}