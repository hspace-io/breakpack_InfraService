import { useState } from 'react';
import { ChevronsLeft, ChevronsRight, CirclePlus, ChartNoAxesCombined, User, Users, LogOut } from 'lucide-react';
import * as S from './DashboardSideStyled';
import DClock from "../DigitalClock/DigitalClock";
import { logout } from "../../hook/Auth/AuthLogout";

const DashboardSide = ({toggle}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
    toggle(prev => !prev);
  };

  return (
    <S.Wrapper isOpen={isOpen}>
      <S.ToggleButtonWrapper isOpen={isOpen}>      
        <S.ToggleButton onClick={toggleSidebar} >
          {isOpen ? <ChevronsLeft size={20} /> : <ChevronsRight size={20} />}
        </S.ToggleButton>
      </S.ToggleButtonWrapper>

      <S.SectionTitle isOpen={isOpen}>
        <div>
          Domain<br />
          Overview
        </div>
      </S.SectionTitle>
      <S.StatsWrapper><S.Stats isOpen={isOpen}>
        <S.StatCard isOpen={isOpen}>
          <S.StatIcon><CirclePlus/></S.StatIcon>
          <S.StatLabel isOpen={isOpen}>targets</S.StatLabel>
          <S.StatValue isOpen={isOpen}>6</S.StatValue>
        </S.StatCard>
        <S.StatCard isOpen={isOpen}>
          <S.StatIcon><ChartNoAxesCombined/></S.StatIcon>
          <S.StatLabel isOpen={isOpen}>ServerStatus</S.StatLabel>
          <S.StatValue style={{ color: '#22c55e' }} isOpen={isOpen}>{`2`} server alive</S.StatValue>
        </S.StatCard>
      </S.Stats>
      <S.SectionTitle isOpen={isOpen}>
        <div>
          Users
        </div>
      </S.SectionTitle>
      <S.Stats isOpen={isOpen}>
        <S.StatCard isOpen={isOpen}>
          <S.StatIcon><Users/></S.StatIcon>
          <S.StatLabel isOpen={isOpen}>targets</S.StatLabel>
          <S.StatValue isOpen={isOpen}>{`6`} people participating</S.StatValue>
        </S.StatCard>
        <S.StatCard isOpen={isOpen} style={{ cursor: "pointer" }} >
          <S.StatIcon><User/></S.StatIcon>
          <S.StatLabel isOpen={isOpen}>My Information</S.StatLabel>
          <S.StatValue isOpen={isOpen}>Setting</S.StatValue>
        </S.StatCard>
        <S.StatCard isOpen={isOpen} style={{ cursor: "pointer" }} onClick={logout}>
          <S.StatIcon><LogOut/></S.StatIcon>
          <S.StatValue isOpen={isOpen}>Logout</S.StatValue>
        </S.StatCard>
      </S.Stats>
      </S.StatsWrapper>
      
      <S.TailInformationArea isOpen={isOpen}>
        <h4>Time left until the end</h4>
        <DClock isOpen={isOpen} />
      </S.TailInformationArea>
    </S.Wrapper>
  );
};

export default DashboardSide;