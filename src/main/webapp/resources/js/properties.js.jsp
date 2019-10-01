<%@ page pageEncoding="UTF-8" contentType="text/javascript;charset=UTF-8" %>
    <%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt"%>
    <c:set var="contextPath" value="${pageContext.request.contextPath}"/>
    <fmt:setBundle basename="messages" var="messagesProperties"/>

var token="${_csrf.token}";
var login ="${pageContext.request.userPrincipal.name}";
var urlJSONGroupProfile = "${contextPath}/groupProfileGet";
var urlJSONProfile = "${contextPath}/profileGet";
var urlJSONQuestion = "${contextPath}/questionGet";
var urlJSONAnswer = "${contextPath}/answerGet";

var getProfleByQuestion = "${contextPath}/getProfleByQuestion";

var saveGroupProfile = "${contextPath}/saveGroupProfile";
var saveProfile = "${contextPath}/saveProfile";
var saveQuestion = "${contextPath}/saveQuestion";
var saveAnswer = "${contextPath}/saveAnswer";

var deleteGroupProfile = "${contextPath}/deleteGroupProfile";
var deleteProfile = "${contextPath}/deleteProfile";
var deleteQuestion = "${contextPath}/deleteQuestion";
var deleteAnswer = "${contextPath}/deleteAnswer";

var saveQuestionary = "${contextPath}/saveQuestionary";




