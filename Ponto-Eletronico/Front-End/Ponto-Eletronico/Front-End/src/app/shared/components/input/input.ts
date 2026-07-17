import { CommonModule } from '@angular/common';
import { 
  Component, 
  Input, 
  forwardRef,
  ChangeDetectorRef
} from '@angular/core';

import { 
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';


@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Inputs),
      multi: true
    }
  ]
})
export class Inputs implements ControlValueAccessor {


  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() size: 'normal' | 'small' = 'normal';
  @Input() apenasNumeros = false;
  @Input() maxlength: number | null = null;


  value = '';

  disabled = false;


  private onChange = (value:string)=>{};
  private onTouched = ()=>{};


  constructor(
    private cdr: ChangeDetectorRef
  ){}


  writeValue(value:string):void{

    this.value = value ?? '';

    this.cdr.detectChanges();

  }


  registerOnChange(fn:any):void{

    this.onChange = fn;

  }


  registerOnTouched(fn:any):void{

    this.onTouched = fn;

  }


  setDisabledState(isDisabled:boolean):void{

    this.disabled = isDisabled;

  }


  onKeyDown(event: KeyboardEvent): void {

    if (!this.apenasNumeros) {
      return;
    }

    // Permite teclas de controle (backspace, tab, setas, delete, etc.)
    const teclasPermitidas = [
      'Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight',
      'ArrowUp', 'ArrowDown', 'Home', 'End'
    ];

    if (teclasPermitidas.includes(event.key)) {
      return;
    }

    // Permite atalhos como Ctrl+C, Ctrl+V, Ctrl+A
    if (event.ctrlKey || event.metaKey) {
      return;
    }

    // Bloqueia qualquer tecla que não seja um dígito de 0 a 9
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }

  }


  onInput(event:Event):void{

    const input = event.target as HTMLInputElement;

    let valor = input.value;

    // Remove qualquer caractere não numérico, cobrindo o caso de colar texto (Ctrl+V)
    if (this.apenasNumeros) {
      valor = valor.replace(/[^0-9]/g, '');
      input.value = valor;
    }

    this.value = valor;

    this.onChange(this.value);

  }


  onBlur():void{

    this.onTouched();

  }

}