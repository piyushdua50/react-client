import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Math } from '../../components';

export default () => (
  <>
    <p>
      <Math first={7} second={4} operator="+" />
    </p>
    <p>
      <Math first={7} second={4} operator="-" />
    </p>
    <p>
      <Math first={7} second={4} operator="*" />
    </p>
    <p>
      <Math first={7} second={4} operator="/" />
    </p>
    <p>
      <Math first={7} second={0} operator="/" />
    </p>
    <p>
      <Math first={7} second={4} operator="^" />
    </p>
    <div>
      <Math first={7} second={4} operator="+">
        {
          ({ first, second, result }) => (
            <Typography variant="h6">
              {`Sum of ${first} and ${second} is ${result}`}
            </Typography>
          )
        }
      </Math>
    </div>
  </>
);
