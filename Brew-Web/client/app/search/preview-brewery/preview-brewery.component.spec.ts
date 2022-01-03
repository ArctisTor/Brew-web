import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewBreweryComponent } from './preview-brewery.component';

describe('PreviewBreweryComponent', () => {
  let component: PreviewBreweryComponent;
  let fixture: ComponentFixture<PreviewBreweryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewBreweryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewBreweryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
