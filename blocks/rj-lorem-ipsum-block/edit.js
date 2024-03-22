/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

import {PanelBody, SelectControl, ToggleControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

import { LoremIpsum } from 'react-lorem-ipsum';

export default function Edit({ attributes, setAttributes }) {
	const { loremElement } = attributes;

	let displayElement;

	if ( loremElement === 'h1' ) {
		displayElement = <h1 { ...useBlockProps() }>Lorem Ipsum Dolor</h1>;
	}
	if ( loremElement === 'paragraph' ) {
		displayElement = <div { ...useBlockProps() }><LoremIpsum p={1} /></div>;
	}
	return (
		<>
			<InspectorControls>
					<PanelBody title={__('Settings', 'rj-portfolio-block')}>
					<SelectControl
						label="Size"
						value={ loremElement || '' }
						options={ [
							{ label: 'H1', value: 'h1' },
							{ label: 'Paragraph', value: 'paragraph' },
						] }
						onChange={ ( value ) => setAttributes( { loremElement: value } ) }
						__nextHasNoMarginBottom
					/>
					</PanelBody>
			</InspectorControls>
			{displayElement}
		</>

	);
}
