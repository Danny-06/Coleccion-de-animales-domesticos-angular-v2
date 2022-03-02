import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFavoriteAnimalComponent } from './add-favorite-animal.component';

describe('AddFavoriteAnimalComponent', () => {
  let component: AddFavoriteAnimalComponent;
  let fixture: ComponentFixture<AddFavoriteAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFavoriteAnimalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFavoriteAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
