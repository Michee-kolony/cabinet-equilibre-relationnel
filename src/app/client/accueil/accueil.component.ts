import { Component, OnInit, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Title } from '@angular/platform-browser';

gsap.registerPlugin(ScrollTrigger); // Important pour activer ScrollTrigger

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements AfterViewInit, OnInit{
showPopup = false;


constructor(private title: Title){}

  ngAfterViewInit(): void {
     // Animate stat1
    this.animateNumber('#stat1', 0, 2); // 9000 en 2 secondes
    this.animateNumber('#stat2', 0, 2);
    this.animateNumber('#stat3', 0, 2);
    this.animateNumber('#stat4', 0, 2);
    // Attend la fin du rendu du DOM pour les textes
  setTimeout(() => {
    this.animateTexts();
  }, 0);
  }

  ngOnInit(): void {

    this.title.setTitle('Accueil');
     setTimeout(() => {
    this.showPopup = true;
  }, 5000); // popup après 3 secondes
     // Scroll automatique en haut de la page
   window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  animateTexts() {

  const elements = document.querySelectorAll(".animate-text");

  elements.forEach((el: any) => {

    const text = el.innerText;
    el.innerHTML = "";

    // transformer chaque lettre en span
    text.split("").forEach((letter: string) => {
      const span = document.createElement("span");
      span.innerText = letter;
      span.style.opacity = "0";
      el.appendChild(span);
    });

    const letters = el.querySelectorAll("span");

    // animation typewriting déclenchée au scroll
    gsap.to(letters, {
      opacity: 1,
      duration: 0.05,
      stagger: 0.05,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top 80%", // quand l'élément arrive à 80% de l'écran
        toggleActions: "play none none none"
      }
    });

  });

}


  animateNumber(selector: string, endValue: number, duration: number) {
    const element = document.querySelector(selector) as HTMLElement; // ⬅ cast en HTMLElement
    if (!element) return;

    gsap.fromTo(
      element,
      { innerText: '0' }, // gsap fonctionne mieux avec string pour innerText
      {
        innerText: endValue.toString(),
        duration: duration,
        scrollTrigger: {
          trigger: element,
          start: "top 80%", // déclenche quand l'élément est visible à 80% du viewport
          toggleActions: "play none none none",
        },
        snap: { innerText: 1 }, // pour nombres entiers
        ease: "power1.out",
        onUpdate: function () {
          element.innerText = Math.floor(Number(element.innerText)).toLocaleString();
        }
      }
    );
  }

  closePopup() {
  this.showPopup = false;
}



}
