import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsChoicesComponent } from './settings-choices.component';

describe('SettingsChoicesComponent', () => {
  let component: SettingsChoicesComponent;
  let fixture: ComponentFixture<SettingsChoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsChoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsChoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
