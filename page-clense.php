<?php
/**
 * Template Name: Clense Page
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

		<?php if ( get_field('intro_image') ) : ?>

			<div class="row">

				<?php 

					$image = get_field('intro_image');

					if( !empty($image) ): 

					// vars
					$url = $image['url'];
					$alt = $image['alt'];

				?>

					<div class="col-sm-12 intro-image">

						<img src="<?php echo $url; ?>" alt="<?php echo $alt; ?>">

					</div>

				<?php endif; ?>

			</div>

		<?php endif; ?>

		<?php if ( get_field('main_heading_image') ||  get_field('main_heading_text') ) : ?>

			<div class="row">

				<?php if ( get_field('main_heading_image') ) : ?>

					<?php 

						$image = get_field('main_heading_image');

						if( !empty($image) ): 

						// vars
						$url = $image['url'];
						$alt = $image['alt'];

					?>

					<div class="col-sm-12 heading-image">

						<img src="<?php echo $url; ?>" alt="<?php echo $alt; ?>">

						<?php if ( get_field('main_heading_text') ) : ?>

							<h1 class="visuallyhidden"><?php the_field('main_heading_text'); ?></h1>

						<?php endif; ?>

					</div>

					<?php endif; ?>

				<?php else: ?>

					<?php if ( get_field('main_heading_text') ) : ?>

						<div class="col-sm-12">

							<h1><?php the_field('main_heading_text'); ?></h1>

						</div>

					<?php endif; ?>

				<?php endif; ?>
				
			</div>

		<?php endif; ?>

		<?php if ( get_field('main_content') ||  get_field('sidebar_content') ) : ?>
			
			<div class="row">
					
				<?php if ( get_field('main_content') ) : ?>

					<div class="col-sm-8">

						<?php the_field('main_content'); ?>

					</div>

				<?php endif; ?>
					
				<?php if ( get_field('sidebar_content') ) : ?>

					<div class="col-sm-4 sidebar" role="complimentary">
				  
						<?php the_field('sidebar_content'); ?>

					</div>
				  
				<?php endif; ?>

			</div>

		<?php endif; ?>

		<?php if ( get_field('cleanse_diagram') ) : ?>

			<div class="row diagram">

				<?php 

					$image = get_field('cleanse_diagram');

					if( !empty($image) ): 

					// vars
					$url = $image['url'];
					$alt = $image['alt'];

				?>

					<div class="col-md-8 col-md-offset-2">

						<img src="<?php echo $url; ?>" alt="<?php echo $alt; ?>">

					</div>

				<?php endif; ?>

			</div>

		<?php endif; ?>

		<?php if ( get_field('juices_heading_image') ||  get_field('juices_heading_text') ) : ?>

			<div class="row">

				<?php if ( get_field('juices_heading_image') ) : ?>

					<?php 

						$image = get_field('juices_heading_image');

						if( !empty($image) ): 

						// vars
						$url = $image['url'];
						$alt = $image['alt'];

					?>

					<div class="col-sm-12 heading-image">

						<img src="<?php echo $url; ?>" alt="<?php echo $alt; ?>">

						<?php if ( get_field('juices_heading_text') ) : ?>

							<h1 class="visuallyhidden"><?php the_field('juices_heading_text'); ?></h1>

						<?php endif; ?>

					</div>

					<?php endif; ?>

				<?php else: ?>

					<?php if ( get_field('juices_heading_text') ) : ?>

						<div class="col-sm-12">

							<h1><?php the_field('juices_heading_text'); ?></h1>

						</div>

					<?php endif; ?>

				<?php endif; ?>
				
			</div>

		<?php endif; ?>

		<?php if ( have_rows('juices') ) : ?>

			<?php $juiceNumber = 1; ?>

			<div class="row juices">
		
				<?php while( have_rows('juices') ) : the_row(); ?>

					<div class="juice col-sm-6 col-lg-4">

						<h3><?php echo $juiceNumber ?> ~ <?php the_sub_field('juice_label'); ?></h3>
						<p><?php the_sub_field('juice_description'); ?></p>

					</div>

					<?php $juiceNumber++; ?>

				<?php endwhile; ?>

			</div>
		
		<?php endif; ?>

		<?php if ( have_rows('testimonial_images') ) : ?>

			<?php $juiceNumber = 1; ?>

			<div class="row testimonials">
		
				<?php while( have_rows('testimonial_images') ) : the_row(); ?>

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
						<div class="col-xs-6 col-sm-4 testimonial-image">
							<img src="<?php echo $fruitThumb; ?>" alt="<?php echo $alt; ?>">
						</div>


					<?php endif; ?>

				<?php endwhile; ?>

			</div>
		
		<?php endif; ?>



	<?php endwhile; // end of the loop. ?>

<?php get_footer(); ?>
