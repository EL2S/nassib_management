document.addEventListener("DOMContentLoaded", function () {
    var search_agency = document.getElementById('search_agency');
    var agency = document.getElementById('agency');
    var customer = document.getElementById('customer');
    var search_customer = document.getElementById('search_customer');
    var debit_account = document.getElementById('debit_account');
    var debit_Label = document.getElementById('debit_Label');
    var credit_account = document.getElementById('credit_account');
    var credit_Label = document.getElementById('credit_Label');
    var debit_amount = document.getElementById('debit_amount');
    var hidden_debit_amount = document.getElementById('hidden_debit_amount');
    var credit_amount = document.getElementById('credit_amount');
    var hidden_credit_amount = document.getElementById('hidden_credit_amount');
    var vante_marchandises = document.getElementById('vante_marchandises');
    var hidden_vante_marchandises = document.getElementById('hidden_vante_marchandises');
    var date = document.getElementById('date');

    if(search_customer){
        search_customer.addEventListener('input', function() {
            var inputVal = this.value.toLowerCase();
            var select = customer;
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
        function fetchAndDisplayCustomer() {
            var dateValue = date.value;
            fetch('/get-date-customer/' + dateValue + '/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': '{{ csrf_token }}'
                }
            })
            .then(response => response.json())
            .then(data => {
                customer.innerHTML = ''; 
                data.customers.forEach(function(a) {
                    var option = document.createElement('option');
                    option.value = a;
                    option.text = a;
                    customer.appendChild(option);
                });
                customer.value = data.customers[0];
                fetchAndDisplayAgency();
            })
            .catch(error => console.error('Error:', error));
        }
        date.addEventListener('input', fetchAndDisplayCustomer);
    }
    if (customer) {
        function fetchAndDisplayAgency() {
            var dateValue = date.value;
            var customerValue = customer.value;
            fetch('/get-date-customer-agency/' + dateValue + '/' + customerValue + '/', {
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
                fetchAndDisplaySaleValue();
            })
            .catch(error => console.error('Error:', error));
        }
        customer.addEventListener('change', fetchAndDisplayAgency);
    }
    if(agency){
        function fetchAndDisplaySaleValue() {
            var dateValue = date.value;
            var customerValue = customer.value;
            var agencyValue = agency.value;
            fetch('/get-date-customer-agency-vante-marchandises/' + dateValue + '/' + customerValue + '/' + agencyValue + '/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': '{{ csrf_token }}'
                }
            })
            .then(response => response.json())
            .then(data => {
                var vantemarchandisesVakue = parseFloat(data.vante_marchandises);
                vante_marchandises.value = vantemarchandisesVakue;
                hidden_vante_marchandises.value = vantemarchandisesVakue;
                debit_amount.value = vantemarchandisesVakue;
                hidden_debit_amount.value = vantemarchandisesVakue;
                credit_amount.value = vantemarchandisesVakue;
                hidden_credit_amount.value = vantemarchandisesVakue;
            })
            .catch(error => console.error('Error:', error));
        }
        date.addEventListener('input', fetchAndDisplaySaleValue);
        agency.addEventListener('change', fetchAndDisplaySaleValue);
    }
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.delete').forEach(function(element) {
      element.addEventListener('click', function() {
        const comptavmId = this.getAttribute('data-id');
        Swal.fire({
          title: 'Êtes-vous sûr(e) de vouloir supprimer ce comptabilité pour ce vente de marchandise?',
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
              title: 'Comptabilité pour ce vente de marchandise supprimé !',
              text: 'La comptabilité pour ce vente de marchandisei a été supprimé avec succès.',
              showConfirmButton: true,
              confirmButtonText: 'OK',
              showCancelButton: false,
              cancelButtonText: 'Annuler'
            }).then(() => {
              window.location.href = `/comptavm/${comptavmId}/delete/`;
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              icon: 'error',
              title: 'Suppression annulée',
              text: 'Aucune modification n\'a été apportée au comptabilité pour ce vente de marchandise.',
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