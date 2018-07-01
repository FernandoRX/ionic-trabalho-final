import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, ViewController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  mapa: any;
  lat: any;
  long: any;
  latDest: 0;
  longDest: 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    public platform: Platform,
    public modal: ModalController,
    public view: ViewController,
    public toastCtrl: ToastController
    ) {
      platform.ready().then(() => {
        this.posicaoAtual();
      })
  }

  mostrarMapa() {
    let mapContainer = document.getElementById('map');
    this.mapa = new google.maps.Map(
      mapContainer,
      {
        center: new google.maps.LatLng(this.lat, this.long), zoom: 14
      }
    );

    let marcador = new google.maps.Marker({
      icon: 'assets/imgs/marcador.png',
      map: this.mapa,
      position: new google.maps.LatLng(this.lat, this.long)
    });
    console.log(marcador)

    if(this.latDest && this.longDest) {
      var marcador2 = new google.maps.Marker({
        icon: 'assets/imgs/marcador.png',
        map: this.mapa,
        position: new google.maps.LatLng(this.latDest, this.longDest)
      })

      console.log(marcador2)
    }
  }

  posicaoAtual(): any {
    debugger
    this.geolocation.getCurrentPosition({ timeout: 30000 })
    .then(res => {
      this.lat = res.coords.latitude;
      this.long = res.coords.longitude;
      this.mostrarMapa();
    })
    .catch((err) => {
      console.log(err);
      this.lat = -18.59;
      this.long = -46.515;
      this.mostrarMapa();
    })

    this.latDest = null
    this.longDest = null
  }
}
