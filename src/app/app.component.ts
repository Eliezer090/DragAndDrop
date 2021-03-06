import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Drag';
   
  @ViewChild('myrect',{static: true}) myrect!: ElementRef;
  top: number = 40;
  left:number = 40;
  constructor() { }

  ngOnInit(): void {
    let mouseDown = fromEvent<MouseEvent>(this.myrect.nativeElement, 'mousedown');
    let mouseMove = fromEvent<MouseEvent>(document,'mousemove');
    let mouseUp = fromEvent<MouseEvent>(document,'mouseup');

    mouseDown.subscribe((e:MouseEvent)=> {
      //console.log(e);
      let x= e.screenX;
      let y= e.screenY;
      
      mouseMove
      //takeUntil tem a função de dizer "ok agora nao de mais o sub nesse mousemove e de no mouseUp"
      .pipe(takeUntil(mouseUp))
      .subscribe((em: MouseEvent)=>{
        //console.log(em);
        let offsetX= x -em.screenX;
        let offsetY= y -em.screenY;
        this.top-=offsetY;
        this.left-=offsetX;
        x = em.screenX;
        y = em.screenY;
      });

    })
  }
}
