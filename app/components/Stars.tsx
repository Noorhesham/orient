import { StarIcon } from 'lucide-react'
import React from 'react'

const Stars = () => {
  return (
<div className=" flex  items-center max-w-lg gap-2">
          <div className="flex gap-2">
            <StarIcon color="#FA8232" size={16} />
            <StarIcon color="#FA8232" size={16} />
            <StarIcon color="#FA8232" size={16} />
            <StarIcon color="#FA8232" size={16} />
            <StarIcon color="#FA8232" size={16} />
          </div>
          <p className=" font-semibold text-sm">4.7 star rating</p>
          <p className=" ml-2">{`(21,432 User feedback)`}</p>
          <div></div>
        </div>
  )
}

export default Stars
