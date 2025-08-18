import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ProductsContext } from "../context/ProductsContext";
import { auth } from "../firebase"; // Importar solo auth desde firebase.js
import { signOut } from "firebase/auth"; // Importar signOut directamente

const AdminWrapper = styled.div`
  padding: 60px 40px;
  background-color: ${(props) => props.theme.colors.lightGray};
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    padding: 40px 30px;
  }

  @media (max-width: 600px) {
    padding: 30px 20px;
  }
`;

const Title = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 36px;
  color: ${(props) => props.theme.colors.black};
  text-align: center;
  margin-bottom: 40px;

  @media (max-width: 600px) {
    font-size: 28px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto 40px;
`;

const Input = styled.input`
  padding: 15px;
  border: 1px solid ${(props) => props.theme.colors.mediumGray};
  background-color: ${(props) => props.theme.colors.white};
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  color: ${(props) => props.theme.colors.black};

  &::placeholder {
    color: ${(props) => props.theme.colors.mediumGray};
  }
`;

const TextArea = styled.textarea`
  padding: 15px;
  border: 1px solid ${(props) => props.theme.colors.mediumGray};
  background-color: ${(props) => props.theme.colors.white};
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  color: ${(props) => props.theme.colors.black};
  height: 100px;
  resize: none;
`;

const Select = styled.select`
  padding: 15px;
  border: 1px solid ${(props) => props.theme.colors.mediumGray};
  background-color: ${(props) => props.theme.colors.white};
  font-family: "Roboto", sans-serif;
  font-size: 16px;
`;

const SubmitButton = styled(motion.button)`
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.white};
  border: none;
  padding: 15px 30px;
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  cursor: pointer;
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  gap: 20px;
`;

const ProductItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.lightGray};
`;

const ProductInfo = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  color: ${(props) => props.theme.colors.black};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled(motion.button)`
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.white};
  border: none;
  padding: 10px 20px;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  cursor: pointer;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalContent = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.white};
  padding: 30px;
  max-width: 500px;
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
`;

const ErrorMessage = styled.p`
  color: red;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
`;

const SuccessMessage = styled.p`
  color: green;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
`;

const modalVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.2 } },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const AdminPanel = () => {
  const { products, addProduct, updateProduct, deleteProduct, error } =
    useContext(ProductsContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "El nombre es requerido";
    if (!formData.description)
      newErrors.description = "La descripción es requerida";
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = "El precio debe ser un número positivo";
    }
    if (
      !formData.image ||
      !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(formData.image)
    ) {
      newErrors.image = "URL de imagen válida requerida (jpg, png, gif)";
    }
    if (!formData.category) newErrors.category = "La categoría es requerida";
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSuccessMessage("");
    try {
      if (editingProduct) {
        await updateProduct({ ...formData, id: editingProduct.id });
        setSuccessMessage("Producto actualizado con éxito");
        setEditingProduct(null);
      } else {
        await addProduct(formData);
        setSuccessMessage("Producto agregado con éxito");
      }
      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
      });
      setFormErrors({});
    } catch (err) {
      console.error("Error en submit:", err);
      setFormErrors({ general: "Error al guardar el producto" });
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setSuccessMessage("");
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteProduct(showDeleteModal);
      setSuccessMessage("Producto eliminado con éxito");
      setShowDeleteModal(null);
    } catch (err) {
      console.error("Error al confirmar eliminación:", err);
      setFormErrors({ general: "Error al eliminar el producto" });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Error en logout:", err);
      setSuccessMessage("");
      setFormErrors({ general: "Error al cerrar sesión" });
    }
  };

  const categories = ["Mesa", "Piso", "Colgante", "Pared"];

  return (
    <AdminWrapper>
      <Title>{editingProduct ? "Editar Producto" : "Agregar Producto"}</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      {formErrors.general && <ErrorMessage>{formErrors.general}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nombre"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {formErrors.name && (
          <p style={{ color: "red", fontSize: "14px" }}>{formErrors.name}</p>
        )}
        <TextArea
          placeholder="Descripción"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        {formErrors.description && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {formErrors.description}
          </p>
        )}
        <Input
          type="number"
          placeholder="Precio"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        {formErrors.price && (
          <p style={{ color: "red", fontSize: "14px" }}>{formErrors.price}</p>
        )}
        <Input
          type="text"
          placeholder="URL de Imagen"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
        {formErrors.image && (
          <p style={{ color: "red", fontSize: "14px" }}>{formErrors.image}</p>
        )}
        <Select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option value="">Selecciona Categoría</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
        {formErrors.category && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {formErrors.category}
          </p>
        )}
        <SubmitButton
          type="submit"
          whileHover="hover"
          variants={buttonVariants}
        >
          {editingProduct ? "Actualizar" : "Agregar"}
        </SubmitButton>
      </Form>

      <ProductList>
        {products.map((product) => (
          <ProductItem key={product.id}>
            <ProductInfo>
              {product.name} - ${product.price.toFixed(2)}
            </ProductInfo>
            <ButtonGroup>
              <ActionButton
                onClick={() => handleEdit(product)}
                whileHover="hover"
                variants={buttonVariants}
              >
                Editar
              </ActionButton>
              <ActionButton
                onClick={() => setShowDeleteModal(product.id)}
                whileHover="hover"
                variants={buttonVariants}
              >
                Eliminar
              </ActionButton>
            </ButtonGroup>
          </ProductItem>
        ))}
      </ProductList>

      <SubmitButton
        onClick={handleLogout}
        whileHover="hover"
        variants={buttonVariants}
        style={{
          backgroundColor: ({ theme }) => theme.colors.darkGray,
          marginTop: "20px",
        }}
      >
        Cerrar Sesión
      </SubmitButton>

      <AnimatePresence>
        {showDeleteModal && (
          <ModalOverlay
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <ModalContent variants={modalVariants}>
              <h2>Confirmar Eliminación</h2>
              <p>¿Seguro que quieres eliminar este producto?</p>
              <ButtonGroup>
                <ActionButton
                  onClick={handleDeleteConfirm}
                  whileHover="hover"
                  variants={buttonVariants}
                >
                  Sí, Eliminar
                </ActionButton>
                <ActionButton
                  onClick={() => setShowDeleteModal(null)}
                  whileHover="hover"
                  variants={buttonVariants}
                >
                  Cancelar
                </ActionButton>
              </ButtonGroup>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </AdminWrapper>
  );
};

export default AdminPanel;
