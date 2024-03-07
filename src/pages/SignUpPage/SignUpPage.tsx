// SignUpPage.tsx
import React from 'react';
import SignUpForm from '../../components/SignupForm/SignupForm';

const SignUpPage = () => {
  const handleSave = () => {
    // Qui puoi gestire cosa succede dopo che un nuovo utente è stato registrato
    // Ad esempio, potresti reindirizzare l'utente alla pagina di login
  };

  return <SignUpForm onSave={handleSave} />;
};

export default SignUpPage;
