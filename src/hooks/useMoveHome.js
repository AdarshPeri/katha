import { useNavigate } from 'react-router-dom';

export function useMoveHome() {
  const navigate = useNavigate();
  return () => navigate('/');
}
