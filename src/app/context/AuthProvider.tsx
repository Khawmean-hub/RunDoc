// app/components/AuthProvider.tsx
"use client";

import { ReactNode, useEffect, useState, createContext, useContext } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/app/lib/firebase/config';
import { useRouter } from 'next/navigation';
import { userService } from '@/services';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user: User | null;
  logout: () => void;
  role:any
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role,setRole] = useState<any>(null)
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const role =( await userService.getRole()).data
        setRole(role)
        console.log(JSON.stringify(user))
      } else {
        setUser(null);
        router.push('/auth/login');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    router.push('/auth/login');
  };



  return (
    <AuthContext.Provider value={{ user, logout,role }}>
      {loading ? <div className='h-full w-full flex justify-center items-center'>
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
      </div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
