import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const users = [
          {
            id: 1,
            name: 'Stephen',
            email: 'stephen@mejia.com',
            password: 'zombi12',
            role: 'admin',
          },
          {
            id: 2,
            name: 'Rissieri',
            email: 'rissieri@maradiaga.com',
            password: 'zombi123',
            role: 'consultor',
          },
        ];
        const user = users.find(
          (u) =>
            u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          return { id: user.id, name: user.name, email: user.email, role: user.role };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, 
  pages: {
    signIn: '/login',
  },
});