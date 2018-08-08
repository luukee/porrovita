<?php
/**
 * Template Name: About Page
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package porrovita
 */

get_header(); ?>

	<?php while ( have_posts() ) : the_post(); ?>

		<div class="row">

			<div class="col-lg-9 col-lg-offset-1">
				
				<?php if ( get_field('main_content') ) : ?>
				  
				  <?php the_field('main_content'); ?>
				  
				<?php endif; ?>

			</div>

		</div>

	<?php endwhile; // end of the loop. ?>

<?php get_footer(); ?>
