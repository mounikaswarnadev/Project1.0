import { Component, Inject, OnInit } from '@angular/core';
import { UsercontextService } from 'src/app/core/services/user-context/usercontext.service';
import { APP_CONFIG } from '../../../config';
import { AppConfig } from '../../models/app-config/app-config.interface';
import { UserContext } from '../../models/user-context/user.context';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // user : UserContext;
  user = "Rajesh D"

  constructor(
    private userContextService: UsercontextService,
    @Inject(APP_CONFIG) private appConfig: AppConfig

  ) {
    // this.userContextService.currentUserObservable.subscribe(x => this.user  = x);

   }

   get businessEntity(): string {
    return this.appConfig.businessEntity;
  }

  get businessSubEntity(): string {
    return this.appConfig.businessSubEntity;
  }
  get isLoggedIn() {
    return true;
  }

  ngOnInit(): void {
  }
  navigateToDiracHome() {
    window.open(this.appConfig.landingPageUrl, "_self");
  }

  logout() {
    return true;
  }

  get isPingDisabled() {
    return !this.appConfig.enablePing;
  }


}
