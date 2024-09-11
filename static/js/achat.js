document.addEventListener("DOMContentLoaded", function () {
    var search_agency = document.getElementById('search_agency');
    var search_beneficiary = document.getElementById('search_beneficiary');
    var search_initiator = document.getElementById('search_initiator');
    var search_provider = document.getElementById('search_provider');
    var provider = document.getElementById('provider');
    var agency = document.getElementById('agency');
    var beneficiary = document.getElementById('beneficiary');
    var initiator = document.getElementById('initiator');
    var quantity = document.getElementById('quantity');
    var unit_price = document.getElementById('unit_price');
    var amount = document.getElementById('amount');
    var stock_in = document.getElementById('stock_in');
    var hidden_stock_in = document.getElementById('hidden_stock_in');
    var hidden_amount = document.getElementById('hidden_amount');
    var debit_account = document.getElementById('debit_account');
    var debit_Label = document.getElementById('debit_Label');
    var credit_account = document.getElementById('credit_account');
    var credit_Label = document.getElementById('credit_Label');
    var debit_amount = document.getElementById('debit_amount');
    var hidden_debit_amount = document.getElementById('hidden_debit_amount');
    var credit_amount = document.getElementById('credit_amount');
    var hidden_credit_amount = document.getElementById('hidden_credit_amount');
    var ingredientList = document.getElementById('ingredient-list');
    var ingredient = document.getElementById('ingredient');

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
    if(search_initiator){
        search_initiator.addEventListener('input', function() {
            var inputVal = this.value.toLowerCase();
            var select = initiator;
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
    if(search_beneficiary){
        search_beneficiary.addEventListener('input', function() {
            var inputVal = this.value.toLowerCase();
            var select = beneficiary;
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
    if(search_provider){
        search_provider.addEventListener('input', function() {
            var inputVal = this.value.toLowerCase();
            var select = provider;
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
    if (quantity && unit_price) {
        function updateAmount() {
            var q = parseFloat(quantity.value);
            var p = parseFloat(unit_price.value);
            if (!isNaN(q) && !isNaN(p)) {
                var amountValue = q * p;
                amount.value = amountValue.toFixed(2);
                credit_amount.value = amountValue.toFixed(2);
                debit_amount.value = amountValue.toFixed(2);
                stock_in.value = quantity.value;
                hidden_stock_in.value = quantity.value;
                hidden_amount.value = amountValue.toFixed(2);
                hidden_debit_amount.value = amountValue.toFixed(2);
                hidden_credit_amount.value = amountValue.toFixed(2);
            }else{
                amount.value = "";
                credit_amount.value = "";
                debit_amount.value = "";
                hidden_stock_in.value = "";
                hidden_amount.value = "";
                hidden_debit_amount.value = "";
                hidden_credit_amount.value = "";
            }
        }
        updateAmount();
        if (quantity) {
            quantity.addEventListener('input', updateAmount);
        }
        if (unit_price) {
            unit_price.addEventListener('input', updateAmount);
        }
    }
    if(ingredient){
        ingredient.addEventListener('input', function() {
            var inputVal = this.value;
            if (inputVal.length > 1) {
                fetch('/search-ingredient/'+ inputVal +'/', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': '{{ csrf_token }}'
                        }
                })
                .then(response => response.json())
                .then(data => {
                    ingredientList.innerHTML = '';
                    data.forEach(item => {
                        var listItem = document.createElement('li');
                        listItem.classList.add('list-group-item');
                        listItem.textContent = item.ingredient;
                        listItem.addEventListener('click', function() {
                            ingredient.value = item.ingredient;
                            ingredientList.innerHTML = '';
                        });
                        ingredientList.appendChild(listItem);
                    });
                })
                .catch(error => console.error('Error:', error));
            } else {
                ingredientList.innerHTML = '';
            }
        });
    
        document.addEventListener('click', function(e) {
            if (!ingredient.contains(e.target) && !ingredientList.contains(e.target)) {
                ingredientList.innerHTML = '';
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.delete').forEach(function(element) {
      element.addEventListener('click', function() {
        const achatId = this.getAttribute('data-id');
        Swal.fire({
          title: 'Êtes-vous sûr(e) de vouloir supprimer cet achat ?',
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
              title: 'Achat supprimé !',
              text: 'L\'achat a été supprimé avec succès.',
              showConfirmButton: true,
              confirmButtonText: 'OK',
              showCancelButton: false,
              cancelButtonText: 'Annuler'
            }).then(() => {
              window.location.href = `/achat/${achatId}/delete/`;
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              icon: 'error',
              title: 'Suppression annulée',
              text: 'Aucune modification n\'a été apportée à l\'achat.',
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