import { useId, useState } from "react";
import { Modal } from "../../../Components/organims/Modal";
import { useDependencies } from "../../../lib/Dependencies/DependenciesProvider";
import { Recette, RecetteType } from "../../../Modules/Recette/Model/Recette.model";
import { UseFormReset, useForm } from "react-hook-form";
import { maxValue, minLength, minValue, number, object, string } from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import toast, { Toaster } from 'react-hot-toast';

function getRecetteType(type: RecetteType) {
  switch (type) {
    case RecetteType.PLAT:
      return "Plat";
    case RecetteType.DESSERT:
      return "Dessert";
  }
}

const notify = (title: string) => toast.success(title, {
  duration: 4000,
  position: 'top-right',
  style: {
    border: '1px solid #713200',
    padding: '16px',
    color: '#713200',
  },
  iconTheme: {
    primary: '#713200',
    secondary: '#FFFAEE',
  },
})
export const GestionRecettes = () => {
  const { recettesService } = useDependencies();
  const { data: recettes } = recettesService.useGetAllRecettesQuery();

  const [isEditing, setIsEditing] = useState(false);
  const [recetteToEditId, setRecetteToEditId] = useState<string | null>(null);
  const recetteToEdit = recettes?.find((recette) => recette.id === recetteToEditId);

  const [isDeleting, setIsDeleting] = useState(false);
  const [recetteToDeleteId, setRecetteToDeleteId] = useState<string | null>(null);
  const recetteToDelete = recettes?.find((recette) => recette.id === recetteToDeleteId);

  const openEditingModal = (recetteId: string) => {
    setRecetteToEditId(recetteId);
    setIsEditing(true);
  }

  const { mutate: updateRecetteMutation } = recettesService.useUpdateRecetteMutation({
    onSuccess: () => {
      notify("La recette a été modifiée.");
    },
    onError: (error) => {
      console.log(error);
      notify("Une erreur est survenue.");
    }
  });

  const editRecette = (data: Partial<Recette>) => {
    if (!recetteToEdit) return;
    updateRecetteMutation({ ...recetteToEdit, ...data });
  }

  const closeEditingModal = (resetForm: UseFormReset<any>) => {
    setRecetteToEditId(null);
    setIsEditing(false);
    resetForm();
  }

  const openDeleteModal = (recetteId: string) => {
    setRecetteToDeleteId(recetteId);
    setIsDeleting(true);
  }

  const { mutate: deleteRecetteMutation } = recettesService.useDeleteRecetteMutation({
    onSuccess: () => {
      notify("La recette a été supprimée.");
    },
    onError: (error) => {
      console.log(error);
      notify("Une erreur est survenue.");
    }
  });

  const deleteRecette = (recetteId: string | undefined) => {
    if (!recetteToDelete) return;
    deleteRecetteMutation(recetteToDelete);
  }

  const closeDeleteModal = () => {
    setRecetteToDeleteId(null);
    setIsDeleting(false);
  }

  // add recette
  const { mutate: addRecetteMutation } = recettesService.useAddRecetteMutation({
    onSuccess: () => {
      notify("La recette a été ajoutée.");
    },
    onError: (error) => {
      console.log(error);
      notify("Une erreur est survenue.");
    }
  });

  const newId = useId();

  const addRecette = (data: Omit<Recette, "id">) => {
    const randomSuffix = (Math.random()) * 10 ** 18;
    addRecetteMutation({ ...data, id: newId + randomSuffix.toString(), available: true });
  }

  const [isAdding, setIsAdding] = useState(false);
  const closeAddingModal = (resetForm: UseFormReset<any>) => {
    setIsAdding(false);
    resetForm();
  }

  return (
    <>
      <Toaster />
      <h1>Recettes</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Prix</th>
            <th className="px-4 py-2">Quantité</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {recettes?.sort((a, b) => a.type - b.type).map((recette) => (
            <tr key={recette.id}>
              <td className="border px-4 py-2">{recette.name}</td>
              <td className="border px-4 py-2">{recette.description}</td>
              <td className="border px-4 py-2">{recette.price}</td>
              <td className="border px-4 py-2">{recette.quantity}</td>
              <td className="border px-4 py-2">{getRecetteType(recette.type)}</td>
              <td className="border px-4 py-2 flex gap-2">
                <button onClick={() => openEditingModal(recette.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Edit
                </button>
                <button onClick={() => openDeleteModal(recette.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setIsAdding(true)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Ajouter
      </button>
      <EditModal recette={recetteToEdit} isEditing={isEditing} closeEditingModal={closeEditingModal} editRecette={editRecette} />
      <AddModal isAdding={isAdding} closeAddingModal={closeAddingModal} addRecette={addRecette} />
      {/* Delete modal */}
      <Modal
        open={isDeleting}
        onClose={closeDeleteModal}
        title={`Supprimer ${recetteToDelete?.name}`}
        onSubmit={() => {
          deleteRecette(recetteToDelete?.id);
          closeDeleteModal();
        }}
      >
        <p>Êtes-vous sûr de vouloir supprimer la recette {recetteToDelete?.name} ?</p>
      </Modal>
    </>
  )
}

interface AddModalProps {
  isAdding: boolean
  closeAddingModal: (resetForm: UseFormReset<any>) => void
  addRecette: (data: Omit<Recette, "id">) => void
}
// component add recette
const AddModal = ({ isAdding, closeAddingModal, addRecette }: AddModalProps) => {
  const AddRecetteSchema = object({
    name: string([
      minLength(1, 'Please enter a name.')
    ]),
    image: string([
      minLength(1, 'Please add an image.')
    ]),
    description: string([
      minLength(1, 'Please enter a description.'),
    ]),
    price: number([
      minValue(0, 'Please enter a price.')
    ]),
    quantity: number([
      minValue(0, 'Please enter a quantity.')
    ]),
    type: number([
      minValue(0),
      maxValue(1)
    ])
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: valibotResolver(AddRecetteSchema),
  });

  return (
    <Modal
      open={isAdding}
      onClose={() => closeAddingModal(reset)}
      title="Ajouter une recette"
      onSubmit={
        handleSubmit((data) => {
          addRecette(data as Omit<Recette, "id">);

          closeAddingModal(reset);
        })
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Nom</label>
          <input type="text" id="name" {...register("name")} className="p-3 border border-gray-300 rounded" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="image">Image</label>
          <input type="text" id="image" {...register("image")} className="p-3 border border-gray-300 rounded" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <input type="text" id="description" {...register("description")} className="p-3 border border-gray-300 rounded" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price">Prix</label>
          <input type="number" id="price" {...register("price", { valueAsNumber: true })} className="p-3 border border-gray-300 rounded" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="quantity">Quantité</label>
          <input type="number" id="quantity" {...register("quantity", { valueAsNumber: true })} className="p-3 border border-gray-300 rounded" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="type">Type</label>
          <select id="type" {...register("type", { valueAsNumber: true })}>
            <option value={RecetteType.PLAT}>{getRecetteType(RecetteType.PLAT)}</option>
            <option value={RecetteType.DESSERT}>{getRecetteType(RecetteType.DESSERT)}</option>
          </select>
        </div>
      </div>
    </Modal>
  )
}

interface EditModalProps {
  recette: Recette | undefined
  isEditing: boolean
  closeEditingModal: (resetForm: UseFormReset<any>) => void
  editRecette: (data: Partial<Recette>) => void
}

const EditModal = ({ recette, isEditing, closeEditingModal, editRecette }: EditModalProps) => {
  const EditRecetteSchema = object({
    name: string([
      minLength(1, 'Please enter a name.')
    ]),
    description: string([
      minLength(1, 'Please enter a description.'),
    ]),
    price: number([
      minValue(0, 'Please enter a price.')
    ]),
    quantity: number([
      minValue(0, 'Please enter a quantity.')
    ]),
    type: number([
      minValue(0),
      maxValue(1)
    ])
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: valibotResolver(EditRecetteSchema),
  });

  return (
    <Modal
      open={isEditing}
      onClose={() => closeEditingModal(reset)}
      title="Modifier une recette"
      onSubmit={
        handleSubmit((data) => {
          editRecette({ ...data, id: recette!.id });

          closeEditingModal(reset);
        })
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Nom</label>
          <input type="text" id="name" {...register("name")} defaultValue={recette?.name} className="p-3 border border-gray-300 rounded" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <input type="text" id="description" {...register("description")} defaultValue={recette?.description} className="p-3 border border-gray-300 rounded" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price">Prix</label>
          <input type="number" id="price" {...register("price", { valueAsNumber: true })} defaultValue={recette?.price} className="p-3 border border-gray-300 rounded" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="quantity">Quantité</label>
          <input type="number" id="quantity" {...register("quantity", { valueAsNumber: true })} defaultValue={recette?.quantity} className="p-3 border border-gray-300 rounded" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="type">Type</label>
          <select id="type" {...register("type", { valueAsNumber: true })} defaultValue={recette?.type}>
            <option value={RecetteType.PLAT}>{getRecetteType(RecetteType.PLAT)}</option>
            <option value={RecetteType.DESSERT}>{getRecetteType(RecetteType.DESSERT)}</option>
          </select>
        </div>
      </div>
    </Modal>
  )
}