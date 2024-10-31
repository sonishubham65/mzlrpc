import { Product } from "./product";
import { iPricingRule, PricingRule } from "./rule";

export class Checkout {
  private items: Map<
    string,
    { product: Product; quantity: number; total: number }
  > = new Map();
  private readonly rules: Map<string, Array<PricingRule>> = new Map();

  constructor(rules: Array<iPricingRule>) {
    // Convert rules array into a map for a faster access
    rules.forEach((rule) => {
      const temp = this.rules.get(rule.sku) || [];
      temp.push(rule as PricingRule);
      this.rules.set(rule.sku, temp);
    });
  }

  scan(product: Product) {
    // Push items in HashMap
    const item = this.items.get(product.sku) || {
      product,
      quantity: 0,
      total: 0,
    };

    // Increase the quantity
    item.quantity += 1;
    this.items.set(product.sku, item);
  }

  total() {
    // Iterate the products
    this.items.forEach((value) => {
      const { product, quantity } = value;
      value.total = product.price * quantity;
      // Check if any rule is applicable for the SKU
      const rules = this.rules.get(product.sku);

      if (rules) {
        rules.forEach((rule) => {
          const discountPrice = rule.calculate(quantity, product.price);
          // Apply the min discountPrice only, if there are multiple rules for an SKU
          value.total = Math.min(discountPrice, value.total);
        });
      }
    });

    // Calculate the final sum and return
    let sum = 0;
    this.items.forEach(({ total }) => {
      sum += total;
    });
    return sum;
  }
}
