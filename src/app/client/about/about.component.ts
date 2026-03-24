import { Component , OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {


constructor(private title: Title){}

ngOnInit(): void {

   this.title.setTitle('à propos | cabinet equilibre relationnel');
   // Scroll automatique en haut de la page
   window.scrollTo({ top: 0, behavior: 'smooth' });
}


}
