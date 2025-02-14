"use client";
import React, { useEffect, useState } from "react";

const PushNotificationIos = () => {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  return (
    <div>
      {isIOS && (
        <>
          <h3 className="text-xl font-bold">Installeer App op Apple</h3>
          <p>
            Om deze app te installeren, druk op de Deel knop en dan &quot;Toevoegen aan startcherm&quot; (of zoiets)
            <span role="img" aria-label="plus icon">➕</span>
            .
          </p>
          <p>Disclaimer: ik heb geen Apple toestel dus ik weet niet of dit werkt</p>
        </>
      )}
    </div>
  );
};

export default PushNotificationIos;
