// components/DemoSample.tsx
import React, { useState } from 'react';
import { loadEngage } from '../lib/engageClient';

interface EngageInstance {
  pageView: (data: unknown) => Promise<unknown>;
  identity: (data: unknown) => Promise<unknown>;
}

let engageInstance: EngageInstance | null = null;

const DemoSample = () => {
  const [status, setStatus] = useState('');
  const [guestRef, setGuestRef] = useState<string | null>(null);

  const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  };

  const handleInit = async () => {
    try {
      if (!engageInstance) {
        engageInstance = (await loadEngage()) as EngageInstance;
        console.log('✅ Engage initialized:', engageInstance);
        setStatus('Engage SDK initialized successfully!');
      } else {
        setStatus('Engage is already initialized.');
      }

      const guestId = getCookie('bx_guest_ref');
      console.log('Guest Ref:', guestId);
      setGuestRef(guestId);
    } catch (err) {
      console.error('❌ Error initializing Engage:', err);
      setStatus('Error initializing Engage.');
    }
  };

  const handlePageView = async () => {
    try {
      if (!engageInstance) {
        setStatus('Please initialize Engage first.');
        return;
      }

      await engageInstance.pageView({
        channel: 'WEB',
        currency: 'USD',
        language: 'en',
        page: 'home',
        item: { id: guestRef || '' },
      });

      console.log('✅ Page view event sent!');
      setStatus('Page view event sent! (session started)');
    } catch (err) {
      console.error('❌ Error sending page view:', err);
      setStatus('Error sending page view.');
    }
  };

  const handleIdentity = async () => {
    try {
      if (!engageInstance) {
        setStatus('Please initialize Engage first.');
        return;
      }

      const eventData = {
        channel: 'WEB',
        currency: 'USD',
        pointOfSale: 'demo',
        language: 'EN',
        page: 'home',
        email: 'dhruvtrivedi2002@gmail.com',
        firstName: 'dhruv',
        lastName: 'trivedi',
        identifiers: [
          {
            provider: 'email',
            id: 'dhruvtrivedi2002@gmail.com',
          },
        ],
        item: { id: guestRef || '' },
      };

      await engageInstance.identity(eventData);

      console.log('✅ Identity event sent!', eventData);
      setStatus('Identity event sent!');
    } catch (err) {
      console.error('❌ Error sending identity:', err);
      setStatus('Error sending identity.');
    }
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h2>🔗 Sitecore Engage Demo</h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button onClick={handleInit}>Init Engage</button>
        <button onClick={handlePageView}>Send Page View</button>
        <button onClick={handleIdentity}>Send Identity</button>
      </div>
      <p>
        <strong>Status:</strong> {status}
      </p>
      {guestRef && (
        <p>
          🎯 <strong>bx_guest_ref:</strong> {guestRef}
        </p>
      )}
    </div>
  );
};

export default DemoSample;
