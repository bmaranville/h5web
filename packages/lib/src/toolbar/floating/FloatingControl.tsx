import type { ReactNode } from 'react';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { AxisSystemContext } from '../../vis/shared/AxisSystemContext';

interface Props {
  children?: ReactNode;
}

function FloatingControl(props: Props) {
  const { children } = props;
  const { floatingToolbar } = useContext(AxisSystemContext);

  // Container `div` for ReactDOM to render the control into, appended to floating toolbar
  const [controlContainer] = useState(() => {
    const el = document.createElement('div');
    el.style.cssText = 'pointer-events: auto;'; // toolbar uses `Html` which disables `pointer-events`
    return el;
  });

  useLayoutEffect(() => {
    floatingToolbar?.append(controlContainer);
    return () => {
      controlContainer.remove();
    };
  }, [controlContainer, floatingToolbar]);

  useEffect(() => {
    ReactDOM.render(<>{children}</>, controlContainer); // eslint-disable-line react/jsx-no-useless-fragment
    return () => {
      ReactDOM.unmountComponentAtNode(controlContainer);
    };
  }, [children, controlContainer]);

  return <group />;
}

export default FloatingControl;
