/* from https://medium.com/@650egor/simple-drag-and-drop-file-upload-in-react-2cb409d88929
   by Egor Egorov, Oct 28 2018
*/
import React, { Component } from 'react';

class DragAndDrop extends Component {
  public readonly state = {
    drag: false,
    dragging: false,
  };
  private dragCounter = 0;
  private readonly dropRef = React.createRef<HTMLDivElement>();

  public render() {
    return (
      <div
        style={{ display: 'inline-block', position: 'relative' }}
        ref={this.dropRef}
      >
        {this.state.dragging && (
          <div
            style={{
              border: 'dashed grey 4px',
              backgroundColor: 'rgba(255,255,255,.8)',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 9999,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: 0,
                left: 0,
                textAlign: 'center',
                color: 'grey',
                fontSize: 36,
              }}
            >
              <div>drop here :)</div>
            </div>
          </div>
        )}
        {this.props.children}
      </div>
    );
  }

  public componentDidMount() {
    const div = this.dropRef.current;
    this.dragCounter = 0;
    div.addEventListener('dragenter', this.handleDragIn);
    div.addEventListener('dragleave', this.handleDragOut);
    div.addEventListener('dragover', this.handleDrag);
    div.addEventListener('drop', this.handleDrop);
  }

  public componentWillUnmount() {
    const div = this.dropRef.current;
    div.removeEventListener('dragenter', this.handleDragIn);
    div.removeEventListener('dragleave', this.handleDragOut);
    div.removeEventListener('dragover', this.handleDrag);
    div.removeEventListener('drop', this.handleDrop);
  }

  private readonly handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  private readonly handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ drag: true });
    }
  };
  private readonly handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.setState({ drag: false });
    }
  };
  private readonly handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ drag: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };
}
export default DragAndDrop;
