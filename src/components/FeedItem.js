import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import Div100vh from 'react-div-100vh'

const FeedItem = ({ data, before, after, goto }) => {
  const { block_key, video, buttons, buttonTitle, name, logo, link } = data
  const player = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    if (loaded && before) {
      try {
        player.current.seekTo(0)
      } catch (err) {
        console.log(err)
      }
    }
    // eslint-disable-next-line
  }, [before])

  useEffect(() => {
    setMuted(after)
    setPlaying(after)
    // setTimeout(() => setMuted(false), 100)
    if (loaded && !after) {
      try {
        player.current.seekTo(0)
      } catch (err) {
        console.log(err)
      }
    }
    // eslint-disable-next-line
  }, [after])

  return video ? (
    <Div100vh className="feed-item">
      <div
        className="video-section"
        onClick={() => setPlaying(!playing)}
        style={{ width: '100%', height: '100vh', zIndex: 1 }}
      >
        <ReactPlayer
          id={`video-${block_key}`}
          ref={player}
          url={`/videos/${video}`}
          width="100%"
          height="100%"
          className="video-bg"
          onReady={() => setLoaded(true)}
          playing={playing}
          muted={muted}
          loop={true}
          volume={1}
          playsinline={true}
        />
      </div>
      <div className="top-section" style={{ zIndex: 2 }}>
        <img
          src={`/images/${logo}`}
          className="logo"
          width={30}
          height={30}
          alt="logo"
        />
        <h1 className="title">{name}</h1>
        <img
          onClick={() => setMuted(!muted)}
          src={`/images/${muted ? 'mute' : 'unmute'}.svg`}
          className="mute"
          width={30}
          height={30}
          alt="mute-unmute"
        />
      </div>
      <div className="bottom-section" style={{ zIndex: 2 }}>
        <h2>{buttonTitle}</h2>
        <div className="button-group">
          {buttons.map((button, index) => (
            <button
              type="button"
              key={index}
              className={`feed-button ${button.wide && 'wide'} ${
                button.center && 'center'
              }`}
              onClick={() => goto(button.goto)}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </Div100vh>
  ) : (
    <Div100vh className="feed-item link-section">
      <a href={link} className="end-link" target="_blank" rel="noreferrer">
        {name}
      </a>
    </Div100vh>
  )
}

export default FeedItem
