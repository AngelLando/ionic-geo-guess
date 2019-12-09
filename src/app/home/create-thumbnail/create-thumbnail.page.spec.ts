import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateThumbnailPage } from './create-thumbnail.page';

describe('CreateThumbnailPage', () => {
  let component: CreateThumbnailPage;
  let fixture: ComponentFixture<CreateThumbnailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateThumbnailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateThumbnailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
