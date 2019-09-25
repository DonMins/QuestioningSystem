Ext.onReady(function () {
    var winCreateQuestion;
    var winEditQuestion;
    var typeStory = [
        ['Один вариант ответа'],
        ['Много вариантов ответа'],
        ['свободный']
    ];
    createQuestion = function (data) {

        if (!winCreateQuestion || winCreateQuestion.isVisible() === false) {
            winCreateQuestion = Ext.create('widget.window', {
                title: 'Добавление вопроса',
                width: 800,
                autoHeight: true,
                bodyPadding: 10,
                defaults: {
                    labelWidth: 100
                },

                items: [
                    {
                        xtype: 'textfield',
                        name: 'nameQuestion',
                        fieldLabel: 'Название вопроса:',
                        emptyText: 'Введите название',
                        allowBlank: false,
                        width:750
                    },
                    {
                        xtype: 'combobox',
                        name: 'type',
                        width:750,
                        fieldLabel: 'Тип:',
                        forceSelection: true,
                        emptyText: 'Выберите тип вопроса',
                        store: new Ext.data.SimpleStore({

                            fields:
                                [
                                 'type'
                                ],
                            data:typeStory
                        }),
                        valueField:'type',
                        displayField:'type',
                        queryMode:'local'
                    },

                    {
                        buttonAlign: 'right',
                        buttons: [{
                            xtype: 'button',
                            text: 'Сохранить',
                            height: 30,
                            renderTo: Ext.getBody(),
                            handler: function () {
                                saveAndEditQuestion('nameQuestion','type',data)
                            }
                        }]
                    }],

            });
        }
        if (winCreateQuestion.isVisible()) {
            winCreateQuestion.close();
        } else {
            winCreateQuestion.show();
        }
    };



    Question.ListQuestionLoad = function (data) {
        var storeQuestion = Ext.create('Ext.data.Store', {
            model: 'Question.model',
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: urlJSONQuestion,
                reader: {
                    type: 'json',
                    root: 'Question'
                }
            }
        });

        var panel = Ext.create('Ext.Panel', {
            title: 'Список вопросов в анкете "'+ data.nameProfile +'"',
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
                             Profiles.ListProfileLoad(data.groupOfProfiles);
                        },
                    },
                    {
                        xtype: 'button',
                        text: 'Добавить вопрос',
                        handler: function () {
                            createQuestion(data);
                        },
                    }
                ]
            }],

            items: [
                {
                    xtype: 'gridpanel',
                    store: storeQuestion,
                    columns: [
                        {
                            xtype: 'rownumberer'
                        },

                        {
                            dataIndex: 'nameQuestion',
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
                            if (cellIndex === 0 || cellIndex === 1) {
                                AnswerOption.ListAnswerOptionLoad(record.data);
                            }
                            if (cellIndex === 2) {

                                if (!winEditQuestion || winEditQuestion.isVisible() === false) {
                                    winEditQuestion = Ext.create( 'widget.window',{
                                        title: 'Изменение вопроса "' +record.data.nameQuestion +'"',
                                        width: 800,
                                        autoHeight: true,
                                        bodyPadding: 10,
                                        defaults: {
                                            labelWidth: 100
                                        },

                                        items: [
                                            {
                                                xtype: 'textfield',
                                                name: 'editNameQuestion',
                                                fieldLabel: 'Название вопроса',
                                                emptyText: 'Введите название',
                                                allowBlank: false,
                                                width:750
                                            },
                                            {
                                                xtype: 'combobox',
                                                name: 'editType',
                                                width:750,
                                                fieldLabel: 'Тип:',
                                                emptyText: 'Выберите тип вопроса',
                                                forceSelection: true,
                                                store: new Ext.data.SimpleStore({

                                                    fields:
                                                        [

                                                            'type'
                                                        ],
                                                    data:typeStory
                                                }),
                                                valueField:'type',
                                                displayField:'type',
                                                queryMode:'local'
                                            },

                                            {
                                                buttonAlign: 'right',
                                                buttons: [{
                                                    xtype: 'button',
                                                    text: 'Изменить',
                                                    height: 30,
                                                    renderTo: Ext.getBody(),
                                                    handler: function () {
                                                        saveAndEditQuestion('editNameQuestion','editType', data,record.data.idQuestion)
                                                    }
                                                }]
                                            }]
                                    });
                                    Ext.ComponentQuery.query('textfield[name=editNameQuestion]')[0].setValue(record.data.nameQuestion);
                                    Ext.ComponentQuery.query('textfield[name=editType]')[0].setValue(record.data.type);
                                }

                                if (winEditQuestion.isVisible()) {
                                    winEditQuestion.close();
                                } else {
                                    winEditQuestion.show();
                                }
                            }
                            if(cellIndex ===3){
                                Ext.Msg.confirm("Удалить","Вы действительно хотите удалить вопрос? ",
                                    function(btn){
                                        if (btn === "yes") {
                                            Ext.Ajax.request({
                                                    url: deleteQuestion,
                                                    dataType: 'json',
                                                    method: 'POST',
                                                    headers: {
                                                        "X-CSRF-TOKEN": token
                                                    },
                                                    params: {
                                                        idQuestion: record.data.idQuestion
                                                    },
                                                    success: function (response, options) {
                                                       Question.ListQuestionLoad(data);
                                                    },
                                                    failure: function (response, options) {
                                                        Ext.Msg.alert('Status', 'Что-то пошло не так!');
                                                    }
                                                }
                                            );
                                        }
                                    });

                            }
                        }
                    }
                }]
        });

        storeQuestion.load({params: {idProfile: data.idProfile}});
        renderToWorkArea(panel);
    };

    function saveAndEditQuestion(name, typ, data, dopParam) {
        var nameQuestion = Ext.ComponentQuery.query('textfield[name='+name+']')[0].getValue();
        var type = Ext.ComponentQuery.query('combobox[name='+typ+']')[0].getValue();

        if (nameQuestion !== "" && type!==null) {
            Ext.Ajax.request({
                    url: saveQuestion,
                    dataType: 'json',
                    method: 'POST',
                    headers: {
                        "X-CSRF-TOKEN": token
                    },
                    params: {
                        idQuestion: dopParam,
                        nameQuestion:nameQuestion,
                        type:type,
                        idProfile:data.idProfile
                    },
                    success: function (response, options) {
                        Question.ListQuestionLoad(data);
                        if(dopParam!=null){
                            winEditQuestion.close();
                        }
                        winCreateQuestion.close();
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

});