import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebasePage } from '../firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the CriarFireBasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-criar-fire-base',
  templateUrl: 'criar-fire-base.html',
  
})
export class CriarFireBasePage {
  private formItem: FormGroup;
  public loading
  public resultCreate: any;
  private itemsCollection: AngularFirestoreCollection<any>;
  private fotoSelecionada : any;
  public numeroCodBarra: any;
  public tipoDeCodBarra: any;

  constructor(
    public db: AngularFirestore,
    public fb: FormBuilder,
    public navParams: NavParams,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public camera: Camera,
    public barCode: BarcodeScanner
  )
  {
    this.formItem = fb.group({
      id: [null],
      foto: [null],
      codBarra: [null],    
      nome: [null, [Validators.required]],
      autor: [null, [Validators.required]],
      valor: [null, [Validators.required]]
      
    })
    this.itemsCollection = db.collection<any>('produtos');
  }

  ionViewDidLoad() {
  }

  submit(){
    if(this.fotoSelecionada == null){
      return this.mostraMenssagem('Adicione uma Foto', 2500)
    }

    if(this.numeroCodBarra == null){
      return this.mostraMenssagem('Leia algum codBarra', 2500)
    }
    const id = this.db.createId();
    this.formItem.setValue({
      id: id,
      nome: this.formItem.value.nome,
      autor: this.formItem.value.autor,
      valor: this.formItem.value.valor,
      foto : this.fotoSelecionada.toString(),
      codBarra: this.numeroCodBarra

    })
    this.itemsCollection.doc(id).set(this.formItem.value ).then((res)=>{
      this.mostraMenssagem('Novo quadrinho registrado!', 2500)
      this.navCtrl.setRoot(FirebasePage)
    })
  }

  tirarFotoBase64(){
    let configuracoes : CameraOptions = {
      targetWidth:800,
      targetHeight:600,
      quality: 50,
      correctOrientation: true,
      saveToPhotoAlbum:true,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    this.camera.getPicture(configuracoes).then((res) => {
      this.fotoSelecionada = "data:image/jpeg;base64," + res;
    })
  }

  lerCodBarra(){
    this.barCode.scan({
      "prompt": "Realize a leitura do codigo de barra",
      "orientation": "landscape"
    }).then((res)=>{
      this.numeroCodBarra = res.text
      this.tipoDeCodBarra = res.format
    }).catch((err) => {
      this.mostraMenssagem('Erro ao realizar leitura')
    })
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
