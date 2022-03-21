import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import Div100vh, { use100vh } from 'react-div-100vh'

const FeedItem = ({ data, before, after, goto }) => {
  const {
    block_key,
    block,
    title,
    subTitle,
    video,
    avatar,
    fullname,
    role,
    subject,
    logo,
    buttons,
  } = data
  const pageHeight = use100vh()
  const player = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)

  const [fitted, setFitted] = useState(false)
  const [width, setWidth] = useState('100%')

  useEffect(() => {
    if (video) {
      if (loaded) {
        const video = document.querySelector(`#video-${block_key} video`)
        if (
          pageHeight / window.innerWidth <
          video.videoHeight / video.videoWidth
        ) {
          setWidth(Math.ceil((video.videoWidth * pageHeight) / video.videoHeight))
        }
        setFitted(true)
      }
    } else {
      setFitted(true)
    }
    // eslint-disable-next-line
  }, [loaded])

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

  return (
    <Div100vh className={`feed-item ${video ? '' : 'link-section'}`}>
      <div
        className="video-section"
        onClick={() => setPlaying(!playing)}
        style={{ width: '100%', height: '100vh' }}
      >
        {video && (
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
        )}
      </div>
      <div
        className="top-section"
        style={{ width, visibility: fitted ? 'visible' : 'hidden' }}
      >
        <div className="block-info">
          <img
            src={`/images/logo.png`}
            className="logo"
            width={40}
            height="auto"
            alt="logo"
            onClick={() => goto('home')}
          />
          <div className="block-title">
            <h4 className="title bold">Hibob</h4>
            {title ? <h4 className="title">{title}</h4> : null}
            {block ? <h4 className="title">#{block}</h4> : null}
          </div>
        </div>
        <div className="block-action">
          {block_key !== 'open-position' && (
            <button
              type="button"
              className="feed-button"
              onClick={() => goto('open-position')}
            >
              Open positions
            </button>
          )}
          {!!video && <img
            onClick={() => setMuted(!muted)}
            src={`/images/${muted ? 'mute' : 'unmute'}.svg`}
            className="mute"
            width={24}
            height={24}
            alt="mute-unmute"
          />}
        </div>
      </div>
      <div
        className="bottom-section"
        style={{ width, visibility: fitted ? 'visible' : 'hidden' }}
      >
        <div>
          <div className="profile">
            {avatar ? (
              <img
                src={`/images/${avatar}`}
                className="avatar"
                width={50}
                height="auto"
                alt="avatar"
              />
            ) : null}
            <div>
              {fullname ? <p className="fullname">{fullname}</p> : null}
              {role ? <p className="role">{role}</p> : null}
            </div>
          </div>
          {subject ? <p className="subject">{subject}</p> : null}
        </div>
        {logo ? (
          <img
            src={`/images/${logo}`}
            className="page-logo"
            width={width === '100%' ? '50%' : width / 2}
            height="auto"
            alt="page-logo"
          />
        ) : null}
        <h2 className="sub-title">{subTitle}</h2>
        <div className="button-group">
          {buttons?.map((button, index) =>
            block_key === 'open-position' ? (
              <a href={button.goto} target="_blank" rel="noreferrer" key={index}>
                <button
                  type="button"
                  className={`feed-button ${button.wide && 'wide'} ${
                    button.center && 'center'
                  }`}
                  onClick={() => goto(button.goto)}
                >
                  {button.label}
                </button>
              </a>
            ) : (
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
            ),
          )}
        </div>
        <span className="powered-by">powered by Team.me</span>
      </div>
    </Div100vh>
  )
}

export default FeedItem
