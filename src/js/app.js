(function($) {
  var $modal = $('#modalToSendData');
  var $email = $('#email');

  $modal.on('shown.bs.modal', function() {
    $email.trigger('focus');
  });

  $('.js-save-changes').on('click', function() {

    if ($email.val().trim().length > 0) {
      sendChanges().then(function() {
        $modal.modal('hide');
      });
    } else {
      $modal.find('form').addClass('was-validated');
    }
  });

  function sendChanges() {
    console.log('>> Saving changes...');

    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        console.log('-- Changes were saved...');
        resolve();
      }, 2000);
    });
  }
})(jQuery);