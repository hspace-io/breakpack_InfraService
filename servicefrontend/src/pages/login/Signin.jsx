import * as S from "./styled/LoginStyled"
import Spline from '@splinetool/react-spline'
import React, { useState, useEffect } from "react"
import { ArrowBigLeftDash } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { Verify } from "../../hook/Auth/AuthVerify";
import { signup } from "../../hook/Auth/AuthSignin";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUsernameChecked, setIsUsernameChecked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  const navigate = useNavigate();

  const [shouldRenderSpline, setShouldRenderSpline] = useState(false);
  const splineRef = React.useRef(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const result = await Verify();
      if (result.username) {
        alert("이미 로그인 되어 있습니다.");
        navigate('/dashboard');
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    let frameCount = 0;
    let startTime = performance.now();

    const checkFPS = () => {
      frameCount++;
      const now = performance.now();
      const duration = now - startTime;

      if (duration >= 1000) {
        const fps = (frameCount / duration) * 1000;

        if (fps >= 100) setShouldRenderSpline(true);
        else {
          setShouldRenderSpline(false);
          setTimeout(() => {
            if (splineRef.current && splineRef.current.stop) {
              splineRef.current.stop();
            }
          }, 3000);
        }

        return;
      }

      requestAnimationFrame(checkFPS);
    };

    requestAnimationFrame(checkFPS);
  }, []);

  const checkUsernameDuplicate = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/check-username?username=${userName}`);
      if (res.ok) {
        alert("사용 가능한 ID입니다.");
        setIsUsernameChecked(true);
      } else {
        alert("이미 사용 중인 ID입니다.");
        setIsUsernameChecked(false);
      }
    } catch (err) {
      alert("중복 확인 실패");
    }
  };

  const canSubmit = isUsernameChecked && password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!isUsernameChecked) {
      alert("ID 중복 확인을 해주세요.");
      return;
    }
    const result = await signup({ username: userName, email, password });
    if (result.success) {
      alert("회원가입 성공!");
      navigate("/login");
    } else {
      alert("회원가입 실패: " + result.error);
    }
  };

  return (
    <S.LoginWrapper>
      <S.SplineObjectWrapper>
        <Spline
          ref={splineRef}
          scene={
            shouldRenderSpline
              ? "/spline/domino.spline"
              : "/spline/norotate.spline"
          }
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            console.error("🔴 Spline load error", e);
            setShouldRenderSpline(false);
          }}
        />
      </S.SplineObjectWrapper>

      {isLoaded ? (
        <>
          <S.LoginForm onSubmit={handleSubmit}>
            <S.ArrowBigLeftDash>
              <S.A to="/"><ArrowBigLeftDash/></S.A>
            </S.ArrowBigLeftDash> 
            <S.LogoImag>
              <img src="/svg/hspace-logo-edited.svg" alt="logo"/>
            </S.LogoImag>
            <S.InputWrapper>
              <S.Input>
                <S.InputTag
                  id="username"
                  type="text"
                  required
                  equal={true}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <S.Label htmlFor="username">Username: </S.Label>
                <S.UnderLine />
              </S.Input>
              <S.LoginButton onClick={checkUsernameDuplicate} type="button">ID 중복 확인</S.LoginButton>
              <S.Input>
                <S.InputTag
                  id="email"
                  type="email"
                  required
                  equal={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <S.Label htmlFor="email">Email: </S.Label>
                <S.UnderLine />
              </S.Input>
              <S.Input>
                <S.InputTag
                  id="password"
                  type="password"
                  required
                  equal={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <S.Label htmlFor="password">Password: </S.Label>
                <S.UnderLine />
              </S.Input>
              <S.Input>
                <S.InputTag
                  id="confirmPassword"
                  type="password"
                  required
                  equal={confirmPassword === password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <S.Label htmlFor="confirmPassword">Confirm PW: </S.Label>
                <S.UnderLine />
              </S.Input>
            </S.InputWrapper>
            <S.LoginButtonWrapper>
              <S.LoginButton type="submit" disabled={!canSubmit}>Submit</S.LoginButton>
            </S.LoginButtonWrapper>
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

export default LoginPage;