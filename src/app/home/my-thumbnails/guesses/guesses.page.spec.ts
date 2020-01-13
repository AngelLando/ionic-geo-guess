import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuessesPage } from './guesses.page';

describe('GuessesPage', () => {
  let component: GuessesPage;
  let fixture: ComponentFixture<GuessesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuessesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuessesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
