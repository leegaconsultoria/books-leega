import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOriginalMask]'
})
export class OnlynumberDirective {

  @Input('appOriginalMask') type: string;

  constructor(private el: ElementRef) { }

  @HostListener('input' || 'change') onInput() {
    this.el.nativeElement.value = this.defineType(this.el.nativeElement.value);
  }

  private defineType(value: string): string {
    switch (this.type) {
      case 'cpf': return this.maskCpf(value);
      case 'cnpj': return this.maskCnpj(value);
      case 'money': return this.maskMoney(value);
      case 'zip': return this.maskZipCode(value);
      case 'tel': return this.maskTel(value);
      case 'cpfOrCnpj': return this.cnpfOrCnpj(value);
      case 'telOrCel': return this.telOrCel(value);
      default: return this.onlyNumber(value);
    }
  }

  private maskMoney(value: string): string {
    let money = this.onlyNumber(value);
    money = money.replace(/\D/g, '');
    money = money.padStart(4, '0');
    money = money.replace(/^0/g, '');
    if (money.length > 5) {
      let reais = money.substr(0, money.length - 2);
      const cents = money.substr(-2);
      reais = reais.split('').reverse().join('');
      reais = reais.replace(/(\d{3})(\d{0})/g, '$1.$2');
      reais = reais.split('').reverse().join('');
      money = reais.concat(',').concat(cents);
      money = money.substr(0, 1) === '.' ? money.substr(1, money.length) : money;
      return money;
    }
    return money.replace(/(\d+)(\d{2})$/, '$1,$2');
  }

  private maskCpf(value: string): string {
    let cpf = this.onlyNumber(value);
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
  }

  private maskTel(value: string): string {
    value = this.onlyNumber(value);
    value = value.replace(/^(\d\d)(\d)/g, '($1) $2');
    value = value.replace(/(\d{4})(\d)/, '$1-$2');
    return value;
  }

  private maskZipCode(value: string): string {
    value = this.onlyNumber(value);
    value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    return value;
  }

  private maskCnpj(value: string): string {
    let cnpj = this.onlyNumber(value);
    cnpj = cnpj.replace(/(\d{2})(\d)/, '$1.$2');
    cnpj = cnpj.replace(/(\d{3})(\d)/, '$1.$2');
    cnpj = cnpj.replace(/(\d{3})(\d)/, '$1/$2');
    cnpj = cnpj.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cnpj;
  }

  private onlyNumber(value: string): string {
    return value.replace(/\D/g, '');
  }

  private cnpfOrCnpj(value: string): string {
    if (value.length > 14) {
      return this.maskCnpj(value);
    } else {
      return this.maskCpf(value);
    }
  }

  private telOrCel(value: string): string{
    if(value.length > 14){
      return this.maskCel(value);
    } else {
      return this.maskTel(value);
    }
  }

  private maskCel(value: string): string {
    value = this.onlyNumber(value);
    value = value.replace(/^(\d\d)(\d)/g, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    return value;
  }

}
