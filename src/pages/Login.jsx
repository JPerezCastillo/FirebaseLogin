import {useEffect} from 'react';
import { login } from '../config/firebase';
import {Link, useNavigate} from "react-router-dom";
import {useUserContext} from "../context/UserContext";

import { Formik } from 'formik';
import * as Yup from "yup";
import { Box, Button,Avatar, Typography, TextField} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from '@mui/lab';

const Login = () => {
        
    //Damit der dashboard benutzen können
    const navigate = useNavigate();
    const {user} = useUserContext();

    useEffect(()=>{
        if(user){
          navigate("/dashboard");
        }
    },[user])

const onSubmit =  async(values,{setSubmitting, setErrors,resetForm}) => {
      try{
        const credentialUser =  await login({ email:values.email, password:values.password });
         console.log(credentialUser);
         resetForm();
      }catch(error){
          console.log(error.code);
          console.log(error.message);
          if(error.code === "auth/user-not-found"){
            return setErrors({email:"Benutzer nicht registriert"})
          }
          if(error.code === "auth/wrong-password"){
            return setErrors({password:"Passwort ist falsch"})
          }
      }finally{
        setSubmitting(false)
      }
    }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("ungültige email").required("Email erforderlich"),
    password:Yup.string().trim().min(6,"mindestens 6 zeichen").required("Passwort erforderlich")
    });

    return (
  <Box sx={{mt:8, maxWidth:"400px",mx:"auto",textAlign:"center"}}>
  <Avatar sx={{mx:"auto", bgcolor:"#111"}}><AddAPhotoIcon></AddAPhotoIcon>
  </Avatar> 
  <Typography variant='h5' component="h1">Login</Typography>
  <Formik
    initialValues={{email:"", password:""}}
    onSubmit={onSubmit}
    validationSchema={validationSchema}>
    {
    ({values, 
      handleSubmit, 
      handleChange,
      errors,
      touched,
      handleBlur,
      isSubmitting}) => (
  <Box onSubmit={handleSubmit} sx={{mt:1}}
    component="form">
<TextField 
         type="text"
         placeholder="email@example.com"
         value={values.email}
         name="email"
         onBlur={handleBlur}
         onChange={handleChange}
         id="email"
         label="Email eingeben"
         fullWidth
         sx={{mb:3}} error={errors.email && touched.email}
         helperText={errors.email && touched.email && errors.email}></TextField>  

<TextField 
 type="password"
 placeholder='Password eingeben'
 value={values.password}
 name="password"
 onBlur={handleBlur}
 onChange={handleChange}
 id="password"
 label="Password eingeben"
 fullWidth
 sx={{mb:3}} error={errors.password && touched.password}
 helperText={errors.password && touched.password && errors.password}>
</TextField>

<LoadingButton type='submit'disabled={isSubmitting}loading={isSubmitting}variant="contained"fullWidth sx={{mb:3}}> Login </LoadingButton>    

<Button fullWidth component={Link} to="/Register"> Hast du noch keine Konto? Register </Button>
  </Box>
)}
</Formik>
      </Box>
    ); 
};
export default Login;
