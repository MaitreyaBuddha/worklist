//  vim:ts=4:et
//
//  Copyright (c) 2010, LoveMachine Inc.  
//  All Rights Reserved.  
//  http://www.lovemachineinc.com

var activeUsersFlag=1;
var bidNotesHelper="This is where you describe to the Runner your approach on how to get this job done. These notes are one tool the Runners use to compare bidders and decide who is right for the job.";

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
    } 
}

function formatTime(x){
    var month = Array(12);
    month[0] = '01';
    month[1] = '02';
    month[2] = '03';
    month[3] = '04';
    month[4] = '05';
    month[5] = '06';
    month[6] = '07';
    month[7] = '08';
    month[8] = '09';
    month[9] = '10';
    month[10] = '11';
    month[11] = '12';
    
    today = new Date();
    today = today.setTime(x);
    return month[today.getMonth()] + '/' + today.getDate() + '/' + today.getFullYear();
}

/*
 *   Function: AjaxPopup
 *
 *    Purpose: This function is used for popups that require additional information from
 *             the server and uses an Ajax post call to query the server.
 *
 * Parameters: popupId - The id element for the block holding the popup's html
 *             titleString - The title for the popup box
 *             urlString - The URL to issue the Ajax call to 
 *             keyId - The database id that will be mapped to 'itemid' in the form
 *             fieldArray - An array containing the list of fields that need
 *                          to be updated on the popup box.
 *                array[0] - Type of element being populated [input|textbox|checkbox|span]
 *                array[1] - Type if of the element being populated
 *                array[2] - The value to be inserted into the element 
 *                array[3] - undefined or 'eval' - If eval the array[2] item will
 *                           be passed to eval() for working with json return objects
 *             successFunc - An optional function that gets executed after populating the fields.
 *
 */
function AjaxPopup(popupId,
           titleString,
           urlString,
           keyId,
           fieldArray,
           successFunc)
{
  $(popupId).data('title.dialog', titleString);

  $.ajax({type: "POST",
      url: urlString,
      data: 'item='+keyId,
      dataType: 'json',
      success: function(json) {

        $.each(fieldArray, 
           function(key,value){
             if(value[0] == 'input') {
               if(value[3] != undefined && value[3] == 'eval')  {
             $('.popup-body form input[name="' + value[1] +'"]').val( eval(value[2]) );
               } else {
             $('.popup-body form input[name="' + value[1] +'"]').val( value[2] );
               }
             }
             
             if(value[0] == 'textarea') {
               if(value[3] != undefined && value[3] == 'eval')  {
             $('.popup-body form textarea[name="' + value[1] +'"]').val( eval(value[2]) );
               } else {
             $('.popup-body form textarea[name="' + value[1] +'"]').val( value[2] );
               }
             }
             
             if(value[0] == 'checkbox') {
               if(value[3] != undefined && value[3] == 'eval')  {
             $('.popup-body form checkbox[name="' + value[1] +'"] option[value="'+ eval(value[2])+'"]').prop('checked', true);         
               } else {
             $('.popup-body form checkbox[name="' + value[1] +'"] option[value="'+ value[2] +'"]').prop('checked', true);         
               }
             }
             
             if(value[0] == 'span')  {
               if(value[3] != undefined && value[3] == 'eval')  {
             $('.popup-body form ' + value[1]).text( eval(value[2]) );
               } else {
             $('.popup-body form ' + value[1]).text( value[2] );
               }
             }
           });

        if(successFunc !== undefined) {
          successFunc(json);
        }
            }
    });

  
}

/*
 *   Function: SimplePopup
 *
 *    Purpose: This function is used for popups that do not require additional 
 *             calls to the server to grab data.
 *
 * Parameters: popupId - The id element for the block holding the popup's html
 *             titleString - The title for the popup box
 *             keyId - The database id that will be mapped to 'itemid' in the form
 *             fieldArray - An array containing the list of fields that need
 *                          to be updated on the popup box.
 *                array[0] - Type of element being populated [input|textbox|checkbox|span]
 *                array[1] - Type if of the element being populated
 *                array[2] - The value to be inserted into the element 
 *                array[3] - undefined or 'eval' - If eval the array[2] item will
 *                           be passed to eval() for working with json return objects
 *             successFunc - An optional function that gets executed after populating the fields.
 *
 */
