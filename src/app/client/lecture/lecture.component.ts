import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrl: './lecture.component.css'
})
export class LectureComponent implements OnInit {

  article: any;
  loading: boolean = false;

  url = "https://api-equilibre.cloud/actualites";

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getArticle(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 🔥 Récupérer l’article par ID
  getArticle(id: any) {
    this.loading = true;

    this.http.get<any[]>(this.url).subscribe({
      next: (data) => {
        this.article = data.find(a => a._id === id);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
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