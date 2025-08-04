import * as S from './styled/DashboardStyled'
import DashboardSide from "../../components/DashboardSide/DashboardSide";
import DashboardTop from '../../components/DashboardTop/DashboardTop'
import { useState } from 'react';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import { motion } from 'framer-motion';
import useDashboardInstances from '../../hook/DashboardGet';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { instances, loading, error } = useDashboardInstances();

  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading instances</div>;

  const allowedPorts = Array.from({ length: 301 }, (_, i) => 40200 + i); // 40200~40300 범위 포트 허용
  const filteredInstances = instances.filter(instance => allowedPorts.includes(instance.port));

  return (
    <S.Wrapper>
      <DashboardTop />
      <DashboardSide toggle={toggleSidebar}/>
      <S.MainContent isOpen={isOpen}>
        <S.SectionTitle>
          <div>
            <h1>
              Server State Check
            </h1>
            <p>
              Check the state of your server and its components.
            </p>
          </div>
        </S.SectionTitle>
        <S.CardContainter>
          {filteredInstances.map((instance, index) => (
            <S.Card
              key={instance.id}
              as={motion.div}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <DashboardCard instance={instance} />
            </S.Card>
          ))}
        </S.CardContainter>
      </S.MainContent>
    </S.Wrapper>
  )
}

export default Dashboard;