import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArquivoTextPage } from './arquivo-text';

@NgModule({
  declarations: [
    ArquivoTextPage,
  ],
  imports: [
    IonicPageModule.forChild(ArquivoTextPage),
  ],
})
export class ArquivoTextPageModule {}
