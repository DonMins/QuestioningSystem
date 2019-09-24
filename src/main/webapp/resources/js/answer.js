Ext.onReady(function () {
    var winCreateAnswer;
    var winEditAnswer;
    createAnswer = function (data) {

        if (!winCreateAnswer || winCreateAnswer.isVisible() === false) {
            winCreateAnswer = Ext.create('widget.window', {
                title: 'Добавление варианта ответа к вопросу "' +data.nameQuestion +'"',
                width: 800,
                autoHeight: true,
                bodyPadding: 10,
                defaults: {
                    labelWidth: 100
                },

                items: [
                    {
                        xtype: 'textfield',
                        name: 'nameAnswerOptions',
                        fieldLabel: 'Вариант ответа',
                        emptyText: 'Введите ответ',
                        allowBlank: false,
                        width:750
                    },

                    {
                        buttonAlign: 'right',
                        buttons: [{
                            xtype: 'button',
                            text: 'Сохранить',
                            height: 30,
                            renderTo: Ext.getBody(),
                            handler: function () {

                                var nameAnswerOptions = Ext.ComponentQuery.query('textfield[name=nameAnswerOptions]')[0].getValue();
                                console.log(data);
                                if (nameAnswerOptions !== "") {
                                    Ext.Ajax.request({
                                            url: saveAnswer,
                                            dataType: 'json',
                                            method: 'POST',
                                            headers: {
                                                "X-CSRF-TOKEN": token
                                            },
                                            params: {
                                                nameAnswerOptions:nameAnswerOptions,
                                                idQuestion:data.idQuestion
                                            },
                                            success: function (response, options) {
                                               AnswerOption.ListAnswerOptionLoad(data);
                                                winCreateAnswer.close();
                                            },
                                            failure: function (response, options) {
                                                Ext.Msg.alert('Status', 'Что-то пошло не так!');
                                            }
                                        }
                                    );
                                } else {
                                    Ext.Msg.alert('Status', 'Заполните поле!');
                                }

                            }
                        }]
                    }],

            });
        }
        if (winCreateAnswer.isVisible()) {
            winCreateAnswer.close();
        } else {
            winCreateAnswer.show();
        }
    };

    AnswerOption.ListAnswerOptionLoad = function (data) {
        var storeAnswer = Ext.create('Ext.data.Store', {
            model: 'AnswerOption.model',
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: urlJSONAnswer,
                reader: {
                    type: 'json',
                    root: 'answeroptions'
                }
            }
        });

        var panel = Ext.create('Ext.Panel', {
            title: 'Варианты отведа на вопрос "'+ data.nameQuestion +'"',
            region: 'center',
            maxWidth: '100%',
            collapsible: true,
            maxHeight: '100%',
            split: false,
            closable: true,
            // autoScroll: true,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    { xtype: 'button',
                        text: 'Назад',
                        handler: function () {
                            Question.ListQuestionLoad(data.profile);
                        },
                    },
                    {
                        xtype: 'button',
                        text: 'Добавить вариант ответа',
                        handler: function () {
                            createAnswer(data);
                        },
                    }
                ]
            }],

            items: [
                {
                    xtype: 'gridpanel',
                    store: storeAnswer,
                    columns: [
                        {
                            xtype: 'rownumberer'
                        },

                        {
                            dataIndex: 'nameAnswerOptions',
                            text: '',
                            flex: 1,

                        },

                        {
                            width:90,
                            flex: 0,
                            align: 'center',
                            renderer: function (value, meta, record) {
                                var buttonText = 'Редактировать';
                                return '<a href="#">' + buttonText + '</a>';
                            }
                        },
                        {
                            width:70,
                            flex: 0,
                            align: 'center',
                            renderer: function(value, meta, record) {
                                var buttonText = 'Удалить';
                                return '<a href="#">'+buttonText+'</a>';
                            }
                        }

                    ],

                    listeners: {
                        cellclick: function (grid, td, cellIndex, record, tr, rowIndex) {

                            if (cellIndex === 2) {

                                if (! winEditAnswer || winEditAnswer.isVisible() === false) {
                                    winEditAnswer = Ext.create( 'widget.window',{
                                        title: 'Изменение варианта ответа на вопрос "' +data.nameQuestion +'"',
                                        width: 800,
                                        autoHeight: true,
                                        bodyPadding: 10,
                                        defaults: {
                                        labelWidth: 100
                                    },

                                    items: [
                                        {
                                            xtype: 'textfield',
                                            name: 'nameAnswerOptions',
                                            fieldLabel: 'Вариант ответа',
                                            emptyText: 'Введите ответ',
                                            allowBlank: false,
                                            width:750
                                        },

                                        {
                                            buttonAlign: 'right',
                                            buttons: [{
                                                xtype: 'button',
                                                text: 'Изменить',
                                                height: 30,
                                                renderTo: Ext.getBody(),
                                                handler: function () {}
                                            }]
                                        }]
                                    });
                                }

                                if (winEditAnswer.isVisible()) {
                                    winEditAnswer.close();
                                } else {
                                    winEditAnswer.show();
                                }
                            }
                            if(cellIndex ===3){
                                // Ext.Msg.confirm("Удалить","Вы действительно хотите удалить анкету? ",
                                //     function(btn){
                                //         if (btn === "yes") {
                                //             Ext.Ajax.request({
                                //                     url: deleteProfile,
                                //                     dataType: 'json',
                                //                     method: 'POST',
                                //                     headers: {
                                //                         "X-CSRF-TOKEN": token
                                //                     },
                                //                     params: {
                                //                         idProfile: record.data.idProfile
                                //                     },
                                //                     success: function (response, options) {
                                //                         Ext.Msg.alert('Status', 'Анкета была удалена');
                                //                         Profiles.ListProfileLoad(groupOfProfiles);
                                //                     },
                                //                     failure: function (response, options) {
                                //                         Ext.Msg.alert('Status', 'Что-то пошло не так!');
                                //                     }
                                //                 }
                                //             );
                                //         }
                                //     });

                            }
                        }
                    }
                }]
        });

        storeAnswer.load({params: {idQuestion: data.idQuestion}});
        renderToWorkArea(panel);
    };

});