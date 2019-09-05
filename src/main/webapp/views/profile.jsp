<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="th" uri="http://www.springframework.org/tags/form" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<%@page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>

    <title>Анкета</title>
    <meta id="_csrf_token" value="${_csrf.token}"/>

    <script src="http://code.jquery.com/jquery-2.2.4.js"
            type="text/javascript"></script>
    <script src="${contextPath}/resources/js/app-ajax.js" type="text/javascript"></script>
    <script>
        var urlJSON = "${contextPath}/profileGet";
    </script>

</head>
<body >
<h1 align="center"> <span id = nameProfile> </span>  </h1>
<h2 align="center"> <span id = description> </span>  </h2>



</body>
</html>
