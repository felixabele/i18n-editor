// jQuery toggle-Tags-Plugin
// its supposed to be the most simle jQuery Slider on earth
// version 0.1, 1708.06.2012
// by Felix Abele

(function($) {

  // ---> yamlEditor-Plugin Start
  $.yamlEditor = function(element, options) {

    var $element = $(element),
       element = element;

    // --- Default-Options
    var defaults = {
      element: $element,
      onSelectRow: function( data ) {},
      onSave: function( row, val ) {
        row.find('.yaml-value').html( val );
        row.data( 'value', val );
      }
    }

    var plugin = this;
    plugin.settings = {};
    plugin.yaml = "";
    plugin.edit_form = "";
    plugin.current_row;
    key_chain = [];
    current_indent = 0;

    // ----------------------------------------
    //   INITIALISATION
    // ----------------------------------------
    plugin.init = function() {

      // Extend Default-Settings with Customs
      plugin.settings = $.extend({}, defaults, options);
      plugin.element = $element;

      // overwrite these preset values with html-5 data-attributes 
      plugin.settings = $.extend({}, plugin.settings, plugin.element.data());
      plugin.yaml = $element.html();
      $element.html('');

      process();

      plugin.edit_form = initEditor();

      plugin.edit_form.submit(function(e) {
        e.preventDefault();
        plugin.settings.onSave( plugin.current_row, $(this).find('#yaml_editor_value').val() );
      });

      $element.delegate('.yaml-row', 'click', editRow);
    }

    // ----------------------------------------
    //   Private Methods
    // ----------------------------------------
    
    // --- loop through all rows of a yaml file and parse the data
    var process = function() {
      var rows    = plugin.yaml.split(/\r\n|\r|\n/g),
        row_count = rows.length;
      $element.addClass('yaml-data');
      
      for(var i=0; i<row_count; i++) {
        var row = rows[i];
        var yaml_obj = yamlExcerpt(row, i);
        if ((yaml_obj.key != "") && (!yaml_obj.is_commented)) {
          yaml_obj.key_chain = currentKeyChain( yaml_obj.indent, yaml_obj.key ).join('.');
        }
        $element.append( rowHighlighter( yaml_obj ) );
      }
    }

    // --- parse yaml
    var yamlExcerpt = function( text, index ) {
      var key_start   = text.search(/\s\S/),
        br_index      = (br_index == 0 ? 0 : key_start+1),
        cl_text       = text.trim(),
        sep_index     = cl_text.search(/:/),
        key           = cl_text.substr(0, sep_index),
        value         = cl_text.substr(sep_index + 1).trim();

      value = value.replace(/^('|")|('|")$/g, '');
      return {'key': key, 'value': value, 'line_nb': index, 'indent': (br_index/2), 'is_commented': isCommentRow(key), 'key_chain': ""};
    }

    // --- rows which begin with # are comments
    var isCommentRow = function( text ) {
      if (text.trim().match(/^#/))
        return true;
      else
        return false;
    }

    // --- build current keychain
    var currentKeyChain = function( index, key ) {      
      if (this.current_indent == index) {
        this.key_chain.pop();
        this.key_chain.push( key );
      } else if (this.current_indent < index) {            
        this.key_chain.push( key );
      } else if (this.current_indent > index) {
        this.key_chain.splice( index );           
        this.key_chain.push( key );
      }        
      this.current_indent = index;        
      return this.key_chain;
    }

    // --- helper to encode html content
    var encodeHTML = function( string ) {
      return $('<div />').text( string ).html();
    }

    // --- highlight yaml row with html markup
    //    @params: {'key': key, 'value': value, 'line_nb': 12, 'indent': 2, 'is_commented': true, 'key_chain': ''}
    var rowHighlighter = function( data ) {
      var $row = $('<li/>', {data: data, id: data.key_chain.replace('.', '_')});          

      // empty row
      if (data.key == '') {
        $row.html("<i>"+ data.line_nb +"</i>");

      // row with value
      } else {
        $row.addClass(data.is_commented ? 'yaml-comment' : 'yaml-row');
        $row.html("<i class='yaml-indent-"+ data.indent +"'>"+ data.line_nb +"</i> \
          <span class='yaml-key' title='"+ data.key_chain +"'>"+ data.key +"</span>: \
          <span class='yaml-value'>"+ encodeHTML( data.value ) +"</span>");
      }
      return $row;
    }


    // --- build row editor form
    var initEditor = function() {
      var $edit_form = $('<form/>', {class: 'yaml-editor'});
      $edit_form.append("<label name='key' id='yaml_editor_key' for='yaml_editor_value'></label>");
      $edit_form.append("<input name='value' id='yaml_editor_value' type='text' />");
      $edit_form.append("<input type='submit' id='yaml_editor_submit' value='save' />");
      $element.append( $edit_form );
      $edit_form.hide();
      return $edit_form;
    }

    // --- edit the selected row with the editor 
    var editRow = function() {      
      var data = $(this).data();
      if (!$(this).hasClass('yaml-row-active') && (data.value != '') ) {
        plugin.current_row = $(this);        
        $element.find('.yaml-row-active').removeClass('yaml-row-active');
        plugin.current_row.addClass('yaml-row-active');      
        plugin.edit_form.find('#yaml_editor_key').html( data.key_chain );
        plugin.edit_form.find('#yaml_editor_value').val( data.value );
        plugin.edit_form.detach().appendTo( $(this) ).show();
        plugin.settings.onSelectRow( data );
      }
    }

    var onSave = function( row ) {
      return true;
      //if (plugin.settings.onSave( plugin.current_row.data() )) {
      //  plugin.current_row.find('.yaml-value').html( val );
      //  plugin.current_row.data( 'value', val );
      //}      
    }

    // Start
    plugin.init();
  }      

  // add the plugin to the jQuery.fn object
  $.fn.yamlEditor = function(options) {
    return this.each(function() {
      if (undefined == $(this).data('yamlEditor')) {
        var plugin = new $.yamlEditor(this, options);
        $(this).data('yamlEditor', plugin);        
      }
    });
  }
})(jQuery);