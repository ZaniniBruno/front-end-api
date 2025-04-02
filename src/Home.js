import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Home</h2>
        <button
          onClick={() => navigate("/users")}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-all duration-300"
        >
          Usuários
        </button>
      </div>
    </div>
  );
}

export function UserManagement() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          }
      })
      const data = await response.json();

      if (response.ok && Array.isArray(data)) {
        setUsers(data);
      } else {
          console.error("Erro ao buscar usuários", data);
      }
  } catch (error) {
      console.error("Erro na requisição", error);
  }
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestão de Usuários</h2>
        <button
          onClick={() => navigate("/users/new")}
          className="bg-green-500 text-white p-2 rounded flex items-center hover:bg-green-600"
        >
          <span className="mr-2">+</span> Novo
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Nome</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">{user.nome}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => navigate(`/users/edit/${user.id}`)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => console.log("Deletar usuário", user.id)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}