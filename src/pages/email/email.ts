import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

/**
 * Generated class for the EmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-email',
  templateUrl: 'email.html',
})
export class EmailPage {

  public email: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public emailCtrl: EmailComposer,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailPage');
  }

  enviarEmailDinamico(){
    this.emailCtrl.open({
      to: this.email,
      isHtml: true
    });
  }

  sendMail(email){

    if (email) {
      let alert = this.alertCtrl.create({
        title: 'Preencha os campos:',
        inputs: [
          {
            placeholder: 'Assunto'
          },
          {
            placeholder: 'Mensagem'
          }
        ],
        buttons: [
          {
            text: 'Cancelar'
          },
          {
            text: 'Enviar',
            role: 'send',
            handler: data => {
                this.emailCtrl.open({
                  to: email,
                  subject: data[0],
                  body: data[1],
                  isHtml: true
                });
            }
          }
        ]
      });
      alert.present()
    } else {
      this.mostraMenssagem('Digite um email')
    }  
  }

  mostraMenssagem(message: string, duration?: number) {
    let menssagem = this.toastCtrl.create({
      message: message,
      duration: duration,
      showCloseButton: true,
      closeButtonText: "Ok"
    });
    menssagem.present();
  }

}
