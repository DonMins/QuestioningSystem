Ext.onReady(function () {
    var showQuestionary;
    GroupOfProfiles.passSurveyGroupProfileLoad = function () {
        var storeGroupOfProfile = Ext.create('storeGroupOfProfile');

        var groupProfilePanel = Ext.create('Ext.Panel', {
            title: 'Список групп анкет',
            region: 'west',
            maxWidth: '100%',
            collapsible: true,
            maxHeight: '100%',
            split: true,
            closable: true,
            autoScroll: true,

            items: [
                {
                    xtype: 'gridpanel',
                    store: storeGroupOfProfile,
                    columns: [
                        {
                            xtype: 'rownumberer'
                        },

                        {
                            dataIndex: 'title',
                            text: '',
                            flex: 1
                        },
                    ],
                    listeners: {
                        cellclick: function (grid, td, cellIndex, record, tr, rowIndex) {
                            if (cellIndex === 0 || cellIndex === 1) {
                                passSurveyProfileLoad(record.data);
                            }
                        }
                    }
                }],
        });
        renderToWorkArea(groupProfilePanel);
    };

    passSurveyProfileLoad = function (groupOfProfiles) {
        var storeProfile = Ext.create('storeProfile');

        var profilePanel = Ext.create('Ext.Panel', {
            title: 'Список анкет в группе: "' + groupOfProfiles.title + '"',
            region: 'center',
            maxWidth: '100%',
            collapsible: true,
            maxHeight: '100%',
            split: false,
            closable: true,

            items: [
                {
                    xtype: 'gridpanel',
                    store: storeProfile,
                    columns: [
                        {
                            xtype: 'rownumberer'
                        },

                        {
                            dataIndex: 'nameProfile',
                            text: '',
                            flex: 1,

                        },
                    ],
                    plugins: [
                        {
                            ptype: 'rowexpander',
                            rowBodyTpl: new Ext.XTemplate(
                                '<div><b>Описание:</b>{description}</div>'
                            )
                        }

                    ],
                    listeners: {
                        cellclick: function (grid, td, cellIndex, record, tr, rowIndex) {
                            if (cellIndex === 2) {
                                var countQuestion = record.data.questionList.length;
                                console.log(countQuestion);

                                var addRow = [];
                                addRow.push({
                                    xtype: 'textfield',
                                    name: 'nameProfile',
                                    width: '100%',
                                    height: 50,
                                    inputWrapCls: 'textboxasLabel',
                                    fieldCls: 'textboxasLabel',
                                    readOnly: true,

                             });
                                addRow.push(     {
                                    xtype: 'textareafield',
                                    name: 'description',
                                    width: '100%',
                                    height: 40,
                                    inputWrapCls: 'description',
                                    fieldCls: 'description',
                                    readOnly: true,
                                    autoScroll: false,
                                });


                                for(let i = 0;i<countQuestion;i++) {
                                    addRow.push({
                                        xtype: 'fieldcontainer',
                                        fieldLabel: record.data.questionList[i].nameQuestion,
                                        labelWidth:1000,
                                        labelStyle: 'font-weight: bold; font-size: 20px;margin-top:3%; margin-left:50%',
                                        layout:'fit',

                                    });

                                    var countAnswer = record.data.questionList[i].answerOptions.length;
                                    var answerList = [];
                                     for(let j=0; j<countAnswer;j++) {
                                         answerList.push({
                                             boxLabel: record.data.questionList[i].answerOptions[j].nameAnswerOptions,
                                             name: 'radio'+i,
                                             inputValue: j,
                                             style: 'font-size: 14px;margin-top: 20px; margin-left:33%;',
                                         })
                                    }

                                    addRow.push({
                                        xtype: 'radiogroup',
                                        columns: 1,
                                        vertical: true,
                                        items: answerList,
                                    });
                                }
                                addRow.push({
                                    xtype: 'button',
                                    text : 'Сохранить',
                                    style: 'font-size: 14px;margin-top: 20px; margin-left:50%;',
                                    height: 40,
                                    width: 80,
                                    listeners: {
                                        click: function() {
                                           this.setText('I was clicked!');
                                           form.down('radiogroup').reset();
                                        }
                                    }

                                });
                                var panel = Ext.create('panel',
                                    {record: record , countQuestion: countQuestion, rows:addRow});

                                renderToWorkArea(panel);
                            }

                        }
                    }
                }]
        });

        storeProfile.load({params: {idgroupOfProfiles: groupOfProfiles.idgroupOfProfiles}});
        renderToWorkArea(profilePanel);
    };




    Ext.define('panel', {
        extend: 'Ext.Panel', initComponent: function () {
            var me = this;
            Ext.apply(me, {
                title: me.record.nameProfile,
                region: 'center',
                maxWidth: '100%',
                collapsible: true,
                maxHeight: '100%',
                split: false,
                closable: true,
                id:'panelProfile',
                bodyStyle: {
                    'background': '#e0e9f6; !important'
                },
                layout:'fit',

                items: [
                    {
                        xtype: 'form',
                        trackResetOnLoad: true,
                        border:0,
                        id:'add1',
                        bodyStyle: {
                            'background': '#e0e9f6; !important'
                        },
                        autoScroll:true,
                        items:me.rows
                    }
                    ]
            });
            me.callParent();
            if (me.record !== undefined) {
                me.down('form').loadRecord(me.record);
            }

            // Ext.ComponentQuery.query('textfield[name=nameProfile]')[0].setValue(me.record.data.nameProfile);
        }
    });

});