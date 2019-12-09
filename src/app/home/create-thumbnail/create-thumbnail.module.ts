import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateThumbnailPageRoutingModule } from './create-thumbnail-routing.module';

import { CreateThumbnailPage } from './create-thumbnail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateThumbnailPageRoutingModule
  ],
  declarations: [CreateThumbnailPage]
})
export class CreateThumbnailPageModule {}
