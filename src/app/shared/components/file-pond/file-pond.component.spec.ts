import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePondComponent } from './file-pond.component';

describe('FilePondComponent', () => {
  let component: FilePondComponent;
  let fixture: ComponentFixture<FilePondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilePondComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilePondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
