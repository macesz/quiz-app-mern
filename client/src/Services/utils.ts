import {ISignUpBody } from '../../../server/src/controllers/interfaces/IUserRequest';

export type FormErrors = Partial<Record<keyof ISignUpBody, string>>;

export const validateFormData = (formData: ISignUpBody): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long"
    }

    return newErrors;
  }

