import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

/**
 * Generated class for the EditarFirebasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-firebase',
  templateUrl: 'editar-firebase.html',
})
export class EditarFirebasePage {
  private formEditar: FormGroup;
  private item: any;
  public loading: any;
  public resultGetOne: any;
  public resultEdit: any;
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(
    public db: AngularFirestore,
    public view: ViewController,
    public fb: FormBuilder,
    public navParams: NavParams,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController)
  {
    this.itemsCollection = db.collection<any>('produtos');

    this.formEditar = fb.group({
      id: [null],
      nome: [null, [Validators.required]],
      autor: [null, [Validators.required]],
      valor: [null, [Validators.required]],
    })
  }
  ionViewDidLoad() {
    this.showLoader()

    this.item = this.navParams.get('item')
    console.log("item:", this.item)
    this.formEditar.setValue({
      id: this.item.id,
      nome: this.item.nome,
      autor: this.item.autor,
      valor: this.item.valor,
    })
    this.loading.dismiss()
  }

  concluir(){
    this.showLoader();

    this.formEditar.setValue({
      id: this.formEditar.value.id,
      nome: this.formEditar.value.nome,
      autor: this.formEditar.value.autor,
      valor: this.formEditar.value.valor,
    })

    this.itemsCollection.doc(this.formEditar.value.id).update(this.formEditar.value).then((res)=>{
      this.loading.dismiss()
      this.mostraMenssagem('Item editado com sucesso', 2500)
      this.view.dismiss();
    })
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });

    this.loading.present();
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
