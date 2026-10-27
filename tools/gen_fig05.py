import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib import font_manager

# Colores
NAVY = "#0f3460"
GOLD = "#d4af37"
# Niveles: 0=Muy alta (navy), 1=Alta, 2=Media, 3=Baja
level_colors = ["#1a3a6b", "#4a6fa5", "#a9bcd9", "#dbe4f2"]
level_text = ["white", "white", "#1f2937", "#1f2937"]
level_desc = {0: "Muy alta", 1: "Alta", 2: "Media", 3: "Baja"}

rows = [
    ("P1 · Gestión penitenciaria y expediente digital", [1,3,2,1]),
    ("P2 · Trabajo con Propósito", [0,2,1,0]),
    ("P3 · Educación, credenciales y empleo", [2,3,1,2]),
    ("P4 · Inteligencia fiscal sobre DTE", [2,0,3,2]),
    ("P5 · Ventanilla única, app y pagos", [2,1,1,0]),
    ("P6 · Registro, catastro y escritura digital", [1,1,1,2]),
    ("P7 · Licencias y credenciales digitales", [2,1,2,1]),
    ("P8 · Plataforma municipal integral", [2,1,2,1]),
    ("P9 · Red comunitaria de pago y servicios", [0,1,1,1]),
    ("P10 · Pase turístico y app del turista", [0,2,2,0]),
    ("P11 · Cobro electrónico en transporte", [2,1,1,1]),
    ("P12 · Corredores troncales (APP)", [1,1,0,0]),
    ("P13 · Tráfico y seguridad vial", [2,2,1,1]),
    ("P16 · Internet comunitario satelital", [1,3,1,1]),
    ("P17 · Salud digital", [2,3,0,1]),
    ("P18 · Alerta temprana y ciudad segura", [3,3,0,0]),
    ("P19 · Parque industrial geotérmico", [0,1,2,0]),
]

# Colores por eje (Muy aprox. al original: azul=justicia, teal=gob digital, oro=economía, verde? etc.)
row_colors = ["#1f5aa8","#16a34a","#0d9488","#0d9488","#16a34a","#16a34a","#16a34a","#16a34a",
              "#b45309","#b45309","#6d28d9","#6d28d9","#6d28d9","#0d9488","#d4a017","#d4a017","#0d9488"]

fig, ax = plt.subplots(figsize=(12.8, 14.6), dpi=200)
fig.patch.set_facecolor("white")
ax.set_xlim(0, 11.3); ax.set_ylim(-0.9, len(rows)+2.2)
ax.invert_yaxis(); ax.axis("off")

# Encabezados
headers = ["Eco-\nnomía", "Recau-\ndación", "Calidad\nde vida", "Imagen de\ngobierno"]
xs = [6.15, 7.5, 8.85, 10.4]
for x, h in zip(xs, headers):
    ax.text(x, -0.45, h, ha="center", va="center", fontsize=11, fontweight="bold", color="#0f3460")

# Celdas de datos
for i, (label, levels) in enumerate(rows):
    y = i + 0.55
    ax.text(5.78, y, label, ha="right", va="center", fontsize=10,
            fontweight="bold", color=row_colors[i])
    for x, lv in zip(xs, levels):
        rect = mpatches.FancyBboxPatch((x-0.66, y-0.44), 1.32, 0.88,
            boxstyle="round,pad=0.02,rounding_size=0.06",
            facecolor=level_colors[lv], edgecolor="none")
        ax.add_patch(rect)
        ax.text(x, y, level_desc[lv], ha="center", va="center",
                fontsize=9.5, fontweight="bold", color=level_text[lv])

# Leyenda abajo, fuera del área de datos
handles = [mpatches.Patch(facecolor=level_colors[k], label=level_desc[k]) for k in range(4)]
ax.legend(handles=handles, loc="lower center", ncol=4, frameon=False,
          bbox_to_anchor=(0.5, 1.0), fontsize=10)

fig.tight_layout()
fig.savefig(r"C:\Users\vps4\Documents\Proyecto predeterminado\EL SALVADOR\sitio-web\assets\fig05-mapa-oportunidades.png", bbox_inches="tight", facecolor="white")
print("OK")
