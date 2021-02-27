import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  viewInit = false;
  ngOnInit(): void {
    setTimeout(() => {
      this.viewInit = true;
    }, 500);
  }
}
