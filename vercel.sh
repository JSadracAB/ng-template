#!/bin/bash

# Este script se ejecuta en el entorno de compilación de Vercel.
# Las variables de entorno de Vercel se inyectan en este entorno y
# se pueden acceder a través de $NOMBRE_DE_VARIABLE.

# La API_URL y la API_KEY están configuradas en el panel de Vercel,
# por lo que no están en el repositorio de Git.

# Ruta al archivo de entorno de producción de Angular
OUTPUT_FILE="./src/environments/environment.production.ts"

# Contenido del archivo de entorno
# Usamos las variables de Vercel ($VITE_API_URL, $VITE_API_KEY) para
# generar el contenido del archivo TypeScript.
echo "export const environment = {" > "$OUTPUT_FILE"
echo "  production: true," >> "$OUTPUT_FILE"
echo "  apiUrl: '$API_URL'," >> "$OUTPUT_FILE"
echo "  apiKey: '$API_KEY'," >> "$OUTPUT_FILE"
echo "};" >> "$OUTPUT_FILE"

# Opcional: imprimir el contenido generado para fines de depuración
# echo "Contenido de $OUTPUT_FILE:"
# cat "$OUTPUT_FILE"

# Ejecutar el comando de compilación de Angular
# El archivo de entorno ya existe en la ubicación correcta,
# por lo que la compilación se ejecutará correctamente.
npm run build -- --configuration production