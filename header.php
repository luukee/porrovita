<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package porrovita
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>

	<!-- Google Tag Manager -->
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','GTM-KPTZJ7S');</script>
	<!-- End Google Tag Manager -->

<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width">
<!-- Google verification HTML tag -->
<meta name="google-site-verification" content="xUsh-a3UvmQ6Ft3nm_rv7xis-uefMlSej4LQhQcBIHc" />

<title><?php bloginfo('name'); ?> | <?php is_front_page() ? bloginfo('description') : wp_title(''); ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/css/style.css">
<link rel="shortcut icon" href="<?php bloginfo('template_url'); ?>/favicon.png">

<?php /*
<link rel="apple-touch-icon" href="<?php bloginfo('template_url'); ?>/img/eri-icon-iphone.png">
<link rel="apple-touch-icon" sizes="72x72" href="<?php bloginfo('template_url'); ?>/img/eri-icon-ipad.png">
<link rel="apple-touch-icon" sizes="114x114" href="<?php bloginfo('template_url'); ?>/img/eri-icon-iphone-retina.png">
<link rel="apple-touch-icon" sizes="144x144" href="<?php bloginfo('template_url'); ?>/img/eri-icon-ipad-retina.png"> */
?>

<?php wp_head(); ?>

</head>

<body <?php body_class('loading'); ?>>

	<!-- Google Tag Manager (noscript) -->
	<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KPTZJ7S"
	height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<!-- End Google Tag Manager (noscript) -->

	<?php if (is_user_logged_in()) {
    ?>
		<span id="adminTrigger"></span>
	<?php
} ?>

	<?php include("inc/svg.php"); ?>

	<div id="main"><?php // #main?>

		<div class="<?php  global $post; $post_slug=$post->post_name; echo $post_slug; ?>-template"><?php // page wrapper to assign classes?>

			<div id="header"><?php // #header?>

				<?php

                    $image = get_field('background_image');

                    if (!empty($image)):

                    // vars
                    $url = $image['url'];
                    $title = $image['title'];
                    $alt = $image['alt'];

                    $size = 'fullWidth';
                    $fullWidth = $image['sizes'][ $size ];

                ?>
					<span class="header-bdg scene scene-fadein" style="background-image: url('<?php echo $fullWidth; ?>');"></span>

				<?php else: ?>

					<span class="header-bdg scene scene-fadein" style="background-image: url('<?php bloginfo('template_url') ?>/images/header-bdg.jpg');"></span>

				<?php endif; ?>

				<div class="container">

					<div class="row">

						<div class="col-md-12 scene scene-fadein">

							<?php

                                $image = get_field('text_image');

                                if (!empty($image)):

                                    // vars
                                    $url = $image['url'];
                                    $alt = $image['alt'];

                                ?>

								<div class="image-wrapper">

									<img src="<?php echo $url; ?>" alt="<?php echo $alt; ?>"/>
									<h1 class="visuallyhidden"><?php the_title(); ?></h1>

								</div>

							<?php else: ?>

								<?php
                                if (is_404()) {
                                    ?>
									<h1>404</h1>
								<?php
                                } else {
                                    ?>
									<h1><?php the_title(); ?></h1>
								<?php
                                } ?>


							<?php endif; ?>



						</div>

					</div>

				</div>

				<a href="#" class="menu-trigger">
					<span class="visuallyhidden">Menu</span>
					<span class="lines"></span>
				</a>

				<a href="tel:1-949-873-8344" class="call-btn">
					<i>
						<svg><use xlink:href="#call-btn"></use></svg>
					</i>
					<span class="visuallyhidden">949-873-8344</span>
				</a>

			</div><?php // #header?>

			<a href="tel:1-949-873-8344" class="call-btn-mobile cf">
				<img src="<?php bloginfo('template_url'); ?>/images/icons/call-button-mobile.svg" alt="Call To Order Todah: 949-873-8344">
			</a>

			<div id="main-content"><?php // #main-content?>

				<div class="container"><?php // #main-content .container?>

					<div class="row"><?php // #main-content .row?>

						<div id="nav" role="navigation" class="col-md-2"><?php // #nav?>

							<a href="#" class="menu-trigger">
								<span class="visuallyhidden">Menu</span>
								<span class="lines"></span>
							</a>

							<div class="nav-wrap">

								<a href="/" id="logo" class="smooth">
									<img src="<?php bloginfo('template_url'); ?>/images/porrovita-logo.svg" alt="Porvita Logo">
								</a>

								<div id="main-menu" class="menu">

									<ul>

										<?php
                                            $menu_name = 'main_nav';

                                            if ((
                                                $locations = get_nav_menu_locations()
                                            ) && isset($locations[ $menu_name ])) {
                                                $menu = wp_get_nav_menu_object($locations[ $menu_name ]);

                                                $menu_items = wp_get_nav_menu_items($menu->term_id);

                                                $main_menu = "";

                                                $postid = get_the_ID();

                                                foreach ((array) $menu_items as $key => $menu_item) {
                                                    $title = $menu_item->title;
                                                    $url = $menu_item->url;
                                                    $classes = $menu_item->classes;
                                                    $class = implode(" ", $classes);
                                                    //Lower case everything
                                                    $data = strtolower($title);
                                                    //Make alphanumeric (removes all other characters)
                                                    $data = preg_replace("/[^a-z0-9_\s-]/", "", $data);
                                                    //Clean up multiple dashes or whitespaces
                                                    $data = preg_replace("/[\s-]+/", " ", $data);
                                                    //Convert whitespaces and underscore to dash
                                                    $data = preg_replace("/[\s_]/", "-", $data);

                                                    if ($postid == $menu_item->object_id) {
                                                        $main_menu .= '<li class="menu-item current-page'. $class .'"><a href="' . $url . '" class="smooth">' . $title . '</a></li>';
                                                    } else {
                                                        $main_menu .= '<li class="menu-item '. $class .'"><a href="' . $url . '" class="smooth">' . $title . '</a></li>';
                                                    }
                                                }
                                            }
                                            echo $main_menu;

                                        ?>

									</ul>

								</div>

								<div id="alt-menu" class="menu" role="navigation">

									<ul>
										<?php
                                            $menu_name = 'alt_nav';

                                            if ((
                                                $locations = get_nav_menu_locations()
                                            ) && isset($locations[ $menu_name ])) {
                                                $menu = wp_get_nav_menu_object($locations[ $menu_name ]);

                                                $menu_items = wp_get_nav_menu_items($menu->term_id);

                                                $main_menu = "";

                                                $postid = get_the_ID();

                                                foreach ((array) $menu_items as $key => $menu_item) {
                                                    $title = $menu_item->title;
                                                    $url = $menu_item->url;
                                                    $classes = $menu_item->classes;
                                                    $class = implode(" ", $classes);
                                                    //Lower case everything
                                                    $data = strtolower($title);
                                                    //Make alphanumeric (removes all other characters)
                                                    $data = preg_replace("/[^a-z0-9_\s-]/", "", $data);
                                                    //Clean up multiple dashes or whitespaces
                                                    $data = preg_replace("/[\s-]+/", " ", $data);
                                                    //Convert whitespaces and underscore to dash
                                                    $data = preg_replace("/[\s_]/", "-", $data);

                                                    if ($postid == $menu_item->object_id) {
                                                        $main_menu .= '<li class="menu-item current-page'. $class .'"><a href="' . $url . '" class="smooth">' . $title . '</a></li>';
                                                    } else {
                                                        $main_menu .= '<li class="menu-item '. $class .'"><a href="' . $url . '" class="smooth">' . $title . '</a></li>';
                                                    }
                                                }
                                            }
                                            //print_r($menu_items);
                                            echo $main_menu;

                                        ?>


									</ul>

								</div>

							</div>

						</div><?php // #nav?>

						<div id="content-wrapper" class="scene scene-fadein cf col-md-9" role="main"><?php // #content-wrapper?>
