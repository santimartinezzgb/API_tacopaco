# API REST - Taco Paco

API backend para gestionar mesas y pedidos del restaurante Taco Paco.

## 🚀 Tecnologías

- Node.js + Express.js
- MongoDB Atlas (Mongoose)
- dotenv (variables de entorno)

## 📦 Instalación
```bash
pnpm install express mongoose dotenv
```

## ⚙️ Configuración

Crea un archivo `.env` con:
```env
MONGO_USUARIO=tu_usuario
MONGO_CONTRASENA=tu_contraseña
PUERTO=3000
```

## ▶️ Ejecutar
```bash
node server.js
```

## 🔌 Endpoints

### Mesas
- `GET /mesas` - Listar todas las mesas
- `PUT /mesas/:nombre` - Actualizar estado de mesa

### Pedidos
- `GET /pedidos` - Listar pedidos ordenados por fecha
- `POST /pedidos` - Crear nuevo pedido

## 📁 Estructura
```
├── server.js
├── models/
│   ├── Mesa.js
│   └── Pedido.js
└── .env
```

## 🌐 Puerto

Por defecto: `http://localhost:3000`

---

**Autor:** Santi Martínez
