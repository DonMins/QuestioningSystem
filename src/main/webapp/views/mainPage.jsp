<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="th" uri="http://www.springframework.org/tags/form" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<%@page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>title</title>
    <script src="http://localhost:8080/extjs/ext-all.js" type="text/javascript"></script>
    <link href="http://localhost:8080/extjs/resources/css/ext-all.css" rel="stylesheet">
    <script type="text/javascript" src="${contextPath}/resources/js/app.js"></script>

    <meta id="_csrf_token" value="${_csrf.token}"/>

    <script>
        var urlJSON = "${contextPath}/groupProfileGet";
    </script>

</head>
<body>
<ul>
<%--    <button style="float:right" class="button" onclick="document.forms['logoutForm'].submit()">Выйти    </button>--%>

    <c:if test="${pageContext.request.userPrincipal.name != null}">
    <form id="logoutForm" method="POST" action="${contextPath}/logout">
        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
    </form>
<%--    <p class="userInput" align="right"> Вы вошли как: ${pageContext.request.userPrincipal.name}</p>--%>

    </c:if>
   <h1> <span id = test> </span>  </h1>

<%--    <c:if test="${GroupOfProfile.size()!=0}">--%>
<%--          <c:forEach items="${GroupOfProfile}" var="item" varStatus="status">--%>
<%--            <tr>--%>
<%--            <h2> <a href="${contextPath}/profile/${item.key}">${item.value}</a></h2>--%>
<%--        </tr>--%>
<%--        </c:forEach>--%>
<%--    </c:if>--%>
<%--    <c:if test="${GroupOfProfile.size()==0}">--%>
<%--        <h1>Список групп анкет пустой! </h1>--%>
<%--    </c:if>--%>




</ul>
</body>
</html>