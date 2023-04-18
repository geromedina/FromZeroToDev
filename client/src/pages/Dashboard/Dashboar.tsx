import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

const data1 = [
  { name: 'Desktop', value: 100 },
  { name: 'Tablet', value: 20 },
  { name: 'Mobile', value: 80 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const data2 = [
  { id: 1, nombre: 'Juan Perez', email: 'juan.perez@mail.com', fechaRegistro: '2022-01-01' },
  { id: 2, nombre: 'Maria Gomez', email: 'maria.gomez@mail.com', fechaRegistro: '2022-01-05' },
  { id: 3, nombre: 'Pedro Rodriguez', email: 'pedro.rodriguez@mail.com', fechaRegistro: '2022-01-09' }
];

const Dashboard = () => {
  return (
    <div>
      <h1>Resumen</h1>
      <p>Aquí se muestra un resumen de la salud y el rendimiento de la aplicación.</p>
      <LineChart width={500} height={300} data={data1} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="tiempoRespuesta" stroke="#ff7300" yAxisId={0} />
        <Tooltip />
      </LineChart>
      <PieChart width={400} height={400}>
        <Pie data={data1} cx={200} cy={200} innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value">
          {data1.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <h2>Usuarios Registrados</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Fecha de Registro</th>
          </tr>
        </thead>
        <tbody>
          {data2.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.fechaRegistro}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
