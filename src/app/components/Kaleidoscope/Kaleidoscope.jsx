import React from 'react';
import ReactDOM from 'react-dom';

export function Rotate(props) {
  return (
    <div
      style={{
        position: 'absolute',
        transformOrigin: 'right bottom',
        transform: 'rotate(' + props.angle + 'rad)',
      }}
    >
      {props.children}
    </div>
  );
}

// Returns (props.slices) amount of triangle shaped components that use (props.img) as background image
// > first clip the slice to triangle shape, triangle size based on (props.r)
// > rotate all triangles around the center
// > move background image based on x,y props
export function Kaleidoscope(props) {
  // returns an array containing the 'slices' of the kaleidoscope
  function cali() {
    let c = [];

    // returns a triangle shaped clipping mask based on angle
    let setClipPath = (angle) => {
      let len = Math.tan((Math.PI / 2 - angle) / 2) * 100;

      // apply chosselmetrie
      return 'polygon(0% 0%, 100% ' + len + '%, ' + len + '% 100%)';
    };

    // Determine clipping mask based on the amount of slices prop
    let clipPath = setClipPath((Math.PI * 2) / props.slices);

    // Create all slices and push to array
    for (let i = 0; i < props.slices; i += 1) {
      let sliceAngle = ((Math.PI * 2) / props.slices) * i + 'rad';
      let angle = ((Math.PI * 2) / props.slices) * i;
      let transformStyle = 'rotate(' + sliceAngle + ')';

      c.push(
        <Rotate angle={angle}>
          <div
            id='clip'
            style={{
              position: 'absolute',
              width: '1vw' > '1vh' ? props.r + 'vw' : props.r + 'vh',
              height: '1vw' > '1vh' ? props.r + 'vw' : props.r + 'vh',
              zIndex: i,
              overflow: 'hidden',
              clipPath: clipPath,
            }}
          >
            <div
              id='image'
              style={{
                display: 'block',
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundImage: 'url(' + props.img + ')',
                backgroundSize: 400 / props.slices + 'vw',
                backgroundPosition: props.x + 'px ' + props.y + 'px',
                transform:
                  i % 2 == 0 ? ' scale(-1, 1) rotate(90deg)' : ' scale(1,1)',
              }}
            />
          </div>
        </Rotate>
      );
    }

    return c;
  }

  return (
    <div
      style={{
        top: '50%',
        left: '50%',
        align: 'center',
        mixBlendMode: 'difference',
        position: 'absolute',
        transform: props.transform,
      }}
    >
      {cali()}
    </div>
  );
}
