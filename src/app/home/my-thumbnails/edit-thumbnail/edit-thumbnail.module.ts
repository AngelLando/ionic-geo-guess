import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditThumbnailPageRoutingModule } from './edit-thumbnail-routing.module';

import { EditThumbnailPage } from './edit-thumbnail.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EditThumbnailPageRoutingModule
  ],
  declarations: [EditThumbnailPage]
})
export class EditThumbnailPageModule {}
