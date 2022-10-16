import { Oval } from  'react-loader-spinner'
import React from 'react'

function spinner() {
  return (
<Oval
  height={10}
  width={30}
  color="white"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="#A749FF"
  strokeWidth={2}
  strokeWidthSecondary={2}

/>
  )
}

export default spinner
