/* eslint-disable no-unused-vars */
import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import * as S from "./styled/FirstsectionStyled"
import Topbar from "../../components/topbar/Topbar"
import { useNavigate } from "react-router-dom"

const Firstsection = ({ title, description, color }) => {
  const ref = useRef()
  const inView = useInView(ref, {})
  const [videoLoaded, setVideoLoaded] = useState(false)
  const navigate = useNavigate()

  return (
    <S.SectionWrapper ref={ref} $highlighted={inView} $color={color}>
      <Topbar />
      <S.BackgroundVid
        as={S.BackgroundVid}
        src="/vid/Nebula_7mb.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        onCanPlayThrough={(e) => {
          const video = e.currentTarget;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.then(() => {
              setVideoLoaded(true);
            }).catch((error) => {
              console.error("Video failed to play automatically:", error);
            });
          } else {
            setVideoLoaded(true);
          }
        }}
      />
      <S.Blackcurtain/>
      {videoLoaded && (
        <S.ContentsWrapper>
          <S.SvgBox> 
            <S.Image
              src="/svg/hspace-logo-edited.svg" alt="hspace logo"
            />
          </S.SvgBox>
          <motion.p>
            Are You Ready to Start Hack?
          </motion.p>
          <S.LetstartButton onClick={() => navigate('/dashboard')}>
            I'm ready to start participated in the Wargame
          </S.LetstartButton>
        </S.ContentsWrapper>
      )}
    </S.SectionWrapper>
  )
}

export default Firstsection