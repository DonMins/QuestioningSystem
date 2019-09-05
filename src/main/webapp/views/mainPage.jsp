<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="th" uri="http://www.springframework.org/tags/form" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<%@page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>title</title>
</head>
<body>
<h1>Добро пожаловать! </h1>
<ul>
    <button style="float:right" class="button" type="submit" onclick="document.forms['logoutForm'].submit()">Выйти
    </button>

    <c:if test="${pageContext.request.userPrincipal.name != null}">
    <form id="logoutForm" method="POST" action="${contextPath}/logout">
        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
    </form>
    <p class="userInput" align="right"> Вы вошли как: ${pageContext.request.userPrincipal.name}
        </c:if>
        <c:forEach items="${index}" var="item" varStatus="status">
        <tr>
            <h2> <a href="${contextPath}/profile/${item.key}">${item.value}</a></h2>
        </tr>
        </c:forEach>


</ul>
</body>
</html>