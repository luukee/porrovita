<?php
/**
 * @package porrovita
 */
?>

	<h1><?php the_title(); ?></h1>

	<?php the_content(); ?>

	<?php edit_post_link( __( 'Edit', 'porrovita' ), '<span class="edit-link">', '</span>' ); ?>
