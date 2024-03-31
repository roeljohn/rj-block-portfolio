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
import { InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';

import {PanelBody, SelectControl, Card, CardBody, ToggleControl, Button } from '@wordpress/components';
import { __experimentalNumberControl as NumberControl } from '@wordpress/components';

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
import { useState } from 'react';

import { LoremIpsum, loremIpsum } from 'react-lorem-ipsum';
import RJLoremUL from './components/RJLoremUL';

export default function Edit({ attributes, setAttributes }) {
	const { loremElement, loremVal, loremNumberOfParagraphsAttr, loremAvgWordsPerSentenceAttr, loremAvgSentencesPerParagraphAttr } = attributes;
	let displayElement;
	
	if ( loremElement === 'h1' ) {
		if (loremVal !== undefined){
			displayElement = <RichText
			{ ...useBlockProps() }
			tagName="h1" // The tag here is the element output and editable in the admin
			value={loremVal}// Any existing content, either from the database or an attribute default
			allowedFormats={ [ 'core/bold', 'core/italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
			onChange={ ( content ) => setAttributes( { loremVal: content } ) } // Store updated content as a block attribute
			placeholder={ __( 'Lorem Ipsum H1' ) } // Display this text before any content has been added by the user
		/>;
		} else {
			displayElement = <RichText
			{ ...useBlockProps() }
			tagName="h1" // The tag here is the element output and editable in the admin
			value={ loremVal }// Any existing content, either from the database or an attribute default
			allowedFormats={ [ 'core/bold', 'core/italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
			onChange={ ( content ) => setAttributes( { loremVal: content } ) } // Store updated content as a block attribute
			placeholder={ __( 'Lorem Ipsum H1' ) } // Display this text before any content has been added by the user
		/>;
		}
	}
	if ( loremElement === 'paragraph' ) {
		if (loremVal !== undefined){
			displayElement = <RichText
			{ ...useBlockProps() }
			tagName="p" // The tag here is the element output and editable in the admin
			value={ loremVal }// Any existing content, either from the database or an attribute default
			allowedFormats={ [ 'core/bold', 'core/italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
			onChange={ ( content ) => setAttributes( { loremVal: content } ) } // Store updated content as a block attribute
			placeholder={ __( 'Lorem Ipsum Paragraph' ) } // Display this text before any content has been added by the user
		/>;
		} else {
			displayElement = <RichText
			{ ...useBlockProps() }
			tagName="p" // The tag here is the element output and editable in the admin
			value={ loremVal }// Any existing content, either from the database or an attribute default
			allowedFormats={ [ 'core/bold', 'core/italic'] } // Allow the content to be made bold or italic, but do not allow other formatting options
			onChange={ ( content ) => setAttributes( { loremVal: content } ) } // Store updated content as a block attribute
			placeholder={ __( 'Lorem Ipsum Paragraph' ) } // Display this text before any content has been added by the user
		/>;
		}
	}
	if ( loremElement === 'ul' ) {
		if (loremVal !== undefined){
			displayElement =   <RJLoremUL list={loremVal} />;
		} else {
			displayElement =   <RJLoremUL list={loremVal}  />;
		}
	}
	function handleClick() {
		setAttributes( {
			loremVal: loremIpsum({
				p: loremNumberOfParagraphsAttr,
				avgWordsPerSentence: loremAvgWordsPerSentenceAttr,
				avgSentencesPerParagraph: loremAvgSentencesPerParagraphAttr
			})
		} )
	}
	return (
		<>
			<InspectorControls>
					<PanelBody title={__('Lorem Ipsum Settings', 'rj-portfolio-block')}>
						<Button variant="primary" style={{ marginBottom: '10px', width: '100%' }} onClick={()=> handleClick()}>
							Generate Lorem
						</Button>
							<Card>
								<CardBody>
									<SelectControl
										label="Element"
										value={ loremElement ? loremElement : null }
										options={ [
											{ label: 'H1', value: 'h1' },
											{ label: 'Paragraph', value: 'paragraph' },
											{ label: 'ul', value: 'ul' },
										] }
										onChange={ ( value ) => {
											setAttributes( { loremElement: value } )
										}}
										__nextHasNoMarginBottom
									/>
									<NumberControl
										label={
											__(
												'Number of paragraphs ',
												'rj-portfolio-block'
											)
										}
										value={ loremNumberOfParagraphsAttr }
										onChange={ (value) =>
											setAttributes( { loremNumberOfParagraphsAttr: parseInt(value) } )
										}
										min={1}
										max={2}
									/>
									<NumberControl
										label={
											__(
												'Average number of words',
												'rj-portfolio-block'
											)
										}
										value={ loremAvgWordsPerSentenceAttr }
										onChange={ (value ) =>
											setAttributes( { loremAvgWordsPerSentenceAttr: parseInt(value) } )
										}
										min={5}
										max={12}
									/>
									<NumberControl
										label={
											__(
												'Average number of sentences',
												'rj-portfolio-block'
											)
										}
										value={ loremAvgSentencesPerParagraphAttr }
										onChange={ (value ) =>
											setAttributes( { loremAvgSentencesPerParagraphAttr: parseInt(value) } )
										}
										min={1}
										max={2}
									/>
								</CardBody>
							</Card>
					</PanelBody>
			</InspectorControls>
			{displayElement}
		</>

	);
}
