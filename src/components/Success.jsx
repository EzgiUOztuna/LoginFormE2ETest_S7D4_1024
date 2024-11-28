import React from 'react';

export default function Success() {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center', // Yatayda ortalama
        alignItems: 'center',    // Dikeyde ortalama
        width: "200vh",
        backgroundColor: '#f8f9fa', // Arka plan rengi (isteğe bağlı)
      }}>
      <h1 style={{ fontSize: '2.5rem', color: '#28a745', margin: 0 }} >Giriş başarılı!</h1>
    </div>
  );
}