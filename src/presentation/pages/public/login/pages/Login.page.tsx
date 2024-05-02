import { InputText } from "primereact/inputtext";

export const LoginPage = () => {
  return (
    <div>
      <InputText
        type="text"
        placeholder="Username"
        className="mx-auto mt-5 bg-red-600"
      />
    </div>
  );
};

export default LoginPage;
