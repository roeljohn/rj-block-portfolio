<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<?php
// Determine which content to display.
if ( $attributes['loremElement'] === 'paragraph' ) {
    // The current year is the same as the fallback, so use the block content saved in the database (by the save.js function).
	$block_content = '<p ' . get_block_wrapper_attributes() . '>' . esc_html( $attributes['loremVal'][0] ) . '</p>';
} else {
	$block_content = '<h1 ' . get_block_wrapper_attributes() . '>' . esc_html( $attributes['loremVal'][0] ) . '</h1>';
}
echo wp_kses_post( $block_content );
?>