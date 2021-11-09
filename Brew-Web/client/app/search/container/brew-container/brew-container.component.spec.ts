import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrewContainerComponent } from './brew-container.component';

describe('BrewContainerComponent', () => {
  let component: BrewContainerComponent;
  let fixture: ComponentFixture<BrewContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrewContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
