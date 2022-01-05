import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BharatrpatilChatComponent } from './bharatrpatil-chat.component';

describe('BharatrpatilChatComponent', () => {
  let component: BharatrpatilChatComponent;
  let fixture: ComponentFixture<BharatrpatilChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BharatrpatilChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BharatrpatilChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
