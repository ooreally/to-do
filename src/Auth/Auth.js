import React from 'react';
import Button from '@material-ui/core/Button';


const Auth = (props) => {

    const onSubmitHandler = (e) => {
        e.preventDefault();
        props.authCall();
    }

    return (
        <div style={{ width: "100%", backgroundColor: "rgb(115, 62, 163)", height: "3.5rem" }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                minHeight: "40vh"
            }}>
                <h1 style={{
                    color: "rgb(115, 62, 163)",
                    fontFamily: "Caveat", fontSize: "3rem", textAlign: "center", marginTop: "4rem"
                }}>
                    TO-DO
                </h1>
                <p>Sign in to make your todo list now</p>
                <div>
                    {props.error}
                    <form onSubmit={onSubmitHandler}>
                        <div style={{ marginTop: "2rem" }}>

                            <Button variant="contained"
                                size="large"
                                style={{ backgroundColor: "rgb(163, 101, 219)" }}
                                onClick={onSubmitHandler}>SignIn</Button>
                        </div>
                    </form>

                </div>

            </div>
        </div>

    )

}

export default Auth;