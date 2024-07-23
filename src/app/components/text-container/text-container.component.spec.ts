import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextContainerComponent } from './text-container.component';

describe('TextContainerComponent', () => {
  let component: TextContainerComponent;
  let fixture: ComponentFixture<TextContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
