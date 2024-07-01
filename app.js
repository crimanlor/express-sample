// bases de datos
const courses = [
    { id: 1, name: 'Web Development', description: 'Learn HTML, CSS, JavaScript, and more.' },
    { id: 2, name: 'Data Analytics', description: 'Learn to analyze data and make data-driven decisions.' },
    { id: 3, name: 'UX/UI Design', description: 'Learn the principles of user experience and interface design.' }
];


const students = [{ name: 'Eva', dni: '12T', course: 'web' },
{ name: 'Esteban', dni: '1222d', course: 'Web' },
{ name: 'Esteban', dni: '1222d', course: 'Web' },
{ name: 'Maria', dni: '111J', course: 'Web' }];

console.log(__dirname);
// Importar el paquete de terceros que acabamos de instalar. Fijaos que como se encuentra en la carpeta node_modules NO hace falta especificar ninguna ruta (al igual que pasa con los built-in modules)
const express = require('express');
const logger = require('morgan');

// Es generarme un objeto para gestionar el enrutamiento y otros aspectos de la aplicación
const app = express();

// Añadimos el middleware de morgan para loguear todas las peticiones que haga un cliente
app.use(logger('dev'));

// Usa la carpeta 'public' para ofrecer sus recursos a cualquier clietne de forma pública. Esto es, que si me hacen un GET a cualquier archivo de esa carpeta , aceptalo
app.use(express.static('public'));

// nos gustaría que también gestionaras los datos de tipo JSON (entre ellos los POST que nos lleguen)
app.use(express.urlencoded({ extended: true }));  // Middleware para parsear datos de formularios


// Usamos el objeto app para crear un nuevo endpoint
app.get('/', (req, res) => {
    res.send(`<h1>Home Page</h1>
             <p>Los accentos deberían funcionar también.</p>
             <img style="width:200px" src="./images/logo.jfif"></img>`);
});

// Podemos definir la siguiente ruta simplemente volviendo a ejecutar el método app.get
app.get('/courses', (req, res) => {
    res.send(`<ul>
        <li>Web Deveopment</li>
        <li>UX/UI</li>
        <li>Data Analytics</li>
        <ul>`);
});

// Vamos a crear una ruta dinámica. 
app.get('/course/:id', (req, res) => {
    // en el objeto req.params vamos a tener información sobre la parte dinámica de la ruta
    const { id } = req.params;
    const course = courses.find(c => c.id == id);
    if (course) {
        res.send(course);
    } else {
        res.status(404).send('Curso no encontrado.')
    }
});

// Vamos a crear una ruta dinámica. La ruta va a aceptar un identificador de curso, y en función de ese identificador, nos va a mostrar información detalla del curso

// Endpoint para comporbar si un estudiante ya está inscrito
app.get('/check-student', (req, res) => {
    res.sendFile(__dirname + '/form-check-student.html');
});

// Endpoint que va a recibir la consulta de si un dni ya está en la base de datos
app.get('/check-dni', (req, res) => {
    // TODO
    // Obtener el dni de la query string
    const { dni } = req.query;
    // Buscar si existe ese dni en la "Base de datos"
    const student = students.find(s => s.dni == dni);

    // Y mostrar un mensaje en consecuencia
    if (student) {
        res.send(`El estudiante con ese dni ya está inscrito`);
    } else {
        res.send('No existen registros para ese estudiante')
    }
})

// Endpoint para mostrar el formulario de inscripción
app.get('/signup', (req, res) => {
    // enviar el fichero form.html

    res.sendFile(__dirname + '/form.html');
})

//endpoint de tipo post con la misma ruta
app.post('/signup', (req, res) => {
    // vamos a recibir los datos del usuario
    students.push(req.body);
    console.log("🚀 ~ file: app.js:54 ~ app.post ~ students:", students)
    res.send(`Gracias por inscribirte al curso. Actualmente hay ${students.length} inscritos`);
});


// Levantar el servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000.");
});

