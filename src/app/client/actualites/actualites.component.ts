import { Component } from '@angular/core';

@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.component.html',
  styleUrl: './actualites.component.css'
})
export class ActualitesComponent {

  articles = [
  {
    titre: "Lancement d’une nouvelle plateforme digitale",
    sousTitre: "Une solution innovante pour accompagner la transformation numérique en Afrique.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    date: new Date() // à l'instant
  },
  {
    titre: "Formation en développement web à Kinshasa",
    sousTitre: "Plus de 200 jeunes formés aux technologies modernes comme Angular et Node.js.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    date: new Date(Date.now() - 1000 * 60 * 10) // 10 min
  },
  {
    titre: "L’innovation au cœur des startups africaines",
    sousTitre: "Les jeunes entrepreneurs transforment le paysage technologique du continent.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    date: new Date(Date.now() - 1000 * 60 * 60) // 1h
  },
  {
    titre: "Nouvelle application mobile de fitness",
    sousTitre: "Une app intelligente pour suivre vos performances sportives en temps réel.",
    image: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 jour
  },
  {
    titre: "Transformation digitale des entreprises locales",
    sousTitre: "Les PME adoptent de plus en plus les solutions numériques.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) // 1 semaine
  },
  {
    titre: "Cybersécurité : un enjeu majeur en 2026",
    sousTitre: "Les entreprises renforcent leurs systèmes pour protéger leurs données.",
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30) // 1 mois
  }
];


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
