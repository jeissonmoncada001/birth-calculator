"use client";
import React, { useEffect, useState } from "react";
import { Usuario } from "./types";
import { addDays } from "./utils";
import UserTable from "./UserTable";
import UserModal from "./UserModal";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

export default function BirthCalculator() {
  const [data, setData] = useState<Usuario[]>([
    {
      id: 1,
      Nombre: "Iris",
      DiadeOvulacion: new Date(),
      Diasdeinsemiacion: [{ id: 0, date: new Date() }],
      PartosProbables: [{ id: 0, date: new Date() }],
      DiaDeParto: new Date(),
    },
  ]);

  const [selected, setSelected] = useState<Usuario | null>(null);
  const [showInsert, setShowInsert] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [disableAdd, setDisableAdd] = useState(false);

  useEffect(() => {
    if (data.length === 0) {
      setTimeout(() => {
        setShowInsert(true);
      }, 300);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selected) return;
    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selected) return;
    const { name, value } = e.target;
    const updated = selected.Diasdeinsemiacion.map((item) =>
      item.id === Number(name) ? { ...item, date: value } : item
    );
    setSelected({ ...selected, Diasdeinsemiacion: updated });
  };

  const addInseminationDate = () => {
    if (!selected) return;
    if (selected.Diasdeinsemiacion.length < 6) {
      const newId = selected.Diasdeinsemiacion.length;
      setSelected({
        ...selected,
        Diasdeinsemiacion: [
          ...selected.Diasdeinsemiacion,
          { id: newId, date: new Date() },
        ],
      });
    } else setDisableAdd(true);
  };

  const handleInsert = () => {
    if (!selected) return;

    const nextId = data.length > 0 ? Math.max(...data.map((u) => u.id)) + 1 : 1;

    const newUser = {
      ...selected,
      id: nextId,
      DiaDeParto: addDays(selected.DiadeOvulacion, 63),
    };

    setData([...data, newUser]);
    setShowInsert(false);
  };

  const handleEdit = () => {
    if (!selected) return;
    const tempPartos =
      selected.Diasdeinsemiacion.length === 1
        ? [{ id: 0, date: addDays(selected.Diasdeinsemiacion[0].date, 61) }]
        : [
            { id: 0, date: addDays(selected.Diasdeinsemiacion[0].date, 61) },
            {
              id: 1,
              date: addDays(
                selected.Diasdeinsemiacion[
                  selected.Diasdeinsemiacion.length - 1
                ].date,
                61
              ),
            },
          ];

    setData((prev) =>
      prev.map((u) =>
        u.id === selected.id
          ? {
              ...selected,
              PartosProbables: tempPartos,
              DiaDeParto: addDays(selected.DiadeOvulacion, 63),
            }
          : u
      )
    );
    setShowEdit(false);
  };

  const handleDelete = () => {
    if (!selected) return;
    setData(data.filter((u) => u.id !== selected.id));
    setShowDelete(false);
  };

  const openInsertModal = () => {
    const nextId = data.length > 0 ? data[data.length - 1].id + 1 : 1;

    setSelected({
      id: nextId,
      Nombre: "",
      DiadeOvulacion: new Date(),
      Diasdeinsemiacion: [{ id: 0, date: new Date() }],
      PartosProbables: [],
      DiaDeParto: new Date(),
    });

    setShowInsert(true);
  };

  return (
    <div className="container mt-5">
      <h2>Birth Calculator</h2>
      <button className="btn btn-success mt-3" onClick={openInsertModal}>
        Insertar
      </button>

      <UserTable
        data={data}
        onEdit={(u) => {
          setSelected(u);
          setShowEdit(true);
        }}
        onDelete={(u) => {
          setSelected(u);
          setShowDelete(true);
        }}
      />

      <UserModal
        isOpen={showInsert}
        onClose={() => setShowInsert(false)}
        onSubmit={handleInsert}
        user={selected}
        onChange={handleChange}
        onChangeDate={handleChangeDate}
        onAddDate={addInseminationDate}
        title="Insertar Usuario"
        showAddDate
        disableAdd={disableAdd}
      />

      <UserModal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        onSubmit={handleEdit}
        user={selected}
        onChange={handleChange}
        onChangeDate={handleChangeDate}
        title="Editar Usuario"
      />

      <Modal isOpen={showDelete}>
        <ModalBody>¿Seguro que deseas eliminar a {selected?.Nombre}?</ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={handleDelete}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setShowDelete(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={data.length === 0 && !showInsert} centered>
        <ModalBody className="text-center">
          <h5 className="mb-3">No hay registros</h5>
          <p>Comienza agregando tu primer usuario para calcular fechas.</p>
          <button className="btn btn-success mt-2" onClick={openInsertModal}>
            ➕ Agregar Usuario
          </button>
        </ModalBody>
      </Modal>
    </div>
  );
}
