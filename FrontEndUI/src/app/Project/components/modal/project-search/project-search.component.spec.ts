import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectSearchComponent } from './project-search.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ProjectService } from '../../../service/project.service';
import { Project } from '../../../model/project';


describe('ProjectSearchComponent', () => {
  let component: ProjectSearchComponent;
  let fixture: ComponentFixture<ProjectSearchComponent>;
  let service: ProjectService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSearchComponent ],
      imports:[ HttpClientModule, HttpClientTestingModule ],
      providers: [ProjectService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSearchComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ProjectService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
