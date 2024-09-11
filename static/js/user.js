var moveRightIcon = document.getElementById('move_right');
var moveLeftIcon = document.getElementById('move_left');
var sourceSelect = document.getElementById('aut_ch');
var destinationSelect = document.getElementById('aut_rem');
var groupSelect = document.getElementById('group_ch');
var groupmoveRightIcon = document.getElementById('group_move_right');
var groupmoveLeftIcon = document.getElementById('group_move_left');
var groupdestinationSelect = document.getElementById('group_rem');
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
if (groupSelect) {
    groupSelect.addEventListener('change', function () {
        if (groupSelect.selectedOptions.length > 0) {
            groupmoveRightIcon.style.backgroundColor = 'black';
        } else {
            groupmoveRightIcon.style.backgroundColor = '#4A4A4A';
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
if (groupdestinationSelect) {
    groupdestinationSelect.addEventListener('change', function () {
        if (groupdestinationSelect.selectedOptions.length > 0) {
            groupmoveLeftIcon.style.backgroundColor = 'black';
        } else {
            groupmoveLeftIcon.style.backgroundColor = '#4A4A4A';
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
if (groupmoveRightIcon) {
    groupmoveRightIcon.addEventListener('click', function () {
        var selectedOptions = Array.from(groupSelect.selectedOptions);
        selectedOptions.forEach(function (option) {
            groupdestinationSelect.appendChild(option);
            option.selected = false; 
        });
        groupmoveRightIcon.style.backgroundColor = '#AFAFAF';
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
if (groupmoveLeftIcon) {
    groupmoveLeftIcon.addEventListener('click', function () {
        var selectedOptions = Array.from(groupdestinationSelect.selectedOptions);
        selectedOptions.forEach(function (option) {
            groupSelect.appendChild(option);
            option.selected = false; 
        });
        groupmoveLeftIcon.style.backgroundColor = '#AFAFAF';
    });
}
if (addButton) {
    addButton.addEventListener('click', function () {
        Array.from(destinationSelect.options).forEach(function (option) {
            option.selected = true;
        });
        Array.from(groupdestinationSelect.options).forEach(function (option) {
            option.selected = true;
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.delete').forEach(function(element) {
      element.addEventListener('click', function() {
        const userId = this.getAttribute('data-id');
        Swal.fire({
          title: 'Êtes-vous sûr(e) de vouloir supprimer cet utilisateur ?',
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
              text: 'L\'utilisateur a été supprimé avec succès.',
              showConfirmButton: true,
              confirmButtonText: 'OK',
              showCancelButton: false,
              cancelButtonText: 'Annuler'
            }).then(() => {
              window.location.href = `/user/${userId}/delete/`;
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              icon: 'error',
              title: 'Suppression annulée',
              text: 'Aucune modification n\'a été apportée à l\'utilisateur.',
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

  