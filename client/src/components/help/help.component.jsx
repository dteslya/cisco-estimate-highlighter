import React from 'react';
import {
    Box,
    Markdown,
  } from 'grommet';

export const Help = () => {
  return (
    <Box pad="small">
      <Markdown>{
`## How to use

Upload CCW estimate in XLSx format. Resulting file will be downloaded automatically.
        
## Matching criteria
* Part Numbers starting with **R-**, **L-**, **S-**, **LIC-** or ending with **Y** and **Price > $0**
* Part Numbers containing **-nY-** and **Price > $0** where **n** is in range from 1 to 9
* Description contains **eDelivery** and **Price > $0**
* **Lead time <= 10 days** and **Price > $0**`}
      </Markdown>
    </Box>
  )
}