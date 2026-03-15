import { Component } from '@angular/core';

interface FaqItem {
  question: string;
  answer: string;
  open: boolean;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  faqs: FaqItem[] = [
    {
      question: "Qu’est-ce que le Cabinet Équilibre Relationnel ?",
      answer: "Notre cabinet accompagne les individus et couples dans l’amélioration de leurs relations personnelles et affectives grâce à des conseils personnalisés et un suivi professionnel.",
      open: false
    },
    {
      question: "Comment se déroule une séance de coaching ?",
      answer: "Chaque séance commence par un entretien pour comprendre votre situation, suivi d’exercices pratiques et de conseils adaptés à vos besoins relationnels.",
      open: false
    },
    {
      question: "Proposez-vous des services pour les couples uniquement ?",
      answer: "Non, nous accompagnons aussi bien les individus que les couples, que ce soit pour résoudre des conflits, améliorer la communication ou renforcer la confiance en soi.",
      open: false
    },
    {
      question: "Puis-je prendre rendez-vous en ligne ?",
      answer: "Oui, nous proposons la réservation de séances directement sur notre site via un formulaire sécurisé.",
      open: false
    },
    {
      question: "Les séances sont-elles confidentielles ?",
      answer: "Absolument. Toute information partagée dans le cadre de nos séances est strictement confidentielle et protégée par notre politique de confidentialité.",
      open: false
    }
  ];

  toggle(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}