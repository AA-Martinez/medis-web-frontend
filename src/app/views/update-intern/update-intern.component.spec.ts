import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInternComponent } from './update-intern.component';

describe('UpdateInternComponent', () => {
  let component: UpdateInternComponent;
  let fixture: ComponentFixture<UpdateInternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateInternComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateInternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
