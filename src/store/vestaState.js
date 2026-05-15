// 🟢 src/store/vestaState.js
import { reactive, computed } from 'vue';

export const MAESTRIAS_DATA = {
    Combate: {
        itemG1: 'Braceras de Vanguardia',
        pasiva: '+1 Fuerza / Agilidad (Solo en defensa)',
        core: 'Reacción de Acero',
        efecto: 'Reduce a la mitad el daño de un impacto físico recibido tras una parada exitosa.',
    },
    Alquimia: {
        itemG1: 'Códice de Campo',
        pasiva: '+1 Intelecto (Identificar químicos)',
        core: 'Mezcla Improvisada',
        efecto: 'Lanza un vial reactivo a 3m que inflige 1d6 daño o recupera 1d6 Vigor.',
    },
    Ingeniería: {
        itemG1: 'Kit de Mecánica',
        pasiva: '+1 Intelecto (Reparar / Desarmar)',
        core: 'Sellado de Emergencia',
        efecto: 'Evita que un objeto pierda PI en su siguiente uso o impacto recibido.',
    },
    Engaño: {
        itemG1: 'Capa de Camuflaje',
        pasiva: '+1 Agilidad / Vigilia (Sigilo)',
        core: 'Punto Ciego',
        efecto: 'El siguiente ataque realizado en este turno ignora la armadura del enemigo.',
    },
    Domador: {
        itemG1: 'Silbato de Mando',
        pasiva: '+1 Espíritu (Interacción con bestias)',
        core: 'Orden Dominante',
        efecto: 'Fuerza una tirada de Espíritu enfrentada; si ganas, la bestia no puede atacar este turno.',
    },
};

export const SENDAS_DATA = {
    Adeptos: {
        latente: 'Murmullo Divino',
        efecto: 'El cazador percibe un cambio de presión atmosférica o un zumbido sutil al entrar en contacto con objetos con carga mística.',
        contra: '-2 en Ingeniería y Alquimia',
    },
    Elemental: {
        latente: 'Eco del Entorno',
        efecto: 'Sincronización biológica con el clima. Predice cambios meteorológicos con 1 hora de antelación y detecta impurezas en el agua.',
        contra: '-2 en Vigilia (Contexto social)',
    },
    Guerrero: {
        latente: 'Adrenalina Sorda',
        efecto: 'El sistema nervioso mitiga micro estímulos de dolor. No sufre penalizadores por condiciones climáticas estándar ni privación de sueño inicial.',
        contra: '-2 en Intelecto',
    },
    Aliento: {
        latente: 'Pulso Compartido',
        efecto: 'Siente el ritmo cardíaco y la temperatura del objetivo, identificando enfermedades, venenos o heridas internas.',
        contra: '-2 en Agilidad (Tras usar Sinergia)',
    },
    Rastro: {
        latente: 'Escalofrío del Velo',
        efecto: 'Reacción física involuntaria tiempo antes de entrar en contacto con una brecha de El Manto o anomalías ambientales.',
        contra: '-2 en Espíritu (En entornos de estrés)',
    },
};

export const vestaState = reactive({
    currentStep: 1,
    form: {
        imagen: null,
        nombre: '',
        cb: '',
        linaje: '',
        ruta: '',
        senda: '',
        maestria: '',
        armaInicial: '',
        historia: '',
        personalidad: '',
        gustos: '',
        disgustos: '',
        nivel: 1,
        exp: 0,
    },

    atributos: {
        fue: 1,
        agi: 1,
        con: 1,
        int: 1,
        vig: 1,
        esp: 1,
    },

    especializaciones: [],

    virtudesElegidas: [],
    viciosElegidos: [],
    virtudesPersonalizadas: [],
    viciosPersonalizados: [],
});

export const statsDerivadas = computed(() => {
    const { con, vig, esp, agi, fue, int } = vestaState.atributos;

    const dadoSalvaje = vestaState.form.ruta === 'Solo Maestría' ? 'd8' : 'd6';

    return {
        vigorMax: 10 + con,
        peMax: 10 + vig,
        pvMax: 10 + esp,
        defensaPasiva: 10 + agi,
        esquivaActiva: `d20 + ${agi} + ${dadoSalvaje}`,
        rdTotal: 3,
        cargaMax: 10 + fue,
        dadoSalvaje,
    };
});

export const virtudesDisponibles = [
    'Ambidiestro',
    'Reflejos de Gato',
    'Duro de Matar',
    'Sangre Fría',
    'Ojo de Águila',
    'Mente Analítica',
    'Rostro de Piedra',
    'Amigo de las Bestias',
    'Resiliencia del Paria',
    'Memoria Fotográfica',
];

export const viciosDisponibles = [
    'Adicción',
    'Cicatrices del Manto',
    'Deuda de Sangre',
    'Tullido',
    'Infamia',
    'Fobia',
    'Arrogancia',
    'Mala Suerte',
    'Código de Honor',
];

export const especializacionesDisponibles = {
    fue: [
        'Atletismo',
        'Pugilato',
        'Resistencia',
        'Carga',
        'Intimidación Física',
        'Esfuerzo Bruto',
        'Rompeguardias',
        'Presa Marcial',
    ],
    agi: [
        'Reflejos',
        'Equilibrio',
        'Escapismo',
        'Sigilo Básico',
        'Juegos de Azar',
        'Prestidigitación',
        'Acrobacia de Combate',
        'Infiltración Urbana',
    ],
    int: [
        'Investigación',
        'Historia y Leyenda',
        'Reparación Básica',
        'Medicina Básica',
        'Tasación',
        'Lógica/Deducción',
        'Toxicología',
        'Ingeniería de Almas',
        'Trampas y Seguridad',
        'Artillería',
        'Metalurgia Avanzada',
        'Medicina Quirúrgica',
        'Farmacología',
    ],
    vig: [
        'Alerta',
        'Supervivencia',
        'Orientación',
        'Escrutinio',
        'Búsqueda',
        'Anatomía de Monstruo',
        'Rastreo',
        'Empatía Animal',
    ],
    esp: [
        'Temple',
        'Persuasión',
        'Intimidación Mental',
        'Actuación Básica',
        'Carisma',
        'Voluntad',
        'Mimetismo Vocal',
        'Disfraz Profesional',
        'Manipulación Social',
        'Mando de Guerra',
    ],
};

export const puntosRestantes = computed(() => {
    const totalAtributos = Object.values(vestaState.atributos).reduce((a, b) => a + b, 0);
    const puntosGastadosEnAtributos = totalAtributos - 6;

    const totalVirtudes =
        vestaState.virtudesElegidas.length + vestaState.virtudesPersonalizadas.length;
    const totalVicios = vestaState.viciosElegidos.length + vestaState.viciosPersonalizados.length;

    const paresAnulados = Math.min(totalVirtudes, totalVicios);
    const virtudesAPagar = totalVirtudes - paresAnulados;
    const viciosQueDanPuntos = totalVicios - paresAnulados;

    const poolTotal = 12 - virtudesAPagar * 3 + viciosQueDanPuntos * 2;

    return poolTotal - puntosGastadosEnAtributos;
});
