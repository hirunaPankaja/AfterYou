export const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
export const isStrongPassword = (password) => password.length >= 8;
export const isNotEmpty = (value) => value.trim() !== '';
export const isValidPhoneNumber = (phone) => /^\d{10}$/.test(phone);