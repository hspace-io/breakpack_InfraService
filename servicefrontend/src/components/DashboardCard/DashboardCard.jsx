import * as S from './DashboardCardStyled';
import { useState, useEffect } from 'react';

const DashboardCard = ({ instance }) => {
  const [timestamp, setTimestamp] = useState(Date.now());
  const [imgSrc, setImgSrc] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(Date.now());
    }, 30000); // 30초마다 새로고침
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (instance.id) {
      setImgSrc(`${import.meta.env.VITE_API_URL}/${instance.id}/screenshot?ts=${Date.now()}`);
    }
  }, [instance.id, retryCount]);

  const handleImageError = () => {
    setTimeout(() => {
      setRetryCount(prev => prev + 1);
    }, 1000);
  };

  return (
    <S.BasicWrapper>
      <S.MonitorWrapper>
        {imgSrc ? (
          <img
            src={imgSrc}
            onError={handleImageError}
            title="Wargame Server"
            allow="fullscreen"
            alt="Wargame Server Screenshot"
          />
        ) : (
          <p>...loading</p>
        )}
      </S.MonitorWrapper>
      <S.Title>{instance.name}</S.Title>
      <S.Parea>
        <p>Server Port: {instance.port}</p>
        <p>status: {instance.status}</p>
      </S.Parea>
    </S.BasicWrapper>
  );
};

export default DashboardCard;