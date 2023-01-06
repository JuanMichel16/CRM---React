import { useNavigate, Form, redirect } from "react-router-dom";
import { eliminarCliente } from "../data/clientes";

export const action = async ({ params }) => {
  await eliminarCliente(params.id);

  return redirect("/");
};

const Cliente = ({ cliente }) => {
  const navigate = useNavigate();

  const { id, nombre, telefono, email, empresa } = cliente;

  return (
    <tr className="border-b">
      <td className="p-6">
        <p className="text-2xl text-gray-800">{nombre}</p>
        <p>{empresa}</p>
      </td>
      <td className="p-6">
        <p className=" text-gray-800">
          {" "}
          <span className="text-gray-800 uppercase font-bold">Email:</span>
          {email}
        </p>
        <p className=" text-gray-800">
          {" "}
          <span className="text-gray-800 uppercase font-bold">Tel:</span>
          {telefono}
        </p>
      </td>

      <td className="p-6 flex gap-3">
        <button
          type="button"
          className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs"
          onClick={() => navigate(`clientes/${id}/editar`)}
        >
          Editar
        </button>

        <Form
          method="post"
          action={`/clientes/${id}/eliminar`}
          onSubmit={(e) => {
            if (!confirm("Deseas eliminar este registro?")) {
              // El confirm lo negamos ya que el usuario al darle aceptar previene la accion por default, es decir, el action del Form con lo cual no ejecuta la funcion.
              e.preventDefault();
            }
          }}
        >
          <button
            type="submit"
            className="text-red-600 hover:text-red-700 uppercase font-bold text-xs"
          >
            Eliminar
          </button>
        </Form>
      </td>
    </tr>
  );
};

export default Cliente;
