import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingDetectionComponent } from './drawing-detection.component';

describe('DrawingDetectionComponent', () => {
  let component: DrawingDetectionComponent;
  let fixture: ComponentFixture<DrawingDetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawingDetectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrawingDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
