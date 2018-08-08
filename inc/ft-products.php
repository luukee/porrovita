<?php 

	$posts = get_field('product_selector');

	if( $posts ): 
			
	$timeDelay = 0; // List count


?>

<div id="products" class="pivot"><?php // #products ?>

	<div class="container"><?php // .container ?>

		<div class="row">

			<div class="col-md-12">
					
					<h2 class="cross-head">Products</h2>

			</div>

		</div>

		<div class="row">

			<?php foreach( $posts as $post): ?>
			
				<?php setup_postdata($post); ?>

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

					<div class="col-sm-4 product-col" data-sr="wait <?php echo $timeDelay; ?>s, enter bottom">
						<div class="product">
							<a href="<?php the_permalink(); ?>" class="smooth">
								<img src="<?php echo $medium; ?>" alt="" class="bg">
								<span class="title"><?php the_title(); ?></span>
							</a>
						</div>
					</div>

				<?php endif; ?>

				<?php $timeDelay+=.25; ?>

			<?php endforeach; ?>

		</div>
	
	</div><?php // .container ?>

</div><?php // #products ?>

<?php wp_reset_postdata(); ?>

<?php endif; ?>