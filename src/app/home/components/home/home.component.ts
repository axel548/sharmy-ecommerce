 import { Component, OnInit, AfterContentInit } from '@angular/core';
 import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit {

  mySwiper!: Swiper;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(){
    this.mySwiper = new Swiper('.swiper-container');
  }
}
