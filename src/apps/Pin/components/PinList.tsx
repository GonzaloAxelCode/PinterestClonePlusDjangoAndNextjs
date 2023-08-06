import React from 'react'
import usePin from 'apps/Pin/hooks/usePin';

const PinList = () => {
    const { allPins }  = usePin();
  return (
    <div>PinList</div>
  )
}

export default PinList