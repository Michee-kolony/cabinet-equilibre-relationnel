import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  url = "https://api-equilibre.cloud/demande";
  loading: boolean = true;

  demandes: any[] = [];
  totalDemandes: number = 0;

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.loadDemandes();
  }

  loadDemandes() {
    this.http.get<any[]>(this.url).subscribe(data => {
      this.demandes = data;
      this.totalDemandes = data.length;
      this.loading = false;

      // Calcul nombre par sexe pour le graphique
      const filles = data.filter(d => d.sexe.toLowerCase() === 'féminin').length;
      const garcons = data.filter(d => d.sexe.toLowerCase() === 'masculin').length;

      // Initialisation du graphique après récupération
      new Chart("genderChart", {
        type: 'doughnut',
        data: {
          labels: ['Femmes', 'Hommes'],
          datasets: [
            {
              data: [filles, garcons],
              backgroundColor: ['#F04DE1', '#27E0F5'],
              borderColor: ['#F04DE1', '#27E0F5'],
              borderWidth: 3,
              hoverBorderWidth: 10
            }
          ]
        },
        options: {
          responsive: true,
          cutout: '70%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                usePointStyle: true,
                padding: 20,
                font: { size: 14 }
              }
            }
          }
        }
      });

    }, error => {
      console.error("Erreur lors de la récupération des demandes :", error);
    });
  }

  // Fonction pour récupérer les initiales du nom
  getInitials(name: string) {
    if (!name) return '';
    const parts = name.split(' ');
    return parts.map(p => p[0]).join('').toUpperCase();
  }
}