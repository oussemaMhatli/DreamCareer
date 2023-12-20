import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeadboardPage } from './leadboard.page';

describe('LeadboardPage', () => {
  let component: LeadboardPage;
  let fixture: ComponentFixture<LeadboardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LeadboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
