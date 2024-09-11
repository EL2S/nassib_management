var moveRightIcon = document.getElementById('move_right');
var moveLeftIcon = document.getElementById('move_left');
var sourceSelect = document.getElementById('aut_ch');
var destinationSelect = document.getElementById('aut_rem');
var addButton = document.getElementById('add');
if (sourceSelect) {
    sourceSelect.addEventListener('change', function () {
        if (sourceSelect.selectedOptions.length > 0) {
            moveRightIcon.style.backgroundColor = 'black';
        } else {
            moveRightIcon.style.backgroundColor = '#4A4A4A';
        }
    });
}
if (destinationSelect) {
    destinationSelect.addEventListener('change', function () {
        if (destinationSelect.selectedOptions.length > 0) {
            moveLeftIcon.style.backgroundColor = 'black';
        } else {
            moveLeftIcon.style.backgroundColor = '#4A4A4A';
        }
    });
}
if (moveRightIcon) {
    moveRightIcon.addEventListener('click', function () {
        var selectedOptions = Array.from(sourceSelect.selectedOptions);
        selectedOptions.forEach(function (option) {
            destinationSelect.appendChild(option);
            option.selected = false; 
        });
        moveRightIcon.style.backgroundColor = '#AFAFAF';
    });
}
if (moveLeftIcon) {
    moveLeftIcon.addEventListener('click', function () {
        var selectedOptions = Array.from(destinationSelect.selectedOptions);
        selectedOptions.forEach(function (option) {
            sourceSelect.appendChild(option);
            option.selected = false; 
        });
        moveLeftIcon.style.backgroundColor = '#AFAFAF';
    });
}
if (addButton) {
    addButton.addEventListener('click', function () {
        Array.from(destinationSelect.options).forEach(function (option) {
            option.selected = true;
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.delete').forEach(function(element) {
      element.addEventListener('click', function() {
        const groupId = this.getAttribute('data-id');
        Swal.fire({
          title: 'Êtes-vous sûr(e) de vouloir supprimer cette groupe ?',
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
              title: 'Utilisateur supprimé !',
              text: 'Le groupe a été supprimé avec succès.',
              showConfirmButton: true,
              confirmButtonText: 'OK',
              showCancelButton: false,
              cancelButtonText: 'Annuler'
            }).then(() => {
              window.location.href = `/group/${groupId}/delete/`;
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              icon: 'error',
              title: 'Suppression annulée',
              text: 'Aucune modification n\'a été apportée à le groupe.',
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