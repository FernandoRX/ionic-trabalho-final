import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FirebasePage } from '../pages/Firebase/firebase';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = FirebasePage;

  pages: any

  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.pages = [
      {title: 'Quadrinhos', component: FirebasePage},
      {title: 'E-mail', component: 'EmailPage'},
      {title: 'Pipe', component: 'PipePage'},
      {title: 'ArquivoTexto', component: 'ArquivoTextPage'},
      {title: 'Mapa', component: 'MapPage'}

    ]
  }
  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
