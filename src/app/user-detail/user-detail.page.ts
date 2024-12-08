import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { catchError, Observable } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage /* implements OnInit */ {
  user: any; // Seçilen kullanıcının verisi
  errorMessage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private navCtrl: NavController
  ) {}

  /*  ngOnInit() {
    this.loadUserDetail().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        this.errorMessage = 'Kullanıcı bilgileri yüklenirken bir hata oluştu.';
        console.error('API Hatası:', err);
      },
    });
  } */

  ionViewWillEnter() {
    this.loadUserDetail().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        this.errorMessage = 'Kullanıcı bilgileri yüklenirken bir hata oluştu.';
        console.error('API Hatası:', err);
      },
    });
  }

  // Kullanıcı detaylarını API'den alıyoruz (Observable döndürür)
  loadUserDetail(): Observable<any> {
    const userId = this.activatedRoute.snapshot.paramMap.get('id'); // URL parametrelerinden kullanıcı ID'sini al
    const apiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`; // API URL'si
    return this.http.get<any>(apiUrl).pipe(
      catchError((error) => {
        console.error('API Hatası:', error);
        return []; // Hata durumunda boş bir dizi döndür
      })
    );
  }

  goBack() {
    this.navCtrl.navigateBack('/home');
  }
}
