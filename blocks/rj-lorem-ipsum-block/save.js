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
import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { loremElement, loremVal } = attributes;
	let displayElement;
	
	if ( loremElement === 'h1' ) {
		if (loremVal !== undefined){
			displayElement = <h1 { ...useBlockProps.save() }>{loremVal}</h1>;
		} else {
			displayElement = <h1 { ...useBlockProps.save() }>Please Click "Generate Lorem" on the element settings</h1>;
		}
	}
	if ( loremElement === 'paragraph' ) {
		if (loremVal !== undefined){
			displayElement = <p { ...useBlockProps.save() }>{loremVal}</p>;
		} else {
			displayElement = <p { ...useBlockProps.save() }>Please Click "Generate Lorem" on the element settings</p>;
		}
	}
	return (
		<>
			{displayElement}
		</>

	);
}
