import { environment } from "../../../environments/environment";

import { HttpService } from "../../shared/services/http.service";
import { PagerService } from "../../shared/services/pager.service";
import { Observable, from, of, observable, throwError } from "rxjs";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { Pipe, PipeTransform } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { AuthorComponent } from "./author.component";

@Pipe({
  name: "authSort",
})
export class MockAuthSortPipe implements PipeTransform {
  transform(input: any[]): any {}
}

export class MockNgbModalRef {
  result: Promise<any> = new Promise((resolve, reject) => resolve("x"));
}

describe("AuthorComponent", () => {
  let component: AuthorComponent;
  let fixture: ComponentFixture<AuthorComponent>;
  let service: HttpService;
  let pagerService: PagerService;
  let modalService: NgbModal;
  let fb: FormBuilder;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorComponent, MockAuthSortPipe],
      imports: [NgbModule, ReactiveFormsModule, FormsModule, HttpClientModule],
      providers: [HttpService, PagerService],
    }).compileComponents();
    service = new HttpService(null);
    pagerService = new PagerService();
    fb = new FormBuilder();
    modalService = TestBed.get(NgbModal);
    component = new AuthorComponent(service, pagerService, fb, modalService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorComponent);
  });

  it("should create", () => {
    expect(component).toBeTruthy;
  });

  it("should initialize authors/forms on lifecyle onInit", () => {
    spyOn(component, "initializeAuthors");
    spyOn(component, "initializeForms");
    component.ngOnInit();
    expect(component.initializeForms).toHaveBeenCalled();
    expect(component.initializeAuthors).toHaveBeenCalled();
  });

  it("load authors via a mock-service & return mock data", () => {
    const mockAuthors = [
      {
        authorId: 90,
        authorName: "Updated Author SSApril",
        books: [
          {
            bookId: 40,
            title: "Book 39",
            authors: null,
            genres: null,
            publisher: null,
          },
        ],
      },
      {
        authorId: 92,
        authorName: "New Author from JSP 01 - Updated",
        books: [
          {
            bookId: 40,
            title: "Book 39",
            authors: null,
            genres: null,
            publisher: null,
          },
        ],
      },
    ];
    spyOn(service, "getAll").and.returnValue(of(mockAuthors));
    component.ngOnInit();
    expect(component.authors).toEqual(mockAuthors);
    expect(component.authors.length).toEqual(2);
  });

  it(" check if updateAuthorModal was opened", () => {
    const mockAuthor = {
      authorId: 90,
      authorName: "Updated Author SSApril",
      books: [
        {
          bookId: 40,
          title: "Book 39",
          authors: null,
          genres: null,
          publisher: null,
        },
      ],
    };
    spyOn(modalService, "open").and.returnValue(mockModalRef);

    component.open("updateAuthorModal", mockAuthor);
  });
});
