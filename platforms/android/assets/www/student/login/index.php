<?php
ob_start();
require_once("../../dataManagement/dataGate.php");
  $res=DataGate::getData("getUser", (object)array());
	if($res->uid != 0){
		?>
        <script>
		//if user is login
		 location.replace("../../student");
        </script>
<?php        
	}else{
?>	
	<script>
    	console.log('not register');
    </script>
<?php	}
?>
<!DOCTYPE html>
<html data-ng-app="smartClassStudentApp">
    <head>

        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width; initial-scale = 1.0; maximum-scale=1.0; user-scalable=no" />
        <title>Smart class - Login</title>
        <link rel="stylesheet" type="text/css" href="../../css/reset.css" />
        <link rel="stylesheet" type="text/css" href="../../css/style.css" />
        <link rel="stylesheet" type="text/css" href="../../css/login.css" />
        <link rel="stylesheet" type="text/css" href="../../css/media_login.css" />

        <link href="http://fonts.googleapis.com/css?family=Open+Sans+Condensed:700" rel="stylesheet" type="text/css">

        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min.js"></script>
    	<script src="../../js/vendor/angular-ui-router.min.js"></script>
    	<script src="../../js/angular-animate.min.js"></script>
	
        <script src="../app-student.js"></script>

        <script src="../../components/login/login.js"></script>
        <script src="../../components/loginHeader/loginHeader.js"></script>
    </head>
    <body>

        <div class="header_login gradient header_back" data-ui-view="header">
            
        </div>
        
        <div class="login-wrapper" data-ui-view="main">
          
        </div>

    </body>

</html>