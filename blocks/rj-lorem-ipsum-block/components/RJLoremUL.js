import { InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { LoremIpsum, loremIpsum } from 'react-lorem-ipsum';

const RJLoremUL = (loremVal) => (
  <ul className="text-wrapper">
    {loremVal && loremVal.list.map(text => (
      <RichText
        { ...useBlockProps() }
        tagName="li" // The tag here is the element output and editable in the admin
        value={ text }// Any existing content, either from the database or an attribute default
        allowedFormats={ [ 'core/bold', 'core/italic'] } // Allow the content to be made bold or italic, but do not allow other formatting options
        onChange={ ( content ) => console.log(content) } // Store updated content as a block attribute
        placeholder={ 'Lorem Ipsum Paragraph' } // Display this text before any content has been added by the user
      />
    ))}
  </ul>
);

export default RJLoremUL;