import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AlertController, IonicModule } from '@ionic/angular';
import { Observable, from } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-notis',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './notis.component.html',
  styleUrls: ['./notis.component.scss'],
})
export class NotisComponent implements OnInit {
  notifications: Observable<any[]> = new Observable<any[]>();

  constructor(public alertController: AlertController, private api: ApiService, private auth: AuthService, private ElementRef: ElementRef) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      if(user?.sub != null){
        from(this.api.getEspecificUserNotifications(user.sub)).subscribe(notifications => {
          this.notifications = notifications;
        });
      }
    });
  }

  async showAlert(id: string, idNoti: number) {
    this.presentAlert(id, idNoti);
  }

  async presentAlert(id: string, idNoti: number) {
    this.api.getEspecificNotifications(idNoti).then(response => response.subscribe((noti: any) => {
      var text = 'Marcar como leido';
      if (noti.is_readed){
        text = "Cerrar"
      }
      this.alertController.create({
        id: id,
        header: noti.subject,
        subHeader: noti.short_text,
        message: noti.long_message,
        buttons: [
          {
            text: text,
            handler: async () => {
              if(!noti.is_readed){
                this.api.markAsReadNotification(noti.id).then(response => response.subscribe(() => {
                  this.ngOnInit();
              }));
              }
            }
          }
        ]
      }).then(alert => {
        alert.present();
      });
    }));
  }
}
