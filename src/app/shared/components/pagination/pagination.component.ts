import { Component, input, output, Pipe } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-pagination',
  imports: [TranslatePipe],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  currentPage = input<number>(1);
  totalPages = input<number[]>([1, 2, 3, 4, 5]);
  showPrevNext = input<boolean>(true);
  pageChange = output<number>();


  selectPage(page: number): void {
    if (page >= 1 && page <= this.totalPages().length && page !== this.currentPage()) {
      this.pageChange.emit(page);
    }
  }

  pages(): number[] {
    return Array.from(
      { length: this.totalPages().length },
      (_, index) => index + 1
    );

  }

}
