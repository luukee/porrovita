<div id="sidebar" class="col-md-1" role="complementary">

	<div class="nav-wrap">

		<a href="#" id="top">Top</a>
		
		<?php if ( get_field('facebook', 'option') || get_field('twitter', 'option') || get_field('instagram', 'option')) : ?>

			<div class="social">

				<?php if ( get_field('facebook', 'option') ) : ?>
				  	<a href="<?php the_field('facebook', 'option'); ?>" target="_blank">
						<i class="icon-facebook">
							<svg><use xlink:href="#icon-facebook"></use></svg>
						</i>
					</a>
				<?php endif; ?>
				
				<?php if ( get_field('twitter', 'option') ) : ?>
				  	<a href="<?php the_field('twitter', 'option'); ?>" target="_blank">
						<i class="icon-twitter">
							<svg><use xlink:href="#icon-twitter"></use></svg>
						</i>
					</a>
				<?php endif; ?>

				<?php if ( get_field('instagram', 'option') ) : ?>
				  	<a href="<?php the_field('instagram', 'option'); ?>" target="_blank">
						<i class="icon-instagram">
							<svg><use xlink:href="#icon-instagram"></use></svg>
						</i>
					</a>
				<?php endif; ?>

			</div>

		<?php endif; ?>

	</div>

</div>