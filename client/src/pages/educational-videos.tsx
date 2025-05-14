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
    <div className="min-h-screen flex flex-col md:flex-row bg-[--gray-light]">
      {/* Barra lateral */}
      <div className="w-64 bg-[#EFF6FF] min-h-screen border-r border-[#E5E7EB] hidden md:block">
        <div className="p-4 flex items-center">
          <div className="w-8 h-8 mr-2 flex items-center justify-center bg-[#007BFF] rounded-md">
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
            </svg>
          </div>
          <span className="font-semibold text-lg">CronApp</span>
        </div>
        
        <nav className="mt-6 px-3">
          <Link href="/patient-profile-new" className="flex items-center rounded-md bg-[#007BFF] text-white py-2 px-4 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Inicio
          </Link>
          
          <Link href="/diabetes" className="flex items-center rounded-md text-gray-700 hover:bg-[#E5E7EB] py-2 px-4 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#007BFF]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              <rect width="18" height="18" x="3" y="11" rx="2" ry="2"></rect>
              <line x1="12" x2="12" y1="11" y2="17"></line>
            </svg>
            Diabetes
          </Link>
          
          <Link href="/hypertension" className="flex items-center rounded-md text-gray-700 hover:bg-[#E5E7EB] py-2 px-4 mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#007BFF]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="8 12 12 8 16 12"></polyline>
              <polyline points="8 16 12 12 16 16"></polyline>
            </svg>
            Hipertensión
          </Link>
          
          <h3 className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">MÓDULOS EDUCATIVOS</h3>
          <Link href="/educational-videos" className="flex items-center rounded-md text-gray-700 bg-white shadow-sm py-2 px-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#007BFF]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" x2="16" y1="21" y2="21"></line>
              <line x1="12" x2="12" y1="17" y2="21"></line>
            </svg>
            Videos Educativos
          </Link>
        </nav>
      </div>
      
      {/* Contenido principal con la barra superior para dispositivos móviles */}
      <div className="flex-1 flex flex-col">
        {/* Encabezado fijo para móvil */}
        <div className="sticky top-0 z-30 bg-white shadow-sm md:hidden">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 mr-2 flex items-center justify-center bg-[--blue-main] rounded-md">
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
                  </svg>
                </div>
                <span className="font-semibold text-[--blue-main]">CronApp</span>
              </div>
              
              <div className="flex gap-2">
                <Link href="/patient-profile-new" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[--blue-light]">
                  <svg className="h-5 w-5 text-[--gray-medium]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </Link>
                
                <Link href="/diabetes" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[--blue-light]">
                  <svg className="h-5 w-5 text-[--gray-medium]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 10v12"></path>
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
                  </svg>
                </Link>
                
                <Link href="/hypertension" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[--blue-light]">
                  <svg className="h-5 w-5 text-[--gray-medium]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="8 14 12 10 16 14"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="flex-1 p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-[--blue-main]">Videos Educativos</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {videos.map((video) => (
                <Card key={video.id} className="overflow-hidden video-card">
                  <CardContent className="p-0">
                    <div className="relative">
                      {/* Miniatura del video con corazón y botón de reproducción */}
                      <div className="video-thumbnail">
                        <div className="absolute top-2 left-2">
                          <div className="heart-icon">
                            <svg 
                              width="16" 
                              height="16" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path 
                                d="M8 3.5C5.2 3.5 3 5.7 3 8.5C3 12 5.5 15 12 20.5C18.5 15 21 12 21 8.5C21 5.7 18.8 3.5 16 3.5C14.3 3.5 12.9 4.3 12 5.5C11.1 4.3 9.7 3.5 8 3.5Z" 
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        </div>
                        
                        {/* Botón de reproducción central */}
                        <div className="video-play-button">
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
                        
                        {/* Sin texto superpuesto */}
                      </div>

                      {/* Detalles del video */}
                      <div className="p-4">
                        <h3 className="text-base font-medium">{video.title}</h3>
                        <p className="text-sm text-muted-foreground">{video.subtitle}</p>
                        
                        {/* Barra de Youtube */}
                        <div className="youtube-bar">
                          <span className="youtube-icon">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" fill="#FF0000"/>
                            </svg>
                          </span>
                          <span className="youtube-text">Ver en YouTube</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}