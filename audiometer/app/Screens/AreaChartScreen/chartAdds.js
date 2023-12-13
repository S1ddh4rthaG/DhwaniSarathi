import React from 'react';
import { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';

export const Line = (props) => {
  const { line } = props;
  return <Path key={'line'} d={line} stroke={'#0000BF'} fill={'none'} />;
};

export const Dots = (props) => {
  const { x, y, data } = props;
  return (
    <>
      {data?.map((value, index) => (
        <Circle
          key={index}
          cx={x(index)}
          cy={y(value)}
          r={4}
          stroke={'rgb(0, 0, 0)'}
          fill={'white'}
        />
      ))}
    </>
  );
};

export const Gradient = () => (
  <Defs>
    <LinearGradient id={'gradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
      <Stop offset={'0%'} stopColor={'rgb(194, 65, 244)'} stopOpacity={0.8} />
      <Stop offset={'100%'} stopColor={'rgb(134, 65, 244)'} stopOpacity={0.2} />
    </LinearGradient>
  </Defs>
);
