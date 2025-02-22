import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login(){
          const [email, setEmail] = useState('');
          const [password, setPassword] = useState('');
          const router = useRouter();

          const handleLogin = async (e) => {
          e.preventDefault();
          const result = await signIn('credentials', { email, password, redirect: false });
          
          if (!result.error) {
                    router.push('/dashboard');
          }else {
                    alert('Credenciales incorrectas');
          }
};
return (
<div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
          <h1>Sign In</h1>
          <form onSubmit={handleLogin}>
          <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '8px' }}
          />

          <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '8px' }}
          />
          
          <button type="submit" style={{ padding: '10px', backgroundColor: '#0066CC', color: 'white', border: 'none', cursor: 'pointer' }}>
          Sign In
          </button>
          </form>
 </div>
          );
          }
          