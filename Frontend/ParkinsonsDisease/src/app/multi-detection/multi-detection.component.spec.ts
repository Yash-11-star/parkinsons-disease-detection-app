import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiDetectionComponent } from './multi-detection.component';

describe('MultiDetectionComponent', () => {
  let component: MultiDetectionComponent;
  let fixture: ComponentFixture<MultiDetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiDetectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
