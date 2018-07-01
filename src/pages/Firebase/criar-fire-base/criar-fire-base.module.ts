import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriarFireBasePage } from './criar-fire-base';

@NgModule({
  declarations: [
    CriarFireBasePage,
  ],
  imports: [
    IonicPageModule.forChild(CriarFireBasePage),
  ],
})
export class CriarFireBasePageModule {}
