import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MovieService } from '../../services/movie/movie.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  imports: [CommonModule, MovieCardComponent],
})
export class MovieListComponent {
  @Input() movies: Movie[] = [];
}
