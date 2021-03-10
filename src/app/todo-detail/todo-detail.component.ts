import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Location } from '@angular/common';
import TodoHttpService from '../services/todo-http.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
})
export class TodoDetailComponent implements OnInit {
  todo: any = {};
  constructor(
    private todoService: TodoHttpService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      console.log('Subscribe param: ' + val);
      this.todoService.getTodo(val.id).subscribe((res) => {
        this.todo = res;
      });
    });
    this.route.queryParams.subscribe((param) => {
      console.log(param);
    });

    // let snapShotParams = this.route.snapshot.params;
    // console.log('snapshot param: ' + snapShotParams.id);

    // route: chứa toàn bộ thông tin về route mình đang đứng
    // snapshot: chỉ capture thông tin 1 lần
    // subcribe: luôn theo dõi và update thông tin của route
    // console.log(param);

    // this.todoService.getTodo(param.id).subscribe((res) => {
    //   console.log(res);
    // });
  }
  goBack(): void {
    // this.router.navigateByUrl('/todos');
    this.router.navigate(['/todos']);
    this.location.back();
  }
}
