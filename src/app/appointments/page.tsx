
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import TabBar from '@/components/TabBar';

interface Appointment {
  id: string;
  title: string;
  start_datetime: string;
  end_datetime: string;
  description?: string;
  location?: string;
  client_id?: number;
  client_denominazione?: string;
  status?: string;
}

const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  const startDate = new Date(appointment.start_datetime);
  const endDate = new Date(appointment.end_datetime);

  return (
    <div className="bg-white shadow-sm rounded-lg p-3 sm:p-4 mb-4 hover:shadow-md transition-shadow">
      <h3 className="text-md sm:text-lg font-semibold text-gray-800">{appointment.title}</h3>
      <p className="text-xs sm:text-sm text-gray-600">
        {startDate.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })}
        {' '}
        {startDate.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })} - 
        {endDate.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
      </p>
      {appointment.client_denominazione && <p className="text-xs sm:text-sm text-gray-500">Cliente: {appointment.client_denominazione}</p>}
      {appointment.location && <p className="text-xs sm:text-sm text-gray-500">Luogo: {appointment.location}</p>}
      {appointment.status && <p className="text-xs sm:text-sm text-gray-500">Stato: <span className="font-medium">{appointment.status}</span></p>}
    </div>
  );
};

export default function AppointmentsPage() {
  const { isAuthenticated, token, isLoading, logout } = useAuth();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    } else if (isAuthenticated && token) {
      const fetchAppointments = async () => {
        setPageLoading(true);
        setError(null);
        try {
          const response = await fetch('https://derols.com/wp-json/xendor-crm/v1/appointments', {
            headers: {
              // 'Authorization': `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                logout();
                router.push('/login');
                return;
            }
            throw new Error(`Errore API: ${response.statusText}`);
          }
          const data = await response.json();
          setAppointments(data as Appointment[]); 
        } catch (err: any) {
          setError(err.message || 'Errore nel caricamento degli appuntamenti.');
          console.error(err);
        }
        setPageLoading(false);
      };
      fetchAppointments();
    }
  }, [isLoading, isAuthenticated, token, router, logout]);

  if (isLoading || pageLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Caricamento...</div>;
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Accesso negato. Reindirizzamento al login...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16 sm:pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-300 rounded-full mr-2"></div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-700">Appuntamenti</h1>
          </div>
          <button className="text-indigo-600 hover:text-indigo-800 p-1 sm:p-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </header>

      <main className="max-w-xl mx-auto p-4 sm:px-6 lg:px-8">
        {error && <p className="text-red-500 text-center mb-4 text-xs sm:text-sm">{error}</p>}
        {appointments.length > 0 ? (
          appointments.map(appointment => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))
        ) : (
          !error && <p className="text-gray-500 text-center text-sm sm:text-base">Nessun appuntamento trovato.</p>
        )}
      </main>

      <TabBar />
    </div>
  );
}

