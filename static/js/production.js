document.addEventListener("DOMContentLoaded", function () {
    var search_agency = document.getElementById('search_agency');
    var search_ingredient = document.getElementById('search_ingredient');
    var search_product = document.getElementById('search_product');
    var agency = document.getElementById('agency');
    var quantity = document.getElementById('quantity');
    var unit_price = document.getElementById('unit_price');
    var amount = document.getElementById('amount');
    var stock_out = document.getElementById('stock_out');
    var hidden_stock_out = document.getElementById('hidden_stock_out');
    var hidden_amount = document.getElementById('hidden_amount');
    var debit_account = document.getElementById('debit_account');
    var debit_Label = document.getElementById('debit_Label');
    var credit_account = document.getElementById('credit_account');
    var credit_Label = document.getElementById('credit_Label');
    var debit_amount = document.getElementById('debit_amount');
    var hidden_debit_amount = document.getElementById('hidden_debit_amount');
    var credit_amount = document.getElementById('credit_amount');
    var hidden_credit_amount = document.getElementById('hidden_credit_amount');
    var ingredient = document.getElementById('ingredient');
    var hidden_ingredient = document.getElementById('hidden_ingredient');

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
    if(search_ingredient){
        search_ingredient.addEventListener('input', function() {
            var inputVal = this.value.toLowerCase();
            var select = ingredient;
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
    if (agency) {
        function fetchAndDisplayIngredients() {
            var agencyOption = agency.value;
            fetch('/get-ingredients-by-initiator/' + agencyOption + '/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': '{{ csrf_token }}'
                }
            })
            .then(response => response.json())
            .then(data => {
                ingredient.innerHTML = ''; 
                if (data.length > 0) {
                    data.forEach(function(item) {
                        var option = document.createElement('option');
                        option.value = item;
                        option.textContent = item;
                        ingredient.appendChild(option);
                    });
                    if(hidden_ingredient){
                        ingredient.value = hidden_ingredient.value;
                    }else{
                        ingredient.value = data[0];
                    }
                    fetchAndDisplayUnitPrice(); 
                } else {
                    unit_price.value = '';
                }
            })
            .catch(error => console.error('Error:', error));
        }
        fetchAndDisplayIngredients();
        agency.addEventListener('change', fetchAndDisplayIngredients);
    }

    if (ingredient) {
        function fetchAndDisplayUnitPrice() {
            var selectedIngredient = ingredient.value;
            fetch('/get-ingredient-avgprice/' + selectedIngredient + '/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': '{{ csrf_token }}'
                }
            })
            .then(response => response.json())
            .then(data => {
                unit_price.value = data.avg_price;
                updateAmount();
            })
            .catch(error => console.error('Error:', error));
        }
        ingredient.addEventListener('change', fetchAndDisplayUnitPrice);
    }
    if (quantity && unit_price) {
        function updateAmount() {
            var q = parseFloat(quantity.value);
            var p = parseFloat(unit_price.value);
            if (!isNaN(q) && !isNaN(p)) {
                var amountValue = q * p;
                amount.value = amountValue.toFixed(2);
                credit_amount.value = amountValue.toFixed(2);
                debit_amount.value = amountValue.toFixed(2);
                stock_out.value = quantity.value;
                hidden_stock_out.value = quantity.value;
                hidden_amount.value = amountValue.toFixed(2);
                hidden_debit_amount.value = amountValue.toFixed(2);
                hidden_credit_amount.value = amountValue.toFixed(2);
            }else{
                amount.value = "";
                credit_amount.value = "";
                debit_amount.value = "";
                stock_out.value = "";
                hidden_stock_out.value = "";
                hidden_amount.value = "";
                hidden_debit_amount.value = "";
                hidden_credit_amount.value = "";
            }
        }
        updateAmount();
        if (quantity) {
            quantity.addEventListener('input', updateAmount);
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.delete').forEach(function(element) {
      element.addEventListener('click', function() {
        const productionId = this.getAttribute('data-id');
        Swal.fire({
          title: 'Êtes-vous sûr(e) de vouloir supprimer cette production ?',
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
              title: 'Production supprimé !',
              text: 'La production a été supprimé avec succès.',
              showConfirmButton: true,
              confirmButtonText: 'OK',
              showCancelButton: false,
              cancelButtonText: 'Annuler'
            }).then(() => {
              window.location.href = `/production/${productionId}/delete/`;
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              icon: 'error',
              title: 'Suppression annulée',
              text: 'Aucune modification n\'a été apportée à la production.',
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