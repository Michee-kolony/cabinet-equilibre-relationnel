import { Component , OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {

ngOnInit(): void {
   // Scroll automatique en haut de la page
   window.scrollTo({ top: 0, behavior: 'smooth' });
}


}
