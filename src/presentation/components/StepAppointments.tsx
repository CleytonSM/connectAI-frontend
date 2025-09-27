"use client";
import { useEffect, useState } from "react";

const atendimentos = [
  {
    id: 1,
    paciente: "João Silva",
    horario: "09:00",
    descricao: "Consulta de rotina",
  },
  {
    id: 2,
    paciente: "Maria Souza",
    horario: "10:30",
    descricao: "Retorno de exames",
  },
  {
    id: 3,
    paciente: "Alysson Lemes teste",
    horario: "12:30",
    descricao: "Retorno de exames",
  },
  {
    id: 4,
    paciente: "Alysson Lemes teste",
    horario: "12:30",
    descricao: "Retorno de exames",
  },
  {
    id: 5,
    paciente: "Alysson Lemes teste",
    horario: "12:30",
    descricao: "Retorno de exames",
  },
  {
    id: 6,
    paciente: "Alysson Lemes teste",
    horario: "19:30",
    descricao: "Retorno de exames",
  },
  {
    id: 7,
    paciente: "Alysson Lemes teste",
    horario: "22:30",
    descricao: "Retorno de exames",
  },
];

export default function StepsAtendimentos() {
  const [now, setNow] = useState<Date>(new Date());

  // update current time every 30 seconds so the UI reflects passing appointments
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const parseTimeToToday = (time: string) => {
    const [hh, mm] = time.split(":").map((s) => parseInt(s, 10));
    const d = new Date(now);
    d.setHours(hh, mm, 0, 0);
    return d;
  };

  return (
    <ul className="steps steps-vertical w-fit">
      {atendimentos.map((a) => {
        const appointmentDate = parseTimeToToday(a.horario);
        const isCompleted = appointmentDate <= now;

        return (
          <li
            key={a.id}
            className={`step ${isCompleted ? "step-primary" : ""}`}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm">
                {a.paciente} às {a.horario}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
