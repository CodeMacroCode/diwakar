import React from 'react';
import FloatingHearts from './components/FloatingHearts';
import Hero from './components/Hero';
import Gallery3D from './components/Gallery3D';
import InfoSection from './components/InfoSection';
import Proposal from './components/Proposal';

const App: React.FC = () => {
  return (
    <main className="relative w-full overflow-hidden">
      <FloatingHearts />
      <Hero />
      <Gallery3D />
      <InfoSection />
      <Proposal />
      
      {/* <footer className="bg-slate-900 text-white/30 py-8 text-center text-sm">
        <p>Made with love & React</p>
      </footer> */}
    </main>
  );
};

export default App;