import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-securite',
  templateUrl: './securite.component.html',
  styleUrl: './securite.component.css'
})
export class SecuriteComponent implements OnInit {
   lastUpdate = '22 mars 2026';


   ngOnInit(): void {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   }
}
