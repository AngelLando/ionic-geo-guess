import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyThumbnailsPage } from './my-thumbnails.page';

describe('MyThumbnailsPage', () => {
  let component: MyThumbnailsPage;
  let fixture: ComponentFixture<MyThumbnailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyThumbnailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyThumbnailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
