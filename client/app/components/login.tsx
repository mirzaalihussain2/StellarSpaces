import './Login.css';
import { useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import {
  createUsers,
  loginUser,
  findEmail,
} from '../ApiServices/backend/localUserService';
interface LoginProps {
  toggle: () => void;
}

interface UserProfile {
  imageUrl: string;
  name: string;
}

function Login(props: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [seen, setSeen] = useState(false);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // change admin to a function that checks if email exists in database
    if (login) {
      try {
        const user = await loginUser({ email, password });
        // Handle successful login
      } catch (error) {
        // Handle login error
      }
    } else if (register) {
      try {
        await handleRegistration(e);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function handleRegistration(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (register) {
      try {
        const newUser = await createUsers({
          firstName,
          lastName,
          email,
          password,
          dateOfBirth,
        });
        console.log('Registration successful');
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleGoogleSignin() {
    window.location.href = 'http://localhost:3010/auth/google';
  }

  function handleSignout() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setLoggedIn(false);
  }

  useEffect(() => {
    fetch('http://localhost:3010/auth/google/callback')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Not logged in');
        }
      })
      .then((data) => {
        setUserProfile(data);
        setLoggedIn(true);
      })
      .catch(() => {
        setLoggedIn(false);
      });
  }, []);

  return (
    <div className='popup'>
      <div className='popup-inner'>
        <div className='popup-close'>
          <Button shape='circle' onClick={props.toggle}>
            X
          </Button>
          <h2 className='popup-title'>
            {loggedIn ? (
              <div>
                {userProfile && (
                  <img src={userProfile.imageUrl} alt={userProfile.name} />
                )}
                <Button onClick={handleSignout}>Sign out</Button>
              </div>
            ) : (
              <div>
                <Button onClick={handleGoogleSignin}>
                  Sign in with Google
                </Button>
                {login ? 'Login' : register ? 'Register' : 'Log in or Sign Up'}
              </div>
            )}
          </h2>
        </div>
        {!loggedIn && (
          <form onSubmit={handleLogin}>
            <label>
              Email:
              <input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            {register && (
              <div>
                <label>
                  First Name:
                  <input
                    type='text'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>{' '}
                <label>
                  Last Name:
                  <input
                    type='text'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <label>
                  Date of Birth:
                  <input
                    type='date'
                    value={dateOfBirth?.toISOString().substr(0, 10)}
                    onChange={(e) => setDateOfBirth(new Date(e.target.value))}
                  />
                </label>
                <label>
                  Password:
                  <input
                    type='password'
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
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            )}
            {login || register ? (
              <div>
                <Space
                  direction='vertical'
                  style={{
                    width: '100%',
                  }}
                >
                  <Button type='primary' block>
                    Submit
                  </Button>
                </Space>
              </div>
            ) : (
              <div>
                <Space
                  direction='vertical'
                  style={{
                    width: '100%',
                  }}
                >
                  <Button type='primary' htmlType='submit' block>
                    Continue
                  </Button>
                </Space>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
