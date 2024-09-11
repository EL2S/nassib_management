document.addEventListener("DOMContentLoaded", function () {
    var search_agency = document.getElementById('search_agency');
    var agency = document.getElementById('agency');
    var debit_account = document.getElementById('debit_account');
    var debit_Label = document.getElementById('debit_Label');
    var credit_account = document.getElementById('credit_account');
    var credit_Label = document.getElementById('credit_Label');
    var debit_amount = document.getElementById('debit_amount');
    var hidden_debit_amount = document.getElementById('hidden_debit_amount');
    var credit_amount = document.getElementById('credit_amount');
    var hidden_credit_amount = document.getElementById('hidden_credit_amount');
    var sale_value = document.getElementById('sale_value');
    var hidden_sale_value = document.getElementById('hidden_sale_value');
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
                fetchAndDisplaySaleValue();
            })
            .catch(error => console.error('Error:', error));
        }
        date.addEventListener('input', fetchAndDisplayAgency);
    }
    if(agency){
        function fetchAndDisplaySaleValue() {
            var dateValue = date.value;
            var agencyValue = agency.value;
            fetch('/get-date-agency-sale-value/' + dateValue + '/' + agencyValue + '/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': '{{ csrf_token }}'
                }
            })
            .then(response => response.json())
            .then(data => {
                var saleVakue = parseFloat(data.sale_value);
                sale_value.value = saleVakue;
                hidden_sale_value.value = saleVakue;
                debit_amount.value = saleVakue;
                hidden_debit_amount.value = saleVakue;
                credit_amount.value = saleVakue;
                hidden_credit_amount.value = saleVakue;
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
        const comptafpId = this.getAttribute('data-id');
        Swal.fire({
          title: 'Êtes-vous sûr(e) de vouloir supprimer ce comptabilité pour ce produit fini?',
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
              title: 'Comptabilité pour ce produit fini supprimé !',
              text: 'La comptabilité pour ce produit fini a été supprimé avec succès.',
              showConfirmButton: true,
              confirmButtonText: 'OK',
              showCancelButton: false,
              cancelButtonText: 'Annuler'
            }).then(() => {
              window.location.href = `/comptafp/${comptafpId}/delete/`;
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              icon: 'error',
              title: 'Suppression annulée',
              text: 'Aucune modification n\'a été apportée au comptabilité pour ce produit fini.',
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