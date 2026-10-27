// ── Acceso por PIN ──────────────────────────────────────────
const correctPin = "1251";
const pinModal = document.getElementById('pinModal');
const mainSite = document.getElementById('mainSite');
const pinDigits = document.querySelectorAll('.pin-digit');
const pinSubmit = document.getElementById('pinSubmit');
const pinError = document.getElementById('pinError');

let currentPin = ['', '', '', ''];

pinDigits.forEach((digit, index) => {
    digit.addEventListener('input', (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        e.target.value = value;
        currentPin[index] = value;
        if (value && index < 3) pinDigits[index + 1].focus();
        if (value) digit.classList.add('filled');
        else digit.classList.remove('filled');
        pinError.textContent = '';
    });
    digit.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
            if (!e.target.value && index > 0) {
                pinDigits[index - 1].focus();
                pinDigits[index - 1].value = '';
                currentPin[index - 1] = '';
                pinDigits[index - 1].classList.remove('filled');
            }
            currentPin[index] = '';
            digit.classList.remove('filled');
        }
    });
});

pinSubmit.addEventListener('click', checkPin);
document.addEventListener('keydown', (e) => {
    if (pinModal.classList.contains('active') && e.key === 'Enter') checkPin();
});

function checkPin() {
    const entered = currentPin.join('');
    if (entered.length < 4) { pinError.textContent = 'Ingrese los 4 dígitos'; return; }
    if (entered === correctPin) {
        pinModal.style.transition = 'opacity 0.5s ease';
        pinModal.style.opacity = '0';
        setTimeout(() => {
            pinModal.classList.remove('active');
            mainSite.classList.add('active');
            document.body.style.overflow = 'auto';
            window.scrollTo(0, 0);
        }, 500);
    } else {
        pinError.textContent = 'PIN incorrecto. Intente nuevamente.';
        const content = pinModal.querySelector('.pin-modal-content');
        content.style.animation = 'shake 0.5s ease';
        setTimeout(() => { content.style.animation = 'scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1)'; }, 500);
        pinDigits.forEach((d,i)=>{ d.value=''; currentPin[i]=''; d.classList.remove('filled'); });
        pinDigits[0].focus();
    }
}

setTimeout(() => { if (pinModal.classList.contains('active')) pinDigits[0].focus(); }, 150);

// ── Navegación ──────────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const navH = document.querySelector('.navbar').offsetHeight;
        const pos = target.getBoundingClientRect().top + window.pageYOffset - navH;
        window.scrollTo({ top: pos, behavior: 'smooth' });
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 40) {
        navbar.style.background = 'rgba(10, 30, 58, 0.995)';
        navbar.style.boxShadow = '0 10px 40px rgba(0,0,0,0.35)';
    } else {
        navbar.style.background = 'rgba(10, 30, 58, 0.985)';
        navbar.style.boxShadow = '0 8px 24px rgba(10,30,58,0.12)';
    }
});

