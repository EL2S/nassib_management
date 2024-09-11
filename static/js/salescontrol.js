document.addEventListener("DOMContentLoaded", function () {
    var date = document.getElementById('date');
    var search_agency = document.getElementById('search_agency');
    var agency = document.getElementById('agency');
    var opening_balance = document.getElementById('opening_balance');
    var hidden_opening_balance = document.getElementById('hidden_opening_balance');
    var sales_made = document.getElementById('sales_made');
    var hidden_sales_made = document.getElementById('hidden_sales_made');
    var cash_collection = document.getElementById('cash_collection');
    var credit_sales = document.getElementById('credit_sales');
    var donation = document.getElementById('donation');
    var domaged_goods = document.getElementById('domaged_goods');
    var closing_stock = document.getElementById('closing_stock');
    var total_due = document.getElementById('total_due');
    var hidden_total_due = document.getElementById('hidden_total_due');
    var total_collection = document.getElementById('total_collection');
    var hidden_total_collection = document.getElementById('hidden_total_collection');
    var collection_difference = document.getElementById('collection_difference');
    var hidden_collection_difference = document.getElementById('hidden_collection_difference');
    
    if (search_agency) {
        search_agency.addEventListener('input', function () {
            var inputVal = this.value.toLowerCase();
            var select = agency;
            var options = select.options;
            var found = false;
    
            for (var i = 0; i < options.length; i++) {
                var option = options[i];
                if (option.text.toLowerCase().includes(inputVal)) {
                    option.style.display = 'block';
                    if (!found) {
                        select.selectedIndex = i;
                        found = true;
                    }
                } else {
                    option.style.display = 'none';
                }
            }
            if (!found) {
                select.selectedIndex = -1;
            }
        });
    }

    if (date) {
        function fetchAndDisplayAgency() {
            var dateValue = date.value;
            fetch('/get-date-agency/' + dateValue + '/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': '{{ csrf_token }}'
                }
            })
            .then(response => response.json())
            .then(data => {
                agency.innerHTML = ''; 
                data.agencies.forEach(function(a) {
                    var option = document.createElement('option');
                    option.value = a;
                    option.text = a;
                    agency.appendChild(option);
                });
                agency.value = data.agencies[0];
                fetchAndDisplaySalesMade();
                fetchAndDisplayOpeningBalance();
                calculateCashDiscrepancy();
            })
            .catch(error => console.error('Error:', error));
        }
        date.addEventListener('input', fetchAndDisplayAgency);
    }

    if (agency) {
        function fetchAndDisplayOpeningBalance() {
            var agencyValue = agency.value;
            fetch('/get-date-agency-opening-balance/' + agencyValue + '/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': '{{ csrf_token }}'
                }
            })
            .then(response => response.json())
            .then(data => {
                opening_balance.value = data.opening_balance;
                hidden_opening_balance.value = data.opening_balance;
                calculateTotalDue();
            })
            .catch(error => console.error('Error:', error));
        }

        function fetchAndDisplaySalesMade() {
            var dateValue = date.value;
            var agencyValue = agency.value;
            fetch('/get-date-agency-sales-made/' + dateValue + '/' + agencyValue + '/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': '{{ csrf_token }}'
                }
            })
            .then(response => response.json())
            .then(data => {
                sales_made.value = data.sales_made;
                hidden_sales_made.value = data.sales_made;
                calculateTotalDue();
            })
            .catch(error => console.error('Error:', error));
        }

        function calculateTotalDue() {
            var saleMadeValue = parseFloat(sales_made.value);
            var openingBalanceValue = parseFloat(opening_balance.value);
            if (!isNaN(openingBalanceValue) && !isNaN(saleMadeValue)) {
                total_due.value = saleMadeValue + openingBalanceValue;
                hidden_total_due.value = saleMadeValue + openingBalanceValue;
                calculateCashDiscrepancy();
            } else {
                total_due.value = "";
                hidden_total_due.value = "";
            }
        }

        function calculateCashDiscrepancy() {
            var cashCollectionValue = parseFloat(cash_collection.value);
            var creditSalesValue = parseFloat(credit_sales.value);
            var donationValue = parseFloat(donation.value);
            var domagedGoodsValue = parseFloat(domaged_goods.value);
            var closingStockValue = parseFloat(closing_stock.value);
            var saleMadeValue = parseFloat(sales_made.value);
            var openingBalanceValue = parseFloat(opening_balance.value);
            if (!isNaN(openingBalanceValue) && !isNaN(saleMadeValue) && !isNaN(cashCollectionValue) && !isNaN(creditSalesValue) && !isNaN(donationValue) && !isNaN(domagedGoodsValue) && !isNaN(closingStockValue)) {
                var total = parseFloat(cashCollectionValue + creditSalesValue + donationValue + domagedGoodsValue + closingStockValue);
                total_collection.value = total;
                hidden_total_collection.value = total;
                if (!isNaN(total)) {
                    collection_difference.value = total_due.value - total_collection.value;
                    hidden_collection_difference.value = total_due.value - total_collection.value;
                } else {
                    collection_difference.value = "";
                    hidden_collection_difference.value = "";
                }
            } else {
                total_collection.value = "";
                hidden_total_collection.value = "";
            }
        }

        date.addEventListener('input', fetchAndDisplaySalesMade);
        agency.addEventListener('change', fetchAndDisplaySalesMade);
        date.addEventListener('input', fetchAndDisplayOpeningBalance);
        agency.addEventListener('change', fetchAndDisplayOpeningBalance);
    }

    calculateCashDiscrepancy();
    sales_made.addEventListener('input', calculateCashDiscrepancy);
    cash_collection.addEventListener('input', calculateCashDiscrepancy);
    credit_sales.addEventListener('input', calculateCashDiscrepancy);
    donation.addEventListener('input', calculateCashDiscrepancy);
    domaged_goods.addEventListener('input', calculateCashDiscrepancy);
    closing_stock.addEventListener('input', calculateCashDiscrepancy);
});



document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.delete').forEach(function(element) {
      element.addEventListener('click', function() {
        const salescontrolId = this.getAttribute('data-id');
        Swal.fire({
          title: 'Êtes-vous sûr(e) de vouloir supprimer ce contrôle de vente ?',
          text: "Vous ne pourrez pas revenir en arrière !",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Oui, supprimez-le !',
          cancelButtonText: 'Non, annulez !',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              icon: 'success',
              title: 'Contrôle de vente supprimé !',
              text: 'Le contrôle de vente a été supprimé avec succès.',
              showConfirmButton: true,
              confirmButtonText: 'OK',
              showCancelButton: false,
              cancelButtonText: 'Annuler'
            }).then(() => {
              window.location.href = `/salescontrol/${salescontrolId}/delete/`;
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              icon: 'error',
              title: 'Suppression annulée',
              text: 'Aucune modification n\'a été apportée au contrôle de vente.',
              showConfirmButton: true,
              confirmButtonText: 'OK',
              showCancelButton: false,
              cancelButtonText: 'Annuler'
            });
          }
        });
      });
    });
  });