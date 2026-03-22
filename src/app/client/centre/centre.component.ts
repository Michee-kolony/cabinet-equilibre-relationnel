import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-centre',
  templateUrl: './centre.component.html',
  styleUrl: './centre.component.css'
})
export class CentreComponent implements OnInit {

  lastUpdate = '22 mars 2026';

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
