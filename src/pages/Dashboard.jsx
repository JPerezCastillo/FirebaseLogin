import { Button } from "@mui/material";
import { logOut } from "../config/firebase";

const Dashboard = () => {

    const handleLogout = async ()=>{
        try{
            await logOut();
        }catch(error){
            console.log(error);
        }
    };

    return(
        <>
        <h1>Dashboard </h1>
        <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </>
    );
};

export default Dashboard;
