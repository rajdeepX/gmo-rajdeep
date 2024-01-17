import { Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.scss";

interface FormData {
  name: string;
  phoneNumber: string;
  email: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phoneNumber || !formData.email) {
      alert("Please fill in all fields");
      return;
    }

    localStorage.setItem("userData", JSON.stringify(formData));

    navigate("/home");

    setFormData({ name: "", phoneNumber: "", email: "" });
  };

  return (
    <>
      <form className="login-form__box" onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="Name"
          variant="standard"
          color="primary"
          fullWidth
          required
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="text"
        />
        <TextField
          id="standard-basic"
          label="Phone Number"
          variant="standard"
          color="primary"
          fullWidth
          required
          className="text"
          type="number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          color="primary"
          fullWidth
          required
          className="text"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Button className="login-btn" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
