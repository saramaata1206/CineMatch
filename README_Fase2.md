# CineMatch — Proyecto Fase 2
## Maquetación, segmentación y bloques de las 3 páginas HTML

### Objetivo
CineMatch es una aplicación web para descubrir películas, consultar sus datos principales y guardar temporalmente películas de interés. La Fase 2 implementa las tres vistas definidas en la Fase 1: Inicio, Detalles y Mi lista.

### Tecnologías
- HTML5: estructura y semántica de las tres páginas.
- CSS3: estilos propios, tarjetas, hero, botones, estados y adaptación móvil.
- Bootstrap 5.3: grid, navbar, botones, formularios y componentes responsivos.
- JavaScript: búsqueda, navegación por ID, favoritos y almacenamiento temporal con localStorage.
- API preparada: las imágenes y estructura de datos siguen el planteamiento de TMDB de la Fase 1. La integración autenticada de la API puede incorporarse después mediante una API key.

### Segmentación de las vistas
#### 1. index.html — Inicio
Bloques: barra de navegación, hero con buscador, sección de películas destacadas, tarjetas de películas y footer.
Interacciones: búsqueda por título/género y botón para guardar en Mi lista.

#### 2. pelicula.html — Detalles
Bloques: barra de navegación, imagen de portada, información principal, géneros, descripción, calificación y acciones.
Interacciones: agregar/quitar de Mi lista y regresar al inicio.

#### 3. milista.html — Mi lista
Bloques: barra de navegación, encabezado de colección, tarjetas de películas guardadas y estado vacío.
Interacciones: eliminar películas de la lista y regresar a explorar.

### Responsividad
Se utiliza Bootstrap Grid para adaptar el contenido a escritorio, tablet y celular. Además, CSS incluye un breakpoint para ajustar tarjetas, tipografía y portada en pantallas menores a 576 px.

### Pruebas sugeridas para documentar
1. Computadora: 1366 × 768 px.
2. Tablet: 768 × 1024 px.
3. Celular: 390 × 844 px.

### Evidencias
La carpeta `capturas` contiene capturas de las vistas principales realizadas para la entrega.

### Cómo ejecutar
Abrir `index.html` en un navegador. Para que las imágenes remotas se carguen correctamente se requiere conexión a internet. Bootstrap también se carga desde CDN.
