import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllThumbnailsPage } from './all-thumbnails.page';

describe('AllThumbnailsPage', () => {
  let component: AllThumbnailsPage;
  let fixture: ComponentFixture<AllThumbnailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllThumbnailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllThumbnailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
