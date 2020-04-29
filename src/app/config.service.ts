import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { I18nService } from './i18n.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  config = new ReplaySubject<any>(1);

  constructor(private http: HttpClient, private i18n: I18nService) {
    this.i18n.lang.subscribe((lang) => {
      this.http.get('assets/script.json')
      .subscribe((res) => {
        const config: any = res;
        config.locale = lang;
        for (const item of config.s[1].keys) {
          const key = item.name;
          let value = item.show;
          if (value['.tx']) {
            value = value['.tx'][lang] || value['.tx']['_'];
          }
          config[key] = value;
        }
        console.log(config);
        this.config.next(config);
      });
    });
  }

}
