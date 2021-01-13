import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LayoutComponent } from "./layout/layout.component";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { AdminComponent } from "./admin/admin.component";
import { AuthorComponent } from "./admin/author/author.component";
import { BookComponent } from "./admin/book/book.component";

import { HttpService } from "./shared/services/http.service";
import { PagerService } from "./shared/services/pager.service";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    AuthorComponent,
    BookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [HttpService, PagerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
