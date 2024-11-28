import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import React from 'react';

export default function ErrorPage() {
  const history = useHistory();

  return (
    <div className="error-container">
      <h2>Please enter a valid email address</h2>
      <Button color="primary" onClick={() => history.push('/')}>
        Tekrar Dene
      </Button>
    </div>
  );
}
