import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatedVideoListComponentComponent } from './rated-video-list-component.component';

describe('RatedVideoListComponentComponent', () => {
  let component: RatedVideoListComponentComponent;
  let fixture: ComponentFixture<RatedVideoListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatedVideoListComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatedVideoListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
