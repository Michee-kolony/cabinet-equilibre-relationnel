import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquilibreComponent } from './equilibre.component';

describe('EquilibreComponent', () => {
  let component: EquilibreComponent;
  let fixture: ComponentFixture<EquilibreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquilibreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquilibreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
