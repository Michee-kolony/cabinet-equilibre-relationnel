import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-equilibre',
  templateUrl: './equilibre.component.html',
  styleUrl: './equilibre.component.css'
})
export class EquilibreComponent implements OnInit {

  loading: boolean = true;
  showScrollButton: boolean = false; // Nouvelle propriété pour le bouton

  constructor() { }

  ngOnInit(): void {

    setTimeout(()=>{
      this.loading = false;
    }, 1000);

  }

  
  // Détecter le scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Afficher le bouton après avoir scrollé de 300px
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showScrollButton = scrollPosition > 300;
  }

   // Fonction pour remonter en haut de page
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Pour un défilement fluide
    });
  }


}
