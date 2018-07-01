import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, App } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { File } from '@ionic-native/file';

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
  public diretorio: any;
  public nomeArquivo:any;
  public texto: any = [];
  public email: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public emailCtrl: EmailComposer,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public file: File,
    public app: App
  ) {
    this.CreateTXT("Txt predefinido")
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
      this.mostraMenssagem('email obrigatorio')
    }  
  }

  CreateTXT(text){
    this.diretorio = this.file.dataDirectory;
    this.nomeArquivo = 'arquivo.txt';
    this.texto = text
    this.file.writeFile(this.diretorio, this.nomeArquivo, this.texto, { replace: true })
    .then((result) => {
      this.mostraMenssagem("txt criado com sucesso",2500)
    })
    .catch((err) => this.mostraMenssagem("Erro ao criar arquivo texto " + JSON.stringify(err), 2500));
  }

  criar(text) {
    if (this.texto === null) {
      this.CreateTXT(text)
    } else {
      this.mostraMenssagem('Exclua o txt para criar um novo', 2500)
    }
  }

  deletar() {

    this.file.removeFile(this.diretorio, this.nomeArquivo).then((res) => {
      console.log(res)
      this.mostraMenssagem("Deletado com sucesso", 2500);
      this.texto = null
    })
      .catch((err) => this.mostraMenssagem("Erro ao deletar" + JSON.stringify(err), 2500));
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
