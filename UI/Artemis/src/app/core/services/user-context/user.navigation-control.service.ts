import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserNavigationControlService {
  constructor(private router: Router) { }

  navigateByAccess(paths: any[]) {
    if (paths && paths.length > 0) {
      this.router.navigate([paths[0].path], paths[0].params);
    }
  }

}
