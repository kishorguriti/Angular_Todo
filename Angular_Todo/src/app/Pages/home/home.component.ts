import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { ComponentInteractionService } from 'src/app/shared/component-interaction.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  Todos: any = [];
  id: any;
  ToLength: any;
  fileName = 'AngularTodoExcel.xlsx';

  // paginator: any
  @ViewChild(MatPaginator) private paginator: any = MatPaginator;
  @ViewChild(MatSort) MatSort: any;
  displayedColumns: string[] = [
    'id',
    'title',
    'completed',
    'target',
    'updatedAt',
    'createdAt',
    'Actions',
  ];
  // dataSource = new MatTableDataSource<any>;

  constructor(private srv: TodoService, private router: Router, private cis: ComponentInteractionService) { }




  onDownload() {

    const doc = new jsPDF()
    autoTable(doc, { html: "#todo", theme: "grid" })
    doc.save("todoList")
  }

  exportExcel() {
    let element = document.getElementById('todo');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.Todos.filter = filterValue.trim().toLowerCase();

    if (this.Todos.paginator) {
      this.Todos.paginator.firstPage();
    }
  }





  ngOnInit(): void {
    console.log('initiated');
    this.onDelete(this.id);

    this.getAllTodos();
  }

  getAllTodos() {
    return this.srv.all().subscribe({
      next: (res: any) => {
        console.log(res);
        this.Todos = res;
        this.ToLength = res.length;
        this.cis.AnnounceTodo(this.ToLength)
        this.Todos = new MatTableDataSource(res);
        this.Todos.paginator = this.paginator;
        this.Todos.sort = this.MatSort
      },

      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('i am getAll todo complet');
      },
    });
  }

  onEdit(id: any) {
    return this.router.navigateByUrl('todo/' + id);
  }

  onDelete(id: any) {
    return this.srv.deleteTodo(id).subscribe({
      next: (res) => {
        console.log('deleted successfully');
        this.getAllTodos();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
