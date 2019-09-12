Ext.onReady(function() {

    Ext.Ajax.request({
        url: urlJSON,
        dataType: 'json',

        success: function (response, options) {
            // var o = Ext.decode(response.responseText);
            document.getElementById("test2").textContent = response.responseText;

        },
        failure: function (response, options) {
            alert("Ошибка: " + response.statusText);
        }
    });
});