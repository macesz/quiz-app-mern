import { ISignUpBody } from "../interfaces/IUserRequest";
import { FormErrors } from "../Services/utils";
import React from "react";

interface FormProps {
  handleSubmit: (e: React.FormEvent) => void;
  formData: Partial<ISignUpBody>; 
  onChangeHandler: (field: keyof ISignUpBody) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  errors: FormErrors;
}


const Form: React.FC<FormProps> = ({ handleSubmit,
  formData,
  onChangeHandler,
  onCancel,
  errors }) => {

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username
          <input
            type="text"
            value={formData.username}
            onChange={onChangeHandler("username")}
          />
        </label>
        {errors && errors.username && <div style={{ color: "red", fontWeight: "bold" }}>{errors.username}</div>}
      </div>
      <div>
        <label>
          Password
          <input
            type="password"
            value={formData.password}
            onChange={onChangeHandler("password")}
          />
        </label>
        {errors && errors.password && <div style={{ color: "red", fontWeight: "bold" }}>{errors.password}</div>}
      </div>
      {/* // Only show email field if it's part of formData (for sign-up forms) */}
      {formData.email !== undefined && (
      <div>
        <label>
          Email
          <input
            type="email"
            value={formData.email}
            onChange={onChangeHandler("email")}
          />
        </label>
        {errors && errors.email && <div style={{ color: "red", fontWeight: "bold" }}>{errors.email}</div>}
      </div>
      )}

      <button type="submit" id="button" className="button">Save</button>
      <button type="button" id="button" className="button" onClick={onCancel}>Cancel</button>
    </form>
  )
}

export default Form;