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

  $('.form-area').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $(".chat-main__message-list").append(html);
      $("form")[0].reset();
      $(".chat-main__message-list").animate({ scrollTop: $(".chat-main__message-list")[0].scrollHeight });
      $(".submit-btn").prop("disabled", false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました")
      $(".submit-btn").prop("disabled", false);
    });
  });
});