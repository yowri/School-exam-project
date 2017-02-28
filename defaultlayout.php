<!DOCTYPE html>
<html>
<head>
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="stylesheets/libs/materialize.min.css">
    <link rel="stylesheet" href="stylesheets/css/baseLayout.css">
    <link rel="icon" type="image/png" href="images/favicon.png">
    <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700' rel='stylesheet' type='text/css'>
    <script src="javascript/jquery.js"></script>
	<script src="javascript/materialize.min.js"></script>
    <script type="text/javascript" src="core/DatabaseController.js"></script>
    <script type="text/javascript" src="core/validationController.js"></script>
    <script type="text/javascript" src="core/GlobalFunctions.js"></script>
    <script type="text/javascript" src="core/GlobalDataFunctions.js"></script>

    <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body>
<script type="text/javascript">
    $(function(){
       $(".button-collapse").sideNav();
    });
</script>
<div id="header">
    <nav style="background-color:white;">
        <div class="nav-wrapper container base-nav">
            <div class="col s2">
                <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
            </div>
            <div class="col s2">
                <a href="#!" class="logo brand-logo hide-on-med-and-down"><img src="images/logo2.png" alt=""></a>

            </div>
            <div class="col s2">
                <a href="#!" class="showLogo brand-logo show-on-med-and-down hide-on-large-only">Logo</a>
            </div>
            <div class="col offset-s6">
                <ul class="right hide-on-med-and-down menu">
                    <li><a href="home">Home</a></li>
                    <li><a href="cursus">Cursus</a></li>
					<li><a class="MijnAccountLink" style="display: none;" id="MijnAccount" href="profile">Mijn Account</a></li>
                    <li><a href="contact">Contact</a></li>
					<li><a href="help">Help</a></li>
                    <li><a id="LoginID" href="login">Login</a></li>
                </ul>
            </div>
            <ul class="side-nav" id="mobile-demo">
                <li><a href="home">Home</a></li>
                <li><a href="cursus">Cursus</a></li>
                <li><a class="MijnAccountLink" style="display: none;" id="MijnAccount" href="profile">Mijn Account</a></li>
                <li><a href="contact">Contact</a></li>
                <li><a href="help">Help</a></li>
                <li><a id="LoginID" href="login">Login</a></li>
            </ul>
        </div>
    </nav>
</div>
<div id="content" class="row">
    @RenderContent@
</div>
<div id="footer">
    <footer class="page-footer">
        <div class="container">
            <div class="row">
                <div class="col l6 s12 m12">
                    <h5 class="black-text">Contact</h5>
                    <ul class="black-text">
                        <li class="bold-text">Adres:</li>
                        <li>Nannewiid 12</li>
                        <li>8314PM</li>
                        <li>Earnewoude</li>
                    </ul>
                </div>
                <div class="col l4 offset-ll2 offset-sl2 s12 offset-ml2 m12">
                    <h5 class="black-text">Social Media</h5>
                    <ul class="social-icons">
                        <li><a href="#" class="social-icon"> <i class="accent-color fa fa-facebook"></i></a></li>
                        <li><a href="#" class="social-icon"> <i class="accent-color fa fa-twitter"></i></a></li>
                        <li><a href="#" class="social-icon"> <i class="accent-color fa fa-rss"></i></a></li>
                        <li><a href="#" class="social-icon"> <i class="accent-color fa fa-youtube"></i></a></li>
                        <li><a href="#" class="social-icon"> <i class="accent-color fa fa-linkedin"></i></a></li>
                        <li><a href="#" class="social-icon"> <i class="accent-color fa fa-google-plus"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-copyright">
            <div class="container">
                <p class="copyright-text">© 2016 Copyright UTSZ!</p>
            </div>
        </div>
    </footer>
</div>
</body>
</html>