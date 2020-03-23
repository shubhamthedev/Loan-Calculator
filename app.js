//Listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
    //Show loader and hide loader
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults, 2000);
    e.preventDefault();
});
//calculate the results
function calculateResults() {
    //UI VARS
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        //display result
        document.getElementById('results').style.display = 'block';
        //hide loader
        document.getElementById('loading').style.display = 'none';


    } else {
        showErrors('Please check your numbers');
    }

}
//Show error 
function showErrors(error) {
    //display result
    document.getElementById('results').style.display = 'none';
    //hide loader
    document.getElementById('loading').style.display = 'none';
    //create a div
    const errorDiv = document.createElement('div');
    //get element
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    //give class
    errorDiv.className = 'alert alert-danger';
    //create text node and append
    errorDiv.appendChild(document.createTextNode(error));
    //insert error above heading 
    card.insertBefore(errorDiv, heading);
    //set timeout
    setTimeout(clearError, 2000);
}
//clear error
function clearError() {
    document.querySelector('.alert').remove();
}