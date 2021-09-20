import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsDescriptionComponent } from './os-description.component';

describe('OsDescriptionComponent', () => {
  let component: OsDescriptionComponent;
  let fixture: ComponentFixture<OsDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
