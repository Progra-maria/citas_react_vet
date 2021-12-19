import {useState, useEffect} from 'react';
import Error from './Error';

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [error, setError] = useState(false);

   useEffect(()=>{
    if (Object.keys(paciente).length > 0){
        setNombre(paciente.nombre)
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setFecha(paciente.fecha)
        setSintomas(paciente.sintomas)
    }
   }, [paciente])

    const genId = ()=>{
        const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(36);
        return random+fecha;
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        //Validación del formulario

        if( [nombre, propietario, email, fecha, sintomas].includes('') ){

            setError(true)
            return;
        }   setError(false)

        //construimos un objeto de paciente para poder pasar un array de objetos al useState de Pacientes
        const pacienteObj = {
            nombre, 
            propietario, 
            email, 
            fecha, 
            sintomas,
            
        }

        if(paciente.id){
            //editando el registro
            pacienteObj.id = paciente.id;

            const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? pacienteObj : pacienteState);

            setPacientes(pacientesActualizados)
            setPaciente({})
        }else {
            pacienteObj.id = genId();
            setPacientes([...pacientes, pacienteObj]);
        }

        
        
        //reiniciamos el formulario
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
    }
    
    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">
                    Adminístralos
                </span>
            </p>
            <form 
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg py-10 px-5 mb-5 mx-5"
            >
                { error && <Error><p>Todos los campos son obligatorios</p></Error> }
                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold"
                    >Nombre Mascota</label>
                    <input type="text" id="mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md"
                    placeholder="Nombre de la Mascota"
                    value={nombre}
                    onChange={(e)=> setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold"
                    >Nombre Propetario</label>
                    <input type="text" id="mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md"
                    placeholder="Nombre del propietario"
                    value={propietario}
                    onChange={(e)=> setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold"
                    >Email</label>
                    <input type="email" id="email"
                    className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md"
                    placeholder="Email de contacto"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold"
                    >Alta</label>
                    <input type="date" id="alta"
                    className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md"
                    value={fecha}
                    onChange={(e)=> setFecha(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold"
                    >Síntomas</label>
                    <textarea
                    id="sintomas"
                    className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md"
                    placeholder="Síntomas de la mascota"
                    value={sintomas}
                    onChange={(e)=> setSintomas(e.target.value)}
                    />
                </div>
                <input type="submit" 
                className="w-full uppercase font-bold p-3 hover:bg-indigo-700 bg-grey-400 rounded-md cursor-pointer transition-all hover:text-white mb-10"
                value={paciente.id ? "Modificar Paciente" : "Guardar Paciente"}
                />
            </form>
        </div>
    )
}

export default Formulario