// ── Datos de los 19 proyectos (fichas del documento) ────────
const projectData = {
    P1: {
        id: 'P1',
        title: 'Plataforma integral de gestión penitenciaria y expediente judicial digital',
        eje: 'Seguridad y justicia',
        ola: 'Ola 1 · 0 a 6 meses',
        inversion: 'Inversión: Media',
        problema: 'Información dispersa sobre la situación jurídica de más de 118,000 personas; los retrasos en audiencias, revisión de medidas y beneficios agravan el hacinamiento y el costo.',
        solucion: 'Sistema único con expediente jurídico, ficha biométrica, historial disciplinario, salud, plan de trabajo y educación, calendario de audiencias y audiencias virtuales. Incluye un módulo de apoyo a la defensa y al juzgador para ordenar la revisión de casos y los vencimientos de plazos, siempre bajo decisión judicial.',
        impacto: 'Menos retrasos y traslados, trazabilidad completa, información para planificar la capacidad y para las familias.',
        modelo: 'SaaS soberano alojado en infraestructura del Estado, con pago por expediente activo o por usuario.',
        piloto: 'Un centro penal y un juzgado de vigilancia penitenciaria, 90 a 120 días, con digitalización de expedientes y audiencias virtuales.',
        indicadores: '% de expedientes digitalizados; tiempo de resolución de trámites; audiencias virtuales; ahorro en traslados.',
        riesgos: 'Seguridad de la información, calidad del archivo físico, resistencia al cambio.'
    },
    P2: {
        id: 'P2',
        title: 'Trabajo con Propósito: programa nacional de trabajo productivo y reinserción',
        eje: 'Seguridad y justicia',
        ola: 'Ola 1 · 0 a 6 meses',
        inversion: 'Inversión: Media',
        problema: 'Una población muy numerosa sin ocupación productiva eleva tensiones, costos y reincidencia, mientras el Estado compra bienes que podría producir con calidad certificada.',
        solucion: 'Red de talleres certificados, con trabajo voluntario, remunerado y supervisado: textil y uniformes, mobiliario escolar y hospitalario, carpintería y herrería, agroindustria y huertos, prefabricados, reciclaje, ensamblaje y mantenimiento de equipos solares, reparación de electrónicos y digitalización de archivos no sensibles en áreas controladas.',
        impacto: 'Producción para compras públicas (demanda cautiva); en 2024 el Ejecutivo anunció un taller textil de unos 5,400 internos para 2.4 millones de uniformes escolares. Ingresos para el interno con ahorro para la salida, menor reincidencia y menor costo neto.',
        modelo: 'Alianza con operadores privados ancla (maquinaria, capacitación, gestión de calidad); pago por unidad producida y contratos marco con el Estado.',
        piloto: 'Dos talleres (textil y mobiliario) en un centro penal, con línea base de productividad y seguridad, 4 a 6 meses.',
        indicadores: 'Internos ocupados; horas productivas; valor de la producción; ahorro por interno; reincidencia; incidentes laborales.',
        riesgos: 'Cumplimiento de Reglas Mandela y OIT, reputación, trazabilidad si se exporta.'
    },
    P3: {
        id: 'P3',
        title: 'Educación, credenciales verificables y bolsa de empleo',
        eje: 'Seguridad y justicia',
        ola: 'Ola 2 · 6 a 18 meses',
        inversion: 'Inversión: Baja',
        problema: 'Quienes egresan y muchos jóvenes carecen de certificaciones reconocidas; en los hogares en pobreza multidimensional, el 65.6% sufre subempleo o inestabilidad laboral (EHPM 2025).',
        solucion: 'Plataforma de aprendizaje (alfabetización, educación básica y media, oficios, habilidades digitales) con credenciales digitales con QR, un “pasaporte laboral” y una bolsa de trabajo estatal para egresados, jóvenes y empresas aliadas.',
        impacto: 'Mejor empleabilidad, vínculo con empleadores formales y evidencia objetiva para decisiones sobre beneficios penitenciarios.',
        modelo: 'Licencia por usuario activo; alianzas con universidades, INSAFORP y empresas; cuota de empresas por servicios de selección.',
        piloto: 'Un centro penal y una región, 4 a 6 meses, con tres oficios certificados y empresas aliadas.',
        indicadores: 'Certificaciones emitidas; colocación posterior; empleo formal a 12 meses.',
        riesgos: 'Aceptación por empleadores, conectividad en los centros.'
    },
    P4: {
        id: 'P4',
        title: 'Inteligencia fiscal sobre documentos tributarios electrónicos (DTE)',
        eje: 'Gobierno digital y recaudación',
        ola: 'Ola 2 · 6 a 18 meses',
        inversion: 'Inversión: Media',
        problema: 'El DTE ya genera datos en tiempo real, pero su potencial analítico contra la evasión, la subfacturación y el fraude de crédito fiscal puede ampliarse; el 66.2% de los hogares sin seguridad social refleja una alta informalidad.',
        solucion: 'Plataforma de analítica y aprendizaje automático que cruza DTE, aduanas, planillas y registros para generar alertas y fiscalización dirigida; ruta de formalización gradual con incentivos (“factura con premio”); servicio de adaptación a la normativa DTE 2.0 (plazo: 1 de diciembre de 2026) para micro y pequeñas empresas.',
        impacto: 'El BID estima que la facturación electrónica puede elevar la recaudación hasta 6%; la analítica aumenta la efectividad de la fiscalización con menos personal.',
        modelo: 'Contrato por resultados con un porcentaje de la recaudación incremental verificada (ahorro compartido), con línea base y auditoría independiente.',
        piloto: 'Un segmento de contribuyentes (por ejemplo, comercio y hospedaje) y adaptación DTE 2.0 para un grupo de MIPYME, 4 a 6 meses.',
        indicadores: 'Recaudación incremental; brecha de IVA; contribuyentes formalizados; tiempo de detección de fraude.',
        riesgos: 'Percepción “recaudatoria”, protección de datos fiscales.'
    },
    P5: {
        id: 'P5',
        title: 'Ventanilla única digital, app de gobierno y pasarela de pagos',
        eje: 'Gobierno digital y recaudación',
        ola: 'Ola 1 · 0 a 6 meses',
        inversion: 'Inversión: Media',
        problema: 'Trámites y pagos dispersos, presenciales y con alta dependencia del efectivo; sin un canal único con seguimiento para reportes y denuncias ciudadanas.',
        solucion: 'Portal y app únicos con identificación por DUI y firma electrónica, billetera y pasarela interoperable, seguimiento en tiempo real, reportes por foto (baches, alumbrado, basura, fallas de agua), atención por call center y alertas de protección civil; modo asistido en módulos y municipios.',
        impacto: 'Menor costo de transacción, trazabilidad de ingresos, menos intermediación y mejor experiencia ciudadana.',
        modelo: 'SaaS para la plataforma y concesión del servicio de recaudo con comisión topada por transacción.',
        piloto: '5 a 10 trámites de mayor volumen y la app en un municipio, 90 a 120 días.',
        indicadores: '% de trámites 100% en línea; tiempo medio de resolución; % de pagos digitales; reducción de quejas.',
        riesgos: 'Conectividad rural, interoperabilidad, datos personales.'
    },
    P6: {
        id: 'P6',
        title: 'Registro, catastro y escritura pública digital',
        eje: 'Gobierno digital y recaudación',
        ola: 'Ola 3 · 12 a 36 meses',
        inversion: 'Inversión: Media a alta',
        problema: 'Los trámites de propiedad y de sociedades son lentos y vulnerables al fraude documental y al despojo.',
        solucion: 'Escritura digital por capas, que conserva la fe notarial: folio real electrónico, ventanilla digital para notarios, certificados con QR en minutos, alerta registral al celular del propietario ante cualquier intento de inscripción, cartografía catastral enlazada al folio y un programa de formalización de predios y sucesiones.',
        impacto: 'Más ingresos por derechos registrales, seguridad jurídica, base para crédito hipotecario y menos fraude.',
        modelo: 'Contrato por fases (digitalización, plataforma, ventanilla), arrendamiento de plataforma y posible participación en ingresos incrementales (a validar jurídicamente).',
        piloto: 'Una oficina registral regional y un grupo de notarías: certificado digital de gravamen y alerta al propietario, 90 a 120 días.',
        indicadores: '% del acervo digitalizado; tiempo de inscripción; ingresos registrales; intentos de fraude detectados.',
        riesgos: 'Resistencia notarial, calidad del acervo físico, tierras comunales.'
    },
    P7: {
        id: 'P7',
        title: 'Licencias digitales y credenciales verificables (negocios, tránsito y profesionales)',
        eje: 'Gobierno digital y recaudación',
        ola: 'Ola 1 · 0 a 6 meses',
        inversion: 'Inversión: Baja',
        problema: 'Licencias de funcionamiento, sanitarias, de conducir y profesionales se tramitan en papel; los refrendos y multas tienen alta evasión.',
        solucion: 'Billetera de credenciales con QR validable sin conexión, renovación automática y avisos de vencimiento; licencia de conducir y tarjeta de circulación digitales; cobro de refrendo y multas en línea y en comercios; depuración del padrón vehicular.',
        impacto: 'Formalización de negocios, ingresos por renovación puntual, menos documentos falsificados y menos gestores.',
        modelo: 'Licencia de plataforma y tarifa por credencial, o concesión tecnológica pagada por transacción (con revisión jurídica).',
        piloto: 'Licencia de conducir digital y pago de refrendo en la zona metropolitana, 90 días.',
        indicadores: 'Licencias emitidas y renovadas en línea; recaudación por refrendo; tiempo de emisión.',
        riesgos: 'Resistencia de intermediarios; evitar incentivos perversos en esquemas de pago por multa.'
    },
    P8: {
        id: 'P8',
        title: 'Plataforma municipal integral',
        eje: 'Gobierno digital y recaudación',
        ola: 'Ola 2 · 6 a 18 meses',
        inversion: 'Inversión: Baja',
        problema: 'Muchos municipios administran catastro, tasas y licencias con herramientas manuales, lo que limita sus ingresos propios.',
        solucion: 'Módulos estandarizados para catastro y cobro de tasas, licencias comerciales, alumbrado público, atención ciudadana y tableros para el alcalde, desplegados por oleadas.',
        impacto: 'Más ingresos propios, transparencia local y datos comparables entre municipios.',
        modelo: 'Suscripción municipal escalonada o participación en el aumento de recaudación local.',
        piloto: 'Tres municipios de distinto tamaño, 6 meses.',
        indicadores: 'Ingresos propios; cobertura catastral; tiempo de atención.',
        riesgos: 'Capacidades locales y cambios de administración.'
    },
    P9: {
        id: 'P9',
        title: 'Red comunitaria de pago y servicios: tiendas, pupuserías y agentes',
        eje: 'Economía local y turismo',
        ola: 'Ola 2 · 6 a 18 meses',
        inversion: 'Inversión: Baja a media',
        problema: 'Las tiendas y comercios de barrio son el punto de contacto más cercano a la población, pero rara vez funcionan como puntos de pago de trámites, recargas, cobro de remesas y crédito. Las remesas (US$9,988 millones en 2025) llegan a unos 534,000 hogares.',
        solucion: 'POS sin costo en comodato para tiendas y comercios: cobro digital, pago de trámites y servicios, recargas, cobro de remesas con bancos y remesadoras aliados, conexión con proveedores locales (“Hecho en El Salvador”) y crédito de capital de trabajo según el historial de ventas; interoperable con bancos, cooperativas y billeteras existentes.',
        impacto: 'Ingresos por comisión sin costo para el Estado, más circulación de dinero local, formalización gradual y menos traslados y filas.',
        modelo: 'Comisión privada por operación con bancos aliados; equipo financiado con las comisiones; ingreso adicional por proveeduría y crédito.',
        piloto: 'Una zona con 200 a 500 comercios durante 4 a 6 meses; después San Miguel y Santa Ana.',
        indicadores: 'Comercios activos; operaciones diarias; meses de recuperación del equipo; remesas pagadas; créditos otorgados.',
        riesgos: 'Competencia de terminales existentes, temor a la visibilidad fiscal, regulación financiera (operar con un banco aliado titular de los fondos).'
    },
    P10: {
        id: 'P10',
        title: 'Pase turístico y app del turista (Surf City, Centro Histórico y rutas)',
        eje: 'Economía local y turismo',
        ola: 'Ola 1 · 0 a 6 meses',
        inversion: 'Inversión: Baja a media',
        problema: 'En 2025 llegaron 4.1 millones de visitantes que dejaron US$3,635 millones, con un gasto diario de unos US$156; pagos, reservas y transporte siguen dispersos entre costa, Centro Histórico y rutas.',
        solucion: 'Pase digital con QR que integra entradas, transporte, tours, restaurantes y recargas; app del turista con mapas, eventos, alertas y pagos; afiliación de comercios por la red comunitaria (P9); datos de gasto para el Ministerio de Turismo.',
        impacto: 'Mayor gasto y estancia, formalización de prestadores y nuevos ingresos por comisión.',
        modelo: 'Comisión por venta del pase y por transacción, con patrocinios; sin gasto inicial del Estado.',
        piloto: 'Centro Histórico de San Salvador y Surf City (La Libertad), 4 a 6 meses.',
        indicadores: 'Pases vendidos; gasto por visitante; prestadores afiliados; satisfacción.',
        riesgos: 'Dependencia de eventos, estacionalidad, alianzas con privados.'
    },
    P11: {
        id: 'P11',
        title: 'Sistema único de pago y gestión de flota (cobro electrónico)',
        eje: 'Movilidad',
        ola: 'Ola 2 · 6 a 18 meses',
        inversion: 'Inversión: Media',
        problema: 'Pago en efectivo, poca visibilidad de la operación y fracasos previos de tarjetas prepago por problemas técnicos y de adopción.',
        solucion: 'Pago abierto (tarjeta, QR y teléfono), validadores robustos con GPS y conteo de pasajeros, cámaras y gobernador de velocidad, perfiles de tarifa (general, estudiante, adulto mayor, discapacidad), recarga en la red comunitaria (P9) y tablero para el Viceministerio de Transporte.',
        impacto: 'Cumplimiento del artículo 52 de la ley de transporte, subsidio verificable, seguridad y datos para planificar rutas.',
        modelo: 'Concesión de recaudo con comisión por validación; puede apoyarse en el préstamo BID de US$60 millones.',
        piloto: 'Una ruta troncal del AMSS durante 4 a 6 meses, con el efectivo todavía permitido.',
        indicadores: '% de viajes pagados electrónicamente; unidades equipadas; tarifas sociales verificadas; incidentes.',
        riesgos: 'Resistencia de operadores, exclusión de usuarios sin celular o tarjeta, privacidad de datos de viaje.'
    },
    P12: {
        id: 'P12',
        title: 'Concesión de corredores troncales de transporte masivo (APP/BOT)',
        eje: 'Movilidad',
        ola: 'Ola 3 · 12 a 36 meses',
        inversion: 'Inversión: Alta',
        problema: 'Con el SITRAMSS inactivo desde 2020 y sus estaciones en desmontaje, el AMSS carece de un sistema masivo con carriles segregados; la ciudadanía recuerda la experiencia anterior.',
        solucion: 'Corredores troncales con buses eléctricos o híbridos, integrados con P11 y rutas alimentadoras, y transportistas actuales como socios. Evaluar BRT, cable aéreo o la propuesta del Plan Maestro de Infraestructura.',
        impacto: 'Menos tiempo de viaje y emisiones, formalización del sector y activos públicos con operación privada eficiente.',
        modelo: 'Concesión de 15 a 20 años con pago por disponibilidad y por pasajero, con financiamiento multilateral.',
        piloto: 'Estudio de viabilidad de 6 meses y una ruta troncal con 10 a 20 unidades eléctricas, cuando el recaudo electrónico ya funcione.',
        indicadores: 'Pasajeros por hora; velocidad comercial; costo por kilómetro; disponibilidad de flota.',
        riesgos: 'Sensibilidad con el gremio, sostenibilidad tarifaria, justificar con datos por qué esta vez será distinto.'
    },
    P13: {
        id: 'P13',
        title: 'Tráfico inteligente y seguridad vial',
        eje: 'Movilidad',
        ola: 'Ola 2 · 6 a 18 meses',
        inversion: 'Inversión: Media',
        problema: 'Congestión y siniestralidad en los corredores críticos identificados por el Viceministerio de Transporte.',
        solucion: 'Semáforos adaptativos, centro de control, cámaras con lectura de placas, detección de infracciones con debido proceso y señalización inteligente.',
        impacto: 'Menos tiempo perdido, menos accidentes graves y multas bien administradas.',
        modelo: 'Contrato de servicio con pago por desempeño; evitar esquemas que premien el número de multas.',
        piloto: 'Un corredor de alta siniestralidad, 6 meses.',
        indicadores: 'Velocidad promedio; accidentes graves; multas cobradas.',
        riesgos: 'Percepción recaudatoria y privacidad.'
    },
    P16: {
        id: 'P16',
        title: 'Internet comunitario satelital a demanda (línea de negocio aparte)',
        eje: 'Agua, energía y conectividad',
        ola: 'Ola 3 · 12 a 36 meses',
        inversion: 'Inversión: Media',
        problema: 'Muchas comunidades rurales o dispersas tienen internet limitado o caro (cobertura por validar con la SIGET), lo que frena la educación, el comercio y los trámites digitales.',
        solucion: 'Puntos Wi-Fi comunitarios con internet satelital de órbita baja (por ejemplo, Starlink), vendido en paquetes prepagados y operado por un microemprendedor local; vouchers por la red P9; clientes ancla: escuelas, centros comunitarios y oficinas municipales.',
        impacto: 'Ingreso por venta de acceso, empleo local y acceso a trámites digitales.',
        modelo: 'Empresa independiente tipo proveedor de internet inalámbrico, con comisión por voucher; confirmar regulación y costos vigentes.',
        piloto: '20 a 50 poblados con baja conectividad en una región.',
        indicadores: 'Puntos activos; usuarios; ingreso por punto; escuelas conectadas.',
        riesgos: 'Costo del servicio y del equipo, energía en la comunidad, regulación.'
    },
    P17: {
        id: 'P17',
        title: 'Salud digital: expediente clínico único y telemedicina',
        eje: 'Calidad de vida',
        ola: 'Ola 3 · 12 a 36 meses',
        inversion: 'Inversión: Media',
        problema: 'Información clínica fragmentada entre instituciones y acceso difícil a especialistas fuera de la capital (por validar).',
        solucion: 'Expediente clínico interoperable, citas en línea, receta electrónica, telemedicina rural y control de inventario de medicamentos; incluye un módulo de salud penitenciaria conectado con P1.',
        impacto: 'Menos duplicidad de estudios, menos desabastecimiento y mejor cobertura.',
        modelo: 'Licencia por establecimiento con soporte, y financiamiento multilateral.',
        piloto: 'Un hospital y sus unidades de salud asociadas, 6 meses.',
        indicadores: 'Establecimientos conectados; consultas de telemedicina; desabastecimiento de medicamentos.',
        riesgos: 'Protección de datos clínicos e interoperabilidad.'
    },
    P18: {
        id: 'P18',
        title: 'Alerta temprana de riesgos y ciudad segura',
        eje: 'Calidad de vida',
        ola: 'Ola 2 · 6 a 18 meses',
        inversion: 'Inversión: Media',
        problema: 'Las lluvias intensas y los sismos exigen respuesta rápida y comunicación masiva a la población.',
        solucion: 'Red de sensores hidrometeorológicos, alertas por difusión celular, mapas de riesgo y centro de operaciones integrado con cámaras urbanas y atención al 911; alertas dentro de la app (P5).',
        impacto: 'Menos pérdidas humanas y materiales y una respuesta coordinada.',
        modelo: 'Servicio gestionado y financiamiento multilateral para resiliencia.',
        piloto: 'Una cuenca de alto riesgo y su área urbana, 6 a 9 meses.',
        indicadores: 'Tiempo de alerta; población cubierta; tiempo de respuesta.',
        riesgos: 'Mantenimiento de sensores y continuidad presupuestaria.'
    },
    P19: {
        id: 'P19',
        title: 'Parque industrial geotérmico y usos directos del calor',
        eje: 'Agua, energía y conectividad',
        ola: 'Ola 3 · 12 a 36 meses',
        inversion: 'Inversión: Alta (privada y multilateral)',
        problema: 'El Salvador es pionero en geotermia (217 MW instalados y cerca de una quinta parte de la demanda eléctrica), pero solo explota algunas de las zonas con potencial y casi no aprovecha el calor. La energía limpia y firme aún no se ha convertido en un polo industrial.',
        solucion: 'Tres capas: (1) nueva generación con contratos BOT o PPA en Chinameca, San Vicente y otras zonas; (2) usos directos del calor en un parque (secado agroindustrial, invernaderos, cadena de frío, acuicultura y turismo de aguas termales); (3) energía firme y limpia para centros de datos, cómputo de IA y manufactura intensiva en energía, con zona franca y fibra. Se complementa con un centro de formación geotérmica y empleo para egresados de P2 y P3.',
        impacto: 'Energía renovable estable, menos importación de combustibles, inversión atraída, empleo calificado e ingresos por venta de calor y arrendamiento de lotes.',
        modelo: 'BOT o PPA a 20 años con privados (hay precedente de adjudicaciones en 2023), financiamiento multilateral (Banco Mundial, BID, BCIE), arrendamiento de lotes y venta de calor o vapor, y zona franca para empresas ancla.',
        piloto: 'Estudio de usos directos del calor junto a una planta existente y un secador o invernadero piloto, 6 a 9 meses; términos de referencia para atraer un primer centro de datos.',
        indicadores: 'MW añadidos; ahorro en combustibles; empleos; ingresos por calor; inversión atraída.',
        riesgos: 'Riesgo geológico y de exploración, plazos de varios años, permisos ambientales y comunitarios, capacidad de transmisión, coordinación con LaGeo y la CEL, marco regulatorio.'
    }
};

