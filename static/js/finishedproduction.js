document.addEventListener("DOMContentLoaded", function () {
    var search_agency = document.getElementById('search_agency');
    var search_product = document.getElementById('search_product');
    var agency = document.getElementById('agency');
    var quantity = document.getElementById('quantity');
    var selling_price = document.getElementById('selling_price');
    var hidden_selling_price = document.getElementById('hidden_selling_price');
    var total_amount = document.getElementById('total_amount');
    var hidden_total_amount = document.getElementById('hidden_total_amount');
    var debit_account = document.getElementById('debit_account');
    var debit_Label = document.getElementById('debit_Label');
    var credit_account = document.getElementById('credit_account');
    var credit_Label = document.getElementById('credit_Label');
    var debit_amount = document.getElementById('debit_amount');
    var hidden_debit_amount = document.getElementById('hidden_debit_amount');
    var credit_amount = document.getElementById('credit_amount');
    var hidden_credit_amount = document.getElementById('hidden_credit_amount');
    var date = document.getElementById('date');

    if(search_agency){
        search_agency.addEventListener('input', function() {
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
    if(search_product){
        search_product.addEventListener('input', function() {
            var inputVal = this.value.toLowerCase();
            var select = product;
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
    if (debit_account) {
        function fetchAndDisplayAccountLabel() {
            var debitoption = debit_account.value;
            fetch('/get-account/'+ debitoption +'/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': '{{ csrf_token }}'
                }
            })
                .then(response => response.json())
                .then(data => {
                    debit_Label.value = data.label;
                })
                .catch(error => console.error('Error:', error));
        }
        fetchAndDisplayAccountLabel();
        debit_account.addEventListener('change', fetchAndDisplayAccountLabel);
    }
    if (credit_account) {
        function fetchAndDisplayAccountLabel() {
            var creditoption = credit_account.value;
            fetch('/get-account/'+ creditoption +'/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': '{{ csrf_token }}'
                }
            })
                .then(response => response.json())
                .then(data => {
                    credit_Label.value = data.label;
                })
                .catch(error => console.error('Error:', error));
        }
        fetchAndDisplayAccountLabel();
        credit_account.addEventListener('change', fetchAndDisplayAccountLabel);
    }
    if (date) {
        function fetchAndDisplayAgency() {
            var dateValue = date.value;
            fetch('/get-batchnoproduction-date/' + dateValue + '/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': '{{ csrf_token }}'
                }
            })
            .then(response => response.json())
            .then(data => {
                agency.innerHTML = ''; 
                data.agencies.forEach(function(ag) {
                    var option = document.createElement('option');
                    option.value = ag;
                    option.text = ag;
                    agency.appendChild(option);
                });
                agency.value = data.agencies[0];
                fetchAndDisplayProduction();
            })
            .catch(error => console.error('Error:', error));
        }

        date.addEventListener('input', fetchAndDisplayAgency);
    }
    if (agency) {
        function fetchAndDisplayProduction() {
            var dateValue = date.value;
            var agencyValue = agency.value;
            fetch('/get-batchnoproduction-date-agency/' + dateValue + '/' + agencyValue + '/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': '{{ csrf_token }}'
                }
            })
            .then(response => response.json())
            .then(data => {
                product.innerHTML = ''; 
                data.products.forEach(function(pr) {
                    var option = document.createElement('option');
                    option.value = pr;
                    option.text = pr;
                    product.appendChild(option);
                });
                product.value = data.products[0];
                fetchAndDisplayPriceProduct();
            })
            .catch(error => console.error('Error:', error));
        }

        agency.addEventListener('change', fetchAndDisplayProduction);
        date.addEventListener('input', fetchAndDisplayProduction);
    }
    if (product) {
        function fetchAndDisplayPriceProduct() {
            selling_price.value = "";
            hidden_selling_price.value = "";
            var productValue = product.value;
            fetch('/get-price-by-product/' + productValue + '/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': '{{ csrf_token }}'
                }
            })
            .then(response => response.json())
            .then(data => {
                selling_price.value = data.selling_price;
                hidden_selling_price.value = data.selling_price;
                updateAmount();
            })
            .catch(error => console.error('Error:', error));
        }

        product.addEventListener('change', fetchAndDisplayPriceProduct);
    }
    if (quantity && selling_price) {
        function updateAmount() {
            var q = parseFloat(quantity.value);
            var p = parseFloat(selling_price.value);
            if (!isNaN(q) && !isNaN(p)) {
                var amountValue = q * p;
                total_amount.value = amountValue.toFixed(2);
                hidden_total_amount.value = amountValue.toFixed(2);
                credit_amount.value = amountValue.toFixed(2);
                debit_amount.value = amountValue.toFixed(2);
                hidden_debit_amount.value = amountValue.toFixed(2);
                hidden_credit_amount.value = amountValue.toFixed(2);
            }else{
                total_amount.value = "";
                hidden_total_amount.value = "";
                credit_amount.value = "";
                debit_amount.value = "";
                hidden_debit_amount.value = "";
                hidden_credit_amount.value = "";
            }
        }
        if (quantity) {
            quantity.addEventListener('input', updateAmount);
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.delete').forEach(function(element) {
      element.addEventListener('click', function() {
        const finishedproductionId = this.getAttribute('data-id');
        Swal.fire({
          title: 'Êtes-vous sûr(e) de vouloir supprimer cette production terminée ?',
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
              title: 'Production terminée supprimé !',
              text: 'La production terminée a été supprimé avec succès.',
              showConfirmButton: true,
              confirmButtonText: 'OK',
              showCancelButton: false,
              cancelButtonText: 'Annuler'
            }).then(() => {
              window.location.href = `/finishedproduction/${finishedproductionId}/delete/`;
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              icon: 'error',
              title: 'Suppression annulée',
              text: 'Aucune modification n\'a été apportée à la production terminée.',
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