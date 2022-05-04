/* eslint-disable import/no-anonymous-default-export */
import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import './css/GraphicsContainer.css';

export default ({ Graphic, url }) => {
  const myRef = useRef();
  const [state, setState] = useState({
    data: null,
  });

  useEffect(() => {
    const fetchData = async function () {
      const data = await d3.csv(url, (r) => ({
        ...r,
        ...Object.fromEntries(
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => [m, +r[m]])
        ),
      }));
      setState((s) => ({ ...s, data }));
    };
    fetchData();
  }, [url]);

  useEffect(() => {
    if (!state.data) {
      return;
    }
    const graphic = new Graphic(myRef.current, state.data);
    graphic.render();
  }, [Graphic, state.data]);

  return (
    <div className='graphics-element'>
      <div ref={myRef} className='graphics-container' />
    </div>
  );
};
