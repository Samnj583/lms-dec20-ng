import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[appShowRed]",
})
export class ShowRedDirective {
  constructor(private elRef: ElementRef) {
    elRef.nativeElement.style.background = "red";
  }
}
