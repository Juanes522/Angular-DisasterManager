import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterinvestigatorComponent } from './registerinvestigator.component';

describe('RegisterinvestigatorComponent', () => {
  let component: RegisterinvestigatorComponent;
  let fixture: ComponentFixture<RegisterinvestigatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterinvestigatorComponent]
    });
    fixture = TestBed.createComponent(RegisterinvestigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
