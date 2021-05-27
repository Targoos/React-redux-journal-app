import { db } from "../firebase/firebaseConfig";

export const isFormValid = (form = {}) => {
  //eslint-disable-next-line
  const regExpre = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

  let errorMessage = "";
  let errorStatus = null;

  if (form.name.trim().length < 3) {
    errorMessage = "Name is required";
    errorStatus = true;
  }
  if (!regExpre.test(form.email)) {
    errorMessage = "Email is required";
    errorStatus = true;
  }
  if (form.password.length < 5 || form.password2 !== form.password) {
    errorMessage = "Password should be at least 5 characters and match";
    errorStatus = true;
  }

  return { errorMessage, errorStatus };
};

export const loadNotes = async (uid) => {
  const notesSnap = await db.collection(`${uid}/journal/notes`).get();
  let notes = [];

  notesSnap.forEach((snapHijo) =>
    notes.push({
      id: snapHijo.id,
      ...snapHijo.data(),
    })
  );

  return notes;
};

export const fileUpload = async (file) => {
  const cloundinaryAPIUrl =
    "https://api.cloudinary.com/v1_1/ddr78lsej/image/upload";

  console.log("Ejecutada", file);

  const formData = new FormData();
  formData.append("file", file, file.name);
  formData.append("upload-preset", "react-journal");
  formData.append("api_key", "451173127269458");

  try {
    const response = await fetch(cloundinaryAPIUrl, {
      method: "POST",
      body: formData,
      redirect: "follow",
    });

    if (response.ok) {
      const cloundResponse = await response.json();
      return cloundResponse.secure_url;
    }
  } catch (error) {
    console.error(error);
  }
};
