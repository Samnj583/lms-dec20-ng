import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../shared/services/http.service";

@Component({
  selector: "app-author",
  templateUrl: "./author.component.html",
  styleUrls: ["./author.component.css"],
})
export class AuthorComponent implements OnInit {
  constructor(private lmsService: HttpService) {}
  authors: any;
  ngOnInit() {
    this.initializeAuthors();
  }

  initializeAuthors() {
    this.lmsService
      .getAll("http://localhost:8080/lms/admin/getAuthors")
      .subscribe((res) => {
        this.authors = res;
      });
  }
}
