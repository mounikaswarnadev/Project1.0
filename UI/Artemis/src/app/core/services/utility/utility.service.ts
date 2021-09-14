import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }
  getStatusIcon(status: string, isForParent: boolean = false) {
    switch (status) {
      case 'Installed':
        return !isForParent ? 'fa fa-check-circle check-circle--green' : 'status-completed';
        case 'Build in Progress':
        return !isForParent ? 'fa fa-play-circle' : 'status-progress';
        case 'Operational':
          return !isForParent ? 'fa fa-clock' : 'status-paused';
    }
  }
}
