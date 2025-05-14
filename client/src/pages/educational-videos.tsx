import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";

export default function EducationalVideos() {
  // Datos de los videos educativos
  const videos = [
    {
      id: 1,
      title: "Actividad Física",
      subtitle: "Cuidado personal",
      category: "Actividad Física",
      thumbnail: "actividad-fisica",
    },
    {
      id: 2,
      title: "Administración Insulina",
      subtitle: "Diabetes",
      category: "Administración Insulina",
      thumbnail: "administracion-insulina",
    },
    {
      id: 3,
      title: "Plan de Alimentación",
      subtitle: "Diabetes",
      category: "Plan de Alimentación",
      thumbnail: "plan-alimentacion",
    },
    {
      id: 4,
      title: "Hemoglutest",
      subtitle: "Diabetes",
      category: "Hemoglutest",
      thumbnail: "hemoglutest",
    },
    {
      id: 5,
      title: "Manejo de Heridas",
      subtitle: "Diabetes",
      category: "Manejo de Heridas",
      thumbnail: "manejo-heridas",
    },
    {
      id: 6,
      title: "Eliminación Material Cortopunzante",
      subtitle: "Diabetes",
      category: "Eliminación Material Cortopunzante",
      thumbnail: "eliminacion-material",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header / Navegación Superior */}
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="flex h-16 items-center px-4 sm:px-6">
          <div className="flex items-center">
            <div className="w-8 h-8 mr-2 flex items-center justify-center bg-primary rounded-md">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path 
                  d="M8 3.5C5.2 3.5 3 5.7 3 8.5C3 12 5.5 15 12 20.5C18.5 15 21 12 21 8.5C21 5.7 18.8 3.5 16 3.5C14.3 3.5 12.9 4.3 12 5.5C11.1 4.3 9.7 3.5 8 3.5Z" 
                  stroke="currentColor" 
                  strokeWidth="1.8" 
                  fill="none"
                />
                <path 
                  d="M8 9H9.5L10.5 7.5L12 11L13.5 9H15" 
                  stroke="currentColor" 
                  strokeWidth="1.8" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  fill="none"
                />
                <path 
                  d="M12 14C12 14 13.5 14.5 15 16C16.5 17.5 17.5 19 17.5 19" 
                  stroke="currentColor" 
                  strokeWidth="1.8" 
                  strokeLinecap="round" 
                  fill="none"
                />
                <circle 
                  cx="18" 
                  cy="19.5" 
                  r="1.2" 
                  stroke="currentColor" 
                  strokeWidth="1.8" 
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="font-semibold text-lg">CronApp</span>
          </div>
          
          <nav className="flex items-center ml-6 space-x-4">
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Dashboard</a>
            <a href="#" className="text-sm font-medium transition-colors text-primary">Pacientes</a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Condiciones</a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Estadísticas</a>
          </nav>
          
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
              <span className="sr-only">Notificaciones</span>
            </Button>
            <div className="h-6 w-px bg-muted"></div>
            <Button variant="ghost" size="sm" className="gap-2">
              <span>Dr. CronApp</span>
              <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 py-6 px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">Videos Educativos</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => window.history.back()}>Atrás</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  {/* Miniatura del video con corazón y botón de reproducción */}
                  <div className="bg-gray-100 aspect-video relative flex items-center justify-center">
                    <div className="absolute top-2 left-2">
                      <div className="bg-white rounded-full p-1.5 shadow-sm">
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-red-500"
                        >
                          <path 
                            d="M8 3.5C5.2 3.5 3 5.7 3 8.5C3 12 5.5 15 12 20.5C18.5 15 21 12 21 8.5C21 5.7 18.8 3.5 16 3.5C14.3 3.5 12.9 4.3 12 5.5C11.1 4.3 9.7 3.5 8 3.5Z" 
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Botón de reproducción central */}
                    <div className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="text-red-500"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                    
                    {/* Texto superpuesto */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h2 className="text-xl md:text-2xl font-bold text-center text-[#1E4E94] px-4">
                        {video.thumbnail === 'actividad-fisica' && "ACTIVIDAD FÍSICA"}
                        {video.thumbnail === 'administracion-insulina' && "ADMINISTRACIÓN DE INSULINA"}
                        {video.thumbnail === 'plan-alimentacion' && "PLAN DE ALIMENTACIÓN"}
                        {video.thumbnail === 'hemoglutest' && "HEMOGLUTEST"}
                        {video.thumbnail === 'manejo-heridas' && "MANEJO DE HERIDAS"}
                        {video.thumbnail === 'eliminacion-material' && "MANEJO Y ELIMINACIÓN DE MATERIAL CORTOPUNZANTE"}
                      </h2>
                    </div>
                  </div>

                  {/* Detalles del video */}
                  <div className="p-4">
                    <h3 className="text-base font-medium">{video.title}</h3>
                    <p className="text-sm text-muted-foreground">{video.subtitle}</p>
                    
                    {/* Barra de Youtube */}
                    <div className="mt-4 py-1.5 px-2 bg-gray-100 rounded flex items-center">
                      <span className="inline-block bg-white p-1 rounded mr-2">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" fill="#FF0000"/>
                        </svg>
                      </span>
                      <span className="text-xs">Ver en YouTube</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}