// ── Fichas completas integradas en la página ────────────────
function ffSection(icon, title, bodyHtml, isList) {
    return `
        <section class="ff-section">
            <h4><i class="fas ${icon}"></i> ${title}</h4>
            ${isList ? `<ul>${bodyHtml}</ul>` : `<p>${bodyHtml}</p>`}
        </section>`;
}

function renderFullFichas() {
    Object.values(projectData).forEach(d => {
        const article = document.getElementById(`ficha-${d.id}`);
        if (!article) return;
        article.innerHTML = `
            <header class="full-ficha-header">
                <div class="full-ficha-id">${d.id}</div>
                <div>
                    <h3>${d.title}</h3>
                    <p>${d.eje} · ${d.ola} · ${d.inversion}</p>
                </div>
            </header>
            <div class="full-ficha-body">
                ${ffSection('fa-exclamation-circle', 'Problema que atiende', d.problema, false)}
                ${ffSection('fa-lightbulb', 'Solución propuesta', d.solucion, false)}
                ${ffSection('fa-chart-line', 'Impacto', d.impacto, false)}
                ${ffSection('fa-handshake', 'Modelo de contratación / negocio', d.modelo, false)}
                <div class="ff-grid-2">
                    <section class="ff-card"><h4><i class="fas fa-rocket"></i> Piloto sugerido</h4><p>${d.piloto}</p></section>
                    <section class="ff-card"><h4><i class="fas fa-coins"></i> ${d.inversion}</h4><p>${d.ola}</p></section>
                </div>
                <div class="ff-grid-2">
                    <section class="ff-card"><h4><i class="fas fa-chart-bar"></i> Indicadores de éxito</h4><p>${d.indicadores}</p></section>
                    <section class="ff-card"><h4><i class="fas fa-exclamation-triangle"></i> Riesgos</h4><p>${d.riesgos}</p></section>
                </div>
            </div>`;
    });
}

renderFullFichas();

document.body.style.overflow = 'hidden';

// ── Fade in on scroll ───────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.full-ficha, .roadmap-card, .stat-card, .table-wrapper, .figure-card, .valor-card, .glos-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
});

console.log('%c🇸🇻 El Salvador Digital y Próspero', 'color: #d4af37; font-size: 18px; font-weight: bold;');
console.log('%cPropuesta Estratégica v1.0 · Octubre 2026', 'color: #0f3460; font-size: 13px;');
console.log('%cDocumento Confidencial · Propuesta confidencial', 'color: #8b2635; font-size: 12px; font-weight: bold;');
