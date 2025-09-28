
# Yesport 
"*Este es un proyecto de Backend2 que utiliza express, Mongoose, handlebars passport JWT para el sistema de Login y Generación
de token, ademas de esto esta bien estructurado con arquitectura profesional, usando arquitectura en capas, permitiendo asi
la separacion de responsabilidades*"

--- 
## 🛠️ Tecnologias utilizadas
- **MongoDB**: Base de datos 
- **Postman**: Probar endPoints
---

## 📂 Estructura del proyecto

EntregaFinal/
 ├── 📂 app/
 │    ├── 📂 controllers/
 │    │     ├── auth.controller.js
 │    │     ├── cart.controller.j
 │    │     ├── product.controller.js
 │    │     ├── purchase.controller.js
 │    │     └── user.controller.js
 │    │
 │    ├── 📂 dao/
 │    │     ├── cart.dao.js
 │    │     ├── product.dao.js
 │    │     └── user.dao.js
 │    │
 │    ├── 📂 dtos/
 │    │     ├── product.dto.js
 │    │     └── user.dto.js
 │    │
 │    ├── 📂 repositories/
 │    │     ├── cart.repository.js
 │    │     ├── product.repository.js
 │    │     ├── purchase.repository.js
 │    │     └── user.repository.js
 │    ├── 📂 server/
 │    │     └── server.js
 │    ├── 📂 service/
 │    │     ├── auth.service.js
 │    │     ├── cart.service.js
 │    │     ├── product.service.js
 │    │     ├── purchase.service.js
 │    │     └── user.service.js
 ├── 📂 config/
 │    ├── 📂 auth/
 │    │     └── passport.js
 │    ├── 📂 db/
 │    │     ├── config.js
 │    │     ├── db.config.js
 │    │     └── mailer.js
 │    ├── 📂 models/
 │    │     ├── cart.model.js
 │    │     ├── product.model.js
 │    │     ├── ticket.model.js
 │    │     └── user.model.js
 │    │
 ├── 📂 middleware/
 │    │     └── auth.middleware.js
 │    │
 ├── 📂 public/
 │    │
 ├── 📂 routes/
 │    │     ├── auth.routes.js
 │    │     ├── cart.routes.js
 │    │     ├── product.routes.js
 │    │     ├── purchase.routes.js
 │    │     └── user.routes.js
 │    │
 ├── 📂 utils/
 │    │     ├── cryto.js
 │    │     ├── jwt.js
 │    │     └── paginate.js
 │    │
 ├── 📂 views/
 │    ├── 📂 layouts/
 │    └── 📂 partials/
 │
 ├── app.js
 ├── .env
 ├── package.json
 └── README.md 


---
## 🚀 Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

### Clona el repositorio
```bash
git clone https://github.com/Yoli1758/backendII-76855-EntregaFinal.git
cd EntregaFinal

instala dependecias
npm init -y
npm install
Ejecuta el proyecto
npm run dev


```

# Caracteristicas
. Gestion de usuarios con MongoDB


📞 **Contacto**

Autor: Espinoza Yolimar

Email: yolimar.espinoza868ar@gmail.com

GitHub: Yoli1758


[<img src="src/public/img/yesport_logo.jpg" width="50" />]



