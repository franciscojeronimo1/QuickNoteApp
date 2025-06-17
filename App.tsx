// App.tsx
import React from 'react';
import QuickNoteApp from './src/QuickNote'; 
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <QuickNoteApp />
    </>
  );
}
