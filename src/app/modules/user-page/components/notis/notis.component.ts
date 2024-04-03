import { Component } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-notis',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './notis.component.html',
  styleUrls: ['./notis.component.scss'],
})
export class NotisComponent  {

  constructor(public alertController: AlertController) { }

  async showAlert(id: string) {
    const alert = await this.alertController.getTop();
    if (!alert) {
      await this.presentAlert(id);
    }
  }

  async presentAlert(id: string) {
    const alert = await this.alertController.create({
      id: id,
      header: 'A Short Title Is Best',
      subHeader: 'A Sub Header Is Optional',
      message: 'A message should be a short, complete sentence.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
