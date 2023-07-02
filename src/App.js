import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

const repo = "https://freshteacher.software";
let deferredPrompt;

function App() {
  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    const beforeInstallPromptHandler = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI to notify the user they can install the PWA
      setInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);

    window.addEventListener('appinstalled', () => {
      // Log install to analytics
      console.log('INSTALL: Success');
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstallPromptHandler);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Hide the app-provided install promotion
      setInstallable(false);
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Fresh Teacher's Technologies</h2>
        {installable && (
          <button className="install-button btn btn-primary" onClick={handleInstallClick}>
            <span><strong>INSTALL FRESH TEACHER'S APP ⬇️</strong></span> 
           

          </button>
        )}
        <p><br />
          <a href={repo} className="btn btn-success App-link">
            
            <span><b>GO TO FRESH TEACHER'S E-LIBRARY 📚</b></span> 
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
