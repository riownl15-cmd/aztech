'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = () => {
    const token = localStorage.getItem('admin_token');
    const user = localStorage.getItem('admin_user');

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        setAdminUser(parsedUser);
        setIsAdmin(true);
      } catch (error) {
        setIsAdmin(false);
        setAdminUser(null);
      }
    } else {
      setIsAdmin(false);
      setAdminUser(null);
    }

    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    document.cookie = 'admin_token=; path=/; max-age=0';
    setIsAdmin(false);
    setAdminUser(null);
    router.push('/admin/login');
  };

  return { isAdmin, adminUser, loading, logout };
}
