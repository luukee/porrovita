<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package porrovita
 */
?>

<div class="container">
	<div class="row">
		<div class="col-sm-12"><h1><?php the_title(); ?></h1></div>
	</div>
</div>
<?php the_content(); ?>
<?php edit_post_link( __( 'Edit', 'porrovita' ), '<footer class="entry-meta"><span class="edit-link">', '</span></footer>' ); ?>
