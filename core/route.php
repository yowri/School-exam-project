<?php	
	class Route{
		public function init(){
			$url = isset($_GET['uri']) ? $_GET['uri'] : '/';

			if($url == "/" || $url == ""){
				// go to home page
				$url = "home";
			} else {
				// check for page
				$url = trim($url, '/');
				if (is_readable(VIEWS_PATH.$url.".php") == false)
				{
					$url = "404page";
				}
			}
			// get view from server
			$view = file_get_contents(VIEWS_PATH.$url.".php");
			// if render default tag is found
			if (strpos($view, '@RenderDefault@') !== false) {

				// get default layout
			    $DefaultLayout = file_get_contents(SITE_PATH."/defaultlayout.php");

			    // remove render default tag from view
			    $view = preg_replace('/@RenderDefault@*/', '', $view);

			    // replace default layout tag with view
			    $DefaultLayout = preg_replace('/@RenderContent@*/', $view,$DefaultLayout);

			    // update view
				$view = $DefaultLayout;
			}
			// echo view in page
			echo $view;
		}
	}
	function getParms()
	{
		return json_encode($_GET);
	}  
?>