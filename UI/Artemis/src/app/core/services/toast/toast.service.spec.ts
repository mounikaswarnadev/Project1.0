import { TestBed, inject } from "@angular/core/testing";
import { ToastService } from './toast.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Alert } from 'projects/DigitalRock/src/app/shared/models/common/alert/alert';
import { AlertType } from 'projects/DigitalRock/src/app/shared/models/common/alert/alert-type';

describe('ToastService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ToastService
    ],
    imports: [HttpClientTestingModule]
  }));

  it('should send success message', inject([HttpTestingController, ToastService], (httpMock: HttpTestingController, toastService: ToastService) => {
    let alert: Alert;
    toastService.getAlert().subscribe((message: Alert) => alert = message);
    toastService.success('success');
    expect(alert.type).toBe(AlertType.Success);
  }));

  it('should send error message', inject([HttpTestingController, ToastService], (httpMock: HttpTestingController, toastService: ToastService) => {
    let alert: Alert;
    toastService.getAlert().subscribe((message: Alert) => alert = message);
    toastService.error('error');
    expect(alert.type).toBe(AlertType.Error);
  }));

  it('should send info message', inject([HttpTestingController, ToastService], (httpMock: HttpTestingController, toastService: ToastService) => {
    let alert: Alert;
    toastService.getAlert().subscribe((message: Alert) => alert = message);
    toastService.info('info');
    expect(alert.type).toBe(AlertType.Info);
  }));

  it('should send warning message', inject([HttpTestingController, ToastService], (httpMock: HttpTestingController, toastService: ToastService) => {
    let alert: Alert;
    toastService.getAlert().subscribe((message: Alert) => alert = message);
    toastService.warn('Warning');
    expect(alert.type).toBe(AlertType.Warning);
  }));

  it('should clear message', inject([HttpTestingController, ToastService], (httpMock: HttpTestingController, toastService: ToastService) => {
    let alert: Alert;
    toastService.getAlert().subscribe((message: Alert) => alert = message);
    toastService.clear();
    expect(alert).toBeUndefined();
  }));
});
