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
    console.log("完了")
  })

  .always(function(){
    $('.form__submit').prop('disabled', false);
  })

  .fail(function() {
    alert("メッセージ送信に失敗しました");
  });
})
});

