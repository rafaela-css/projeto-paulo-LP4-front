import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function LoadingButton() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setLoading(true);
    navigate('/new')
  };

  return (
    <Button
      variant="primary"
      disabled={isLoading}
      onClick={isLoading ? undefined : handleClick}
    >
      {isLoading ? 'Carregando' : 'Adicionar Nova Tarefa'}
    </Button>
  );
}

export default LoadingButton;
