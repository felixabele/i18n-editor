// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(function() {

  var $locale_form = $('#locale_git_commit');
  var $locale_form_submit = $locale_form.find('input[type=submit]');

  $('.locale-select').change(function() {
    window.location = "?locale="+ $(this).val();
  });

  // Push to Git
  $locale_form
    .bind('ajax:send', function() {
      $locale_form_submit.val( 'Start: Git Commit' );
    })
    .bind('ajax:success', function(evt, data){
      $locale_form_submit.val( data.success ? 'Successfully pushed to Git' : 'Error on Git push' );
  });

  $('#yaml').yamlEditor({
    onSave: function( row, val ) {
      $.ajax({
        url: "/i18n_editor/locales/"+ $('.locale-select').val(),
        type: "PUT",
        data: {
          key_chain: row.data()['key_chain'],
          value: val}
      }).done(function( data ) {
        if( data['success'] ) {
          row.find('.yaml-value').html( val );
          row.data( 'value', val );
        }
      });
    }
  });

});