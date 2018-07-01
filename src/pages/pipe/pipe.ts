import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pipe',
  templateUrl: 'pipe.html',
})
export class PipePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public toLowerCase : any = 'TESTE';

  ionViewDidLoad() {
    console.log('ionViewDidLoad PipePage');
  }

}
