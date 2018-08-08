<div id="products" class="pivot"><?php // #products ?>

	<div class="container">

		<div class="row">

			<div class="col-md-12">
					
					<h2 class="cross-head">Other Products</h2>

			</div>

		</div>
		
		<div class="row">

			<div class="col-md-10 col-md-offset-1">

				<div class="row">

					<?php
						$timeDelay = 0; // List count
						$products = new WP_Query( 
						array(
							'post_type'=>'product',
							'posts_per_page'=>'-1',
							'order'=>'ASC',
							'orderby' => 'menu_order',
							'post_status' => 'publish',
							'post__not_in' => array( get_the_ID() ),
						)); 
						while ( $products->have_posts() ) : $products->the_post();
					?>

						<?php 

							$image = get_field('background_image');

							if( !empty($image) ): 

							// vars
							$url = $image['url'];
							$title = $image['title'];
							$alt = $image['alt'];

							$size = 'medium';
							$medium = $image['sizes'][ $size ];

						?>

							<div class="col-sm-6 product-col" data-sr="wait <?php echo $timeDelay; ?>s, enter bottom">
								<div class="product">
									<a href="<?php the_permalink(); ?>" class="smooth">
										<img src="<?php echo $medium; ?>" alt="" class="bg">
										<span class="title"><?php the_title(); ?></span>
									</a>
								</div>
							</div>

						<?php endif; ?>

						<?php $timeDelay+=.25; ?>

					<?php endwhile; ?>

				</div>

			</div>

		</div>

	</div>

</div>


<?php wp_reset_postdata(); ?>