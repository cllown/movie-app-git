import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MovieListComponent } from "./components/movie-list/movie-list.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, MovieListComponent]
})
export class AppComponent /*implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy*/{

 /* constructor(){
    console.log("Constructor"); //Створення компоненту
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges"); //Будь-які зміни вхидний даних
  }

  ngOnInit(): void {
    console.log("ngOnInit"); //Ініціалізація компоненту, маніпуляції з данними
  }

  ngDoCheck(): void {
    console.log("ngDoCheck"); //Перевірка змін у компоненті. Викликається 1 раз 100% при конструкторі і всі наступні рази при перевірці змін (змінився template)
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit"); //Оновлення наповнення компоненту. Викликається 1 раз після вставки контенту в компонент.
  }

  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked"); //Викликається після кожної перевірки контенту, вставленого в компонент.
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit"); //Викликається 1 раз після ініціалізації представлення компоненту (компонент відмалювася).
  }

  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked"); //Кожен раз коли в template будуть відбуватися зміни.
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy"); //Викликається, коли компонент знищується.
    
  }
    */
}
