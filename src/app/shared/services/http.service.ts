import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getAll(url) {
    return this.http.get(url);
  }

  post(url, payload) {
    return this.http.post(url, payload);
  }
}
