import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "../../../environments/environment";

import { HttpService } from "../../shared/services/http.service";
import { PagerService } from "../../shared/services/pager.service";

@Component({
  selector: "app-author",
  templateUrl: "./author.component.html",
  styleUrls: ["./author.component.css"],
})
export class AuthorComponent implements OnInit {
  authors: any;
  totalAuthors: number;
  pager: any = {};
  pagedAuthors: any[];
  searchString: string;
  searchAuthorsForm: FormGroup;
  updateAuthorForm: FormGroup;
  authorName: string;
  authorId: number;
  private modalRef: NgbModalRef;
  errMsg: any;
  closeResult: any;
  today = new Date();

  constructor(
    private lmsService: HttpService,
    private pagerService: PagerService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.initializeAuthors();
    this.initializeForms();
  }

  initializeAuthors() {
    this.lmsService
      .getAll(`${environment.apiUrl}${environment.readAuthorsURI}`)
      .subscribe((res) => {
        this.authors = res;
        this.totalAuthors = this.authors.length;
        this.setPage(1);
      });
  }

  initializeForms() {
    this.searchAuthorsForm = new FormGroup({
      searchString: new FormControl(this.searchString, [
        Validators.maxLength(45),
      ]),
    });
    this.updateAuthorForm = new FormGroup({
      authorName: new FormControl(this.authorName, [
        Validators.required,
        Validators.maxLength(45),
        Validators.minLength(3),
      ]),
      authorId: new FormControl(this.authorId),
    });
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalAuthors) {
      return;
    }
    this.pager = this.pagerService.getPager(this.totalAuthors, page, 10);
    this.pagedAuthors = this.authors.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  searchAuthors() {
    this.lmsService
      .getAll(
        `http://localhost:8080/lms/admin/readAuthorsByName?searchString=${this.searchAuthorsForm.value.searchString}`
      )
      .subscribe((res) => {
        this.authors = res;
        this.totalAuthors = this.authors.length;
        this.setPage(1);
      });
  }

  deleteAuthor(authorId) {
    let author = {
      authorId: authorId,
    };
    this.lmsService
      .post("http://localhost:8080/lms/admin/saveAuthor", author)
      .subscribe((res) => {
        debugger;
        this.lmsService
          .getAll(
            "http://localhost:8080/lms/admin/readAuthorsByName?searchString="
          )
          .subscribe((res) => {
            this.authors = res;
            this.totalAuthors = this.authors.length;
            this.setPage(1);
          });
      });
  }

  open(content, obj) {
    if (obj !== null) {
      //this is edit/update mode
      this.updateAuthorForm = this.fb.group({
        books: [obj.books],
        authorId: obj.authorId,
        authorName: obj.authorName,
      });
    }

    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      (result) => {
        this.errMsg = "";
        this.closeResult = `Closed with ${result}`;
      },
      (reason) => {
        this.errMsg = "";
        this.closeResult = `Dismissed`;
      }
    );
  }
}
