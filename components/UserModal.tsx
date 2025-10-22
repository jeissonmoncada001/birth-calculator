'use client';
import React from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { Usuario } from './types';
import { formatDate } from './utils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  user: Usuario | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddDate?: () => void;
  title: string;
  showAddDate?: boolean;
  disableAdd?: boolean;
}

export default function UserModal({
  isOpen,
  onClose,
  onSubmit,
  user,
  onChange,
  onChangeDate,
  onAddDate,
  title,
  showAddDate = false,
  disableAdd = false,
}: Props) {
  if (!user) return null;

  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose}>{title}</ModalHeader>
      <ModalBody>
        <input className="form-control mb-2" readOnly value={user.id} />
        <input
          className="form-control mb-2"
          placeholder="Nombre"
          name="Nombre"
          value={user.Nombre}
          onChange={onChange}
        />
        <input
          className="form-control mb-2"
          type="date"
          name="DiadeOvulacion"
          value={formatDate(user.DiadeOvulacion)}
          onChange={onChange}
        />
        {user.Diasdeinsemiacion.map(input => (
          <input
            key={input.id}
            className="form-control mb-2"
            type="date"
            name={String(input.id)}
            value={formatDate(input.date)}
            onChange={onChangeDate}
          />
        ))}
        {showAddDate && (
          <button
            disabled={disableAdd}
            className="btn btn-success mt-2"
            onClick={onAddDate}
          >
            Añadir fecha
          </button>
        )}
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={onSubmit}>
          Guardar
        </button>
        <button className="btn btn-danger" onClick={onClose}>
          Cancelar
        </button>
      </ModalFooter>
    </Modal>
  );
}
