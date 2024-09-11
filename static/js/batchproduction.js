document.addEventListener("DOMContentLoaded", function () {
    var date = document.getElementById('date');
    var search_agency = document.getElementById('search_agency');
    var search_batch_no = document.getElementById('search_batch_no');
    var agency = document.getElementById('agency');
    var batch_no = document.getElementById('batch_no');
    var debit_account = document.getElementById('debit_account');
    var debit_Label = document.getElementById('debit_Label');
    var credit_account = document.getElementById('credit_account');
    var credit_Label = document.getElementById('credit_Label');
    var debit_amount = document.getElementById('debit_amount');
    var hidden_debit_amount = document.getElementById('hidden_debit_amount');
    var credit_amount = document.getElementById('credit_amount');
    var hidden_credit_amount = document.getElementById('hidden_credit_amount');
    var total_production = document.getElementById('total_production');
    var total_amount = document.getElementById('total_amount');
    var hidden_total_amount = document.getElementById('hidden_total_amount');
    var unit_material_cost = document.getElementById('unit_material_cost');
    var hidden_unit_material_cost = document.getElementById('hidden_unit_material_cost');
    var fixed_cost = document.getElementById('fixed_cost');
    var hidden_fixed_cost = document.getElementById('hidden_fixed_cost');
    var variable_cost = document.getElementById('variable_cost');
    var hidden_variable_cost = document.getElementById('hidden_variable_cost');
    var total_cost = document.getElementById('total_cost');
    var hidden_total_cost = document.getElementById('hidden_total_cost');
    var total_fixed_cost = document.getElementById('total_fixed_cost');
    var hidden_total_fixed_cost = document.getElementById('hidden_total_fixed_cost');
    var total_variable_cost = document.getElementById('total_variable_cost');
    var hidden_total_variable_cost = document.getElementById('hidden_total_variable_cost');
    var search_product = document.getElementById('search_product');
    var product = document.getElementById('product');

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
    if(search_batch_no){
        search_batch_no.addEventListener('input', function() {
            var inputVal = this.value.toLowerCase();
            var select = batch_no;
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
        function fetchAndDisplayBatchNo() {
            var dateValue = date.value;
            fetch('/get-batch-no/' + dateValue + '/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': '{{ csrf_token }}'
                }
            })
            .then(response => response.json())
            .then(data => {
                batch_no.innerHTML = ''; 
                data.batch_numbers.forEach(function(batch) {
                    var option = document.createElement('option');
                    option.value = batch;
                    option.text = batch;
                    batch_no.appendChild(option);
                });
                batch_no.value = data.batch_numbers[0];
                fetchAndDisplayAgency();
            })
            .catch(error => console.error('Error:', error));
        }

        date.addEventListener('input', fetchAndDisplayBatchNo);
    }
    if (batch_no) {
        function fetchAndDisplayAgency() {
            var batch_noValue = batch_no.value;
            var dateValue = date.value;
            fetch('/get-batchno-agency/' + batch_noValue + '/' + dateValue + '/', {
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
                fetchAndDisplayProduct();
            })
            .catch(error => console.error('Error:', error));
        }

        batch_no.addEventListener('change', fetchAndDisplayAgency);
        date.addEventListener('input', fetchAndDisplayAgency);
    }
    if (agency) {
        function fetchAndDisplayProduct() {
            var batch_noValue = batch_no.value;
            var dateValue = date.value;
            var agencyValue = agency.value;
            fetch('/get-batchno-agency-product/' + batch_noValue + '/' + dateValue + '/' + agencyValue + '/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': '{{ csrf_token }}'
                }
            })
            .then(response => response.json())
            .then(data => {
                product.innerHTML = ''; 
                data.products.forEach(function(a) {
                    var option = document.createElement('option');
                    option.value = a;
                    option.text = a;
                    product.appendChild(option);
                });
                product.value = data.products[0];
                fetchAndDisplayTotalAmount();
            })
            .catch(error => console.error('Error:', error));
        }

        agency.addEventListener('change', fetchAndDisplayProduct);
        batch_no.addEventListener('change', fetchAndDisplayProduct);
        date.addEventListener('input', fetchAndDisplayProduct);
    }
    if(total_amount){
        function fetchAndDisplayTotalAmount() {
            var batch_noValue = batch_no.value;
            var dateValue = date.value;
            var agencyValue = agency.value;
            var productValue = product.value;
            fetch('/get-total-amount/' + batch_noValue + '/' + dateValue + '/' + agencyValue + '/' + productValue + '/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': '{{ csrf_token }}'
                }
            })
            .then(response => response.json())
            .then(data => {
                total_amount.value = data.total_amount;
                hidden_total_amount.value = data.total_amount;
                var t = parseFloat(total_production.value);
                if(!isNaN(t)) {
                    batchCalculator();
                }else{
                    unit_material_cost.value = "";
                    fixed_cost.value = "";
                    variable_cost.value = "";
                    total_cost.value = "";
                    total_fixed_cost.value = "";
                    total_variable_cost.value = "";
                    debit_amount.value = "";
                    credit_amount.value = "";
                    hidden_unit_material_cost.value = "";
                    hidden_fixed_cost.value = "";
                    hidden_variable_cost.value = "";
                    hidden_total_cost.value = "";
                    hidden_total_fixed_cost.value = "";
                    hidden_total_variable_cost.value = "";
                    hidden_debit_amount.value = "";
                    hidden_credit_amount.value = "";
                }
            })
            .catch(error => console.error('Error:', error));
        }

        product.addEventListener('change', fetchAndDisplayTotalAmount);
        agency.addEventListener('change', fetchAndDisplayTotalAmount);
        batch_no.addEventListener('change', fetchAndDisplayTotalAmount);
        date.addEventListener('input', fetchAndDisplayTotalAmount);
    }
    if(total_production){
        function batchCalculator() {

            var totalProduction = parseFloat(total_production.value);
            var totalAmount = parseFloat(total_amount.value);
            var unitMaterialCost = totalProduction !== 0 ? totalAmount / totalProduction : 0;
            var fixedCost = 0.35 * unitMaterialCost;
            var variableCost = 0.25 * unitMaterialCost;
            var totalUnitCost = fixedCost + variableCost + unitMaterialCost;
            var totalFixedCost = fixedCost * totalProduction;
            var totalVariableCost = variableCost * totalProduction;
            var montantDebiterValue = totalFixedCost + totalVariableCost;
            var montantCrediterValue = totalFixedCost + totalVariableCost;

            unit_material_cost.value = unitMaterialCost.toFixed(2);
            hidden_unit_material_cost.value = unitMaterialCost.toFixed(2);
            fixed_cost.value = fixedCost.toFixed(2);
            hidden_fixed_cost.value = fixedCost.toFixed(2);
            variable_cost.value = variableCost.toFixed(2);
            hidden_variable_cost.value = variableCost.toFixed(2);
            total_cost.value = totalUnitCost.toFixed(2);
            hidden_total_cost.value = totalUnitCost.toFixed(2);
            total_fixed_cost.value = totalFixedCost.toFixed(2);
            hidden_total_fixed_cost.value = totalFixedCost.toFixed(2);
            total_variable_cost.value = totalVariableCost.toFixed(2);
            hidden_total_variable_cost.value = totalVariableCost.toFixed(2);
            debit_amount.value = montantDebiterValue.toFixed(2);
            hidden_debit_amount.value = montantDebiterValue.toFixed(2);
            credit_amount.value = montantCrediterValue.toFixed(2);
            hidden_credit_amount.value = montantCrediterValue.toFixed(2);
        }
        total_production.addEventListener('input', batchCalculator);
    }
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.delete').forEach(function(element) {
      element.addEventListener('click', function() {
        const batchproductionId = this.getAttribute('data-id');
        Swal.fire({
          title: 'Êtes-vous sûr(e) de vouloir supprimer ce production par lot ?',
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
              title: 'Production par lot supprimé !',
              text: 'La production par lot a été supprimé avec succès.',
              showConfirmButton: true,
              confirmButtonText: 'OK',
              showCancelButton: false,
              cancelButtonText: 'Annuler'
            }).then(() => {
              window.location.href = `/batchproduction/${batchproductionId}/delete/`;
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              icon: 'error',
              title: 'Suppression annulée',
              text: 'Aucune modification n\'a été apportée à la production par lot.',
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