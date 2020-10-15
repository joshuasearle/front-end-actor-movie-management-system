import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css'],
})
export class ActorComponent implements OnInit {
  section = 1;
  fullName: string = '';
  bYear: number = 0;
  actorId: string = '';
  title: string = '';
  movieYear: number = 0;
  rating: number = 0;

  actor: string = '';
  movie: string = '';

  actorsDB: any[] = [];
  moviesDB: any[] = [];

  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {
    this.onGetActors();
    this.onGetMovies();
  }

  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }

  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  onSaveActor() {
    const obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe((result) => {
      this.onGetActors();
    });
  }

  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }

  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe((result) => {
      this.onGetActors();
    });
  }

  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe((result) => {
      this.onGetActors();
    });
  }

  resetValues() {
    this.fullName = '';
    this.bYear = 0;
    this.actorId = '';
    this.title = '';
    this.movieYear = 0;
    this.rating = 0;
  }

  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  onSaveMovie() {
    const obj = {
      title: this.title,
      year: this.movieYear,
      rating: this.rating,
      actors: [],
    };
    this.dbService.createMovie(obj).subscribe((result) => {
      this.onGetMovies();
    });
  }

  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe((result) => {
      this.onGetMovies();
    });
  }

  onDeleteMovieBefore() {
    this.dbService.deleteMovieBefore(this.movieYear).subscribe(() => {
      this.onGetMovies();
    });
  }

  onAddActorToMovie() {
    console.log('lsdjfkjs');

    this.dbService.addActorToMovie(this.actor, this.movie).subscribe(() => {
      this.onGetMovies();
    });
    this.dbService.addMovieToActor(this.actor, this.movie).subscribe(() => {
      this.onGetActors();
    });
  }
}
