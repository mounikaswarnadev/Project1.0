import { TestBed, fakeAsync, inject, tick } from "@angular/core/testing";
import { ToastComponent } from './toast.component';
import { AppTestConfig } from '../../../test/config/app-test.config';
import { HttpTestingController } from '@angular/common/http/testing';
import { ToastService } from '../../../core/services/common/toast/toast.service';

describe('ToastComponent', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: AppTestConfig.imports,
      providers: []
    })
      .compileComponents();
  });
  function setup() {
    const fixture = TestBed.createComponent(ToastComponent);
    const toastComponent: ToastComponent = fixture.debugElement.componentInstance;
    const toastService = fixture.debugElement.injector.get(
      ToastService
    );
    return { fixture, toastComponent, toastService };
  }

  it('should create toast component', fakeAsync(inject([HttpTestingController], (httpTestingController) => {
    const { fixture, toastComponent, toastService } = setup();    
    fixture.detectChanges();
    toastService.success('success');
    toastService.error('error');
    toastService.info('error');
    toastService.warn('error');
    toastComponent.alertIcon(undefined);
    toastComponent.alertType(undefined);
    tick(1000);
    fixture.detectChanges();
    expect(toastComponent.alerts.length).toBe(4);
    tick(4000);
    fixture.detectChanges();
  })));
});
