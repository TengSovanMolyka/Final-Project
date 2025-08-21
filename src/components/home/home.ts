import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from '../nav/nav';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, Nav, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
