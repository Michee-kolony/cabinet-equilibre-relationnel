import { Component } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {

  searchTerm: string = '';

  messages = [
    {
      nom: 'Jean Mukendi',
      email: 'jean@email.com',
      telephone: '+243900000001',
      message: 'Bonjour, je voudrais avoir plus d’informations sur vos services.',
      date: new Date(new Date().getTime() - 60000)
    },
    {
      nom: 'Sarah Ilunga',
      email: 'sarah@email.com',
      telephone: '+243900000002',
      message: 'Merci pour votre travail, votre site est vraiment professionnel.',
      date: new Date(new Date().getTime() - 3600000)
    },
    {
      nom: 'Patrick Tshibanda',
      email: 'patrick@email.com',
      telephone: '+243900000003',
      message: 'Je souhaite prendre rendez-vous avec votre équipe.',
      date: new Date(new Date().getTime() - 86400000)
    }
  ];

  getTimeAgo(date: Date): string {

    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

    const intervals: any = {
      année: 31536000,
      mois: 2592000,
      jour: 86400,
      heure: 3600,
      minute: 60
    };

    for (const key in intervals) {
      const interval = Math.floor(seconds / intervals[key]);
      if (interval >= 1) {
        return `il y a ${interval} ${key}${interval > 1 ? 's' : ''}`;
      }
    }

    return 'il y a quelques secondes';
  }


  filteredMessages() {

    return this.messages.filter(msg =>
      msg.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      msg.telephone.includes(this.searchTerm)
    );

  }

}