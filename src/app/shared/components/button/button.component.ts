import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

   content= input<string>('submit');
   loading= input<boolean>(false);
   disabled= input<boolean>(false);
   type= input<'button' | 'submit' | 'reset'>('button');
   
}
