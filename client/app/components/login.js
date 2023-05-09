'use client'
import "./Login.css";
import { useState } from "react";
import { Button, Space } from "antd";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [seen, setSeen] = useState(false);
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);

    function handleLogin(e) {
        e.preventDefault();
        //change admin to a function that checks if email exists in database
        if (email === "admin") {
            setSeen(!seen);
            setLogin(!login);
        } else {
            setRegister(!register);
        }
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <div className='popup-close'>
                    <Button shape="circle" onClick={props.toggle}>X</Button>
                    <h2 className="popup-title">{login ? "Login" : register ? "Register" : "Log in or Sign Up"}</h2>
                </div>
                <form>
                    <label>
                        Email:
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    {register && (
                        <div>
                            <label>
                                FirstName:
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </label>
                            <label>
                                LastName:
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </label>
                            <label>
                                DateOfBirth:
                                <input
                                    type="date"
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                />
                            </label>
                            <label>
                                Password:
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>
                        </div>
                    )}
                    {seen && (
                        <label>
                            Password:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                    )}
                    {login || register ? (
                        <div>
                            <Space direction="vertical"
                                style={{
                                    width: '100%',
                                }}
                            >
                                <Button type="primary" block>Submit</Button>
                            </Space>
                        </div>
                    ) : (
                        <div>
                            <Space direction="vertical"
                                style={{
                                    width: '100%',
                                }}
                            >
                                <Button type="primary" onClick={handleLogin} block>
                                    Continue
                                </Button>
                            </Space>
                        </div>
                    )}
                </form>

            </div>
        </div>
    );
}

export default Login;