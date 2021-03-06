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
    <title>Главная страница</title>
    <%--    <script src="http://localhost:8080/extjs/ext-all.js" type="text/javascript"></script>--%>
    <%--    <link href="http://localhost:8080/extjs/resources/css/ext-all.css" rel="stylesheet" type="text/css">--%>

    <script src="${contextPath}/resources/extjs/ext-all.js" type="text/javascript"></script>
    <link href="${contextPath}/resources/extjs/resources/css/ext-all.css" rel="stylesheet" type="text/css">
    <link href="${contextPath}/resources/css/main.css" rel="stylesheet" type="text/css">

    <script type="text/javascript" src="${contextPath}/resources/js/model.js"></script>
    <script type="text/javascript" src="${contextPath}/resources/js/constructor/groupOfProfile.js"></script>
    <script type="text/javascript" src="${contextPath}/resources/js/constructor/profile.js"></script>
    <script type="text/javascript" src="${contextPath}/resources/js/constructor/editForm.js"></script>
    <script type="text/javascript" src="${contextPath}/resources/js/constructor/question.js"></script>
    <script type="text/javascript" src="${contextPath}/resources/js/constructor/answer.js"></script>
    <script type="text/javascript" src="${contextPath}/resources/js/passSurvey/loadQuestionary.js"></script>
    <script type="text/javascript" src="${contextPath}/resources/js/properties.js.jsp"></script>
    <script type="text/javascript" src="${contextPath}/resources/js/stores.js"></script>


    <meta id="_csrf_token" value="${_csrf.token}"/>

    <script>
     Ext.onReady(function () {

            var menuStore = Ext.create('Ext.data.TreeStore', {
                root: {
                    expanded: true,
                    children: [
                                {text: "Конструктор анкет", leaf: true,id: 'groupOfProfile'},
                                {text: "Пройти анкетирование",  leaf: true,id: 'passSurvey'},

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
                                xtype: 'image',
                                src: '${contextPath}/resources/css/logo.png',
                                height: 50,
                                style: 'margin-left: 10px',
                            },
                            {
                                xtype: 'text',
                                cls: 'styleNameUser',
                                collapsible: true,
                                width: 200,
                                height: 30,
                                text: 'Вы вошли как | <c:out value="${pageContext.request.userPrincipal.name}"/>'
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
                                    case 'passSurvey': {
                                        GroupOfProfiles.passSurveyGroupProfileLoad();
                                        break;
                                    }
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