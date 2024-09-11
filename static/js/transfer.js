document.addEventListener("DOMContentLoaded", function () {
    var search_ingredient = document.getElementById('search_ingredient');
    var search_beneficiary = document.getElementById('search_beneficiary');
    var search_initiator = document.getElementById('search_initiator');
    var beneficiary = document.getElementById('beneficiary');
    var initiator = document.getElementById('initiator');
    var quantity_issued = document.getElementById('quantity_issued');
    var amount_issue = document.getElementById('amount_issue');
    var hiddenamount_issue = document.getElementById('hiddenamount_issue');
    var stock_out = document.getElementById('stock_out');
    var hidden_stock_out = document.getElementById('hidden_stock_out');
    var hiddenunit_price = document.getElementById('hiddenunit_price');
    var unit_price = document.getElementById('unit_price');
    var ingredient = document.getElementById('ingredient');

    if (search_initiator) {
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

    if (search_beneficiary) {
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

    if (search_ingredient) {
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


    if (initiator) {
        function fetchAndDisplayIngredients() {
            var initiatorOption = initiator.value;
            fetch('/get-ingredients-by-initiator/' + initiatorOption + '/', {
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
    
                    ingredient.value = data[0];
                    fetchAndDisplayUnitPrice(); 
                } else {
                    unit_price.value = '';
                    hidden_unit_price.value = '';
                }
            })
            .catch(error => console.error('Error:', error));
        }
        fetchAndDisplayIngredients();
        initiator.addEventListener('change', fetchAndDisplayIngredients);
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
                hiddenunit_price.value = data.avg_price;
            })
            .catch(error => console.error('Error:', error));
        }
        ingredient.addEventListener('change', fetchAndDisplayUnitPrice);
    }

    if (quantity_issued && unit_price) {
        function updateAmount() {
            var q = parseFloat(quantity_issued.value);
            var p = parseFloat(unit_price.value);
            if (!isNaN(q) && !isNaN(p)) {
                var amountValue = q * p;
                hiddenunit_price.value = p;
                amount_issue.value = amountValue;
                hiddenamount_issue.value = amountValue;
                stock_out.value = q;
                hidden_stock_out.value = q;
            } else {
                amount_issue.value = "";
                hiddenamount_issue.value = "";
                stock_out.value = "";
                hidden_stock_out.value = "";
                hiddenunit_price.value = "";
            }
        }

        updateAmount();
        if (quantity_issued) {
            quantity_issued.addEventListener('input', updateAmount);
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.delete').forEach(function(element) {
      element.addEventListener('click', function() {
        const transferId = this.getAttribute('data-id');
        Swal.fire({
          title: 'Êtes-vous sûr(e) de vouloir supprimer cette transfert ?',
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
              title: 'Transfert supprimé !',
              text: 'Le transfert a été supprimé avec succès.',
              showConfirmButton: true,
              confirmButtonText: 'OK',
              showCancelButton: false,
              cancelButtonText: 'Annuler'
            }).then(() => {
              window.location.href = `/transfer/${transferId}/delete/`;
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              icon: 'error',
              title: 'Suppression annulée',
              text: 'Aucune modification n\'a été apportée au transfert.',
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