import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { catchError, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage /* implements OnInit */ {
  users: any[] = []; // Kullanıcılar listesi
  errorMessage: string = ''; // Hata mesajı

  constructor(private http: HttpClient, private navCtrl: NavController) {}

  /* ngOnInit() {
    this.loadUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        this.errorMessage = 'Kullanıcıları yüklerken bir hata oluştu.';
        console.error('API Hatası:', err);
      },
    });
  } */

  // ionViewWillEnter, sayfa her göründüğünde tetiklenir
  ionViewWillEnter() {
    this.loadUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        this.errorMessage = 'Kullanıcıları yüklerken bir hata oluştu.';
        console.error('API Hatası:', err);
      },
    });
  }

  // Kullanıcıları API'den çekme (Observable döndürür)
  loadUsers(): Observable<any[]> {
    const apiUrl = 'https://jsonplaceholder.typicode.com/users'; // API URL
    return this.http.get<any[]>(apiUrl).pipe(
      catchError((error) => {
        console.error('API Hatası:', error);
        return []; // Hata durumunda boş bir dizi döndür
      })
    );
  }

  // Kullanıcıya tıklandığında detay sayfasına yönlendirme
  viewUserDetails(userId: number) {
    this.navCtrl.navigateForward(`/user-detail/${userId}`);
  }

  logout() {
    // Token'i temizle
    localStorage.removeItem('token');
    // Giriş sayfasına yönlendir
    this.navCtrl.navigateRoot('/login');
  }
}
