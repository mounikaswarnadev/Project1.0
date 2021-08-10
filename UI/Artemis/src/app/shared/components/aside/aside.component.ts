import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  isAsideExpanded = false;
  logged = false;
  isVisible = false;
  constructor() { }

  ngOnInit(): void {
    this.isVisible = true;
  }
  toggleAside() {
    this.isAsideExpanded = !this.isAsideExpanded;
  }

}
