import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  declare username: string;
  declare password: string;

  constructor(private http: HttpClient, private navCtrl: NavController) {}

  login() {
    const users = [
      { username: 'user1', password: 'pass1' },
      { username: 'user2', password: 'pass2' },
      { username: 'admin', password: 'admin123' },
    ];

    // Observable ile giriş simülasyonu yapıyoruz
    this.simulateLogin(users).subscribe((result) => {
      if (result.success) {
        const fakeToken = this.generateFakeToken(); // Yeni sahte token oluştur
        localStorage.setItem('token', fakeToken); // Token'ı localStorage'a kaydet
        alert('Giriş başarılı!');
        this.navCtrl.navigateForward('/home'); // Ana sayfaya yönlendir
      } else {
        alert('Giriş başarısız! Kullanıcı adı veya şifre yanlış.');
      }
    });
  }

  // Giriş simülasyonu için Observable döndüren fonksiyon
  simulateLogin(
    users: { username: string; password: string }[]
  ): Observable<{ success: boolean }> {
    return new Observable((observer) => {
      const user = users.find(
        (u) => u.username === this.username && u.password === this.password
      );

      // 1 saniye bekleyip sonucu döndürüyoruz
      of({ success: !!user })
        .pipe(delay(1000))
        .subscribe((result) => {
          observer.next(result);
          observer.complete();
        });
    });
  }

  // Sahte token üretme fonksiyonu
  generateFakeToken(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 20; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }

  /*   // API endpoint'i
  const loginUrl = 'https://your-backend-api.com/api/login';

  // Kullanıcı adı ve şifre ile POST isteği gönder
  this.http.post(loginUrl, {
    username: this.username,
    password: this.password
  }).subscribe({
    next: (response: any) => {
      if (response.token) {
        localStorage.setItem('token', response.token); // Gelen token'ı kaydet
        alert('Giriş başarılı!');
        this.navCtrl.navigateForward('/home'); // Ana sayfaya yönlendir
      }
    },
    error: (error) => {
      console.error('Giriş başarısız:', error);
      alert('Giriş başarısız! Kullanıcı adı veya şifre hatalı.');
    }
  }); */
}
