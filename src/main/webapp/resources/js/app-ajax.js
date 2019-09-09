$(document).ready(function() {
    $.ajax({
        url: urlJSON,
        dataType: 'json',
        headers: {
            "X-CSRF-TOKEN": $('#_csrf_token').attr('value')
        },

        success: function (json) {

            document.getElementById("nameProfile").textContent = json["ProfileData"][0]["nameProfile"];
            document.getElementById("description").textContent = json["ProfileData"][0]["description"];

            const goodsWrapper= document.querySelector('.goods');
            for(var i=0 ; i<json["QuestionList"].length;++i) {
                const card = document.createElement('div');
                var tmp = json["QuestionList"][i]["nameQuestion"];
                card.innerHTML = `
        
                <div>
                 <h3 align="center">${tmp}</h3>
                </div>
        `;
                goodsWrapper.appendChild(card);// вывод карты на страницу
            }


        },
        error: function (jqXHR) {
            alert("Что-то пошло не так");
        }
    });

});