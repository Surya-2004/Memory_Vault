import { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
      // Proceed with signup logic
    }
  };

  return (
    <div
      className={`flex h-screen w-full items-center justify-center transition-colors duration-300 ${
        darkMode ? "dark bg-gray-950 text-white" : "bg-white text-black"
      }`}
    >
      <button
        className={`absolute top-5 right-5 p-2 rounded-full shadow-md transition-all duration-300 ${
          darkMode ? "bg-white text-black" : "bg-gray-800 text-white"
        } cursor-pointer`}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <Moon size={24}  /> : <Sun size={24}  />}
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-96 p-8 rounded-2xl shadow-2xl backdrop-blur-md ${
          darkMode ? "bg-gray-900/90" : "bg-blue-100"
        }`}
      >
        <motion.h2
          className="text-3xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {isLogin ? "Welcome Back" : "Create an Account"}
        </motion.h2>
        <form className="space-y-4" onSubmit={!isLogin ? handleSignup : undefined}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              className={`w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              } focus:ring-2 focus:ring-blue-500`}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className={`w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            } focus:ring-2 focus:ring-blue-500`}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={`w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            } focus:ring-2 focus:ring-blue-500`}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Re-enter Password"
              className={`w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              } focus:ring-2 focus:ring-blue-500`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg shadow-lg hover:opacity-90 transition-all"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setPassword("");
              setConfirmPassword("");
            }}
            className="text-blue-500 font-semibold ml-1 hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
