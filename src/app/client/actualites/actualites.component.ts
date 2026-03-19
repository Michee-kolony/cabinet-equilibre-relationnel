import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.component.html',
  styleUrl: './actualites.component.css'
})
export class ActualitesComponent implements OnInit, OnDestroy {

  url = "https://api-equilibre.cloud/actualites";

  articles: any[] = [];
  articlesFiltres: any[] = [];
  searchText: string = "";
  loading: boolean = false;

  refreshSub!: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.getActualites();

    // 🔥 Auto refresh chaque 30 secondes
    this.refreshSub = interval(30000).subscribe(() => {
      console.log("🔄 Actualisation automatique...");
      this.getActualites(false); // sans loader pour UX propre
    });
  }

  ngOnDestroy(): void {
    // ⚠️ Important pour éviter fuite mémoire
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }

 // 🔥 Récupération API du plus récent au plus ancien
getActualites(showLoading: boolean = true) {
  if (showLoading) this.loading = true;

  this.http.get<any[]>(this.url).subscribe({
    next: (data) => {
      // Trier par date décroissante (plus récent d'abord)
      this.articles = data.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      this.filtrer(); // garder le filtre actif
      this.loading = false;
    },
    error: (err) => {
      console.error(err);
      this.loading = false;
    }
  });
}
  // 🔍 Recherche
  filtrer() {
    const val = this.searchText.toLowerCase();

    this.articlesFiltres = this.articles.filter(a =>
      a.titre.toLowerCase().includes(val) ||
      a.soustitre.toLowerCase().includes(val)
    );
  }

  // ⏱ Temps relatif
  getTimeAgo(date: string): string {
    const now = new Date();
    const past = new Date(date);
    const diff = (now.getTime() - past.getTime()) / 1000;

    if (diff < 60) return "À l'instant";
    if (diff < 3600) return Math.floor(diff / 60) + " min";
    if (diff < 86400) return Math.floor(diff / 3600) + " h";
    if (diff < 604800) return Math.floor(diff / 86400) + " j";
    if (diff < 2592000) return Math.floor(diff / 604800) + " sem";
    if (diff < 31536000) return Math.floor(diff / 2592000) + " mois";

    return Math.floor(diff / 31536000) + " an";
  }

}