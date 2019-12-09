import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyThumbnailsPageRoutingModule } from './my-thumbnails-routing.module';

import { MyThumbnailsPage } from './my-thumbnails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyThumbnailsPageRoutingModule
  ],
  declarations: [MyThumbnailsPage]
})
export class MyThumbnailsPageModule {}
