import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AUTH_STORAGE_KEY = "mealshare_auth";
const USERS_STORAGE_KEY = "mealshare_users";

const AuthContext = createContext(null);

function readUsers() {
  try {
    const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);

    if (!savedUsers) {
      return [];
    }

    const parsedUsers = JSON.parse(savedUsers);

    return Array.isArray(parsedUsers)
      ? parsedUsers
      : [];
  } catch {
    return [];
  }
}

function readAuth() {
  try {
    const savedAuth =
      localStorage.getItem(AUTH_STORAGE_KEY);

    if (!savedAuth) {
      return null;
    }

    return JSON.parse(savedAuth);
  } catch {
    return null;
  }
}

export function getDashboardPath(role) {
  if (role === "reserver") {
    return "/reserver-dashboard";
  }

  return "/food-lister-dashboard";
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readAuth());

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(readAuth());
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  const signup = ({
    name,
    email,
    password,
    role,
  }) => {
    const users = readUsers();

    const normalizedEmail =
      email.trim().toLowerCase();

    const existingUser = users.find(
      (item) =>
        item.email === normalizedEmail
    );

    if (existingUser) {
      return {
        success: false,
        message:
          "An account with this email already exists.",
      };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password,
      role,
    };

    const updatedUsers = [
      ...users,
      newUser,
    ];

    localStorage.setItem(
      USERS_STORAGE_KEY,
      JSON.stringify(updatedUsers)
    );

    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(sessionUser)
    );

    setUser(sessionUser);

    return {
      success: true,
      user: sessionUser,
    };
  };

  const login = ({
    email,
    password,
  }) => {
    const users = readUsers();

    const normalizedEmail =
      email.trim().toLowerCase();

    const existingUser = users.find(
      (item) =>
        item.email === normalizedEmail &&
        item.password === password
    );

    if (!existingUser) {
      return {
        success: false,
        message:
          "Invalid email or password.",
      };
    }

    const sessionUser = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    };

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(sessionUser)
    );

    setUser(sessionUser);

    return {
      success: true,
      user: sessionUser,
    };
  };

  const logout = () => {
    localStorage.removeItem(
      AUTH_STORAGE_KEY
    );

    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}