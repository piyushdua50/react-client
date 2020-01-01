import React from 'react';
import { TextField, Slider } from '../../components';
import { PUBLIC_IMAGE_FOLDER } from '../../configs/constants';

export const ImageArray = [
  `${PUBLIC_IMAGE_FOLDER}banners/default.png`,
  `${PUBLIC_IMAGE_FOLDER}banners/cloud.jpg`,
  `${PUBLIC_IMAGE_FOLDER}banners/dns-server.png`,
  `${PUBLIC_IMAGE_FOLDER}banners/full-stack-web-development.jpg`,
  `${PUBLIC_IMAGE_FOLDER}banners/js.jpg`,
  `${PUBLIC_IMAGE_FOLDER}banners/load-balancer.png`,
];

const TextFieldDemo = () => (
  <div>
    <Slider banners={ImageArray} random />
    <h4>This is a Disabled Input</h4>
    <TextField disabled value="Disabled Input" />
    <h4>A Valid Input</h4>
    <TextField value="Accessible" />
    <h4>An Input with Errors</h4>
    <TextField value="101" err="Could not be greater than" />
  </div>
);

export default TextFieldDemo;
