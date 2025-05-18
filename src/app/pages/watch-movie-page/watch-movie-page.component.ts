import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie/movie.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-watch-movie-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './watch-movie-page.component.html',
  styleUrl: './watch-movie-page.component.scss',
})
export class WatchMoviePageComponent {
  videoUrl: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.loadTrailer(+movieId);
    }
  }
  loadTrailer(movieId: number) {
    this.movieService.getMovieTrailer(movieId).subscribe((key) => {
      if (key) {
        const url = `https://www.youtube.com/embed/${key}`;
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      } else {
        this.videoUrl = null;
      }
    });
  }
}
