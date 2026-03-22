import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrl: './conditions.component.css'
})
export class ConditionsComponent implements OnInit {

   lastUpdate = '22 mars 2026';

   ngOnInit(): void {
      // Scroll automatique en haut de la page
    window.scrollTo({ top: 0, behavior: 'smooth' });
   }

}
