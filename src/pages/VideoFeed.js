import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import { FeedItem } from '../components'
import config from '../data/config.json'

const VideoFeed = () => {
  const slider = useRef(null)
  const [beforeIndex, setBeforeIndex] = useState(0)
  const [AfterIndex, setAfterIndex] = useState(0)

  const settings = {
    dots: false,
    speed: 1400,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    adaptiveHeight: true,
    beforeChange: (current, next) => setBeforeIndex(next),
    afterChange: (current, next) => setAfterIndex(current),
  }

  const goto = (blockId) => {
    try {
      const index = config.findIndex((block) => block.block_key === blockId)
      if (index < 0) {
        slider.current.slickGoTo(beforeIndex + 1)
      } else {
        slider.current.slickGoTo(index)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Slider
      ref={slider}
      {...settings}
    >
      {config.map((item, index) => (
        <FeedItem
          data={item}
          key={index}
          before={beforeIndex === index}
          after={AfterIndex === index}
          goto={goto}
        />
      ))}
    </Slider>
  )
}

export default VideoFeed
