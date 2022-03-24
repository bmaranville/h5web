import { FloatingControl, VisCanvas } from '@h5web/lib';
import { useToggle } from '@react-hookz/web';
import type { Meta, Story } from '@storybook/react/types-6-0';

import FillHeight from './decorators/FillHeight';

export const CustomFloatingControl: Story = () => {
  const [isToggled, toggle] = useToggle(false);

  return (
    <VisCanvas
      abscissaConfig={{
        visDomain: [0, 3],
        showGrid: true,
        isIndexAxis: true,
      }}
      ordinateConfig={{
        visDomain: [50, 100],
        showGrid: true,
        isIndexAxis: true,
      }}
    >
      <FloatingControl>
        <button
          type="button"
          style={{ fontWeight: isToggled ? 'bold' : undefined }}
          onClick={() => toggle()}
        >
          Toggle me!
        </button>
      </FloatingControl>
    </VisCanvas>
  );
};

export default {
  title: 'Toolbar/FloatingToolbar',
  decorators: [FillHeight],
  parameters: { layout: 'fullscreen' },
} as Meta;
