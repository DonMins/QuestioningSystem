<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="th" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="с" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<%@page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>title</title>
    <%--    <script src="http://localhost:8080/extjs/ext-all.js" type="text/javascript"></script>--%>
    <%--    <link href="http://localhost:8080/extjs/resources/css/ext-all.css" rel="stylesheet" type="text/css">--%>

    <script src="${contextPath}/resources/extjs/ext-all.js" type="text/javascript"></script>
    <link href="${contextPath}/resources/extjs/resources/css/ext-all.css" rel="stylesheet" type="text/css">
    <link href="${contextPath}/resources/css/main.css" rel="stylesheet" type="text/css">

    <script type="text/javascript" src="${contextPath}/resources/js/model.js"></script>
    <script type="text/javascript" src="${contextPath}/resources/js/groupOfProfile.js"></script>
    <script type="text/javascript" src="${contextPath}/resources/js/profile.js"></script>
    <script type="text/javascript" src="${contextPath}/resources/js/editForm.js"></script>
    <script type="text/javascript" src="${contextPath}/resources/js/question.js"></script>

    <title>ТЕСТОВАЯ СТРАНИЦА</title>
    <meta id="_csrf_token" value="${_csrf.token}"/>

    <script>
        var token="${_csrf.token}";

        var urlJSONGroupProfile = "${contextPath}/groupProfileGet";
        var urlJSONProfile = "${contextPath}/profileGet";
        var urlJSONQuestionAndAnswer = "${contextPath}/questionGet";
        var urlJSONQuestion = "${contextPath}/urlJSONQuestion";

        var saveGroupProfile = "${contextPath}/saveGroupProfile";
        var deleteGroupProfile = "${contextPath}/deleteGroupProfile";
        var deleteProfile = "${contextPath}/deleteProfile";
        var saveProfile = "${contextPath}/saveProfile";
        var editProfile = "${contextPath}/editProfile";





        <%--var nameUser = "${pageContext.request.userPrincipal.name}";--%>
        Ext.onReady(function () {

            var menuStore = Ext.create('Ext.data.TreeStore', {
                root: {
                    expanded: true,
                    children: [
                                {text: "Группа анкет", leaf: true,id: 'groupOfProfile'},
                                // {text: "Создать группу анкет",  leaf: true,id: 'createGroupProfile'},

                    ]
                }
            });

            viewport = Ext.create('Ext.container.Viewport', {
                renderTo: Ext.getBody(),
                layout: 'border',
                items: [
                    {
                        title: 'Анкетник',
                        region: 'north',
                        collapsible: true,

                        items: [
                            {
                                xtype: 'text',
                                cls: 'styleNameUser',
                                collapsible: true,
                                width: '100%',
                                height: 30,
                                text: 'Вы вошли как : <c:out value="${pageContext.request.userPrincipal.name}"/>'
                            },
                            {
                                xtype:'button',
                                cls:'button',
                                text:'Выход',
                                handler:function ()
                                {
                                    document.forms['logoutForm'].submit()
                                }
                            }

                        ]
                    },
                    {
                        xtype: 'panel',
                        region: 'center',
                        layout:'fit',
                        title: 'Рабочая область',
                        id:'globalWorkArea'
                    },

                    {
                        title: 'Левая панель',
                        width: 150,
                        region: 'west',
                        split: true,
                        collapsible: true,
                        xtype: 'treepanel',
                        rootVisible: false,
                        autoScroll: true,
                        store: menuStore,
                        listeners:{
                            itemclick:function ( s, r ) {
                                switch( r.data.id ) {
                                    case 'groupOfProfile': {
                                        GroupOfProfiles.groupOfProfileLoad();
                                        break;
                                    }
                                    // case 'createGroupProfile': {
                                    //     createGroupProfile();
                                    //     break;
                                    // }
                                }
                            }

                        }
                    }


                ]
            });
        });

        function renderToWorkArea( cmp )
        {
            var workArea = Ext.getCmp( 'globalWorkArea' );
            workArea.removeAll();
            workArea.add( cmp );
        }

        function addToWorkArea( cmp )
        {
            var workArea = Ext.getCmp( 'globalWorkArea' );
            workArea.add( cmp );
        }

    </script>

</head>
<body>
<ul>
    <c:if test="${pageContext.request.userPrincipal.name != null}">
            <form id="logoutForm" method="POST" action="${contextPath}/logout">
                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
            </form>
    </c:if>
        <h1> <span id = test2> </span>  </h1>

</ul>
</body>
</html>