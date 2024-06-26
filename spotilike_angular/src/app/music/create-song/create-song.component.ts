import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MusicService } from '../music.service';
import { Artiste, Genre } from 'src/app/models/music.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.css']
})
export class CreateSongComponent implements OnInit {
  morceauForm!: FormGroup;
  genres: Genre[] = [];
  album!: string;
  artiste!: Artiste;
  message : string = '';

  constructor(
    private formBuilder: FormBuilder,
    private musicService: MusicService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.album = params['id'];
      this.getAlbumAndArtist();
    });
    this.getGenres();
    this.initForm();
  }

  initForm(): void {
    this.morceauForm = this.formBuilder.group({
      titre: ['', Validators.required],
      artiste: [this.artiste ? this.artiste.name : '', Validators.required],
      album: [this.album, Validators.required],
      duree: ['', Validators.required],
      genre: [null, Validators.required],
    });
  }

  getAlbumAndArtist(): void {
    this.musicService.getAlbum(this.album).subscribe(
      (album) => {
        this.artiste = album.artiste;
        this.initForm();
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'album et de l\'artiste:', error);
      }
    );
  }

  getGenres(): void {
    this.musicService.getGenres().subscribe(
      (genres) => {
        this.genres = genres;
      },
      (error) => {
        console.error('Erreur lors de la récupération des genres:', error);
      }
    );
  }

  crearMorceau(): void {
    if (this.morceauForm.valid) {
      const morceauData = this.morceauForm.value;
      this.musicService.createMorceau(morceauData).subscribe(
        () => {
          this.message = 'Morceau créé avec succès';
          this.morceauForm.reset();
        },
        (error) => {
          this.message = 'Erreur lors de la création du morceau';
          console.error('Erreur lors de la création du morceau:', error);
        }
      );
    }
  }
}