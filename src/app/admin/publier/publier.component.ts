import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-publier',
  templateUrl: './publier.component.html',
  styleUrls: ['./publier.component.css']
})
export class PublierComponent implements OnInit, OnDestroy {

  url = "https://api-equilibre.cloud/actualites";

  actualites: any[] = [];
  loading = true;

  showModal = false;
  isEdit = false;
  selectedId: string = '';

  // champs
  titre = '';
  soustitre = '';
  description = '';
  image = '';
  facebook = '';
  twitter = '';
  tiktok = '';

  // RXJS
  refreshSub!: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit() {

    // chargement initial
    this.getActualites();

    // auto refresh toutes les 5 secondes
    this.refreshSub = interval(5000)
      .pipe(
        switchMap(() => this.http.get<any[]>(this.url))
      )
      .subscribe(res => {

        this.actualites = res.sort((a: any, b: any) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        this.loading = false;
      });
  }

  ngOnDestroy() {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }

  getActualites() {
    this.http.get<any[]>(this.url).subscribe(res => {

      this.actualites = res.sort((a: any, b: any) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      this.loading = false;
    });
  }

  // OUVRIR MODAL CREATION
  openModal() {
    this.resetForm();
    this.isEdit = false;
    this.showModal = true;
  }

  // FERMER
  closeModal() {
    this.showModal = false;
  }

  // RESET FORM
  resetForm() {
    this.titre = '';
    this.soustitre = '';
    this.description = '';
    this.image = '';
    this.facebook = '';
    this.twitter = '';
    this.tiktok = '';
  }

  // CREER
  publieractu() {
    const data = {
      titre: this.titre,
      soustitre: this.soustitre,
      description: this.description,
      image: this.image,
      facebook: this.facebook,
      twitter: this.twitter,
      tiktok: this.tiktok
    };

    this.http.post(this.url, data).subscribe(() => {
      this.getActualites();
      this.closeModal();
    });
  }

  // EDIT
  editActualite(act: any) {
    this.isEdit = true;
    this.showModal = true;

    this.selectedId = act._id;

    this.titre = act.titre;
    this.soustitre = act.soustitre;
    this.description = act.description;
    this.image = act.image;
    this.facebook = act.facebook;
    this.twitter = act.twitter;
    this.tiktok = act.tiktok;
  }

  // UPDATE
  updateActualite() {
    const data = {
      titre: this.titre,
      soustitre: this.soustitre,
      description: this.description,
      image: this.image,
      facebook: this.facebook,
      twitter: this.twitter,
      tiktok: this.tiktok
    };

    this.http.put(`${this.url}/${this.selectedId}`, data)
      .subscribe(() => {
        this.getActualites();
        this.closeModal();
      });
  }

  // DELETE
  deleteActualite(id: string) {
    if (confirm("Supprimer cette actualité ?")) {
      this.http.delete(`${this.url}/${id}`)
        .subscribe(() => {
          this.getActualites();
        });
    }
  }

  // FORMAT DATE
  formatDate(date: string) {
    return new Date(date).toLocaleDateString();
  }
}