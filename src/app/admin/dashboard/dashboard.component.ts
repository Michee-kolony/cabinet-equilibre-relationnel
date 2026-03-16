import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {

  ngAfterViewInit(): void {

    const dataFilles = 40;
    const dataGarcons = 60;

    new Chart("genderChart", {
      type: 'doughnut', // anneau
      data: {
        labels: ['Femmes', 'Hommes'],
        datasets: [
          {
            data: [dataFilles, dataGarcons],

            // fond transparent
            backgroundColor: [
              '#F04DE1',
              '#27E0F5'
            ],

            // bordures colorées
            borderColor: [
              '#F04DE1', // rouge
              '#27E0F5'  // bleu
            ],

            borderWidth: 3,
            hoverBorderWidth: 10
          }
        ]
      },
      options: {
        responsive: true,
        cutout: '70%', // taille du trou au centre

        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                size: 14
              }
            }
          }
        }
      }
    });

  }

}