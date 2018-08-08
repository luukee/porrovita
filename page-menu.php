<?php
/**
 * Template Name: Menu Page
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
			
			<div class="menu-column col-sm-4 juices"><?php // .juices ?>

				<?php if ( get_field('juice_column_heading') ) : ?>
				
					<div class="column-heading">
					  
					  	<h1><?php the_field('juice_column_heading'); ?></h1>

						<?php if ( have_rows('juice_value') ) : ?>

							<div class="value-heading cf">
				
					  			<?php while( have_rows('juice_value') ) : the_row(); ?>
						
									<div class="item-value">

								    	<span class="price">$<?php the_sub_field('size_price'); ?></span>

								    	<span class="size"><?php the_sub_field('size_label'); ?></span>

								    </div>
								
					  			<?php endwhile; ?>

					  		</div>
				
						<?php endif; ?>
						
					</div>

				<?php endif; ?>

				<?php if( have_rows('juices_items') ): ?>

					<?php while ( have_rows('juices_items') ) : the_row(); ?>

						<?php if( get_row_layout() == 'item' ): ?>

							<?php if ( get_sub_field('ingredients') ): ?>

								<div class="item full cf">

							<?php else: ?>

								<div class="item cf">

							<?php endif; ?>

								<h3 class="name"><?php the_sub_field('name'); ?></h3>

								<?php if ( get_sub_field('price') ): ?>
									
									<span class="price<?php if (get_sub_field('extra') === 'yes') : ?> extra<?php endif; ?>">$<?php the_sub_field('price'); ?></span>
									
								<?php endif; ?>
								
								<?php if ( get_sub_field('ingredients') ): ?>

									<div class="ingredients"><?php the_sub_field('ingredients'); ?></div>

								<?php endif; ?>

							</div>

						<?php elseif( get_row_layout() == 'line_break' ): ?>

							<span class="line-break"></span>

						<?php elseif( get_row_layout() == 'section_heading' ): ?>

							<h3 class="section-heading"><?php the_sub_field('heading'); ?></h3>

						<?php elseif( get_row_layout() == 'section_copy' ): ?>

							<?php the_sub_field('copy'); ?>

						<?php elseif( get_row_layout() == 'image_asset' ): ?>

							<?php 

							$image = get_sub_field('image');

							if( !empty($image) ): 

								// vars
								$url = $image['url'];
								$alt = $image['alt'];

							?>

							<div class="image-wrapper">

								<img src="<?php echo $url; ?>" alt="<?php echo $alt; ?>"/>

							</div>

							<?php endif; ?>

						<?php endif; ?>

					<?php endwhile; ?>

				<?php else : ?>

				<?php endif; ?>

			</div><?php // .juices ?>
			
			<div class="menu-column col-sm-4 bowls"><?php // .bowls ?>

				<?php if ( get_field('bowl_column_heading') ) : ?>
				
					<div class="column-heading">
					  
					  	<h1><?php the_field('bowl_column_heading'); ?></h1>

						<?php if ( have_rows('bowl_value') ) : ?>

							<div class="value-heading cf">
				
					  			<?php while( have_rows('bowl_value') ) : the_row(); ?>
						
									<div class="item-value">

								    	<span class="price">$<?php the_sub_field('size_price'); ?></span>

								    	<span class="size"><?php the_sub_field('size_label'); ?></span>

								    </div>
								
					  			<?php endwhile; ?>

					  		</div>
				
						<?php endif; ?>
						
					</div>

				<?php endif; ?>

				<?php if( have_rows('bowl_items') ): ?>

					<?php while ( have_rows('bowl_items') ) : the_row(); ?>

						<?php if( get_row_layout() == 'item' ): ?>

							<?php if ( get_sub_field('ingredients') ): ?>

								<div class="item full cf">

							<?php else: ?>

								<div class="item cf">

							<?php endif; ?>

								<h3 class="name"><?php the_sub_field('name'); ?></h3>

								<?php if ( get_sub_field('price') ): ?>
									
									<span class="price<?php if (get_sub_field('extra') === 'yes') : ?> extra<?php endif; ?>">$<?php the_sub_field('price'); ?></span>

								<?php endif; ?>

								<?php if ( get_sub_field('ingredients') ): ?>

									<div class="ingredients"><?php the_sub_field('ingredients'); ?></div>

								<?php endif; ?>

							</div>

						<?php elseif( get_row_layout() == 'line_break' ): ?>

							<span class="line-break"></span>

						<?php elseif( get_row_layout() == 'section_heading' ): ?>

							<h3 class="section-heading"><?php the_sub_field('heading'); ?></h3>

						<?php elseif( get_row_layout() == 'section_copy' ): ?>

							<?php the_sub_field('copy'); ?>

						<?php endif; ?>

					<?php endwhile; ?>

				<?php else : ?>

				<?php endif; ?>

			</div><?php // .bowls ?>

			<div class="menu-column col-sm-4 smoothies"><?php // .smoothies ?>

				<?php if ( get_field('smoothie_column_heading') ) : ?>
				
					<div class="column-heading">
					  
					  	<h1><?php the_field('smoothie_column_heading'); ?></h1>

						<?php if ( have_rows('smoothie_value') ) : ?>

							<div class="value-heading cf">
				
					  			<?php while( have_rows('smoothie_value') ) : the_row(); ?>
						
									<div class="item-value">

								    	<span class="price">$<?php the_sub_field('size_price'); ?></span>

								    	<span class="size"><?php the_sub_field('size_label'); ?></span>

								    </div>
								
					  			<?php endwhile; ?>

					  		</div>
				
						<?php endif; ?>
						
					</div>

				<?php endif; ?>

				<?php if( have_rows('smoothie_items') ): ?>

					<?php while ( have_rows('smoothie_items') ) : the_row(); ?>

						<?php if( get_row_layout() == 'item' ): ?>

							<?php if ( get_sub_field('ingredients') ): ?>

								<div class="item full cf">

							<?php else: ?>

								<div class="item cf">

							<?php endif; ?>

								<h3 class="name"><?php the_sub_field('name'); ?></h3>

								<?php if ( get_sub_field('price') ): ?>
									
									<span class="price<?php if (get_sub_field('extra') === 'yes') : ?> extra<?php endif; ?>">$<?php the_sub_field('price'); ?></span>

								<?php endif; ?>

								<?php if ( get_sub_field('ingredients') ): ?>

									<div class="ingredients"><?php the_sub_field('ingredients'); ?></div>

								<?php endif; ?>

							</div>

						<?php elseif( get_row_layout() == 'line_break' ): ?>

							<span class="line-break"></span>

						<?php elseif( get_row_layout() == 'section_heading' ): ?>

							<h3 class="section-heading"><?php the_sub_field('heading'); ?></h3>

						<?php elseif( get_row_layout() == 'section_copy' ): ?>

							<?php the_sub_field('copy'); ?>

						<?php elseif( get_row_layout() == 'build_your_own' ): ?>

							<?php the_sub_field('copy'); ?>

						<?php endif; ?>

					<?php endwhile; ?>

				<?php else : ?>

				<?php endif; ?>

			</div><?php // .smoothies ?>


		</div>

	<?php endwhile; // end of the loop. ?>

<?php get_footer(); ?>
