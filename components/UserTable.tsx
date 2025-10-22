'use client';
import React from 'react';
import { Usuario } from './types';
import { joinDates } from './utils';

interface Props {
  data: Usuario[];
  onEdit: (u: Usuario) => void;
  onDelete: (u: Usuario) => void;
}

export default function UserTable({ data, onEdit, onDelete }: Props) {
  return (
    <table className="table table-bordered mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Día de Ovulación</th>
          <th>Días de Inseminación</th>
          <th>Partos Probables</th>
          <th>Día de Parto</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map(u => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.Nombre}</td>
            <td>{u.DiadeOvulacion.toLocaleDateString()}</td>
            <td>{joinDates(u.Diasdeinsemiacion)}</td>
            <td>{joinDates(u.PartosProbables)}</td>
            <td>{u.DiaDeParto.toLocaleDateString()}</td>
            <td>
              <button className="btn btn-primary me-2" onClick={() => onEdit(u)}>
                Editar
              </button>
              <button className="btn btn-danger" onClick={() => onDelete(u)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
