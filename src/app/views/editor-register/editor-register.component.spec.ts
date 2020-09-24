import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorRegisterComponent } from './editor-register.component';

describe('EditorRegisterComponent', () => {
  let component: EditorRegisterComponent;
  let fixture: ComponentFixture<EditorRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
