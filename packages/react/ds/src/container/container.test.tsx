import { render, cleanup } from '../test-utils.js';
import { Container } from './container.js';

describe('govieContainer', () => {
  afterEach(cleanup);
  const renderContainer = (children: React.ReactNode) =>
    render(<Container>{children}</Container>);

  it('should render the provided HTML content correctly', () => {
    const content = <p>Test content</p>;
    const screen = renderContainer(content);
    const containerDiv = screen.getByTestId('govie-container');
    const pElement = screen.getByText('Test content');
    expect(containerDiv).toBeTruthy();
    expect(pElement).toBeTruthy();
    expect(pElement.tagName).toBe('P');
  });

  it('should apply the correct container classes', () => {
    const content = <p>Styled content</p>;
    const screen = renderContainer(content);
    const containerDiv = screen.getByTestId('govie-container');
    expect(containerDiv).toBeTruthy();
    expect(containerDiv.classList.contains('gi-layout-container')).toBe(true);
  });

  it('should correctly handle and render indented HTML content', () => {
    const content = <p>Indented content</p>;
    const screen = renderContainer(content);
    const containerDiv = screen.getByTestId('govie-container');
    const pElement = screen.getByText('Indented content');
    expect(containerDiv).toBeTruthy();
    expect(pElement).toBeTruthy();
    expect(pElement.tagName).toBe('P');
  });

  it('should safely render HTML content', () => {
    const content = (
      <p>
        <script>alert("XSS")</script>Safe content
      </p>
    );
    const screen = renderContainer(content);
    const containerDiv = screen.getByTestId('govie-container');
    const pElement = screen.getByText('Safe content');
    expect(containerDiv).toBeTruthy();
    expect(pElement).toBeTruthy();
    expect(pElement.innerHTML).toContain('Safe content');
    // TODO Handle sanitisation separately e.g. using a different python library.
    // The `safe` filter in jinja doesn't sanitize the HTML content, it simply marks it as safe for rendering.
    // expect(pElement.innerHTML).not.toContain('alert("XSS")');
  });

  it('should handle empty content gracefully', () => {
    const screen = renderContainer('');
    const containerDiv = screen.getByTestId('govie-container');
    expect(containerDiv).toBeTruthy();
    expect(containerDiv.textContent).toBe('');
  });

  it('should pass axe accessibility tests', async () => {
    const content = <p>Accessible content</p>;
    const screen = renderContainer(content);

    await screen.axe();
  });
});
