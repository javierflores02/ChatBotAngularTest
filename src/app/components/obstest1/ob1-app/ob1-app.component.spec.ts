import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ob1AppComponent } from './ob1-app.component';

describe('Ob1AppComponent', () => {
  let component: Ob1AppComponent;
  let fixture: ComponentFixture<Ob1AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ob1AppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ob1AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
