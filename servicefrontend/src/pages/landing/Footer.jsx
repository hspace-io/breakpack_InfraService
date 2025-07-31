/* eslint-disable no-unused-vars */
import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import * as S from "./styled/FirstsectionStyled"
import Topbar from "../../components/topbar/Topbar"

const Firstsection = ({ title, description, color }) => {
  const ref = useRef()
  const inView = useInView(ref, { margin: "0% 0px 0% 0px", once: false })
  const videoRef = useRef(null)

  return (
    <S.SectionWrapper ref={ref} $highlighted={inView} $color={color}>
      <S.ContentsWrapper>
        <motion.h2
          initial={{ opacity: 0.3 }}
          animate={{ opacity: inView ? 1 : 0.3 }}
          transition={{ duration: 0.6 }}
        >
          test
        </motion.h2>
        <motion.p
          initial={{ opacity: 0.2 }}
          animate={{ opacity: inView ? 1 : 0.2 }}
          transition={{ duration: 0.6 }}
        >
          test
        </motion.p>
      </S.ContentsWrapper>
    </S.SectionWrapper>
  )
}

export default Firstsection