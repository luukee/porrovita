<?php
/**
 * Template Name: Encyclovita Page
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
			
		<?php if ( have_rows('content_block') ) : ?>
		
		  <?php while( have_rows('content_block') ) : the_row(); ?>
		
		    <div class="row">
		    		<?php 

						$image = get_sub_field('image');

						if( !empty($image) ): 

						// vars
						$url = $image['url'];
						$title = $image['title'];
						$alt = $image['alt'];

						$size = 'mediumSquare';
						$fruitThumb = $image['sizes'][ $size ];

					?>

						<div class="fruit cf">
						
							<div class="col-sm-4 cf">
								<img src="<?php echo $fruitThumb; ?>" alt="<?php echo $alt; ?>">
							</div>

							<div class="col-sm-8 cf">
								<?php the_sub_field('content'); ?>
							</div>

						</div>

					<?php else: ?>

						<div class="fruit cf">

							<div class="col-sm-12 cf">
								<?php the_sub_field('content'); ?>
							</div>

						</div>

					<?php endif; ?>

		    </div>
		
		  <?php endwhile; ?>
		
		<?php endif; ?>

	<?php endwhile; // end of the loop. ?>

<?php get_footer(); ?>
