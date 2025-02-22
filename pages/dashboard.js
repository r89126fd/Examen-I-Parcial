import {useSession, signOut} from 'next-auth/react';
import {useRouter} from 'next/router'

export default function dashboard() {
          const {data:session}= useSession();
          const router = useRouter();

if (!session) {
          return (
                    <p>No se puede acceder porque la sesion no esta iniciada.</p>
          
          );
}          
return (
          <div style={{ textAlign: 'center', padding: '20px' }}>
          <h1>Bienvenido, {session.user.name}</h1>
          <p>Role: {session.user.role}</p>
          {session.user.role === 'admin'?
          <p>Estas logeado como administrador.</p> :
          <p>Estas logeado como consultor.</p>
          }
          <button onClick={() => signOut()} style={{ padding: '10px', backgroundColor: '#FF0000', color: '#FFFFFF', border: 'none', cursor: 'pointer' }}>
          Log out
          </button>
          </div>
);
}

