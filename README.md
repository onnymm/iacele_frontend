# Servidor frontend de iaCele

Este es el proyecto del servidor frontend de la aplicación iaCele.

## Inicialización

Se clona el repositorio usando SSH:
```bash
git clone git@github.com:onnymm/iacele_frontend.git
```

Se accede al directorio:
```bash
cd iacele_frontend
```

Se instalan las dependencias usando Node Package Manager. Si éste no está
disponible en el dispositivo, se puede realizar la instalación desde
[aquí](https://nodejs.org/en/download/package-manager):
```bash
npm install
```

Se procede a iniciar el servidor:
```bash
npm run dev
```

También se puede iniciar en red local:
```bash
npm run dev -- --host=0.0.0.0
```
