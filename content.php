<?php
/**
 * @package porrovita
 */
?>

	<h1><a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a></h1>

	<?php if ( is_search() ) : // Only display Excerpts for Search ?>
		<?php the_excerpt(); ?>
	<?php else : ?>
		<?php the_content( __( 'Continue reading <span class="meta-nav">&rarr;</span>', 'porrovita' ) ); ?>
	<?php endif; ?>

	<?php edit_post_link( __( 'Edit', 'porrovita' ), '<span class="sep"> | </span><span class="edit-link">', '</span>' ); ?>