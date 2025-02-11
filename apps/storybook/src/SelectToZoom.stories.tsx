import {
  DataCurve,
  Pan,
  VisCanvas,
  Zoom,
  SelectToZoom,
  ResetZoomButton,
} from '@h5web/lib';
import type { ModifierKey as ModifierKeyType } from '@h5web/lib';
import type { Meta, Story } from '@storybook/react';
import { range } from 'lodash';

import FillHeight from './decorators/FillHeight';

const X = range(-5, 5, 0.01);
const Y = X.map((x) => Math.exp((-x * x) / 0.2));

function GaussianCurve() {
  return <DataCurve abscissas={X} ordinates={Y} color="blue" />;
}

interface TemplateProps {
  modifierKey: ModifierKeyType;
}

const Template: Story<TemplateProps> = (args) => {
  return (
    <VisCanvas
      abscissaConfig={{ visDomain: [-5, 5], showGrid: true }}
      ordinateConfig={{ visDomain: [-0.5, 1.5], showGrid: true }}
    >
      <Pan />
      <Zoom />
      <SelectToZoom {...args} />
      <ResetZoomButton />
      <GaussianCurve />
    </VisCanvas>
  );
};

export const Default = Template.bind({});
Default.args = {
  modifierKey: 'Control',
};
Default.argTypes = {
  modifierKey: {
    control: { type: 'inline-radio' },
    options: ['Alt', 'Control', 'Shift'],
  },
};

export default {
  title: 'Building Blocks/SelectToZoom',
  component: SelectToZoom,
  decorators: [FillHeight],
  parameters: { layout: 'fullscreen' },
} as Meta;
