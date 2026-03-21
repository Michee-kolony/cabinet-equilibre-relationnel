import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lire',
  templateUrl: './lire.component.html',
  styleUrl: './lire.component.css'
})
export class LireComponent implements OnInit {

  url = "https://api-equilibre.cloud/messages";

  message: any = null;
  loading = true;
  deleting = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getMessage(id);
    }
  }

  // 🔥 Récupérer un message
  getMessage(id: string) {
    this.http.get<any[]>(this.url).subscribe({
      next: (data) => {
        const found = data.find(m => m._id === id);

        if (found) {
          this.message = {
            ...found,
            date: new Date(found.createAt || found.createdAt)
          };
        }

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // 🔥 Temps dynamique
  getTimeAgo(date: Date): string {

    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

    if (seconds < 10) return "à l'instant";
    if (seconds < 60) return `il y a ${seconds}s`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `il y a ${minutes} min`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `il y a ${hours}h`;

    const days = Math.floor(hours / 24);
    return `il y a ${days} jour${days > 1 ? 's' : ''}`;
  }

  // 🔥 Supprimer message
  supprimerMessage() {

    if (!confirm("Voulez-vous vraiment supprimer ce message ?")) return;

    this.deleting = true;

    this.http.delete(`${this.url}/${this.message._id}`).subscribe({
      next: () => {
        this.deleting = false;
        alert("Message supprimé ✅");
        this.router.navigate(['/admin/messages']);
      },
      error: (err) => {
        console.error(err);
        this.deleting = false;
        alert("Erreur suppression ❌");
      }
    });
  }

}