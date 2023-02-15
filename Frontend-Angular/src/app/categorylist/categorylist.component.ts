import { Component, OnInit } from '@angular/core';
import { CategorylistService } from './categorylist.service';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.scss'],
})
export class CategorylistComponent implements OnInit {
  constructor(private categorylistService: CategorylistService) {}
  data: any;
  ngOnInit(): void {
    this.categorylistService.getCategory().subscribe((response: any) => {
      console.log(response);
      this.data = response;
    });
  }
}
