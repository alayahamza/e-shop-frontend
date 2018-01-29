import {AfterViewChecked, Component, Input} from '@angular/core';

declare let paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})

export class PaypalComponent implements AfterViewChecked {
  @Input() cartTotal;
  public didPaypalScriptLoad = false;
  public loading = true;
  paypal: any;
  public paymentAmount = 1;

  public paypalConfig: any = {
    env: 'sandbox',
    client: {
      sandbox: 'AfFa5WLm7ruG0MEpx2cTJLtunnpwOqWRmgY7OdZ39yyRfYzXxfP5JqzYjafqNzJ171tAPc8z11mzKfcU',
      production: '*****************************************************************************'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {amount: {total: this.paymentAmount, currency: 'USD'}}
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        // show success page
        console.log('success');
      });
    }
  };

  public ngAfterViewChecked(): void {
    if (!this.didPaypalScriptLoad) {
      this.loadPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-button');
        this.loading = false;
      });
    }
  }

  public loadPaypalScript(): Promise<any> {
    this.didPaypalScriptLoad = true;
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }


}
