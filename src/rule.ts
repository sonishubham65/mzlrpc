// interface for PricingRule
export interface iPricingRule {
  sku: string;
  calculate: Function;
}

export class PricingRule implements iPricingRule {
  constructor(
    public sku: string,
    private callback: Function,
  ) {}
  calculate(quantity: number, rate: number) {
    // two decimal round off
    return Math.round(this.callback(quantity, rate) * 100) / 100;
  }
}
