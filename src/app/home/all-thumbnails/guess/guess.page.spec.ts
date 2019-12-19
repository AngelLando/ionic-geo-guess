import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuessPage } from './guess.page';

describe('GuessPage', () => {
  let component: GuessPage;
  let fixture: ComponentFixture<GuessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
