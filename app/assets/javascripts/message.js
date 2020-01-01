$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message-items">
        <div class="message-items__first-talk">
          <div class="message-items__first-talk--name">
            ${message.user_name}
          </div>
          <div class="message-items__first-talk--date">
            ${message.created_at}
          </div>
        </div>
        <div class="message-items__second-talk">
          <p>
            ${message.content}
          </p>
        </div>
        <img src=${message.image} >
      </div>`
     return html;
   } else {
            var html =
            `<div class="message-items__first-talk">
                  <div class="message-items__first-talk--name">
                    ${message.user_name}
                  </div>
                  <div class="message-items__first-talk--date">
                    ${message.created_at}
                  </div>
                </div>
                <div class="message-items__second-talk">
                  <p>
                    ${message.content}
                  </p>
                </div>
              </div>`
                return html;
          };
  }
  $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
    .done(function(data){
      var html = buildHTML(data);
      $('.message-items').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.message-items')[0].scrollHeight});
      $('form')[0].reset();
    })

    .always(function(){
      $('.form__submit').prop('disabled', false);
    })

    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })

  var buildHTML = function(message) {
    if (message.content && message.image) {
      //data-idが反映されるようにしている
      var html =
      `<div class="chat-view" data-message-id=` + message.id + `>` +
        `<div class="message-items">` +
          `<div class="message-items__first-talk">` +
            `<div class="message-items__first-talk--name">` +
              message.user_name +
            `</div>` +
            `<div class="message-items__first-talk--date">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="message-items__second-talk">` +
            `<p>` +
              message.content +
            `</p>` +
            `<img src="` + message.image + `">` +
          `</div>` +
        `</div>` +
      `</div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = 
      `<div class="chat-view" data-message-id=` + message.id + `>` +
        `<div class="message-items">` +
          `<div class="message-items__first-talk">` +
            `<div class="message-items__first-talk--name">` +
              message.user_name +
            `</div>` +
            `<div class="message-items__first-talk--date">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="message-items__second-talk">` +
            `<p>` +
              message.content +
            `</p>` +
          `</div>` +
        `</div>` +
      `</div>`
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      var html = 
      `<div class="chat-view" data-message-id=` + message.id + `>` +
        `<div class="message-items">` +
          `<div class="message-items__first-talk">` +
            `<div class="message-items__first-talk--name">` +
              message.user_name +
            `</div>` +
            `<div class="message-items__first-talk--date">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="message-items__second-talk">` +
            `<img src="` + message.image + `">` +
          `</div>` +
        `</div>` +
      `</div>`
    };
    return html;
  };

  var reloadMessages = function(){
    last_message_id = $('.chat-view:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.message-items').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.message-items')[0].scrollHeight});
        $("form")[0].reset();
        $(".form__submit").prop("disabled", false);
      }
      })
      .fail(function() {
        console.log('error');
      });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
  //テスト
});

