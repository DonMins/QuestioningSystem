Ext.onReady(function () {

    var ustore = Ext.create('Ext.data.TreeStore', {
        model: 'GroupOfProfiles',
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: urlJSON,
            reader: {
                type: 'json',
                root: 'GroupOfProfiles'
            }
        }
    });

    // var west=Ext.create('Ext.Panel', {
    //     title: 'Правая панель',
    //     width: 150,
    //     region: 'west',
    //     split: true,
    //     collapsible: true,
    //     xtype:'treepanel',
    //     autoScroll:true,
    //     id:'menuArea',
    //     renderTo: Ext.getBody(),
    //     store: ustore,
    //     // floatable: false,
    // });


    var west = Ext.create('Ext.tree.Panel', {
        title: 'Simple Tree',
        region: 'west',
        width: 200,
        height: '100%',
        split: true,
        displayField: 'title',
        collapsible: true,
        store: ustore,
        rootVisible: false,
        renderTo: Ext.getBody()
    });


    var viewport = Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [west,
            {
                title: 'Контейнер Viewport',
                region: 'north',
                items: [
                    {
                        xtype: 'text',
                        cls: 'text-bold text-14px',
                        //padding:'5px 0',
                        width: '100%',
                        text: 'Вы вошли как : <c:out value="${pageContext.request.userPrincipal.name}"/>'
                    }

                ]
            },
            {
                xtype: 'panel',
                region: 'center',
                title: 'Центральная панель',
                dataIndex: 'title'
            }]
    });


});