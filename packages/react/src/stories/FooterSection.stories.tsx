import type { Meta, StoryObj } from '@storybook/react-vite';
import FooterSection from '@/atoms/FooterSection';
import { footerSectionMeta, Default as defaultStory } from '@/atoms/storybook/Footersection.meta';
import Container from '@/atoms/Container';

const meta = {
  ...footerSectionMeta,
  title: 'Layout/Footer/FooterSection',
  component: FooterSection,
} satisfies Meta<typeof FooterSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...defaultStory,
  render: (props) => (
    <FooterSection {...props}>
      <Container>Footer section content wrapped in a Container</Container>
    </FooterSection>
  ),
};
