import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrl: './demande.component.css'
})
export class DemandeComponent implements OnInit {

  ngOnInit(): void {
     // Scroll automatique en haut de la page
   window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
