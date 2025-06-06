import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { format, addDays, subDays } from "date-fns";
import { es } from "date-fns/locale";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  ReferenceLine,
  ComposedChart,
  Bar,
  Cell
} from "recharts";

// Datos de presión arterial simulados para una semana
const mockPressureData = [
  { systolic: 120, diastolic: 80, date: subDays(new Date(), 6) },
  { systolic: 118, diastolic: 76, date: subDays(new Date(), 5) },
  { systolic: 125, diastolic: 82, date: subDays(new Date(), 4) },
  { systolic: 135, diastolic: 88, date: subDays(new Date(), 3) },
  { systolic: 128, diastolic: 84, date: subDays(new Date(), 2) },
  { systolic: 122, diastolic: 79, date: subDays(new Date(), 1) },
  { systolic: 130, diastolic: 85, date: new Date() },
];

// Datos para semanas anteriores
const weekMinus1 = [
  { systolic: 132, diastolic: 86, date: subDays(new Date(), 13) },
  { systolic: 128, diastolic: 84, date: subDays(new Date(), 12) },
  { systolic: 145, diastolic: 95, date: subDays(new Date(), 11) },
  { systolic: 138, diastolic: 88, date: subDays(new Date(), 10) },
  { systolic: 125, diastolic: 82, date: subDays(new Date(), 9) },
  { systolic: 130, diastolic: 85, date: subDays(new Date(), 8) },
  { systolic: 136, diastolic: 87, date: subDays(new Date(), 7) },
];

const weekMinus2 = [
  { systolic: 142, diastolic: 92, date: subDays(new Date(), 20) },
  { systolic: 134, diastolic: 86, date: subDays(new Date(), 19) },
  { systolic: 130, diastolic: 84, date: subDays(new Date(), 18) },
  { systolic: 128, diastolic: 82, date: subDays(new Date(), 17) },
  { systolic: 136, diastolic: 88, date: subDays(new Date(), 16) },
  { systolic: 140, diastolic: 90, date: subDays(new Date(), 15) },
  { systolic: 138, diastolic: 89, date: subDays(new Date(), 14) },
];

