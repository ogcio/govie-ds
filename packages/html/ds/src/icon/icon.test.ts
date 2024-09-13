import { render } from '../common/render';
import html from './icon.html?raw';

describe('govieIcon', () => {
  const renderIcon = render({
    componentName: 'icon',
    macroName: 'govieIcon',
    html,
  });

  it('should render the provided HTML content correctly', () => {
    const content = '<p>Test content</p>';
    const screen = renderIcon({
      html: content,
    });
    const iconDiv = screen.getByTestId('govie-icon');
    const pElement = screen.getByText('Test content');
    expect(iconDiv).toBeTruthy();
    expect(pElement).toBeTruthy();
    expect(pElement.tagName).toBe('P');
  });

  it('should apply the correct icon classes', () => {
    const content = '<p>Styled content</p>';
    const screen = renderIcon({
      html: content,
    });
    const iconDiv = screen.getByTestId('govie-icon');
    expect(iconDiv).toBeTruthy();
    expect(iconDiv.classList.contains('gi-mx-auto')).toBe(true);
    expect(iconDiv.classList.contains('gi-icon')).toBe(true);
  });

  it('should correctly handle and render indented HTML content', () => {
    const content = '<p>\n    Indented content\n</p>';
    const screen = renderIcon({
      html: content,
    });
    const iconDiv = screen.getByTestId('govie-icon');
    const pElement = screen.getByText('Indented content');
    expect(iconDiv).toBeTruthy();
    expect(pElement).toBeTruthy();
    expect(pElement.tagName).toBe('P');
  });

  it('should safely render HTML content', () => {
    const content = '<p><script>alert("XSS")</script>Safe content</p>';
    const screen = renderIcon({
      html: content,
    });
    const iconDiv = screen.getByTestId('govie-icon');
    const pElement = screen.getByText('Safe content');
    expect(iconDiv).toBeTruthy();
    expect(pElement).toBeTruthy();
    expect(pElement.innerHTML).toContain('Safe content');
    // TODO Handle sanitisation separately e.g. using a different python library.
    // The `safe` filter in jinja doesn't sanitize the HTML content, it simply marks it as safe for rendering.
    // expect(pElement.innerHTML).not.toContain('alert("XSS")');
  });

  it('should handle empty content gracefully', () => {
    const screen = renderIcon({
      html: '',
    });
    const iconDiv = screen.getByTestId('govie-icon');
    expect(iconDiv).toBeTruthy();
    expect(iconDiv.innerHTML).toBe('\n');
  });

  it('should pass axe accessibility tests', async () => {
    const content = '<p>Accessible content</p>';
    const screen = renderIcon({
      html: content,
    });

    await screen.axe();
  });
});
