const input = { amount: 35000, years: 6, rate: 2.5 };
const expected = 523.99;

describe("calculateMonthlyPayment function", () => {
  it("should calculate monthly payment correctly", () => {
    const result = calculateMonthlyPayment(input);
    expect(parseInt(result)).toEqual(parseInt(expected));
  });
  it("should return a number with 2 decimal places", () => {
    const result = calculateMonthlyPayment(input);
    expect(result).toBeCloseTo(expected, 2);
  });
});

describe("calculateMonthlyPayment function", () => {
  function testCases() {
    return [
      {amount: 35000, years: 6, rate: -2.5, expected: NaN},
      {amount: 0, years: 6, rate: 2.5, expected: NaN},
      {amount: 35000, years: 0, rate: 2.5, expected: NaN},
    ];
  }
  testCases().forEach(({amount, years, rate, expected}) => {
    it(`should return ${expected} if amount is ${amount}, years is ${years} and rate is ${rate}`, () => {
      expect(calculateMonthlyPayment({amount, years, rate})).toBeNaN();
    });
  });
});
