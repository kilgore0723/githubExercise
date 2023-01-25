window.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +document.getElementById("loan-amount").value,
    years: +document.getElementById("loan-years").value,
    rate: +document.getElementById("loan-rate").value,
  };
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const defaultValues = { amount: 35000, years: 6, rate: 2.5 };
  for (const key in defaultValues) {
    const element = document.getElementById(`loan-${key}`);
    element.value = defaultValues[key];
  }
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const inputValues = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(inputValues));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment({ amount, years, rate }) {
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  const monthlyPayment =
    amount * (monthlyRate / (1 - (1 + monthlyRate) ** -months));
  if (monthlyRate <= 0 || monthlyPayment <= 0 || months <= 0) {
    return NaN;
  }
  return monthlyPayment.toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyPayment = document.getElementById("monthly-payment");
  monthlyPayment.textContent = `$${monthly}`;
}
