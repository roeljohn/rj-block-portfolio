<?php
/**
 * Plugin Name:       Rj Portfolio Block
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       rj-portfolio-block
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

function rj_portfolio_block_rj_portfolio_block_block_init() {
    register_block_type( __DIR__ . '/build/block-1' );
    register_block_type( __DIR__ . '/build/block-2' );
	register_block_type( __DIR__ . '/build/rj-lorem-ipsum-block' );
}
add_action( 'init', 'rj_portfolio_block_rj_portfolio_block_block_init' );

add_filter( 'block_categories_all' , function( $categories ) {

    // Adding a new category.
	$categories[] = array(
		'slug'  => 'rj-block-category',
		'title' => 'RJ Block'
	);

	return $categories;
} );

