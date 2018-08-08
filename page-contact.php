<?php
/**
 * Template Name: Contact Page
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package porrovita
 */

get_header(); ?>

	<?php while (have_posts()) : the_post(); ?>

			<div class="row">

				<div class="col-md-9">

					<?php

                        $location = get_field('map');

                        if (!empty($location)):
                        ?>
						<div class="acf-map">

							<div class="marker" data-lat="<?php echo $location['lat']; ?>" data-lng="<?php echo $location['lng']; ?>"></div>
						</div>

					<?php endif; ?>

				</div>

				<div class="col-md-3 sidebar">

					<?php the_content(); ?>

				</div>

			</div>

	<?php endwhile; // end of the loop.?>

<?php get_footer(); ?>
