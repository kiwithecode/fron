Aquí tienes la documentación actualizada con las instrucciones para clonar y ejecutar los repositorios de frontend (Angular) y backend (Spring Boot):

# VehicleRegistrationFrontend

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 18.2.7.

## Clonar y ejecutar el frontend (Angular)

1. Clona el repositorio del frontend:

```bash
git clone https://github.com/kiwithecode/fron
```

2. Navega al directorio del proyecto:

```bash
cd fron
```

3. Instala las dependencias del proyecto:

```bash
npm install
```

4. Ejecuta el servidor de desarrollo:

```bash
ng serve
```

5. Abre tu navegador y navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias algún archivo fuente.

## Clonar y ejecutar el backend (Spring Boot)

1. Clona el repositorio del backend:

```bash
git clone https://github.com/kiwithecode/pr_auto
```

2. Navega al directorio del proyecto:

```bash
cd pr_auto
```

3. Asegúrate de tener instalado [Java JDK 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) y [Maven](https://maven.apache.org/install.html).

4. Compila y ejecuta el proyecto:

```bash
./mvnw spring-boot:run
```

5. El backend se ejecutará en `http://localhost:8080`.

## Aplicación desplegada

La aplicación _VehicleRegistrationFrontend_ ha sido desplegada y puede ser accesada en el siguiente enlace: [VehicleRegistrationFrontend](https://prauto.netlify.app/vehicles).

## Repositorios

- Repositorio de backend: [GitHub Backend](https://github.com/kiwithecode/pr_auto)
- Repositorio de frontend: [GitHub Frontend](https://github.com/kiwithecode/fron)

## APIs de prueba (cURL para Postman)

### Crear un vehículo

```bash
curl --location 'https://xzbrmmlcmlqtlmnjlcnz.supabase.co/rest/v1/vehiculos' \
--header 'apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6YnJtbWxjbWxxdGxtbmpsY256Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5NzY4NDIsImV4cCI6MjA0MzU1Mjg0Mn0.QyFIgGcr4kI-ojC8cXj3gTkC0CBXjaWvTwueAWoMOS0' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6YnJtbWxjbWxxdGxtbmpsY256Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5NzY4NDIsImV4cCI6MjA0MzU1Mjg0Mn0' \
--header 'Content-Type: application/json' \
--header 'Prefer: return=minimal' \
--data '{
  "placa": "AWC345",
  "color": "Rojo",
  "modelo": "Toyota Corolla",
  "chasis": "1HGBH41JXMN109189",
  "anio": 2022
}'
```

### Obtener todos los vehículos

```bash
curl --location 'https://xzbrmmlcmlqtlmnjlcnz.supabase.co/rest/v1/vehiculos' \
--header 'apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6YnJtbWxjbWxxdGxtbmpsY256Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5NzY4NDIsImV4cCI6MjA0MzU1Mjg0Mn0' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6YnJtbWxjbWxxdGxtbmpsY256Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5NzY4NDIsImV4cCI6MjA0MzU1Mjg0Mn0'
```

### Obtener un vehículo por ID

```bash
curl --location --globoff 'https://xzbrmmlcmlqtlmnjlcnz.supabase.co/rest/v1/vehiculos?id=eq.{ID_VEHICULO}' \
--header 'apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6YnJtbWxjbWxxdGxtbmpsY256Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5NzY4NDIsImV4cCI6MjA0MzU1Mjg0Mn0' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6YnJtbWxjbWxxdGxtbmpsY256Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5NzY4NDIsImV4cCI6MjA0MzU1Mjg0Mn0'
```

### Actualizar un vehículo

```bash
curl --location --globoff --request PATCH 'https://xzbrmmlcmlqtlmnjlcnz.supabase.co/rest/v1/vehiculos?id=eq.{ID_VEHICULO}' \
--header 'apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6YnJtbWxjbWxxdGxtbmpsY256Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5NzY4NDIsImV4cCI6MjA0MzU1Mjg0Mn0' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6YnJtbWxjbWxxdGxtbmpsY256Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5NzY4NDIsImV4cCI6MjA0MzU1Mjg0Mn0' \
--header 'Content-Type: application/json' \
--header 'Prefer: return=minimal' \
--data '{
  "color": "Azul"
}'
```

### Eliminar un vehículo

```bash
curl --location --globoff --request DELETE 'https://xzbrmmlcmlqtlmnjlcnz.supabase.co/rest/v1/vehiculos?id=eq.{ID_VEHICULO}' \
--header 'apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6YnJtbWxjbWxxdGxtbmpsY256Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5NzY4NDIsImV4cCI6MjA0MzU1Mjg0Mn0' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6YnJtbWxjbWxxdGxtbmpsY256Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5NzY4NDIsImV4cCI6MjA0MzU1Mjg0Mn0'
```

## Ayuda adicional

Para obtener más ayuda sobre Angular CLI, utiliza `ng help` o consulta la [Descripción general y referencia de comandos de Angular CLI](https://angular.dev/tools/cli).

Si necesitas más ajustes o detalles, estaré encantado de ayudarte.
