import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayUserProjectsComponent } from './display-user-projects.component';

describe('DisplayUserProjectsComponent', () => {
  let component: DisplayUserProjectsComponent;
  let fixture: ComponentFixture<DisplayUserProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayUserProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayUserProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
