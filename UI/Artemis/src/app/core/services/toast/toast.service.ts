import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Alert } from 'src/app/shared/models/alert/alert';
import { AlertType } from 'src/app/shared/models/alert/alert-type';

@Injectable()
export class ToastService {
  private subject: Subject<Alert> = new Subject<Alert>();

  constructor() {

  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string) {
    this.alert(AlertType.Success, message);
  }

  error(message: string) {
    this.alert(AlertType.Error, message);
  }

  info(message: string) {
    this.alert(AlertType.Info, message);
  }

  warn(message: string) {
    this.alert(AlertType.Warning, message);
  }

  alert(type: AlertType, message: string) {
    this.subject.next(<Alert>{ type: type, message: message });
  }

  clear() {
    this.subject.next();
  }
}
