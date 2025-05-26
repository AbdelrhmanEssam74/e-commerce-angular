import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChekcoutComponent } from './chekcout.component';

describe('ChekcoutComponent', () => {
  let component: ChekcoutComponent;
  let fixture: ComponentFixture<ChekcoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChekcoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChekcoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
