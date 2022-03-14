import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'

const FeedItem = ({ data, before, after, goto }) => {
  const { video, buttons } = data // block_key, name, 
  const player = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    try {
      player.current.seekTo(0)
    } catch (err) {
      console.log(err)
    }
  }, [before])

  useEffect(() => {
    setPlaying(after)
    setMuted(after)
  }, [after])

  // const state = {
  //   pip: false,
  //   playing: true,
  //   controls: false,
  //   light: false,
  //   volume: 0.8,
  //   muted: false,
  //   played: 0,
  //   loaded: 0,
  //   duration: 0,
  //   playbackRate: 1.0,
  //   loop: false,
  // }

  return (
    <div className="feed-item">
      <div className="video-section">
        <ReactPlayer
          ref={player}
          url={`/videos/${video}`}
          width="100%"
          height="100%"
          className="video-bg"
          playing={playing}
          muted={muted}
        />
      </div>
      <div className="action-section">
        {buttons.map((button, index) => (
          <button
            type="button"
            key={index}
            className="feed-button"
            onClick={() => goto(button.goto)}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FeedItem
