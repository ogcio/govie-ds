import { render, cleanup, fireEvent } from '../test-utilities.js';
import { AccordionItem } from './accordion-item.js';
import { Accordion } from './accordion.js';

describe('govieAccordion', () => {
  afterEach(cleanup);

  it('should render accordion with all items', () => {
    const { getByText } = render(
      <Accordion>
        <AccordionItem label="Label1">
          <h1>This is the content Heading 1</h1>
          <p>This is a content paragraph paragraph 1</p>
        </AccordionItem>
        <AccordionItem label="Label2">
          <h1>This is the content Heading 2</h1>
          <p>This is a content paragraph paragraph 2</p>
        </AccordionItem>
      </Accordion>,
    );

    expect(getByText('Label1')).toBeInTheDocument();
    expect(getByText('Label2')).toBeInTheDocument();
  });

  it('should toggle accordion item visibility when clicked', () => {
    const { getByText, queryByText } = render(
      <Accordion>
        <AccordionItem label="Label1">
          <p>This is the content for Label1</p>
        </AccordionItem>
        <AccordionItem label="Label2">
          <p>This is the content for Label2</p>
        </AccordionItem>
      </Accordion>,
    );

    const label1 = getByText('Label1');
    expect(queryByText('This is the content for Label1')).not.toBeVisible();

    fireEvent.click(label1);
    expect(queryByText('This is the content for Label1')).toBeVisible();

    fireEvent.click(label1);
    expect(queryByText('This is the content for Label1')).not.toBeVisible();
  });

  it('should not toggle disabled accordion item', () => {
    const { getByText, queryByText } = render(
      <Accordion>
        <AccordionItem label="Label1" disabled>
          <p>This is the content for Label1</p>
        </AccordionItem>
        <AccordionItem label="Label2">
          <p>This is the content for Label2</p>
        </AccordionItem>
      </Accordion>,
    );

    const label1 = getByText('Label1');
    expect(queryByText('This is the content for Label1')).not.toBeVisible();

    fireEvent.click(label1);
    expect(queryByText('This is the content for Label1')).not.toBeVisible();
  });

  it('should render accordion items with defaultExpanded set to true', () => {
    const { getByText } = render(
      <Accordion>
        <AccordionItem label="Label1" defaultExpanded>
          <p>This is the content for Label1</p>
        </AccordionItem>
        <AccordionItem label="Label2">
          <p>This is the content for Label2</p>
        </AccordionItem>
      </Accordion>,
    );

    expect(getByText('This is the content for Label1')).toBeVisible();
  });

  it('should apply iconStart styling when iconStart is true', () => {
    const { container } = render(
      <Accordion iconStart>
        <AccordionItem label="Label1">
          <p>This is the content for Label1</p>
        </AccordionItem>
        <AccordionItem label="Label2">
          <p>This is the content for Label2</p>
        </AccordionItem>
      </Accordion>,
    );

    const accordion = container.querySelector('.gi-accordion');
    const dataIconStart = accordion?.getAttribute('data-icon-start');

    expect(dataIconStart).toBe('true');
  });

  it('should not apply iconStart styling when iconStart is false', () => {
    const { container } = render(
      <Accordion>
        <AccordionItem label="Label1">
          <p>This is the content for Label1</p>
        </AccordionItem>
        <AccordionItem label="Label2">
          <p>This is the content for Label2</p>
        </AccordionItem>
      </Accordion>,
    );

    const labelDiv = container.querySelector('div.gi-flex-row-reverse');
    expect(labelDiv).not.toBeInTheDocument();
  });
});
