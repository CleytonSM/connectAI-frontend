"use client";
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import Button from "../Button";
import { Modal } from "../Modal";

interface Consult {
  id: number;
  patient: {
    id: number;
    auth: {
      id: number;
      authName: string;
    };
    email: string;
    name: string;
    cpf: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    active: boolean;
  };
  doctor: {
    id: number;
    auth: {
      id: number;
      authName: string;
    };
    email: string;
    specialty: string;
    name: string;
    crm: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    active: boolean;
  };
  hasHappened: boolean;
  hour: string;
  description?: string;
  consultDate: string; // Added this property
}

export default function AppointmentList() {
  const [consults, setConsults] = useState<Consult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<Consult | null>(null);
  const [doctorId, setDoctorId] = useState<number | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("user-data");
    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        if (userData?.id) {
          setDoctorId(userData.id);
        } else {
          console.error("Doctor ID not found in user-data.");
        }
      } catch (error) {
        console.error("Failed to parse user-data from localStorage.", error);
      }
    } else {
      console.error("No user-data found in localStorage.");
    }
  }, []);

  useEffect(() => {
    if (doctorId === null) return; // Don't fetch consults until doctorId is available

    async function fetchConsults() {
      try {
        const response = await fetch(
          `https://hackaton-api-production-a002.up.railway.app/api/consults/doctors/${doctorId}/all`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch consults");
        }
        const data: Consult[] = await response.json();

        // Filter consults to include only today's appointments
        const today = new Date();
        const todayConsults = data.filter((consult) => {
          // Combine consultDate and hour to create a full Date object
          const [hour, minute, second] = consult.hour.split(":").map(Number);
          const consultDate = new Date(consult.consultDate);
          consultDate.setHours(hour, minute, second);

          return (
            consultDate.getDate() === today.getDate() &&
            consultDate.getMonth() === today.getMonth() &&
            consultDate.getFullYear() === today.getFullYear()
          );
        });
        setConsults(todayConsults);
      } catch (err) {
        console.error(err); // Log the error for debugging
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchConsults();
  }, [doctorId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-600">Error: {error}</p>;
  }

  if (consults.length === 0) {
    return <p className="text-gray-600">Sem consultas para hoje.</p>;
  }

  return (
    <>
      <ul className="steps steps-vertical w-fit">
        {consults.map((c) => (
          <li
            key={c.id}
            className={`step ${c.hasHappened ? "step-primary" : ""}`}
          >
            <div className="flex items-center gap-2 group">
              <Button
                type="button"
                aria-label={`View ${c.patient.name}`}
                title={`View ${c.patient.name}`}
                onClick={() => {
                  setSelected(c);
                  setIsModalOpen(true);
                }}
                // override .btn visual styles to make it appear like plain text
                className="text-sm bg-transparent p-0 m-0 focus:outline-none border-0 shadow-none normal-case h-auto min-h-0"
              >
                <span className="hover:font-bold group-hover:font-bold transition-all duration-150">
                  {c.patient.name}
                </span>{" "}
                at {c.hour}
              </Button>

              <Button
                type="button"
                aria-label={`View ${c.patient.name}`}
                title={`View ${c.patient.name}`}
                className="opacity-0 group-hover:opacity-100 transition-all duration-150 text-primary bg-primary/10 hover:bg-primary/20 p-1 rounded-full shadow-sm focus:outline-none"
                onClick={() => {
                  setSelected(c);
                  setIsModalOpen(true);
                }}
              >
                <Eye className="w-5 h-5" aria-hidden="true" />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelected(null);
        }}
        title={selected ? `Consultas — ${selected.patient.name}` : undefined}
      >
        {selected ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              <strong>Paciente:</strong> {selected.patient.name}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Horário:</strong> {selected.hour}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Descrição:</strong> {selected.description ?? "-"}
            </p>
            <p className="text-sm">
              <strong>Status:</strong>{" "}
              <span
                className={
                  selected.hasHappened ? "text-green-600" : "text-yellow-600"
                }
              >
                {selected.hasHappened ? "Completed" : "Pending"}
              </span>
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </>
  );
}
