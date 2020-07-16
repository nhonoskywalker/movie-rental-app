import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesRentComponent } from './movies-rent.component';

describe('MoviesRentComponent', () => {
  let component: MoviesRentComponent;
  let fixture: ComponentFixture<MoviesRentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesRentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
