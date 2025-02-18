import { useState } from "react";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
interface LoginForm {
    Username: string;
    Password: string;
    RememberMe: boolean;

}

const LoginFormComponent: React.FC = () => {
    const [formData, setFormData] = useState<LoginForm>({
        Username: '',
        Password: '',
        RememberMe: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, checked, type } = e.target;
        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        fetch('/api/Account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
        setIsLoading(false);
    };
    const loadingProcessContent = isLoading ? <CircularProgress/> : <></>
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <TextField id="" label="Username" variant="outlined" />
            </div>
            <div className="form-group">
                <TextField id="filled-basic" label="Password" variant="filled" />
            </div>
            <div className="form-group form-check">
                <FormControlLabel control={<Checkbox  id = "rememberme-check"/>} label="Remember Me" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            {loadingProcessContent}
            
        </form>
    );
};

export default LoginFormComponent;
