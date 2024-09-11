document.addEventListener("DOMContentLoaded", function () {
    var date = document.getElementById('date');
    var search_agency = document.getElementById('search_agency');
    var search_initiator = document.getElementById('search_initiator');
    var initiator = document.getElementById('initiator');
    var search_batch_no = document.getElementById('search_batch_no');
    var agency = document.getElementById('agency');
    var batch_no = document.getElementById('batch_no');
    var total_production = document.getElementById('total_production');
    var search_product = document.getElementById('search_product');
    var product = document.getElementById('product');
    var quantity_sold = document.getElementById('quantity_sold');
    var selling_price = document.getElementById('selling_price');
    var hidden_selling_price = document.getElementById('hidden_selling_price');
    var hidden_total_production = document.getElementById('hidden_total_production');
    var sale_value = document.getElementById('sale_value');
    var hidden_sale_value = document.getElementById('hidden_sale_value');
    var total_quantity_sold_to_date = document.getElementById('total_quantity_sold_to_date');
    var total_remaining_to_be_sold = document.getElementById('total_remaining_to_be_sold');
    var hidden_total_remaining_to_be_sold = document.getElementById('hidden_total_remaining_to_be_sold');
    var stock_in = document.getElementById('stock_in');
    var hidden_stock_in = document.getElementById('hidden_stock_in');
    var stock_out = document.getElementById('stock_out');
    var hidden_stock_out = document.getElementById('hidden_stock_out');

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
    if (date) {
        function fetchAndDisplayBatchNo() {
            var dateValue = date.value;
            fetch('/get-batch-no-production/' + dateValue + '/', {
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
                fetchAndDisplayinitiator();
            })
            .catch(error => console.error('Error:', error));
        }

        date.addEventListener('input', fetchAndDisplayBatchNo);
    }
    if (batch_no) {
        function fetchAndDisplayinitiator() {
            var batch_noValue = batch_no.value;
            var dateValue = date.value;
            fetch('/get-batchno-initiator/' + batch_noValue + '/' + dateValue + '/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': '{{ csrf_token }}'
                }
            })
            .then(response => response.json())
            .then(data => {
                initiator.innerHTML = ''; 
                data.initiators.forEach(function(a) {
                    var option = document.createElement('option');
                    option.value = a;
                    option.text = a;
                    initiator.appendChild(option);
                });
                initiator.value = data.initiators[0];
                fetchAndDisplayProduct();
            })
            .catch(error => console.error('Error:', error));
        }

        batch_no.addEventListener('change', fetchAndDisplayinitiator);
        date.addEventListener('input', fetchAndDisplayinitiator);
    }
    if (initiator) {
        function fetchAndDisplayProduct() {
            var batch_noValue = batch_no.value;
            var dateValue = date.value;
            var initiatorValue = initiator.value;
            fetch('/get-batchno-initiator-product/' + batch_noValue + '/' + dateValue + '/' + initiatorValue + '/', {
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
                fetchAndDisplayTotalProductionPrice();
            })
            .catch(error => console.error('Error:', error));
        }

        initiator.addEventListener('change', fetchAndDisplayProduct);
        batch_no.addEventListener('change', fetchAndDisplayProduct);
        date.addEventListener('input', fetchAndDisplayProduct);
    }
    if(total_production){
        function fetchAndDisplayTotalProductionPrice() {
            var batch_noValue = batch_no.value;
            var dateValue = date.value;
            var initiatorValue = initiator.value;
            var productValue = product.value;
            fetch('/get-total-production-price/' + batch_noValue + '/' + dateValue + '/' + initiatorValue + '/' + productValue + '/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': '{{ csrf_token }}'
                }
            })
            .then(response => response.json())
            .then(data => {
                total_production.value = parseFloat(data.total_production);
                hidden_total_production.value = parseFloat(data.total_production);
                selling_price.value = parseFloat(data.price);
                hidden_selling_price.value = parseFloat(data.price);
                stock_in.value = parseFloat(data.total_production);
                hidden_stock_in.value = parseFloat(data.total_production);
            })
            .catch(error => console.error('Error:', error));
        }

        product.addEventListener('change', fetchAndDisplayTotalProductionPrice);
        agency.addEventListener('change', fetchAndDisplayTotalProductionPrice);
        batch_no.addEventListener('change', fetchAndDisplayTotalProductionPrice);
        date.addEventListener('input', fetchAndDisplayTotalProductionPrice);
    }
    if (quantity_sold) {
        const total_sold = parseFloat(total_quantity_sold_to_date.value);
        function calculateTotal() {
            const sold = parseFloat(quantity_sold.value);
            const price = parseFloat(selling_price.value);
            const total = parseFloat(total_production.value);
            if (!isNaN(sold)) {
                stock_out.value = sold;
                hidden_stock_out.value = sold;
                sale_value.value = sold * price;
                hidden_sale_value.value = sold * price;
                total_quantity_sold_to_date.value = total_sold + sold;
                total_remaining_to_be_sold.value = total - parseFloat(total_quantity_sold_to_date.value);
                hidden_total_remaining_to_be_sold.value = total - parseFloat(total_quantity_sold_to_date.value);
            }else{
                stock_out.value = "";
                hidden_stock_out.value = "";
                sale_value.value = "";
                hidden_sale_value.value = "";
                total_remaining_to_be_sold.value = "";
                hidden_total_remaining_to_be_sold.value = "";
            }
        }
        quantity_sold.addEventListener('input', calculateTotal);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.delete').forEach(function(element) {
      element.addEventListener('click', function() {
        const distributionId = this.getAttribute('data-id');
        Swal.fire({
          title: 'Êtes-vous sûr(e) de vouloir supprimer cette distribution ?',
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
              title: 'Distribution supprimé !',
              text: 'La distribution a été supprimé avec succès.',
              showConfirmButton: true,
              confirmButtonText: 'OK',
              showCancelButton: false,
              cancelButtonText: 'Annuler'
            }).then(() => {
              window.location.href = `/distribution/${distributionId}/delete/`;
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              icon: 'error',
              title: 'Suppression annulée',
              text: 'Aucune modification n\'a été apportée à la distribution.',
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