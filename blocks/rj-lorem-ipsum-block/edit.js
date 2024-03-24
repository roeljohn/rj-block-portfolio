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

export default function Edit({ attributes, setAttributes }) {
	const { loremElement, loremVal, loremNumberOfParagraphsAttr, loremAvgWordsPerSentenceAttr, loremAvgSentencesPerParagraphAttr, loremStartWithLoremIpsumAttr } = attributes;
	const [ numP, setNumP ] = useState( 1 );
	const [ loremAvgWordsPerSentence, setloremAvgWordsPerSentence ] = useState( 1 );
	const [ loremAvgSentencesPerParagraph, setloremAvgSentencesPerParagraph ] = useState( 1 );
	const [ loremStartWithLoremIpsum, setloremStartWithLoremIpsum ] = useState( false );
	const [ loremRandom, setloremRandom ] = useState( false );

	let displayElement;
	
	if ( loremElement === 'h1' ) {
		if (loremVal !== undefined){
			displayElement = <h1 { ...useBlockProps() }>{loremVal}</h1>;
		} else {
			displayElement = <h1 { ...useBlockProps() }>Please Click "Generate Lorem" on the element settings</h1>;
		}
	}
	if ( loremElement === 'paragraph' ) {
		if (loremVal !== undefined){
			displayElement = <div { ...useBlockProps() }>{loremVal}</div>;
		} else {
			displayElement = <p { ...useBlockProps() }>Please Click "Generate Lorem" on the element settings</p>;
		}
	}

	function handleClick(numP, loremAvgWordsPerSentence, loremAvgSentencesPerParagraph, loremStartWithLoremIpsum) {
		console.log('handleClick', attributes)
		setAttributes( {
			loremVal: loremIpsum({
				p: numP,
				avgWordsPerSentence: loremAvgWordsPerSentence,
				avgSentencesPerParagraph: loremAvgSentencesPerParagraph,
				startWithLoremIpsum: loremStartWithLoremIpsum,
			}),
			loremNumberOfParagraphsAttr: numP,
			loremAvgWordsPerSentenceAttr: loremAvgWordsPerSentence,
			loremAvgSentencesPerParagraphAttr: loremAvgSentencesPerParagraph,
			loremStartWithLoremIpsumAttr: loremStartWithLoremIpsum,
		} )
	}
	console.log('load', attributes)
	return (
		<>
			<InspectorControls>
					<PanelBody title={__('Lorem Ipsum Settings', 'rj-portfolio-block')}>
						<Button variant="primary" style={{ marginBottom: '10px', width: '100%' }} onClick={()=> handleClick(numP, loremAvgWordsPerSentence, loremAvgSentencesPerParagraph, loremStartWithLoremIpsum)}>
							Generate Lorem
						</Button>
							<Card>
								<CardBody>
									<ToggleControl 
										checked={ loremStartWithLoremIpsumAttr ? loremStartWithLoremIpsumAttr : false }
										label={
											__(
												'Start with Lorem Ipsum',
												'copyright-date-block'
											)
										}
										onChange={ () =>
											setloremStartWithLoremIpsum(! loremStartWithLoremIpsum)
										}
									/>
									<SelectControl
										label="Element"
										value={ loremElement ? loremElement : null }
										options={ [
											{ label: 'H1', value: 'h1' },
											{ label: 'Paragraph', value: 'paragraph' },
										] }
										onChange={ ( value ) => {
											setAttributes( { loremElement: value } )
											setNumP(1)
										}}
										__nextHasNoMarginBottom
									/>
									{loremNumberOfParagraphsAttr}
									<NumberControl
										label={
											__(
												'Number of paragraphs ',
												'rj-portfolio-block'
											)
										}
										value={ loremNumberOfParagraphsAttr ? loremNumberOfParagraphsAttr : 1 }
										onChange={ (value ) =>
											setNumP(value)
										}
										min={1}
										max={2}
									/>
									<NumberControl
										label={
											__(
												'Avarage number of words',
												'rj-portfolio-block'
											)
										}
										value={ loremAvgWordsPerSentenceAttr ? loremAvgWordsPerSentenceAttr : 1 }
										onChange={ (value ) =>
											setloremAvgWordsPerSentence(value)
										}
										min={5}
										max={12}
									/>
									<NumberControl
										label={
											__(
												'Avarage number of sentences',
												'rj-portfolio-block'
											)
										}
										value={ loremAvgSentencesPerParagraphAttr ? loremAvgSentencesPerParagraphAttr : 1 }
										onChange={ (value ) =>
											setloremAvgSentencesPerParagraph(value)
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
