import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() favoriteMovieIds: string[] = [];
  @Input() watchLaterMovieIds: string[] = [];

  constructor(private router: Router) {}

  navigateWithData(data: string[], favourites?: string) {
    const dataString = JSON.stringify(data);
    const path = favourites ? 'favourites' : 'watch-list';
    this.router.navigate([{ outlets: { header: [path] } }], {
      queryParams: { data: dataString },
    });
  }
}
