import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AlertController, IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
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
        this.notifications = this.api.getEspecificUserNotifications(user.sub);
      }
    });
  }

  async showAlert(id: string, idNoti: number) {
    const alert = await this.alertController.getTop();
    if (!alert) {
      this.presentAlert(id, idNoti);
    }
  }

  async presentAlert(id: string, idNoti: number) {
    this.api.getEspecificNotifications(idNoti).subscribe(noti => {
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
            handler: () => {
              if(!noti.is_readed){
                this.api.markAsReadNotification(noti.id).subscribe();
              }
            }
          }
        ]
      }).then(alert => {
        alert.present();
      });
    });
  }
}
