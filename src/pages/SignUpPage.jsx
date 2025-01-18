import { useState } from "react";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    });
    const { signUp, isSigingU } = useAuthStore();
    const validateForm = () => {

    }
    const handleSubmit = () => {
        
    }
  return (
    <div>SignUpPage</div>
  )
}

export default SignUpPage