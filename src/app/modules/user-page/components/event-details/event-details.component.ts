import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UserPageComponent } from '../../user-page.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  standalone: true,
  selector: 'app-event-details',
  imports: [CommonModule,FormsModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
  eventId: number = this.userPage.eventItemSelected.id;
  selectedPrice: number | undefined;
  eventSections: any[] = [];
  title: string = '';
  price1: number = 0;
  price2: number = 0;
  units: number = 1;
  descripcion: string = '';
  fecha: string = '20 de abril del 2024';
  imagenUrl: string = 'https://olympics.com/images/static/sports/pictograms/v2/ath.svg';
  selectedSection: number | undefined; // Variable para almacenar la sección seleccionada

  constructor(private apiService: ApiService, private userPage: UserPageComponent) {}

  ngOnInit() {
    this.loadEventData();
  }

  loadSectionData() {
    this.apiService.getEventSections(this.eventId).then((observable: Observable<any[]>) => {
      observable.subscribe((sections: any[]) => {
        this.eventSections = sections;
        console.log(this.eventSections);
        this.price1 = this.eventSections[3].price;
        this.price2 = this.eventSections[0].price;
      });
    });
  }


  loadEventData() {
    if (this.userPage.eventItemSelected) {
      this.title = this.userPage.eventItemSelected.titulo;
      this.descripcion = this.userPage.eventItemSelected.descripcion;

      // Usa moment para parsear la fecha
      this.fecha = this.userPage.eventItemSelected.fecha;

      this.imagenUrl = this.userPage.eventItemSelected.imagenUrl;
      this.eventId = this.userPage.eventItemSelected.id;

      this.loadSectionData();
    }
  }

  goBack() {
    if(this.VerifyOrderAndAddToTheCarrito()){
      this.userPage.optionSelected = 2;
    }

  }

  goToTheCarrito() {
    if(this.VerifyOrderAndAddToTheCarrito()){
      this.userPage.optionSelected = 3;
    }
  }

  updatePrice() {
    console.log(this.selectedSection);
    console.log(this.eventSections)

  const selectedSection = this.eventSections.find(section => section.id === Number(this.selectedSection));

    console.log(selectedSection);


    if (selectedSection) {
      this.selectedPrice = selectedSection.price;
    }
  }
  VerifyOrderAndAddToTheCarrito() {
    if (!this.selectedSection) {
      alert("Por favor, elija una sección.");
      return false;
    }
    if (this.units < 1 || this.units > 5) {
      alert("El número de unidades debe estar entre 1 y 5.");
      return false;
    }
    if (this.userPage.carrito.length >= 3) {
      alert("No puede tener más de 3 items en el carrito.");
      return false;
    }

    const selectedSectionData = this.eventSections.find(section => section.id == this.selectedSection);
    if (selectedSectionData) {
      const cartItem = {
        name: this.title,
        description: this.descripcion,
        quantity: this.units,
        price: selectedSectionData.price,
        totalPrice: 0,
        image: this.imagenUrl,
        idSection: this.selectedSection
      };
      this.userPage.carrito.push(cartItem);
      alert("Producto añadido al carrito con éxito.");
      return true;
    } else {
      alert("Error al añadir al carrito.");
      return false ;
    }
  }


}
