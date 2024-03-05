import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    buttonType: 'primary',
    label: 'Button',
  },
};

export const Secondary = {
  args: {
    buttonType: 'secondary',
    label: 'Button',
  },
};

export const Link = {
  args: {
    size: 'lg',
    buttonType: 'link',
    label: 'Button',
  },
};

export const LinkLight = {
  args: {
    size: 'lg',
    buttonType: 'link-light',
    label: 'Button',
  },
};
