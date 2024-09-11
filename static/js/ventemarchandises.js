document.addEventListener("DOMContentLoaded", function () {
    var ingredient = document.getElementById('ingredient');
    var agency = document.getElementById('agency');
    var avg_price = document.getElementById('avg_price');
    var quantity = document.getElementById('quantity');
    var selling_price = document.getElementById('selling_price');
    var cost_of_sales = document.getElementById('cost_of_sales');
    var hidden_cost_of_sales = document.getElementById('hidden_cost_of_sales');
    var vante_marchandises = document.getElementById('vante_marchandises');
    var hidden_vante_marchandises = document.getElementById('hidden_vante_marchandises');
    var marge_brute = document.getElementById('marge_brute');
    var hidden_marge_brute = document.getElementById('hidden_marge_brute');
    var stock_out = document.getElementById('stock_out');
    var hidden_stock_out= document.getElementById('hidden_stock_out');
    var search_agency = document.getElementById('search_agency');
    var hiddenagency = document.getElementById('hiddenagency');

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
                    
                    if(hiddenagency){
                        ingredient.value = hiddenagency.value;
                    }else{
                        ingredient.value = data[0];
                    }
                    fetchAndDisplayUnitPrice(); 
                } else {
                    avg_price.value = '';
                }
            })
            .catch(error => console.error('Error:', error));
        }
        fetchAndDisplayIngredients();
        agency.addEventListener('change', fetchAndDisplayIngredients);
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
                avg_price.value = data.avg_price;
                var quantityValue = parseFloat(quantity.value);
                var avgPriceValue = parseFloat(avg_price.value);
                var sellingPriceValue = parseFloat(selling_price.value);
                if (!isNaN(quantityValue) && !isNaN(avgPriceValue)) {
                    var amountValue = quantityValue * avgPriceValue;
                    cost_of_sales.value = amountValue.toFixed(2);
                    hidden_cost_of_sales.value = amountValue.toFixed(2);
                    stock_out.value = quantityValue;
                    hidden_stock_out.value = quantityValue;
                    if (!isNaN(sellingPriceValue)) {
                        vante_marchandises.value = sellingPriceValue * quantityValue;
                        marge_brute.value = vante_marchandises.value - cost_of_sales.value;
                        hidden_vante_marchandises.value = sellingPriceValue * quantityValue; 
                        hidden_marge_brute.value = vante_marchandises.value - cost_of_sales.value;
                    } else {
                        vante_marchandises.value = "";
                        marge_brute.value = "";
                        hidden_vante_marchandises.value = "";
                        hidden_marge_brute.value = "";
                    }
                } else {
                    cost_of_sales.value = '';
                    hidden_cost_of_sales.value = '';
                    stock_out.value = '';
                    hidden_stock_out.value = '';
                }
            })
            .catch(error => console.error('Error:', error));
        }
        ingredient.addEventListener('change', fetchAndDisplayUnitPrice);
    }
    function updateQuantity() {
        var quantityValue = parseFloat(quantity.value);
        var avgPriceValue = parseFloat(avg_price.value);
        var sellingPriceValue = parseFloat(selling_price.value);
        if (!isNaN(quantityValue) && !isNaN(avgPriceValue)) {
            var amountValue = quantityValue * avgPriceValue;
            cost_of_sales.value = amountValue.toFixed(2);
            hidden_cost_of_sales.value = amountValue.toFixed(2);
            stock_out.value = quantityValue;
            hidden_stock_out.value = quantityValue;
            if (!isNaN(sellingPriceValue)) {
                vante_marchandises.value = sellingPriceValue * quantityValue;
                marge_brute.value = vante_marchandises.value - cost_of_sales.value;
                hidden_vante_marchandises.value = sellingPriceValue * quantityValue;
                hidden_marge_brute.value = vante_marchandises.value - cost_of_sales.value;
            } else {
                vante_marchandises.value = "";
                marge_brute.value = "";
                hidden_vante_marchandises.value = "";
                hidden_marge_brute.value = "";
            }
        } else {
            cost_of_sales.value = '';
            hidden_cost_of_sales.value = '';
            stock_out.value = '';
            hidden_stock_out.value = '';
        }
    }

    if (quantity) {
        quantity.addEventListener('input', updateQuantity);
    }

    if (selling_price) {
        selling_price.addEventListener('input', updateQuantity);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.delete').forEach(function(element) {
      element.addEventListener('click', function() {
        const venteId = this.getAttribute('data-id');
        Swal.fire({
          title: 'Êtes-vous sûr(e) de vouloir supprimer cette vente ?',
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
              title: 'Vente supprimé !',
              text: 'La vente a été supprimé avec succès.',
              showConfirmButton: true,
              confirmButtonText: 'OK',
              showCancelButton: false,
              cancelButtonText: 'Annuler'
            }).then(() => {
              window.location.href = `/ventemarchandises/${venteId}/delete/`;
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              icon: 'error',
              title: 'Suppression annulée',
              text: 'Aucune modification n\'a été apportée à la vente.',
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