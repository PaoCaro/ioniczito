import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  public wavesPosition = 0;
  public wavesDiference = 90;
  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;

  constructor(
    public keyboard: Keyboard,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService ) { }

  ngOnInit() { }

  segmentChanged(event: any) {
    if (event.detail.value === 'login') {
      this.slides.slidePrev();
      this.wavesPosition += this.wavesDiference;
    } else {
      this.slides.slideNext();
      this.wavesPosition -= this.wavesDiference;
    }
  }

  async login() {
    await this.presentLoading();

    try {
      await this.authService.login(this.userLogin);
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }

  }

  async register() {
    await this.presentLoading();

    try {
      await this.authService.register(this.userRegister);
    } catch (error) {
      let message: string;


      switch (error.code) {
        case 'auth/email-already-in-use':
        message = 'Este email já foi utilizado!';
        break;

        case 'auth/invalid-email':
        message = 'Este e-mail não existe.';
        break;
      }


      /// Mostrar o erro na tela ( toast )
      this.presentToast(message);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create( { message: 'Estamos a preparar tudo!', });
    return this.loading.present();
  }

  async presentToast(message: string , ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
