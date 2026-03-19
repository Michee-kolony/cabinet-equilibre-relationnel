import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  url = "https://api-equilibre.cloud/demande";
  demande: any = null;
  loading: boolean = true;
  showDeleteModal: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getDemandeById(id);
    }
  }

  getDemandeById(id: string) {
    this.http.get<any[]>(this.url).subscribe(data => {
      this.demande = data.find(d => d._id === id);
      this.loading = false;
    }, error => {
      console.error("Erreur lors de la récupération de la demande :", error);
      this.loading = false;
    });
  }

  getInitials(name: string) {
    if (!name) return '';
    const parts = name.split(' ');
    return parts.map(p => p[0]).join('').toUpperCase();
  }

  // Méthode pour imprimer la fiche
  imprimerFiche() {
    const fiche = document.getElementById('ficheClient');
    if (!fiche) return;

    html2canvas(fiche, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Fiche_${this.demande.nom || 'client'}.pdf`);
    });
  }

  modifierStatut() {
  if (!this.demande) return;

  this.loading = true;

  // Appel API pour mettre à jour le statut
  this.http.put(`${this.url}/${this.demande._id}`, { status: this.demande.status })
    .subscribe({
      next: (res: any) => {
        console.log("Statut mis à jour :", res);
        this.loading = false;
        alert("Le statut de la demande a été mis à jour !");
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour du statut :", err);
        this.loading = false;
        alert("Erreur lors de la mise à jour du statut !");
      }
    });
}

 // ✅ Nouvelle méthode de suppression
  supprimerDemande() {
    if (!this.demande) return;

    this.http.delete(`${this.url}/${this.demande._id}`).subscribe({
      next: (res: any) => {
        this.showDeleteModal = false;
        alert("La demande a été supprimée avec succès !");
        // Optionnel : rediriger vers la liste des demandes
        // this.router.navigate(['/demandes']);
        this.router.navigate(['/admin/demandes']);
      },
      error: (err) => {
        this.showDeleteModal = false;
        alert("Erreur lors de la suppression de la demande !");
        console.error(err);
      }
    });
  }

  launchmodal(){
    this.showDeleteModal = !this.showDeleteModal;
  }

}