export default function HypertensionModule() {
  const [startDate, setStartDate] = useState(subDays(new Date(), 6));
  const [endDate, setEndDate] = useState(new Date());
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [systolicValue, setSystolicValue] = useState("");
  const [diastolicValue, setDiastolicValue] = useState("");
  const [pressureReadings, setPressureReadings] = useState<{systolic: number, diastolic: number, date: Date}[]>(mockPressureData);
  const [armPosition, setArmPosition] = useState("brazo_derecho");
  const [bodyPosition, setBodyPosition] = useState("sentado");
  const [useCurrentDate, setUseCurrentDate] = useState(true);
  const [showBasalData, setShowBasalData] = useState(true);
  
  // Datos basales del paciente (simulados)
  const basalData = {
    weight: 100,
    height: 188,
    isSmoker: false
  };

  const dateRangeText = `${format(startDate, "d 'de' MMMM", { locale: es })} al ${format(endDate, "d 'de' MMMM", { locale: es })}`;

  // Función para obtener datos de presión según la semana seleccionada
  const getWeekData = (start: Date, end: Date) => {
    // Calculamos cuántas semanas hacia atrás estamos
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeksDiff = Math.floor(diffDays / 7);
    
    switch(weeksDiff) {
      case 0:
        return mockPressureData;
      case 1:
        return weekMinus1;
      case 2:
        return weekMinus2;
      default:
        // Para semanas sin datos, retornamos un array vacío
        return [];
    }
  };

  useEffect(() => {
    const weekData = getWeekData(startDate, endDate);
    setPressureReadings(weekData);
  }, [startDate, endDate]);

  const goToPreviousWeek = () => {
    setStartDate(subDays(startDate, 7));
    setEndDate(subDays(endDate, 7));
  };

  const goToNextWeek = () => {
    // No permitir ir más allá de la semana actual
    const nextStartDate = addDays(startDate, 7);
    if (nextStartDate <= new Date()) {
      setStartDate(nextStartDate);
      setEndDate(addDays(endDate, 7));
    }
  };

  const addPressureReading = () => {
    const systolic = parseFloat(systolicValue);
    const diastolic = parseFloat(diastolicValue);
    if (!isNaN(systolic) && !isNaN(diastolic)) {
      // Añadir nueva medición con los datos adicionales
      const newReading = { 
        systolic, 
        diastolic, 
        date: new Date(),
        armPosition,
        bodyPosition
      };
      
      setPressureReadings([...pressureReadings, newReading]);
      setSystolicValue("");
      setDiastolicValue("");
      setShowAddDialog(false);
      
      // Restablecer valores por defecto para la próxima medición
      setArmPosition("brazo_derecho");
      setBodyPosition("sentado");
      setUseCurrentDate(true);
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMenuButton, setShowMenuButton] = useState(true);
  
  // Detector de dispositivo móvil y control de scroll para el botón hamburguesa
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Control de scroll para ocultar/mostrar el botón hamburguesa
    const handleScroll = () => {
      // Si el usuario ha scrolleado más de 100px, ocultamos el botón
      // O si el sidebar está abierto, mantenemos el botón visible
      if (sidebarOpen) {
        setShowMenuButton(true);
      } else {
        setShowMenuButton(window.scrollY < 100);
      }
    };
    
    // Verificar al cargar y cuando cambie el tamaño de la ventana
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sidebarOpen]);

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen">
    
      {/* Barra lateral - Cambia en móvil vs desktop */}
      <div className={`${isMobile ? 'fixed z-40 inset-y-0 left-0 transform transition-transform duration-300 ease-in-out' : 'w-[220px]'} 
        ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'} 
        bg-[--blue-light] border-r py-4 px-2 md:relative md:block`}>
        <div className="mb-8 px-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[--blue-main] rounded-md flex items-center justify-center">
              <svg 
                width="16" 
                height="16" 
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
            <span className="font-semibold text-[--black-soft]">CronApp</span>
          </div>
        </div>

        <nav className="space-y-1">
          <a href="/patient-profile-new" className="flex items-center py-2 px-4 text-sm text-[--black-soft] rounded-md hover:bg-white hover:shadow-sm transition-all">
            <svg className="mr-3 h-5 w-5 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Inicio
          </a>

          <a href="/diabetes" className="flex items-center py-2 px-4 text-sm text-[--black-soft] rounded-md hover:bg-white hover:shadow-sm transition-all">
            <svg className="mr-3 h-5 w-5 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 10v12"></path>
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
            </svg>
            Diabetes
          </a>

          <a href="/hypertension" className="flex items-center py-2 px-4 text-sm bg-[--blue-main] text-white font-medium rounded-md shadow-sm">
            <svg className="mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="8 14 12 10 16 14"></polyline>
            </svg>
            Hipertensión
          </a>
        </nav>

        <Separator className="my-4" />

        <h3 className="px-4 text-xs font-medium text-[--gray-medium] uppercase tracking-wider mb-2">Módulos Educativos</h3>
        <nav className="space-y-1">
          <Link href="/educational-videos" className="flex items-center py-2 px-4 text-sm text-[--black-soft] rounded-md hover:bg-white hover:shadow-sm transition-all">
            <svg className="mr-3 h-5 w-5 text-[--cyan-info]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            Videos Educativos
          </Link>
        </nav>
      </div>

      {/* Overlay para cerrar el sidebar en móvil cuando está abierto */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Contenido principal */}
      <div className="flex-1 p-4 md:p-6 bg-[--gray-light]">
        <div className="max-w-4xl mx-auto">
          <header className="mb-6">
            <div className="flex items-center mb-4">
              {/* Área izquierda para el botón de hamburguesa en móvil */}
              <div className="flex-1 flex justify-start">
                {isMobile && showMenuButton && (
                  <button 
                    className="p-2 bg-[--blue-main] rounded-md text-white shadow-md transition-opacity duration-300"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                  >
                    <svg 
                      className="h-6 w-6" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      {sidebarOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      )}
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Área derecha para notificaciones y perfil - siempre alineada a la derecha */}
              <div className="flex justify-end items-center space-x-2 md:space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <div className="flex items-center cursor-pointer hover:bg-[--blue-light]/20 p-2 rounded-lg transition-colors">
                      <div className="relative">
                        <svg className="h-6 w-6 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[--red-alert]"></span>
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 mt-1 shadow-lg">
                    <DropdownMenuLabel className="text-[--blue-main] flex justify-between items-center">
                      <span>Notificaciones</span>
                      <span className="bg-[--red-alert] text-white text-xs px-1.5 py-0.5 rounded-full">2</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-64 overflow-y-auto">
                      <DropdownMenuItem className="cursor-pointer p-3 hover:bg-[--blue-light]/10">
                        <div className="space-y-1">
                          <div className="flex justify-between items-start">
                            <span className="font-medium text-[--black-soft] text-sm">Resultado de análisis listo</span>
                            <span className="text-xs text-[--gray-medium]">Hoy</span>
                          </div>
                          <p className="text-xs text-[--gray-medium]">Su resultado de análisis de glucosa está disponible para revisar.</p>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer p-3 hover:bg-[--blue-light]/10">
                        <div className="space-y-1">
                          <div className="flex justify-between items-start">
                            <span className="font-medium text-[--black-soft] text-sm">Recordatorio de cita</span>
                            <span className="text-xs text-[--gray-medium]">Ayer</span>
                          </div>
                          <p className="text-xs text-[--gray-medium]">Tiene una consulta de seguimiento programada para mañana a las 10:00 AM.</p>
                        </div>
                      </DropdownMenuItem>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer flex justify-center text-[--blue-main] text-sm hover:bg-[--blue-light]/10">
                      Ver todas las notificaciones
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <div className="flex items-center gap-2 cursor-pointer hover:bg-[--blue-light]/20 p-2 rounded-lg transition-colors">
                      <div className="h-8 w-8 rounded-full bg-[--blue-main] flex items-center justify-center text-white font-medium shadow-sm">
                        J
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-[--black-soft]">José Ponce A</span>
                        <span className="text-xs text-[--gray-medium]">Paciente</span>
                      </div>
                      <svg className="h-4 w-4 text-[--gray-medium]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 mt-1 shadow-lg">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-[--black-soft]">José Ponce Ávila</p>
                      <p className="text-xs text-[--gray-medium] mt-1">joseponce@email.com</p>
                    </div>
                    <DropdownMenuItem className="cursor-pointer px-4 py-2 hover:bg-[--blue-light]/10">
                      <svg className="mr-2 h-4 w-4 text-[--gray-medium]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                      <span className="text-sm">Editar perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer px-4 py-2 text-[--red-alert] hover:bg-red-50">
                      <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      <span className="text-sm">Cerrar sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          <h1 className="text-2xl font-bold mb-6 text-[--blue-main]">Módulo en proceso</h1>

          <Card className="mb-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="p-3 md:p-4 border-b flex flex-wrap justify-between items-center bg-[--blue-light]/30">
                <h2 className="text-base md:text-lg font-medium text-[--blue-main] w-full sm:w-auto mb-2 sm:mb-0">{dateRangeText}</h2>
              </div>

              <div className="p-4 md:p-6">
                {pressureReadings.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 md:py-12">
                    <div className="relative mb-6">
                      {/* Imagen de portapapeles con mediciones */}
                      <div className="w-32 md:w-40 h-40 md:h-48 bg-[--blue-light]/20 border border-[--blue-light] rounded-lg relative z-10 flex items-center justify-center shadow-sm">
                        <div className="w-24 md:w-32 h-32 md:h-40 bg-white rounded-lg border border-[--blue-light]/50"></div>
                      </div>
                    </div>
                    <p className="text-[--black-soft] font-medium text-center">No tenemos datos para mostrar</p>
                    <p className="text-[--gray-medium] text-sm mt-1 text-center">Haz click aquí para poder agregar datos</p>
                  </div>
                ) : (
                  <div>
                    {/* Altura adaptativa según el dispositivo */}
                    <div className="h-52 sm:h-64 relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart 
                          data={pressureReadings.map(reading => ({
                            ...reading,
                            dayLabel: format(reading.date, "dd/MM"),
                            formattedDate: format(reading.date, "dd/MM/yyyy")
                          }))}
                          margin={{ 
                            top: 20, 
                            right: 30, 
                            left: 5, 
                            bottom: 5 
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                          <XAxis 
                            dataKey="dayLabel" 
                            tick={{ fontSize: 9, fill: 'var(--gray-medium)' }}
                            tickLine={false}
                            axisLine={{ stroke: '#e5e5e5' }}
                            height={30}
                          />
                          <YAxis 
                            domain={[40, 200]}
                            tick={{ fontSize: 9, fill: 'var(--gray-medium)' }}
                            tickLine={false}
                            axisLine={{ stroke: '#e5e5e5' }}
                            width={30}
                          />
                          <Tooltip 
                            formatter={(value: number, name: string) => {
                              return [`${value} mmHg`, name === 'systolic' ? 'Sistólica' : 'Diastólica'];
                            }}
                            labelFormatter={(label) => `Fecha: ${label}`}
                            contentStyle={{
                              backgroundColor: 'white',
                              border: '1px solid #e5e5e5',
                              borderRadius: '4px',
                              fontSize: '11px'
                            }}
                          />
                          <Legend 
                            align="center" 
                            verticalAlign="top" 
                            iconType="circle" 
                            iconSize={8}
                            wrapperStyle={{ 
                              fontSize: '10px',
                              paddingBottom: '5px'  
                            }}
                            payload={[
                              { value: 'Sistólica', type: 'circle', color: 'var(--red-alert)' },
                              { value: 'Diastólica', type: 'circle', color: 'var(--blue-main)' }
                            ]}
                          />
                          
                          {/* Líneas de referencia con etiquetas responsivas */}
                          <ReferenceLine 
                            y={160} 
                            stroke="var(--red-alert)" 
                            strokeDasharray="3 3" 
                            label={{ 
                              value: "160", 
                              fill: "var(--red-alert)", 
                              position: "right",
                              fontSize: 9
                            }} 
                          />
                          <ReferenceLine 
                            y={140} 
                            stroke="var(--yellow-warning)" 
                            strokeDasharray="3 3" 
                            label={{ 
                              value: "140", 
                              fill: "var(--yellow-warning)", 
                              position: "right",
                              fontSize: 9
                            }} 
                          />
                          <ReferenceLine 
                            y={90} 
                            stroke="var(--blue-main)" 
                            strokeDasharray="3 3" 
                            label={{ 
                              value: "90", 
                              fill: "var(--blue-main)", 
                              position: "right",
                              fontSize: 9
                            }} 
                          />
                          <ReferenceLine 
                            y={60} 
                            stroke="var(--blue-main)" 
                            strokeDasharray="3 3" 
                            label={{ 
                              value: "60", 
                              fill: "var(--blue-main)", 
                              position: "right",
                              fontSize: 9
                            }} 
                          />
                          
                          {/* Datos de systolic (sistólica) */}
                          <Line
                            type="monotone"
                            dataKey="systolic"
                            name="Sistólica"
                            stroke="var(--red-alert)"
                            dot={{ stroke: 'var(--red-alert)', strokeWidth: 2, r: 3, fill: 'white' }}
                            activeDot={{ r: 5, stroke: 'var(--red-alert)', strokeWidth: 2, fill: 'white' }}
                            strokeWidth={2}
                          />
                          
                          {/* Datos de diastolic (diastólica) */}
                          <Line
                            type="monotone"
                            dataKey="diastolic"
                            name="Diastólica"
                            stroke="var(--blue-main)"
                            dot={{ stroke: 'var(--blue-main)', strokeWidth: 2, r: 3, fill: 'white' }}
                            activeDot={{ r: 5, stroke: 'var(--blue-main)', strokeWidth: 2, fill: 'white' }}
                            strokeWidth={2}
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                    
                    {/* Leyenda responsiva */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs mt-2 mb-1">
                      <div className="flex items-center gap-1 bg-[--green-success]/10 px-2 py-1 rounded-md">
                        <div className="w-3 h-3 bg-[--green-success] rounded-sm"></div>
                        <span className="text-[--gray-medium]">Normal</span>
                      </div>
                      <div className="flex items-center gap-1 bg-[--yellow-warning]/10 px-2 py-1 rounded-md">
                        <div className="w-3 h-3 bg-[--yellow-warning] rounded-sm"></div>
                        <span className="text-[--gray-medium]">Elevada</span>
                      </div>
                      <div className="flex items-center gap-1 bg-[--red-alert]/10 px-2 py-1 rounded-md">
                        <div className="w-3 h-3 bg-[--red-alert] rounded-sm"></div>
                        <span className="text-[--gray-medium]">Alta</span>
                      </div>
                      <div className="flex items-center gap-1 bg-[--blue-main]/10 px-2 py-1 rounded-md">
                        <div className="w-3 h-3 bg-[--blue-main] rounded-sm"></div>
                        <span className="text-[--gray-medium]">Baja</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="px-3 sm:px-4 py-3 flex justify-between items-center bg-[--blue-light]/10">
                <Button 
                  size="sm" 
                  onClick={goToPreviousWeek}
                  className="rounded-full w-8 h-8 sm:w-9 sm:h-9 p-0 border border-[--blue-main]/30 bg-white text-[--blue-main] hover:bg-[--blue-light]"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="mx-auto"
                  >
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                  <span className="sr-only">Anterior</span>
                </Button>
                
                <span className="text-xs sm:text-sm text-[--gray-medium]">Navegar por semanas</span>
                
                <Button 
                  size="sm" 
                  onClick={goToNextWeek}
                  className="rounded-full w-8 h-8 sm:w-9 sm:h-9 p-0 border border-[--blue-main]/30 bg-white text-[--blue-main] hover:bg-[--blue-light]"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="mx-auto" 
                  >
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                  <span className="sr-only">Siguiente</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="bg-[--blue-main] hover:bg-[--blue-main]/90 text-white shadow-sm">
                  <svg
                    className="mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Agregar medición
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] border border-[--blue-light] shadow-lg w-[95vw] max-w-[95vw] sm:w-auto sm:max-w-[425px] p-4 sm:p-6">
                <DialogHeader className="mb-2 sm:mb-4">
                  <DialogTitle className="text-[--blue-main] text-xl">Agregar medición</DialogTitle>
                  <DialogDescription className="sr-only">Formulario para agregar una nueva medición de presión arterial</DialogDescription>
                </DialogHeader>

                {/* Datos basales */}
                <div className="bg-[--blue-light]/20 rounded-md p-3 sm:p-4 mb-3 sm:mb-4 text-sm sm:text-base">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[--blue-main] flex items-center justify-center text-white flex-shrink-0">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 16v-4"/>
                        <path d="M12 8h.01"/>
                      </svg>
                    </div>
                    <span className="text-[--blue-main] text-sm sm:text-base flex-1">Esta medición se guardara con tus datos basales <strong>actuales</strong></span>
                  </div>
                  
                  {showBasalData && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="8" y1="12" x2="16" y2="12"/>
                          </svg>
                        </div>
                        <span className="text-sm">Peso: {basalData.weight} kg</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20v-6"/>
                            <path d="M8 10v6"/>
                            <path d="M16 10v6"/>
                            <path d="M8 10a4 4 0 0 1 8 0"/>
                          </svg>
                        </div>
                        <span className="text-sm">Estatura: {basalData.height} cm</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 10h.01"/>
                            <path d="M8 10h.01"/>
                            <path d="M18 5h.01"/>
                            <path d="M8 5h.01"/>
                            <path d="M18 15h.01"/>
                            <path d="M8 15h.01"/>
                            <path d="M21 8V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v1"/>
                            <path d="M21 16v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1"/>
                          </svg>
                        </div>
                        <span className="text-sm">Fumador: {basalData.isSmoker ? 'Sí' : 'No'}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end mt-2">
                    <Button 
                      onClick={() => setShowBasalData(!showBasalData)}
                      className="bg-transparent text-[--blue-main] hover:bg-[--blue-light]/50 p-0 text-xs sm:text-sm"
                    >
                      {showBasalData ? "Ocultar estos datos" : "Mostrar estos datos"}
                    </Button>
                  </div>
                </div>
                
                {/* Campos de presión arterial */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <Input
                    id="systolic"
                    type="number"
                    inputMode="decimal"
                    value={systolicValue}
                    onChange={(e) => setSystolicValue(e.target.value)}
                    className="border-[--blue-light] focus-visible:ring-[--blue-main] text-base"
                    placeholder="Sistólica (mmHg)"
                  />
                  <Input
                    id="diastolic"
                    type="number"
                    inputMode="decimal"
                    value={diastolicValue}
                    onChange={(e) => setDiastolicValue(e.target.value)}
                    className="border-[--blue-light] focus-visible:ring-[--blue-main] text-base"
                    placeholder="Diastólica (mmHg)"
                  />
                </div>
                
                {/* Posición del brazo */}
                <div className="mb-3 sm:mb-4">
                  <Label htmlFor="arm-position" className="font-medium block mb-1.5 sm:mb-2 text-sm sm:text-base">
                    Posicion del brazo
                  </Label>
                  <RadioGroup 
                    id="arm-position" 
                    value={armPosition}
                    onValueChange={setArmPosition}
                    className="flex flex-wrap gap-1.5 sm:gap-2"
                  >
                    <div className={`flex items-center space-x-1 sm:space-x-2 bg-blue-50 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full ${armPosition === 'brazo_derecho' ? 'border border-[--blue-main] bg-blue-100' : 'border border-transparent'}`}>
                      <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[--blue-main]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <Label
                        htmlFor="brazo_derecho"
                        className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Brazo derecho
                      </Label>
                      <RadioGroupItem
                        value="brazo_derecho"
                        id="brazo_derecho"
                        className="hidden"
                      />
                    </div>
                    
                    <div className={`flex items-center space-x-1 sm:space-x-2 bg-gray-100 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full ${armPosition === 'brazo_izquierdo' ? 'border border-[--blue-main] bg-blue-100' : 'border border-transparent'}`}>
                      <Label
                        htmlFor="brazo_izquierdo"
                        className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Brazo izquierdo
                      </Label>
                      <RadioGroupItem
                        value="brazo_izquierdo"
                        id="brazo_izquierdo"
                        className="hidden"
                      />
                    </div>
                    
                    <div className={`flex items-center space-x-1 sm:space-x-2 bg-gray-100 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full ${armPosition === 'muneca_derecha' ? 'border border-[--blue-main] bg-blue-100' : 'border border-transparent'}`}>
                      <Label
                        htmlFor="muneca_derecha"
                        className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Muñeca derecha
                      </Label>
                      <RadioGroupItem
                        value="muneca_derecha"
                        id="muneca_derecha"
                        className="hidden"
                      />
                    </div>
                    
                    <div className={`flex items-center space-x-1 sm:space-x-2 bg-gray-100 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full ${armPosition === 'muneca_izquierda' ? 'border border-[--blue-main] bg-blue-100' : 'border border-transparent'}`}>
                      <Label
                        htmlFor="muneca_izquierda"
                        className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Muñeca izquierda
                      </Label>
                      <RadioGroupItem
                        value="muneca_izquierda"
                        id="muneca_izquierda"
                        className="hidden"
                      />
                    </div>
                    
                    <div className={`flex items-center space-x-1 sm:space-x-2 bg-gray-100 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full ${armPosition === 'otro_arm' ? 'border border-[--blue-main] bg-blue-100' : 'border border-transparent'}`}>
                      <Label
                        htmlFor="otro_arm"
                        className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Otro
                      </Label>
                      <RadioGroupItem
                        value="otro_arm"
                        id="otro_arm"
                        className="hidden"
                      />
                    </div>
                  </RadioGroup>
                </div>
                
                {/* Posición del cuerpo */}
                <div className="mb-3 sm:mb-4">
                  <Label htmlFor="body-position" className="font-medium block mb-1.5 sm:mb-2 text-sm sm:text-base">
                    Posicion del cuerpo
                  </Label>
                  <RadioGroup 
                    id="body-position" 
                    value={bodyPosition}
                    onValueChange={setBodyPosition}
                    className="flex flex-wrap gap-1.5 sm:gap-2"
                  >
                    <div className={`flex items-center space-x-1 sm:space-x-2 bg-blue-50 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full ${bodyPosition === 'sentado' ? 'border border-[--blue-main] bg-blue-100' : 'border border-transparent'}`}>
                      <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[--blue-main]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <Label
                        htmlFor="sentado"
                        className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Sentado
                      </Label>
                      <RadioGroupItem
                        value="sentado"
                        id="sentado"
                        className="hidden"
                      />
                    </div>
                    
                    <div className={`flex items-center space-x-1 sm:space-x-2 bg-gray-100 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full ${bodyPosition === 'de_pie' ? 'border border-[--blue-main] bg-blue-100' : 'border border-transparent'}`}>
                      <Label
                        htmlFor="de_pie"
                        className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        De pie
                      </Label>
                      <RadioGroupItem
                        value="de_pie"
                        id="de_pie"
                        className="hidden"
                      />
                    </div>
                    
                    <div className={`flex items-center space-x-1 sm:space-x-2 bg-gray-100 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full ${bodyPosition === 'acostado' ? 'border border-[--blue-main] bg-blue-100' : 'border border-transparent'}`}>
                      <Label
                        htmlFor="acostado"
                        className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Acostado
                      </Label>
                      <RadioGroupItem
                        value="acostado"
                        id="acostado"
                        className="hidden"
                      />
                    </div>
                    
                    <div className={`flex items-center space-x-1 sm:space-x-2 bg-gray-100 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full ${bodyPosition === 'reclinado' ? 'border border-[--blue-main] bg-blue-100' : 'border border-transparent'}`}>
                      <Label
                        htmlFor="reclinado"
                        className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Reclinado
                      </Label>
                      <RadioGroupItem
                        value="reclinado"
                        id="reclinado"
                        className="hidden"
                      />
                    </div>
                    
                    <div className={`flex items-center space-x-1 sm:space-x-2 bg-gray-100 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full ${bodyPosition === 'otro_body' ? 'border border-[--blue-main] bg-blue-100' : 'border border-transparent'}`}>
                      <Label
                        htmlFor="otro_body"
                        className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Otro
                      </Label>
                      <RadioGroupItem
                        value="otro_body"
                        id="otro_body"
                        className="hidden"
                      />
                    </div>
                  </RadioGroup>
                </div>
                
                {/* Selector de fecha/hora */}
                <div className="flex items-center space-x-2 p-2 sm:p-3 border border-gray-200 rounded-md bg-white mb-3 sm:mb-4">
                  <Checkbox 
                    id="use-current-date" 
                    checked={useCurrentDate}
                    onCheckedChange={(checked) => setUseCurrentDate(checked === true)}
                    className="border-[--blue-main] data-[state=checked]:bg-[--blue-main] h-3.5 w-3.5 sm:h-4 sm:w-4"
                  />
                  <div className="grid gap-1 leading-none flex-1">
                    <Label
                      htmlFor="use-current-date"
                      className="text-xs sm:text-sm font-medium leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Usar fecha y hora actual<br className="sm:hidden" />{" "}
                      <span className="block sm:inline text-xs text-gray-500">({format(new Date(), "dd/MM/yyyy, HH:mm")})</span>
                    </Label>
                  </div>
                </div>
                
                <DialogFooter className="flex justify-between sm:justify-end gap-2 sm:gap-3 mt-2">
                  <Button 
                    variant="outline"
                    onClick={() => setShowAddDialog(false)}
                    className="bg-[--red-alert]/10 hover:bg-[--red-alert]/20 border-[--red-alert]/30 text-[--red-alert] hover:text-[--red-alert] text-xs sm:text-sm h-9 sm:h-10 px-3 sm:px-4"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    onClick={addPressureReading}
                    className="bg-[--green-success] hover:bg-[--green-success]/90 text-white text-xs sm:text-sm h-9 sm:h-10 px-3 sm:px-4"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 7 9 19l-5.5-5.5"/>
                    </svg>
                    Guardar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}