function SimplePopup(popupId,
             titleString,
             keyId,
             fieldArray,
             successFunc)
{
  $(popupId).data('title.dialog', titleString);

  $.each(fieldArray, 
     function(key,value){
       if(value[0] == 'input') {
         if(value[3] != undefined && value[3] == 'eval')  {
           $('.popup-body form input[name="' + value[1] +'"]').val( eval(value[2]) );
         } else {
           $('.popup-body form input[name="' + value[1] +'"]').val( value[2] );
         }
       }
       
       if(value[0] == 'textarea') {
         if(value[3] != undefined && value[3] == 'eval')  {
           $('.popup-body form textarea[name="' + value[1] +'"]').val( eval(value[2]) );
         } else {
           $('.popup-body form textarea[name="' + value[1] +'"]').val( value[2] );
         }
       }
       
       if(value[0] == 'checkbox') {
         if(value[3] != undefined && value[3] == 'eval')  {
           $('.popup-body form checkbox[name="' + value[1] +'"] option[value="'+ eval(value[2])+'"]').prop('checked', true);         
         } else {
           $('.popup-body form checkbox[name="' + value[1] +'"] option[value="'+ value[2] +'"]').prop('checked', true);         
         }
       }
       
       if(value[0] == 'span')  {
         if(value[3] != undefined && value[3] == 'eval')  {
           $('.popup-body form ' + value[1]).text( eval(value[2]) );
         } else {
           $('.popup-body form ' + value[1]).text( value[2] );
         }
       }
       
     });

  if(successFunc !== undefined) {
    successFunc(json);
  }
}

var getPosFromHash = function(){
    var pos, hashString;
    var vars = [], hash;
    pos = location.href.indexOf("#");
    if (pos != -1) {
        hashString = location.href.substr(pos + 1);
        var hashes = hashString.split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = unescape(hash[1]);
        }            
    }
    return vars;
};

$(function() {
    $('#share-this').hide();
    $("#query").DefaultValue("Search...");
    if ($("#budgetPopup").length > 0) {
        $("#budgetPopup").dialog({
            title: "Earning & Budget",
            autoOpen: false,
            height: 280,
            width: 370,
            position: ['center',60],
            modal: true
        });
        $("#welcome .budget").click(function(){
            $("#budgetPopup").dialog("open");
        });
    }

    newHash = getPosFromHash();
    if (newHash['userid'] && newHash['userid'] != -1) {
        setTimeout(function(){
            showUserInfo(newHash['userid']);
        },2000);
    }
    
});

/* get analytics info for this page */
$(function() {
    $.analytics = $('#analytics');
    if($.analytics) {
        var jobid=$.analytics.attr('data');
        $.ajax({
            url: 'visitQuery.php?jobid='+jobid,
            dataType: 'json',
            success: function(json) {
                if(parseInt(json.visits)+parseInt(json.views) == 0)
                {
                    $.analytics.hide();
                    return;
                }
                var p = $('<p>').html('Page views');
                p.append($('<span>').html(' Unique: ' + json.visits))
                p.append($('<span>').html(' Total: ' + json.views));
                $.analytics.append(p);
            },
        });
    }
});


// function to bind hide and show events for the active only divs 
// bind to the showing and hiding of project and user lists
$(function() {

    if ($('#userCombo').length !== 0) {
        createActiveFilter('#userCombo', 'users', 1);
    }
    $('#search-filter-wrap select[name=status]').comboBox();

    // add fading effect to the status combobox selected item shown as the list caption
    if ($('#container-statusCombo > .fading').length == 0) {
        $('#container-statusCombo').append('<div class="fading"></div>');
    }
      
});

