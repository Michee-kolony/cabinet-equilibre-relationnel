import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {

  url = "https://api-equilibre.cloud/messages";

  formData = {
    nom: '',
    email: '',
    telephone: '',
    message: ''
  };

  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Nous-contacter');
  }

  envoyerMessage(form: NgForm) {

    if (form.invalid) {
      this.errorMessage = "Veuillez remplir correctement tous les champs";
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.http.post(this.url, this.formData).subscribe({
      next: () => {
        this.loading = false;

        this.successMessage = "Message envoyé avec succès";
        form.resetForm();

        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.loading = false;
        console.error(err);

        this.errorMessage = "Erreur serveur ";

        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }
}