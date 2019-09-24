Ext.define( 'Profile.editor.window', {
    extend:'Ext.window.Window',  initComponent:function ()
    {
        var me = this;
        Ext.apply( me, {
                title: 'Редактирование анкеты',
                width: 800,
                autoHeight: true,
                bodyPadding: 10,
                defaults: {
                    labelWidth: 100
                },
            items:[
                {
                    xtype: 'form',
                    border:0,
                    trackResetOnLoad: true,

                    items: [
                        {
                            xtype: 'textfield',
                            name: 'nameProfile',
                            fieldLabel: 'Название анкеты:',
                            emptyText: 'Введите название',
                            allowBlank: false,
                            width: 750
                        },
                        {
                            xtype: 'textareafield',
                            name: 'description',
                            fieldLabel: 'Описание:',
                            height: 200,
                            width: 750
                        },

                        {
                            buttonAlign: 'right',
                            buttons: [{
                                xtype: 'button',
                                text: 'Изменить',
                                height: 30,
                                renderTo: Ext.getBody(),
                                handler: function () {
                                    var nameProfile = Ext.ComponentQuery.query('textfield[name=nameProfile]')[0].getValue();
                                    var description = Ext.ComponentQuery.query('textfield[name=description]')[0].getValue();
                                    if (nameProfile !== "") {
                                        Ext.Ajax.request({
                                                url: saveProfile,
                                                dataType: 'json',
                                                method: 'POST',
                                                headers: {
                                                    "X-CSRF-TOKEN": token
                                                },
                                                params: {
                                                    idProfile: me.rec.data.idProfile,
                                                    nameProfile: nameProfile,
                                                    description: description,
                                                    idgroupOfProfiles: me.groupOfProfiles.idgroupOfProfiles
                                                },
                                                success: function (response, options) {
                                                    Ext.Msg.alert('Status', 'Анкета была упешно изменена');
                                                    Profiles.ListProfileLoad(me.groupOfProfiles);
                                                    me.close();

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
                        }]
                }]
        } );
        me.callParent();
        if( me.rec !== undefined )
        {
            me.down( 'form' ).loadRecord( me.rec );
        }
    }
} );