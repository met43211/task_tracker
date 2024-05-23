import { useState } from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import Modal from "../UI/Modal/Modal";
import ModalMessage from "../components/ModalMessage/ModalMessage";

function AuthPage() {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <AuthForm openModal={openModal} />
      <Modal close={closeModal} modal={modal}>
        <ModalMessage>Неверный логин или пароль</ModalMessage>
      </Modal>
    </>
  );
}

export default AuthPage;
