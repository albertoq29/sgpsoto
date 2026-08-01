export default function ApplicationLogo(props) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
                {...props}
                src="https://i.ibb.co/L1Fvkpf/LOGO-NEGROFINAL-1.png"// aqui va el logo
                alt="Logo de la aplicación"
                style={{ width: '50%', height: 'auto' }} // Ajusta el tamaño según sea necesario
            />
        </div>
    );
}
