import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDialogsComponent } from './settings-dialogs.component';

describe('SettingsDialogsComponent', () => {
  let component: SettingsDialogsComponent;
  let fixture: ComponentFixture<SettingsDialogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsDialogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
