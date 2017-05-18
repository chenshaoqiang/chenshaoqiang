<%--
  Created by IntelliJ IDEA.
  User: duduchao
  Date: 2016/10/27
  Time: 11:16
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript">
        window.location.href = "<%=basePath%>";
    </script>
</head>
<body>

</body>
</html>
