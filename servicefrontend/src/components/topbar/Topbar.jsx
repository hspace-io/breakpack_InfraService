import React from "react"
import * as S from "./Topbarstyled"

const Topbar = () => {
  return (
    <S.TopbarWrapper>
      <S.NavWrapper>      
        <S.NavItem>
          <S.A to="/">HSPACE</S.A>
        </S.NavItem>
      </S.NavWrapper>
      <S.NavWrapper>
        <S.NavItem>
          <S.A to="https://hspace.io/">About</S.A>
        </S.NavItem>
        <S.NavItem>
          <S.A to="/login">Login</S.A>
        </S.NavItem>
        <S.NavItem>
          <S.A to="/signup">Sing up</S.A>
        </S.NavItem>
      </S.NavWrapper>
      
    </S.TopbarWrapper>
  )
}

export default Topbar