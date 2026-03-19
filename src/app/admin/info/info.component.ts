import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  url = "https://api-equilibre.cloud/demande";
  demande: any = null;
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Récupération de l'_id depuis l'URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getDemandeById(id);
    }
  }

  getDemandeById(id: string) {
    this.http.get<any[]>(this.url).subscribe(data => {
      // On récupère la demande correspondante
      this.demande = data.find(d => d._id === id);
      this.loading = false;
    }, error => {
      console.error("Erreur lors de la récupération de la demande :", error);
    });
  }

  // Fonction pour récupérer les initiales
  getInitials(name: string) {
    if (!name) return '';
    const parts = name.split(' ');
    return parts.map(p => p[0]).join('').toUpperCase();
  }

}