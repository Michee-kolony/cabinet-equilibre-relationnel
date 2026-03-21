import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-gestionadmin',
  templateUrl: './gestionadmin.component.html',
  styleUrls: ['./gestionadmin.component.css']
})
export class GestionadminComponent implements OnInit, OnDestroy {

  url = "https://api-equilibre.cloud/admin";

  admins: any[] = [];
  filteredAdmins: any[] = [];

  searchText: string = '';
  loading = true;

  newAdmin = {
    nom: '',
    email: '',
    password: ''
  };

  creating = false;

  showAlert = false;
  alertMessage = '';
  alertType: 'success' | 'error' = 'success';

  refreshSub!: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAdmins();

    this.refreshSub = interval(5000).subscribe(() => {
      this.getAdmins(false);
    });
  }

  ngOnDestroy(): void {
    if (this.refreshSub) this.refreshSub.unsubscribe();
  }

  // 🔥 SAFE DATE
  parseDate(date: any): number {
    if (!date) return 0;
    const d = new Date(date);
    return isNaN(d.getTime()) ? 0 : d.getTime();
  }

  // 🔹 GET ADMINS
  getAdmins(showLoading: boolean = true) {
    if (showLoading) this.loading = true;

    this.http.get<any[]>(this.url).subscribe(data => {

      const sorted = data.sort((a, b) =>
        this.parseDate(b.createAt) - this.parseDate(a.createAt)
      );

      this.admins = sorted;

      if (this.searchText) {
        this.onSearch();
      } else {
        this.filteredAdmins = sorted;
      }

      this.loading = false;
    });
  }

  // 🔍 SEARCH
  onSearch() {
    const value = this.searchText.toLowerCase();

    this.filteredAdmins = this.admins.filter(admin =>
      admin.nom?.toLowerCase().includes(value) ||
      admin.email?.toLowerCase().includes(value)
    );
  }

  // ✅ VALIDATION
  isFormValid(): boolean {
    return !!(
      this.newAdmin.nom &&
      this.newAdmin.email &&
      this.newAdmin.password
    );
  }

  // ➕ CREATE
  createAdmin() {
    if (!this.isFormValid()) return;

    this.creating = true;

    this.http.post(this.url, this.newAdmin).subscribe(() => {

      this.newAdmin = { nom: '', email: '', password: '' };
      this.getAdmins();

      this.showPopup("Administrateur créé avec succès", "success");

      this.creating = false;

    }, () => {
      this.showPopup("Erreur lors de la création", "error");
      this.creating = false;
    });
  }

  // 🗑️ DELETE
  deleteAdmin(id: string) {
    if (!confirm("Supprimer cet administrateur ?")) return;

    this.http.delete(`${this.url}/${id}`).subscribe(() => {
      this.getAdmins();
      this.showPopup("Administrateur supprimé", "success");
    });
  }

  // 🔔 POPUP
  showPopup(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  // 🔥 TIME AGO ULTRA PRO
  getTimeAgo(date: string): string {

    if (!date) return "Date inconnue";

    const now = new Date().getTime();
    const created = this.parseDate(date);

    const diff = Math.floor((now - created) / 1000);

    if (diff < 5) return "à l'instant";
    if (diff < 60) return `il y a ${diff} sec`;

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `il y a ${minutes} min`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `il y a ${hours} h`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `il y a ${days} jour${days > 1 ? 's' : ''}`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `il y a ${weeks} semaine${weeks > 1 ? 's' : ''}`;

    const months = Math.floor(days / 30);
    if (months < 12) return `il y a ${months} mois`;

    const years = Math.floor(days / 365);
    return `il y a ${years} an${years > 1 ? 's' : ''}`;
  }

}