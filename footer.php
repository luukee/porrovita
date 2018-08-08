<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the id=main div and all content after
 *
 * @package porrovita
 */
?>

					</div><?php // #content-wrapper?>

					<?php include('inc/sidebar.php'); ?>

				</div><?php // #main-content .container?>

			</div><?php // #main-content .row?>

		</div><?php // #main-content?>

		<div id="footer"><?php // #footer?>

			<div class="container">

				<div class="row">

					<div class="col-sm-2 col-md-1 col-md-offset-2 footer-logo">
						<img src="<?php bloginfo('template_url'); ?>/images/icons/pineapple-logo.svg" alt="PorroVita Pineapple Logo">
					</div>

					<div class="col-sm-8 col-md-7">

							<span class="phone-number">Call in your order: <a href="tel:+9498738344">(949) 873-8344</a></span>

							<address>Stop by the shop: 3000 Newport Blvd, Newport Beach, CA</address>

					</div>

					<div class="col-sm-2 col-md-1 footer-logo">
						<img src="<?php bloginfo('template_url'); ?>/images/icons/fruit-face.svg" alt="Fruit Face Icon">
					</div>

				</div>

			</div>

		</div><?php // #footer?>

	</div><?php // page wrapper to assign classes?>

</div><?php // #main?>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAR14cSFBYHCSdFMDda89H_MkLjfPGJ7nU"></script>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-4854408-23', 'auto');
  ga('send', 'pageview');

</script>

<?php wp_footer(); ?>

</body>
</html>
