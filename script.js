function processForm(event) {
    event.preventDefault();

    // Gather inputs
    const name = document.getElementById('name').value || 'there';
    const taxDebt = parseFloat(document.getElementById('taxDebt').value);
    const monthlyIncome = parseFloat(document.getElementById('monthlyIncome').value);
    const monthlyExpenses = parseFloat(document.getElementById('monthlyExpenses').value);
    const employmentStatus = document.getElementById('employmentStatus').value;
    const financialWorsened = document.getElementById('financialWorsened').value;
    const unpaidYears = document.getElementById('unpaidYears').value;

    // Processing logic for tax relief options
    let resultMessage = `<h3>Hi ${name}, based on your inputs, here is your tax relief plan:</h3>`;

    // Tax debt breakdown
    resultMessage += `<p><strong>Summary of Your Tax Situation:</strong></p>`;
    resultMessage += `<ul>`;
    resultMessage += `<li>Current Tax Debt: $${taxDebt}</li>`;
    resultMessage += `<li>Years with Unpaid Taxes: ${unpaidYears} years</li>`;
    resultMessage += `</ul>`;

    // Offer in Compromise (OIC)
    if (monthlyExpenses > monthlyIncome) {
        resultMessage += `<p><strong>Offer in Compromise (OIC):</strong> You may be eligible to settle your tax debt for less than what you owe. Since your monthly expenses exceed your income, we estimate you could settle for around $${(taxDebt * 0.25).toFixed(2)}.</p>`;
        resultMessage += `<p><em>Action:</em> Prepare financial documents (income statements, bank statements) and apply for an OIC with the IRS. Contact a tax professional to help with this process.</p>`;
    }

    // Installment Agreement
    if (monthlyIncome > monthlyExpenses) {
        const monthlyPayment = ((monthlyIncome - monthlyExpenses) * 0.3).toFixed(2); // Calculate a rough monthly payment
        resultMessage += `<p><strong>Installment Agreement:</strong> You can set up a manageable monthly payment plan of $${monthlyPayment} with the IRS based on your current income and expenses.</p>`;
        resultMessage += `<p><em>Action:</em> Apply for an IRS installment agreement and begin making payments to prevent further collection actions.</p>`;
    }

    // Currently Not Collectible (CNC)
    if (employmentStatus === 'Unemployed' || financialWorsened === 'Yes') {
        resultMessage += `<p><strong>Currently Not Collectible (CNC) Status:</strong> Given your financial difficulties, you may qualify for CNC status, temporarily halting IRS collections.</p>`;
        resultMessage += `<p><em>Action:</em> Submit proof of financial hardship to the IRS to qualify for CNC status.</p>`;
    }

    // Penalty Abatement
    if (unpaidYears > 2) {
        resultMessage += `<p><strong>Penalty Abatement:</strong> You may qualify for a reduction in penalties, potentially saving you up to $${(taxDebt * 0.15).toFixed(2)} in penalties.</p>`;
        resultMessage += `<p><em>Action:</em> Provide a valid reason for your delayed payments (e.g., medical reasons, job loss) to qualify for penalty abatement.</p>`;
    }

    // Next Steps and CTA
    resultMessage += `<h4>Next Steps</h4>`;
    resultMessage += `<ul>`;
    resultMessage += `<li>File any unfiled tax returns to avoid further penalties.</li>`;
    resultMessage += `<li>Prepare necessary documents to apply for your chosen tax relief program.</li>`;
    resultMessage += `<li>Contact a tax professional to handle the communication with the IRS.</li>`;
    resultMessage += `</ul>`;

    // Display the result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = resultMessage;
    resultDiv.style.display = 'block';

    // Show the Calendly CTA button
    const calendlyLink = document.getElementById('calendly-link');
    calendlyLink.style.display = 'block';
}
