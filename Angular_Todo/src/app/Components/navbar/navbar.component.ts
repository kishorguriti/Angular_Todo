import { Component, OnInit } from '@angular/core';
import { ComponentInteractionService } from 'src/app/shared/component-interaction.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {

  count: any = 0

  constructor(private cis: ComponentInteractionService) { }

  ngOnInit() {
    this.cis.TodoAnnounced$.subscribe(value => {
      this.count = value
    })
  }

}
