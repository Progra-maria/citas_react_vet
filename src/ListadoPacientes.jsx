import FichaPaciente from "./FichaPaciente";

const ListadoPacientes = ({pacientes, setPaciente, eliminarPaciente}) => {


    return (
        <div className="mx-5 md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll">

            {pacientes && pacientes.length ? (
                <>
                <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
                <p className="text-lg mt-5 mb-10 text-center">Administra tus {''}
                <span className="text-indigo-600 font-bold">
                    Pacientes y Citas
                </span>
            </p>
            {pacientes.map( paciente=> (
            <FichaPaciente 
            key= {paciente.id}
            paciente= {paciente}
            setPaciente = {setPaciente}
            eliminarPaciente = {eliminarPaciente}
            />
            )
        ) }</>
            
            ) : (
                <>
                <h2 className="font-black text-3xl text-center">Aún No Hay Pacientes</h2>
                <p className="text-lg mt-5 mb-10 text-center">Comienza agregando pacientes {''}
                <span className="text-indigo-600 font-bold">
                    y Aparecerán en esta columna
                </span>
            </p>
            </>

            )}
        
       

        
       
        </div>
    )
}

export default ListadoPacientes