function sendInviteForm(){
  var name = $('input[name="invite"]', $("#invite-people")).val();
  var job_id = $('input[name="worklist_id"]').val();
  $.ajax({
    type: "POST",
    url: "workitem.php?job_id="+job_id,
    data: "json=y&invite="+name+"&invite-people=Invite",
    dataType: "json",
    success: function(json) {
        if(json['sent'] =='yes'){
            $("#sent-notify").html("<span>invite sent to <strong>"+name+"</strong></span>");
            $('input[name="invite"]').val('');
            $('#invite-people').dialog('close');
        }else{
            $("#sent-notify").html("<span>The user you entered does not exist</span>");
        }
        $("#sent-notify").dialog("open");
    },
    error: function(xhdr, status, err) {
      $("#sent-notify").html("<span>Error sending invitation</span>");
    }
  });
  return false;
}
function applyPopupBehavior() {
    $(function() {
        $('#addaccordion').fileUpload({tracker: $('input[name=files]')});
    });
    $('a.attachment').unbind('click');    
    $('a.attachment').live('click', function(e) {
        var dialogUrl = $(this).attr('href');
        var verified = false;
        e.preventDefault();
        if (dialogUrl == 'javascript:;') {
            $.ajax({
                type: 'post',
                url: 'jsonserver.php',
                data: {
                    fileid: $(this).data('fileid'),
                    action: 'getVerificationStatus'
                },
                dataType: 'json',
                success: function(data) {
                    if (data.success && data.data.status == 1) {
                        dialogUrl = data.data.url;
                        verified = true;
                    } else if(data.success && data.data.status == 0) {
                        alert('This file is awaiting verification, please try again after sometime.');
                    } else {
                        alert('Error while trying to fetch file.');
                    }
                }
        
                
            });   
            if (verified == false) {
                return false;
            }
        }
        if ($('#dialogImage').length == 0) {
            $('<img id="dialogImage" src="'+dialogUrl+'" title="Preview">').dialog({
                    modal: true,
                    hide: 'drop', 
                    resizable: false,
                    width: 'auto',
                    height: 'auto',                
                    open:function(evt){
                        $(this).parent().css('opacity','0');
                        storeCursorStatus = new Array();
                        
                        $(evt.target).load(function() {
                                var image = $(this);
                                // get image size
                                var origWidt = parseInt(image.naturalWidth);  
                                var origHeig = parseInt(image.naturalHeight);
                                if (!origWidt || !origHeig) {
                                    var origWidt = parseInt(image.width());
                                    var origHeig = parseInt(image.height()); 
                                }
                                var padding = 20;
                                var imageMargin = 12;
                                ratio = Math.min(($(window).width()-(imageMargin+padding)*2) / origWidt,
                                                ($(window).height()-(imageMargin+padding)*2) / origHeig);
                                var zoom = '';
                                if (ratio < 1) {
                                    image.css({'width':origWidt*ratio,'height':origHeig*ratio});
                                }
                                var dialog = image.parent();
                                var top = ($(window).height() - image.height())/2 - imageMargin + $(window).scrollTop();
                                var left = ($(window).width() - image.width())/2 - imageMargin;
                                dialog.css({
                                    'top': top,
                                    'left': left 
                                });
                                if (ratio < 1) {
                                    zoom='('+Math.round(ratio*100)+'%)';
                                    image.prev('div').append(
                                    '<span class="dialogZoom" style="margin-left:10px;">'+zoom+'</span>');
                                    }
                                if (ratio!='Infinity') {
                                    image.css({'margin':imageMargin+'px','padding':'0','border':'1px solid #ccc'});
                                    if ($.browser.msie) {
                                        image.css({'border':'2px solid #000'});
                                    } else if ($.browser.mozilla) {
                                        image.css({'-moz-box-shadow':'rgba(169, 169, 169, 0.5) 3px 3px 3px'});
                                    } else {
                                        image.css({'-webkit-box-shadow':'rgba(169, 169, 169, 0.5) 3px 3px 3px'});
                                    }
                                    image.parent().hide();
                                    image.parent().css('opacity', '1').fadeIn();
                                }
                        });
                    },
                    resizeStart : function(){
                        $(this).parent().find('.dialogZoom').html(''); 
                    },               // hide srink percentage on resize
                    dragStop : function(evt){
                        var dialog = $(evt.target);                                     // check if not out of screen
                    },
                    close: function(event, ui) {
                        $(this).dialog('destroy').remove();
                    } 
                }); 
            }
        return false;
    });
    
    $('a.docs').live('click', function() {
        //alert($(this).data('fileid'));
        $.ajax({
            type: 'post',
            url: 'jsonserver.php',
            data: {
                fileid: $(this).data('fileid'),
                action: 'getVerificationStatus'
            },
            dataType: 'json',
            success: function(data) {
                //alert(data.data.status + data.data.url);
                if (data.success && data.data.status == 1) {
                    window.open(data.data.url);
                } else {
                    alert('This file is awaiting verification, please try again after sometime.');
                }
            }
        });
        return false;
    });
}

