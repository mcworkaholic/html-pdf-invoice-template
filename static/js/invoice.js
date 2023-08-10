// Fetch company data
async function fetchCompanyInfo() {
  try {
    const response = await fetch('static/json/company.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Update company elements
function updateElements(data) {
  document.querySelectorAll('.companyInfo').forEach((element) => {
    const innerElement = element.querySelector('a') || element;
    innerElement.textContent = data.companyInfo[innerElement.id];

    if (innerElement.id === 'websiteAddress') {
      innerElement.href = 'http://' + data.companyInfo[innerElement.id];
    }

    if (innerElement.id === 'companyEmail') {
      innerElement.href = 'mailto:' + data.companyInfo[innerElement.id];
    }

    if (innerElement.id === 'companyPhoneNumber') {
      const phoneNumber = data.companyInfo[innerElement.id];
      const cleanedPhoneNumber = phoneNumber.replace(/-/g, '');
      innerElement.href = 'tel:' + cleanedPhoneNumber;
    }
  });
}

// Calculate subtotals
function calculateSubtotals() {
  const rows = document.querySelector('#materials tbody').querySelectorAll('tr');

  rows.forEach((row) => {
    const quantityElement = row.querySelector('.quantity');
    const rateElement = row.querySelector('.rate');
    const subtotalElement = row.querySelector('.subtotal-item');

    const quantity = parseInt(quantityElement.textContent, 10);
    const rate = parseFloat(rateElement.textContent.replace('$', ''));

    const subtotal = quantity * rate;

    subtotalElement.textContent = subtotal.toFixed(2);
  });
}

// Update total
function updateTotal() {
  const elements = document.getElementsByClassName('subtotal-item');

  let total = 0;

  for (let i = 0; i < elements.length; i++) {
    const value = parseFloat(elements[i].textContent);
    if (!isNaN(value)) {
      total += value;
    }
  }

  document.querySelector('.large.total').textContent = total.toFixed(2);
  return total;
}

// Prepend dollar sign
function prependDollarSign() {
  const elements = document.querySelectorAll('.total, .subtotal-item');

  for (let i = 0; i < elements.length; i++) {
    elements[i].textContent = '$' + elements[i].textContent;
  }
}

function setupPaymentButtons(total, cashAppUsername, venmoUsername) {
  const cashAppUrl = `https://cash.app/$${cashAppUsername}/${total}`;
  const venmoUrl = `https://venmo.com/u/${venmoUsername}`;

  document.getElementById('cashappLogo').onclick = function () {
    updateModal("CashApp", "Do you wish to proceed to CashApp?", cashAppUrl);
  }

  document.getElementById('venmoLogo').onclick = function () {
    updateModal("Venmo", "Please remember your total of $" + total + " before paying on Venmo's platform. Thank you for your business \uD83D\uDE00", venmoUrl);
  }
}

// Update modal
function updateModal(platform, message, url) {
  document.getElementById("modalLabel").innerText = "Proceed to " + platform;
  document.getElementById("modal-body").innerText = message;

  const proceedButton = document.getElementById("proceed-button");
  proceedButton.innerText = "Proceed to " + platform;

  proceedButton.onclick = function () {
    window.open(url);
  }

  $('#myModal').modal('show');
}

// Setup cursor changes
function setupCursorChanges() {
  const elementIds = ['cashappLogo', 'venmoLogo', 'downloadPage'];

  function changeCursorToHand() {
    this.style.cursor = 'pointer';
  }

  function changeCursorToDefault() {
    this.style.cursor = 'default';
  }

  elementIds.forEach(id => {
    let element = document.getElementById(id);
    if (element) {
      element.addEventListener('mouseover', changeCursorToHand);
      element.addEventListener('mouseout', changeCursorToDefault);
    }
  });
}

// Setup print button
function setupPrintButton() {
  document.getElementById('downloadPage').addEventListener('click', function () {
    window.print();
  });
}


window.onload = async function () {
  const data = await fetchCompanyInfo();
  const { cashapp, venmo } = data.companyInfo.paymentMethods;
  
  updateElements(data);
  calculateSubtotals();
  const total = updateTotal();
  prependDollarSign();
  setupPaymentButtons(total, cashapp.username, venmo.username);
  setupCursorChanges();
  setupPrintButton();
}
