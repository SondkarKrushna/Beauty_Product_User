import React, { useEffect, useState } from "react";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const ModalManager = () => {
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

  window.openSignIn = () => setActiveModal("signin");
  window.openSignUp = () => setActiveModal("signup");


  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [activeModal]);

  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      {activeModal === "signin" && <SignIn onClose={closeModal} />}
      {activeModal === "signup" && <SignUp onClose={closeModal} />}
    </div>
  );
};

export default ModalManager;
