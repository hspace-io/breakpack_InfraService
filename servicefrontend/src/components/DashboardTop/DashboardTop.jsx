import { useNavigate } from 'react-router-dom';
import * as S from './DashboardTopStyled';


const DashboardTop = () => {
  const navigate = useNavigate();

  return (
    <S.Wrapper>
      <S.LeftSection>
        <S.A to="/">
          <S.Logo>
            <S.ShieldIcon />
          </S.Logo>
          <S.Title>Hspace Wargame</S.Title>
          <S.LiveBadge>● LIVE</S.LiveBadge>
          <S.Subtitle>hspace</S.Subtitle>
        </S.A>
      </S.LeftSection>
      <S.RightSection>
        <S.StatusText>📢 Notice</S.StatusText>
        <S.StatusText>🔓 logout</S.StatusText>
        <S.StatusText>👥 1,337 hackers online</S.StatusText>
        <S.ConsoleButton onClick={() => navigate('/admin')}>⌘ administration</S.ConsoleButton>
      </S.RightSection>
      <S.CompactIcons>
        📢 🔓 👥 ⌘
      </S.CompactIcons>
    </S.Wrapper>
  );
}

export default DashboardTop;