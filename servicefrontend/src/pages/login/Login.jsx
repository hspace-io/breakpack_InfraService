import * as S from "./styled/LoginStyled"
import Spline from '@splinetool/react-spline'
import React, { useState } from "react"
import { ArrowBigLeftDash } from "lucide-react"

const LoginPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [userName, setUserName] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
1001.00
  return (
    <S.LoginWrapper>
      <S.SplineObjectWrapper>
        <Spline
          scene="/spline/domino.spline"
          onLoad={() => setIsLoaded(true)}
        />
      </S.SplineObjectWrapper>

      {isLoaded ? (
        <>
          {/* 여기 로그인 폼 */}
          <S.LoginForm>         
              <S.ArrowBigLeftDash>
                <S.A to="/"><ArrowBigLeftDash/></S.A>
              </S.ArrowBigLeftDash> 
            <S.LogoImag>
              <img src="/svg/hspace-logo-edited.svg" alt="logo"/>
            </S.LogoImag>
            {/* <h1>Login</h1> */}
            <S.InputWrapper>
              <S.Input>
                <S.InputTag
                  id="LidInput"
                  type="text"
                  required
                  equal={true}
                  onChange={(e) => setUserName(e.target.value)}
                ></S.InputTag>
                <S.Label htmlFor="LidInput">ID: </S.Label>
                <S.UnderLine></S.UnderLine>
              </S.Input>
              <S.Input>
                <S.InputTag
                  id="LidInput"
                  type="text"
                  required
                  equal={true}
                  onChange={(e) => setUserName(e.target.value)}
                ></S.InputTag>
                <S.Label htmlFor="LidInput">PW: </S.Label>
                <S.UnderLine></S.UnderLine>
              </S.Input>
            </S.InputWrapper>
            <S.LoginButtonWrapper>
              <S.LoginButton type="submit">Login</S.LoginButton>
              <S.SplitLine><hr/> · <hr/></S.SplitLine>
              <S.GoogleLoginButton>
                <img src="/img/Google__G__logo.svg.webp" alt="google logo"/>
                Login With Google
              </S.GoogleLoginButton>
            </S.LoginButtonWrapper>
            <S.A to="/signup">You don't have an account?</S.A>
          </S.LoginForm>
          <S.EffectDiv/>
          <S.EffectEntire/>
        </>
      ) : (
        <div style={{
          color: 'white',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.5em'
        }}>
          Loading...
        </div>
      )}
    </S.LoginWrapper>
  )
}

export default LoginPage