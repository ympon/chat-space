$(function(){
  function buildHTML(message){
    if(message.image) {
      let html = `<div class="message-field" data-message-id=${message.id}>
                    <div class="message-title">
                      <div class="message-title__username">${message.user_name}</div>
                      <div class="message-title__date">${message.created_at}</div>
                    </div>
                    <div class="message">
                      <p class="message__content">${message.content}</p>
                      <img class="message__image" src="${message.image}"></div>
                  </div>`
      return html;
    } else {
      let html = `<div class="message-field" data-message-id=${message.id}>
                    <div class="message-title">
                      <div class="message-title__username">${message.user_name}</div>
                      <div class="message-title__date">${message.created_at}</div>
                    </div>
                    <div class="message">
                      <p class="message__content">${message.content}</p>
                    </div>
                  </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.message-field:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = "";
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $(".chat-main__message-list").append(insertHTML);
        $(".chat-main__message-list").animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});