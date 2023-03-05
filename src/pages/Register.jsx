import { register } from '../config/firebase';
import {useUserContext} from "../context/UserContext";
import {useRedirectActiveUser} from "../hooks/useRedirectActiveUser"

import {Link} from "react-router-dom";
import {Formik} from "formik";
import * as Yup from "yup"
import { Box, Button,Avatar, Typography, TextField} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from '@mui/lab';


const Register = () => {

 const {user} = useUserContext();
    useRedirectActiveUser(user,"/dashboard");

    const onSubmit = async (
      {email, password},
      {setSubmitting,setErrors,resetForm}
    )=>{
      try{
           const credentialUser = await register({email,password})
           console.log(credentialUser);
           resetForm();
        }
        catch(error){
            console.log(error.code);
            console.log(error.message);
          if(error.code==="auth/email-already-in-use"){
            setErrors({email:"Email already in use"});
          }
        }finally{
          setSubmitting(false);
        }
    };

const validationSchema = Yup.object().shape({
    email:Yup.string().email().required(),
    password:Yup.string().trim().min(6,"mindestens 6 zeichen").required("passwod erforderlich")
    });

return (
  <Box sx={{mt:8, maxWidth:"400px",mx:"auto",textAlign:"center"}}>
  <Avatar sx={{mx:"auto", bgcolor:"#111"}}><AddAPhotoIcon></AddAPhotoIcon></Avatar>

<Typography variant="h5" component="h1">Register</Typography>

<Formik
  initialValues={{email:"",password:""}}
  onSubmit={onSubmit}
  validationSchema={validationSchema}>
{({
values, 
handleSubmit,
handleChange,
errors,
touched,
handleBlur,
isSubmitting
  })=>(
<Box onSubmit={handleSubmit} sx={{mt:1}} component="form">

<TextField 
 type="text"
 placeholder="email@example.com"
 value={values.email}
 onChange={handleChange}
 name ="email"
 onBlur={handleBlur}
 id="email"
label="Email eingeben"
fullWidth
sx={{mb:3}} error={errors.email && touched.email}
helperText={errors.email && touched.email && errors.email}>
</TextField>
 
 <TextField
 type="password"
 placeholder='Password eingeben'
 value={values.password}
 onChange={handleChange}
 name="password"
 id="Password"
 label="Password eingeben"
fullWidth
sx={{mb:3}} error={errors.password && touched.password}
helperText={errors.password && touched.password && errors.password}>
 </TextField>

<LoadingButton
type='submit'
disable={isSubmitting}
loading={isSubmitting}
variant="contained"
fullWidth
sx={{mb:3}}> Registrate </LoadingButton>

<Button 
fullWidth
component={Link}
to="/"></Button>
</Box>
 )}
</Formik>
  </Box>
 );
};
export default Register;

