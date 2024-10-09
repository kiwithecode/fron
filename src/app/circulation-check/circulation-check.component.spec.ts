import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirculationCheckComponent } from './circulation-check.component';

describe('CirculationCheckComponent', () => {
  let component: CirculationCheckComponent;
  let fixture: ComponentFixture<CirculationCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CirculationCheckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CirculationCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
