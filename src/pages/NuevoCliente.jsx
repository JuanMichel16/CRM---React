import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { agregarCliente } from "../data/clientes";

export const action = async ({ request }) => {
  const formData = await request.formData(); //Aqui se almacenan los datos del formulario al dar el submit

  // Maneras de obtener los datos:
  // 1. uno por uno por metodo get
  // console.log(formData.get("nombre"));

  // 2. Te trae un array con un elemento por cada campo y su valor.
  // console.log([...formData]);

  // 3. Te trae un objeto con con todos los campos en llave y valor. Forma mas izi
  const datos = Object.fromEntries(formData);
  const email = formData.get("email");

  // Validacion de los datos del form
  const errores = [];
  if (Object.values(datos).includes("")) {
    errores.push("Todos los campos son obligatorios");
  }

  let regex = new RegExp(
    // eslint-disable-next-line no-control-regex
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  if (!regex.test(email)) {
    errores.push("El email no es valido");
  }

  // Retornar datos si hay errores
  if (Object.keys(errores).length) {
    return errores;
  }

  await agregarCliente(datos);

  return redirect("/");
};

const NuevoCliente = () => {
  const errores = useActionData();
  const navigate = useNavigate();
  // Si en la funcion onclick dentro del parentesis le pongo el valor -1 entonces nos mandara a la pagina anterior
  // useNavigate es ideal para botones

  // Nota: Tambien tenemos otro hook llamado redirection pero ese es para los loaders y actions

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">
        {" "}
        Llena todos los campos para registrar un nuevo cliente
      </p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}

        <Form method="post" noValidate>
          <Formulario />

          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold  text-white text-lg cursor-pointer"
            value="Registrar Cliente"
          />
        </Form>
      </div>
    </>
  );
};

export default NuevoCliente;
