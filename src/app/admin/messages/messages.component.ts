import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {

  searchTerm: string = '';
  url = "https://api-equilibre.cloud/messages";

  messages: any[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getMessages();
  }

  // 🔥 Récupération API + tri par date récente
  getMessages() {
    this.loading = true;

    this.http.get<any[]>(this.url).subscribe({
      next: (data) => {

        // 🔥 correction createAt → date
        this.messages = data
          .map(msg => ({
            ...msg,
            date: new Date(msg.createAt || msg.createdAt)
          }))
          .sort((a, b) => b.date.getTime() - a.date.getTime()); // 🔥 récent en haut

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // 🔥 Temps dynamique PRO
  getTimeAgo(date: Date): string {

    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

    if (seconds < 10) return "à l'instant";
    if (seconds < 60) return `il y a ${seconds}s`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `il y a ${minutes} min`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `il y a ${hours}h`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `il y a ${days} jour${days > 1 ? 's' : ''}`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `il y a ${weeks} semaine${weeks > 1 ? 's' : ''}`;

    const months = Math.floor(days / 30);
    if (months < 12) return `il y a ${months} mois`;

    const years = Math.floor(days / 365);
    return `il y a ${years} an${years > 1 ? 's' : ''}`;
  }

  // 🔍 Recherche dynamique
  filteredMessages() {
    return this.messages.filter(msg =>
      msg.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      msg.telephone.includes(this.searchTerm)
    );
  }
}