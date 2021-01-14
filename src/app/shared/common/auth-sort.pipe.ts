import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "authSort",
})
export class AuthSortPipe implements PipeTransform {
  transform(input: any[]): any {
    if (input) {
      return input.sort((a, b) => {
        let a1: string = a.authorName;
        let a2: string = b.authorName;
        return a1 < a2 ? -1 : a1 > a2 ? 1 : 0;
      });
    }
    return null;
  }
}
