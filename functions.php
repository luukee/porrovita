<?php
/**
 * Living Simple functions and definitions
 *
 * @package Living Simple
 * @since Living Simple 1.0
 */

/*--------------------------------------------------------------
Custom Admin Logo
--------------------------------------------------------------*/

add_filter('login_headerurl', create_function(false, "return '/';"));
add_action("login_head", "custom_login_logo");

function custom_login_logo()
{
    echo "
	<style>
	body.login #login h1 a {
		background: url('".get_bloginfo('template_url')."/images/admin-logo.png') no-repeat scroll center top transparent;
		background-size: cover;
		height: 185px;
		width: 270px;
	}
	</style>
	";
}

add_action('init', 'porrovita_setup');

function porrovita_setup()
{

    /*--------------------------------------------------------------
    Removes admin margin-top
    --------------------------------------------------------------*/

    add_action('get_header', 'my_filter_head');

    function my_filter_head()
    {
        remove_action('wp_head', '_admin_bar_bump_cb');
    }

    /*--------------------------------------------------------------
    Post Thumbnail
    --------------------------------------------------------------*/

    add_theme_support('post-thumbnails');

    add_image_size('mediumSquare', 400, 400, true);
    add_image_size('mediumRectangle', 600, 400, true);
    add_image_size('fullWidth', 1400, 750, true);
    add_image_size('halfWidth', 840, 500, true);

    /*--------------------------------------------------------------
    Load scripts
    --------------------------------------------------------------*/

    if (!is_admin()) {
        add_action("wp_enqueue_scripts", "load_js", 11);
    }
    function load_js()
    {
        wp_deregister_script('jquery');
        wp_enqueue_script('jquery', "http" . ($_SERVER['SERVER_PORT'] == 443 ? "s" : "") . "://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js", array(), false, true);
        wp_enqueue_script(
            'plugin',
            get_template_directory_uri() . '/js/plugins.js',
        array( 'jquery' ),
            false,
            true
        );
        wp_enqueue_script(
            'scripts',
            get_template_directory_uri() . '/js/scripts.js',
        array( 'jquery' ),
            false,
            true
        );
    }

    /*--------------------------------------------------------------
    Menus
    --------------------------------------------------------------*/

    register_nav_menus(array(
        'main_nav' => 'Main Menu',
        'alt_nav' => 'Alternative Menu'
    ));

    /*--------------------------------------------------------------
    SVG Support
    --------------------------------------------------------------*/

    function cc_mime_types($mimes)
    {
        $mimes['svg'] = 'image/svg+xml';
        return $mimes;
    }
    add_filter('upload_mimes', 'cc_mime_types');

    /*--------------------------------------------------------------
    Custom Post Types
    --------------------------------------------------------------*/

    // register_post_type( 'product',
    // array(
    // 	'labels' => array(
    // 		'name' => __( 'Products' ),
    // 		'singular_name' => __( 'Product' ),
    // 		'add_new' => __( 'Add New' ),
    // 		'add_new_item' => __( 'Add New Product' ),
    // 		'new_item' => __( 'New Product' ),
    // 		'edit_item' => __( 'Edit Product' ),
    // 		'view_item' => __( 'View Product' )
    // 	),
    // 	'menu_position' => 20,
    // 	'menu_icon'   => 'dashicons-align-center',
    // 	'show_in_nav_menus' => true,
    // 	'public'=> true,
    // 	'taxonomies' => array('category'),
    // 	'has_archive' => true,
    // 	'supports' => array( 'title', 'editor', 'revisions' ),
    // 	)
    // );


    /*--------------------------------------------------------------
    Google Maps
    --------------------------------------------------------------*/
    function my_acf_init()
    {
        acf_update_setting('google_api_key', 'AIzaSyAR14cSFBYHCSdFMDda89H_MkLjfPGJ7nU');
    }
    add_action('acf/init', 'my_acf_init');


    /*--------------------------------------------------------------
    Site options page
    --------------------------------------------------------------*/
    if (function_exists('acf_add_options_page')) {
        $page = acf_add_options_page(array(
            'page_title' 	=> 'Theme General Settings',
            'menu_title' 	=> 'Theme Settings',
            'menu_slug' 	=> 'theme-general-settings',
            'capability' 	=> 'edit_posts',
            'redirect' 	=> false
        ));
    }
}

/*--------------------------------------------------------------
Custom ACF Styles and Scripts
--------------------------------------------------------------*/

function my_acf_admin_head()
{
    ?>
	<style type="text/css">

		.wp-asset-icon img {
			min-width: 300px;
		}

	</style>

	<script type="text/javascript">
	(function($){

		/* ... */

	})(jQuery);
	</script>
	<?php
}

add_action('acf/input/admin_head', 'my_acf_admin_head');

?>
