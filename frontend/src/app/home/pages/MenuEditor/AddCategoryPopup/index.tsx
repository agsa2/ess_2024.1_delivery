import { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "./index.module.css";
import { addCategory } from "../../../../../shared/services/CategoriesService";

const AddCategoryPopup = ({ isOpen, onClose, onAddCategory, restaurantId, existingCategories }) => {
  const [categoryName, setCategoryName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setCategoryName("");
      setErrorMessage("");
    }
  }, [isOpen]);

  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      setErrorMessage("É obrigatório um nome para a categoria!");
      return;
    }

    if (existingCategories.some(category => category.name.toLowerCase() === categoryName.toLowerCase())) {
      setErrorMessage("Já existe uma categoria com esse nome!");
      return;
    }

    try {
      if (!restaurantId) {
        console.error("ID do restaurante não encontrado.");
        return;
      }

      const newCategory = await addCategory(categoryName, restaurantId);
      onAddCategory(newCategory);
      setCategoryName("");
      setErrorMessage(""); 
      onClose();
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2>Adicionar Categoria</h2>
      <input
        type="text"
        placeholder="Nome da Categoria"
        data-cy="input-nome-da-categoria"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <div className={styles.buttonContainer}>
      <button
  className={styles.acceptButton}
  onClick={handleAddCategory}
  data-cy="popup-add-category-button" // Adicione este atributo
>
  Adicionar
</button>

        <button className={styles.cancelButton} onClick={onClose}>Cancelar</button>
      </div>
    </Modal>
  );
};

export default AddCategoryPopup;
