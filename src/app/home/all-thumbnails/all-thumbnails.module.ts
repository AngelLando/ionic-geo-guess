import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllThumbnailsPageRoutingModule } from './all-thumbnails-routing.module';

import { AllThumbnailsPage } from './all-thumbnails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllThumbnailsPageRoutingModule
  ],
  declarations: [AllThumbnailsPage]
})
export class AllThumbnailsPageModule {}
