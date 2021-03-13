import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@shared/loading.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public loadingService: LoadingService) {}

  ngOnInit(): void {}
  logout(): void {
    localStorage.removeItem('admin_token');
    window.location.href = '';
  }
}
