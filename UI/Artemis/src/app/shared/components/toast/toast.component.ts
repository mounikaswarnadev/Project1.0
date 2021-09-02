import { Component, OnInit, OnDestroy } from "@angular/core";
import { ISubscription } from 'rxjs/Subscription';
import { ToastService } from "src/app/core/services/toast/toast.service";
import { Alert } from "../../models/alert/alert";
import { AlertType } from "../../models/alert/alert-type";

@Component({
  selector: "app-toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"]
})
export class ToastComponent implements OnInit, OnDestroy {
  alerts: Alert[] = [];
  alertSubsription: ISubscription;
  constructor(private toastService: ToastService) {
    this.subscribeForAlerts();
  }

  subscribeForAlerts() {
    this.alertSubsription = this.toastService.getAlert().subscribe((alert: Alert) => {
      this.alerts.push(alert);
      setTimeout(() => { this.removeAlert(alert); }, 3000);
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alertSubsription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  //uncomment when various message type styling available.
  alertType(alert: Alert) {
    if (!alert) {
      return;
    }

    // return css class based on alert type
    switch (alert.type) {
      case AlertType.Success:
        return 'ar-toast--success';
      case AlertType.Error:
        return 'ar-toast--error';
      case AlertType.Info:
        return 'ar-toast--info';
      case AlertType.Warning:
        return 'ar-toast--warning';
    }
  }

  alertIcon(alert: Alert) {
    if (!alert) {
      return;
    }

    // return css class based on alert type
    switch (alert.type) {
      case AlertType.Success:
        return 'fas fa-check';
      case AlertType.Error:
        return 'far fa-times-circle';
      case AlertType.Info:
      case AlertType.Warning:
        return 'fas fa-exclamation-circle';
    }
  }
}
