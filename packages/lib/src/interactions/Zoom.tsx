import {
  useCanvasEvents,
  useZoomOnWheel,
  useRegisterInteraction,
} from './hooks';
import type { Interaction } from './models';

function Zoom(props: Interaction) {
  const shouldInteract = useRegisterInteraction('Zoom', props);

  const isZoomAllowed = (sourceEvent: WheelEvent) => {
    const shouldZoom = shouldInteract(sourceEvent);

    return { x: shouldZoom, y: shouldZoom };
  };

  useCanvasEvents({ onWheel: useZoomOnWheel(isZoomAllowed) });

  return null;
}

export default Zoom;
