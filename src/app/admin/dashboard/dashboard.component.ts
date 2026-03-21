import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit, OnDestroy {

  url = "https://api-equilibre.cloud/demande";
  loading: boolean = true;

  demandes: any[] = [];
  totalDemandes: number = 0;
  totalTraite: number = 0; // 🔹 Nombre de demandes traitées

  genderChart: any;

  private refreshSubscription!: Subscription;

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.loadDemandes();

    // Rafraîchissement automatique toutes les 10 secondes
    this.refreshSubscription = interval(10000).subscribe(() => {
      this.loadDemandes(false); // false pour ne pas afficher loader
    });
  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  loadDemandes(showLoading: boolean = true) {
    if (showLoading) this.loading = true;

    this.http.get<any[]>(this.url).subscribe(data => {
      // Trier les demandes du plus récent au plus ancien
      this.demandes = data.sort((a, b) => 
        new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
      );

      this.totalDemandes = this.demandes.length;

      // 🔹 Calcul des demandes traitées
      this.totalTraite = this.demandes.filter(d => d.status?.toLowerCase() === 'traitée').length;

      if (showLoading) this.loading = false;

      // Calcul nombre par sexe pour le graphique
      const filles = this.demandes.filter(d => d.sexe.toLowerCase() === 'féminin').length;
      const garcons = this.demandes.filter(d => d.sexe.toLowerCase() === 'masculin').length;

      // Mise à jour du graphique
      if (this.genderChart) {
        this.genderChart.data.datasets[0].data = [filles, garcons];
        this.genderChart.update();
      } else {
        this.genderChart = new Chart("genderChart", {
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
      }

    }, error => {
      console.error("Erreur lors de la récupération des demandes :", error);
      if (showLoading) this.loading = false;
    });
  }

  // Fonction pour récupérer les initiales du nom
  getInitials(name: string) {
    if (!name) return '';
    const parts = name.split(' ');
    return parts.map(p => p[0]).join('').toUpperCase();
  }

  // Fonction pour afficher le temps relatif
  getTimeAgo(dateString: string): string {
    const now = new Date();
    const past = new Date(dateString);
    const diffSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffSeconds < 60) return "À l'instant";
    if (diffSeconds < 3600) {
      const minutes = Math.floor(diffSeconds / 60);
      return minutes === 1 ? "il y a 1 min" : `il y a ${minutes} min`;
    }
    if (diffSeconds < 86400) {
      const hours = Math.floor(diffSeconds / 3600);
      return hours === 1 ? "il y a 1 h" : `il y a ${hours} h`;
    }
    if (diffSeconds < 604800) {
      const days = Math.floor(diffSeconds / 86400);
      return days === 1 ? "il y a 1 jour" : `il y a ${days} jours`;
    }
    if (diffSeconds < 2592000) {
      const weeks = Math.floor(diffSeconds / 604800);
      return weeks === 1 ? "il y a 1 semaine" : `il y a ${weeks} semaines`;
    }
    if (diffSeconds < 31536000) {
      const months = Math.floor(diffSeconds / 2592000);
      return months === 1 ? "il y a 1 mois" : `il y a ${months} mois`;
    } else {
      const years = Math.floor(diffSeconds / 31536000);
      return years === 1 ? "il y a 1 an" : `il y a ${years} ans`;
    }
  }
}