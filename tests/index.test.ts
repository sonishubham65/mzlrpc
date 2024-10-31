import { Checkout } from "../src/checkout";
import { Product } from "../src/product";
import { PricingRule } from "../src/rule";

const ipd = new Product("Super iPad", "ipd", 549.99);
const mbp = new Product("MacBook Pro", "mbp", 1399.99);
const atv = new Product("Apple TV", "atv", 109.5);
const vga = new Product("VGA adapter", "vga", 30.0);

const rule1 = new PricingRule("atv", (quantity: number, price: number) => {
  const a = Math.floor(quantity / 3);
  return (quantity - a) * price;
});

const rule2 = new PricingRule("ipd", (quantity: number, price: number) => {
  const promoPrice = 499.99;
  if (quantity > 4) return quantity * promoPrice;
  else return quantity * price;
});

const rule3 = new PricingRule("atv", (quantity: number, price: number) => {
  const promoPrice = 49.99;
  if (quantity > 4) return quantity * promoPrice;
  else return quantity * price;
});
describe("", () => {
  test("Total expected: $249.00", () => {
    const co = new Checkout([rule1, rule2]);
    co.scan(vga);
    co.scan(atv);
    co.scan(atv);
    co.scan(atv);

    expect(co.total()).toBe(249.0);
  });

  test("Total expected: $2718.95", () => {
    const co = new Checkout([rule1, rule2]);
    co.scan(ipd);
    co.scan(ipd);
    co.scan(ipd);
    co.scan(ipd);
    co.scan(ipd);
    co.scan(atv);
    co.scan(atv);

    expect(co.total()).toBe(2718.95);
  });

  test("Rule Overridden for in case lower discounted value", () => {
    const co = new Checkout([rule1, rule3]);
    co.scan(atv);
    co.scan(atv);
    co.scan(atv);
    co.scan(atv);
    co.scan(atv);

    expect(co.total()).toBe(249.95); // 49.99*5 (promo price is applied, as it is minimum discounted price)
  });
});
