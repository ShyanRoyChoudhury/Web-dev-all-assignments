import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Card, Typography} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import {useSetRecoilState} from "recoil";
import {userState} from "../store/atoms/user";
import { BASE_URL } from '@/config';
import { useRouter } from 'next/router.js';

function Signin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const setUser = useSetRecoilState(userState);

    return <div>
            <div style={{
                paddingTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant={"h6"}>
                Welcome to Coursera. Sign up below
                </Typography>
            </div>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card variant={"outlined"} style={{width: 400, padding: 20}}>
                <TextField
                    onChange={(evant11) => {
                        let elemt = evant11.target;
                        setEmail(elemt.value);
                    }}
                    fullWidth={true}
                    label="Email"
                    variant="outlined"
                />
                <br/><br/>
                <TextField
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    fullWidth={true}
                    label="Password"
                    variant="outlined"
                    type={"password"}
                />
                <br/><br/>

                <Button
                    size={"large"}
                    variant="contained"
                    onClick={async () => {
                        const res = await axios.post(`${BASE_URL}/admin/login`, {
                        }, {
                            headers: {
                                "Content-type": "application/json",
                                username: email,
                                password: password
                            }
                        });
                        const data = res.data;

                        localStorage.setItem("token", data.token);
                        // window.location = "/"
                        setUser({
                            userEmail: email,
                            isLoading: false
                        })
                        router.push("/courses")
                    }}

                > Signin</Button>
            </Card>
        </div>
    </div>
}

export default Signin;