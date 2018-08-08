<?php
/**
 * Template Name: Home Page
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

		<?php $posts = get_field('quick_link_selection'); ?>
		
		<?php if ( $posts ): ?>

			<div class="row quick-links">

				<?php foreach ( $posts as $post ) : setup_postdata( $post ); ?>

				<?php 

					$image = get_field('link_background_image');

					if( !empty($image) ): 

					// vars
					$url = $image['url'];
					$title = $image['title'];
					$alt = $image['alt'];

					$size = 'mediumSquare';
					$linkBdg = $image['sizes'][ $size ];

				?>
				
					<a href="<?php the_permalink(); ?>" class="col-sm-6 link smooth">

						<span class="bg-image" style="background-image: url('<?php echo $url; ?>');"></span>

						<div class="overlay">
							<span class="link-text"><?php the_title(); ?></span>
						</div>

					</a>

				<?php endif; ?>

				<?php endforeach; wp_reset_postdata(); ?>

			</div>

		<?php endif; ?>

		<?php if ( have_rows('brand_messages') ) : ?>

			<div class="row brand-messages">
		
				<?php while( have_rows('brand_messages') ) : the_row(); ?>

			  	<?php 

						$image = get_sub_field('brand_message');

						if( !empty($image) ): 

						// vars
						$url = $image['url'];
						$title = $image['title'];
						$alt = $image['alt'];

						$size = 'mediumSquare';
						$linkBdg = $image['sizes'][ $size ];

					?>
					
					<div class="col-sm-4 brand-message cf">

			    		<img src="<?php echo $url; ?>" alt="<?php echo $alt; ?>">

			    	</div>

			    	<?php endif; ?>
			
				<?php endwhile; ?>

			</div>
		
		<?php endif; ?>
			
		<?php if ( get_field('instagram_feed') ) : ?>

			<div class="instagram-feed row">
			
				<?php the_field('instagram_feed'); ?>

			</div>

		<?php endif; ?>

	<?php endwhile; // end of the loop. ?>

<?php get_footer(); ?>