function makeWorkitemTooltip(className){

    $(className).tooltip({
        delay: 0,
        extraClass: "content",
        showURL: false,
        bodyHandler: function() {
        var msg = "Test";
        var worklist_id = $(this).attr('id').substr(9);
        $.ajax({
            type: "POST",
            async: false,
            url: 'getworkitem.php',
            data: {'item' : worklist_id},
            dataType: 'json',
            bgcolor:"#ffffff",
            success: function(json) {
                msg = json.summary ? '<div class = "head">' + json.summary + '</div>' : '';
                msg += json.notes ? '<div class = "tip-entry no-border">' + json.notes + '</div>' : '';
                msg += json.project ? '<div class = "tip-entry">Project: ' + json.project + '</div>' : '';
                if (json.runner) {
                    msg += '<div class = "tip-entry">Runner: ' + json.runner + '</div>';
                } else if (json.creator) {
                    msg += '<div class = "tip-entry">Creator: ' + json.creator + '</div>';
                }
                msg += json.job_status ? '<div class = "tip-entry">Status: ' + json.job_status + '</div>' : '';
                if (json.comment) {
                    msg += '<div class = "tip-entry">Last Comment by ' + json.commentAuthor + ': ' + json.comment + '</div>';
                } else {
                    msg += '<div class = "tip-entry">No comments yet.</div>';
                }
                if (msg == '') {
                    msg = 'No data available';
                }
            },
            error: function(xhdr, status, err) {
                msg = 'Data loading error.<br />Please try again.';
            }
        });

        return $('<div>').html(msg);
    }
    });
}

// function to add an inline message above the job listing
// call with the html you want in the inline message
function addInlineMessage(html) {
    $('#inlineMessage').append(html);
    $('#inlineMessage').show();
}


$(function() {
    runDisableable();
});

function runDisableable() {
    $(".disableable").click(function() {
        $(this).click(function() {
            $(this).attr('disabled', 'disabled');
        });
        return true;
    });
}

function createActiveFilter(elId, filter, active) {
    var el = $(elId);

    if (el.data('filterCreated') !== 'true') {
        el.data('filterCreated', 'true');
        el.bind({
            'beforeshow newlist': function(e, o) {
                
                // check if the div for the active only button has already been created
                // create it if it hasn't
                var cbId = $(this).attr('id');
                if ($('#activeBox-' + cbId).length == 0) {
                    $(this).data('filterName', '.worklist');
                    $(this).data('activeFlag', active);
                    var div = $('<div/>').attr('id', 'activeBox-' + cbId);
    
                    div.attr('class', 'activeBox');
                    // now we add a function which gets called on click
                    div.click(function(e) {
                        e.stopPropagation();
                        // we hide the list and remove the active state
                        el.data('activeFlag', 1 - el.data('activeFlag'));
                        o.list.hide();
                        $('#activeBox-' + cbId).attr('checked', (el.data('activeFlag') == 1 ? true : false));
                        $('#activeBox-' + cbId).hide();
                        o.container.removeClass('ui-state-active');
                        // we send an ajax request to get the updated list
                        $.ajax({
                            type: 'POST',
                            url: 'refresh-filter.php',
                            data: {
                                name: el.data('filterName'),
                                active: el.data('activeFlag'),
                                filter: filter
                            },
                            dataType: 'json',
                            // on success we update the list
                            success: $.proxy(o.setupNewList, o)
                        });
                    });                    
                    $(this).next().append(div);
                }
                
                // set up the label and checkbox to be placed in the div
                var label = $('<label/>').css('color', '#ffffff').attr('for', 'onlyActive-'+ cbId);
                var checkbox = $('<input/>').attr({
                    type: 'checkbox',
                    id: 'onlyActive-' + cbId,
                    class: 'onlyActiveCheckbox'
                });
    
                // update the checkbox
                if (el.data('activeFlag')) {
                    checkbox.prop('checked', true);
                } else {
                    checkbox.prop('checked', false);
                }
                
                // put the label + checkbox into the div
                label.text(' Active only');
                label.prepend(checkbox);
                $('#activeBox-' + cbId).html(label);
                
                // add fading effect to the selected item shown as the list caption
                if ($('#container-' + cbId + ' > .fading').length == 0) {
                    $('#container-' + cbId).append('<div class="fading"></div>');
                }
            }
        }).comboBox();

        el.bind({
            'listOpen': function(e,o) {
                var cbId = $(this).attr('id');
                var cbName = $(this).attr('name');
                $('#activeBox-' + cbId).css({
                    top: ($('#activeBox-' + cbId).prev().position().top + $('#activeBox-' + cbId).prev().outerHeight()),
                    left: $('#activeBox-' + cbId).prev().css('left'),
                    width: $('#activeBox-' + cbId).prev().outerWidth()
                });
                $('#activeBox-' + cbId).show();
            } 
        });
        el.bind({
            'listClose': function(e,o) {
                var cbId = $(this).attr('id');
                $('#activeBox-' + cbId).hide();
            }
        });
    }
}

