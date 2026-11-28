"""Produce the French engineering dossier from the portfolio's original project assets."""
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
PHOTO = ROOT / "assets/portfolio-images/fire-fighting-robot.jpg"
AWARD = ROOT / "assets/credentials/Fire_Fighting_Robot_GALAXIA_3rd_Place_2022.png"
DEST = ROOT / "build/robot-incendie-rapport-technique-fr.pdf"
DEST.parent.mkdir(exist_ok=True)
for font, face in [("Regular", "DejaVuSans"), ("Bold", "DejaVuSans-Bold")]:
    pdfmetrics.registerFont(TTFont(font, f"/usr/share/fonts/truetype/dejavu/{face}.ttf"))
W, H = A4
X, WIDTH = 44, W - 88
INK = "#143447"
TEAL = "#006F72"
MUTED = "#415966"
c = canvas.Canvas(str(DEST), pagesize=A4)
c.setTitle("Robot mobile de lutte contre l’incendie — Dossier technique")
c.setAuthor("Denos Kume")
c.setCreator("Portfolio de Denos Kume")
c.setSubject("Conception mécanique, interfaces Arduino et réception du prototype GALAXIA 2022")


def para(text, size=10, color=INK, font="Regular", leading=None):
    return Paragraph(text, ParagraphStyle("p", fontName=font, fontSize=size,
                     leading=leading or size * 1.48, textColor=colors.HexColor(color)))


def write(y, text, **style):
    p = para(text, **style)
    _, height = p.wrap(WIDTH, H)
    p.drawOn(c, X, y-height)
    return y-height-10


def topic(y, title):
    return write(y-4, title, size=13, color=TEAL, font="Bold")


def table(y, headers, rows, ratios):
    data = [[para(v, 8.4, "#ffffff", "Bold") for v in headers]]
    data.extend([para(v, 8.8) for v in row] for row in rows)
    t = Table(data, colWidths=[WIDTH*r for r in ratios])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor(INK)),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#EFF5F4")]),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -1), .4, colors.HexColor("#CCDAD9")),
        ("TOPPADDING", (0, 0), (-1, -1), 7), ("BOTTOMPADDING", (0, 0), (-1, -1), 7)
    ]))
    _, height = t.wrap(WIDTH, H)
    t.drawOn(c, X, y-height)
    return y-height-16


def page(title, number):
    c.setFillColor(TEAL); c.setFont("Bold", 9)
    c.drawString(X, H-40, "GALAXIA 2022    /    ROBOTIQUE EMBARQUÉE")
    c.setStrokeColor("#CCDAD9"); c.line(X, 39, W-X, 39)
    c.setFont("Regular", 8); c.setFillColor(MUTED)
    c.drawString(X, 25, "Denos Kume   ·   Dossier technique du prototype")
    c.drawRightString(W-X, 25, f"{number} / 7")
    return write(H-63, title, size=23, font="Bold", leading=29)


def finish(y):
    if y < 42:
        raise ValueError(f"Report content reaches footer at {y}")
    c.showPage()


y = page("Robot mobile de lutte contre l’incendie", 1)
y = write(y, "Conception, intégration et réception d’un prototype Arduino", size=14, color=TEAL)
y = write(y, "Projet de Bachelor en informatique et électronique · Kristu Jayanti College, Bengaluru", size=9)
h = 286
c.drawImage(str(PHOTO), X, y-h, width=h*480/469, height=h)
p = para("GALAXIA<br/>2022<br/><br/>Troisième place<br/><br/>Équipe de trois étudiants<br/>Un mois de réalisation<br/><br/>Responsable d’équipe<br/>Denos Kume", 11)
_, ph = p.wrap(175, h); p.drawOn(c, X+320, y-ph-13)
y -= h+18
y = topic(y,"Objet du projet")
y = write(y,"Réunir sur un même véhicule une base roulante, une commande embarquée et une réserve d’eau alimentant une sortie frontale. La difficulté d’intégration tient à leur coexistence sur un châssis compact : le tuyau traverse le véhicule, les roues bordent les faisceaux et le réservoir charge l’arrière.")
y = write(y,"Le prototype a obtenu la troisième place à l’exposition scientifique GALAXIA du 29 septembre 2022. Le rapport décrit le matériel visible, développe une architecture de commande de référence et fournit un protocole de réception permettant de mesurer les performances.")
finish(y)

y = page("Exigences et critères de réception", 2)
y = write(y,"Le démonstrateur répond à trois fonctions liées : porter une réserve, déplacer la plateforme et présenter la sortie d’eau à l’avant. Pour juger le résultat, chaque fonction doit être associée à un observable.")
y = table(y,["Fonction","Décision d’intégration visible","Critère de réception proposé"],[
 ("Transporter la réserve","Réservoir vertical à l’arrière, maintenu par des supports.","Chargé au niveau d’essai, le réservoir reste en position pendant le déplacement."),
 ("Assurer la mobilité","Quatre roues autour d’un châssis portant les cartes et la charge.","Une commande de marche produit le sens attendu ; aucune roue n’accroche un câble."),
 ("Acheminer l’eau","Tuyau souple longitudinal, embout à l’avant gauche vu sur la photo.","Un volume peut être recueilli à l’embout ; les raccordements restent secs à l’extérieur."),
 ("Commander le système","Carte de commande centrale, cartes d’interface et faisceaux.","Chaque sortie identifiée peut être testée individuellement ; la remise à zéro ramène les actionneurs à l’arrêt prévu."),
], [.20,.34,.46])
y = topic(y,"Périmètre de la démonstration")
y = write(y,"La photographie documente la réalisation matérielle. Le certificat établit le classement. Débit, portée, autonomie, temps de réponse et réussite d’une extinction demandent chacun une mesure distincte. Aucun chiffre de performance n’est déduit du classement.")
y = topic(y,"Lecture du dossier")
y = write(y,"La page 3 repère les éléments sur le montage réel. Les pages 4 et 5 expliquent leurs interfaces et un exemple de commande documenté. La page 6 définit les essais et la page 7 rassemble les pièces remises et les références.")
finish(y)

y = page("Implantation du prototype", 3)
y = write(y,"Vue de dessus. L’avant du robot se trouve en bas de l’image. Les traits relient les repères aux éléments visibles sur la photographie originale.")
ox, h = X, 312
w = h*480/469; bottom = y-h
c.drawImage(str(PHOTO),ox,bottom,width=w,height=h)
items=[(235,102,"1  Réservoir arrière"),(210,174,"2  Tuyau souple"),(260,306,"3  Électronique centrale"),(350,349,"4  Roue et entraînement"),(250,401,"5  Plaque d’essai"),(161,448,"6  Sortie frontale")]
for k,(px,py,label) in enumerate(items):
    xx,yy=ox+px*w/480,y-py*h/469; end=y-35-k*45
    c.setStrokeColor("#00797D"); c.setLineWidth(1.5)
    c.line(xx,yy,ox+w+9,end); c.circle(xx, yy, 3, fill=0)
    c.setFillColor(INK);c.setFont("Bold",9);c.drawString(ox+w+13,end-3,label)
y = bottom-16
y = write(y,"Figure 1. Le tuyau passe au-dessus du pont électronique jusqu’à l’embout. Les conducteurs de commande et d’alimentation sont regroupés dans la zone centrale.",size=8.8,color=MUTED)
y = topic(y,"Nomenclature fonctionnelle")
y = table(y,["Ensemble","Identification et point de contrôle"],[
 ("Structure et traction","Plaques de châssis, roues et boîtiers d’entraînement latéraux. Contrôler fixation, alignement et dégagement des roues."),
 ("Commande et connexions","Carte Arduino, cartes d’interface, cavaliers et plaque d’essai. Identifier chaque connecteur à ses deux extrémités avant de reporter son affectation."),
 ("Distribution d’eau","Réserve, tuyau transparent, maintien frontal et embout. Le mécanisme qui met l’eau en mouvement reste à identifier sur le prototype.")
], [.29,.71])
finish(y)

y = page("Architecture et intégration physique", 4)
y = write(y,"Le châssis constitue l’interface commune entre trois chaînes. Suivre chacune depuis son origine jusqu’à sa sortie permet de localiser un défaut avant d’intervenir sur le logiciel.")
y = table(y,["Chaîne","Parcours fonctionnel","Observable"],[
 ("Mécanique","Châssis → fixation des entraînements → roues → déplacement.","Jeu des roues, frottement, sens de rotation, tenue du réservoir."),
 ("Hydraulique","Réservoir → circuit de mise en mouvement → tuyau → embout frontal.","Continuité du trajet, état des coudes, débit recueilli. Le mode de mise en pression doit être relevé."),
 ("Commande électrique","Ordre logiciel → sortie Arduino → étage d’interface → actionneur.","Niveau logique ou rapport cyclique à l’entrée de l’interface, puis réponse de l’actionneur.")
], [.20,.46,.34])
y = topic(y,"Schéma-bloc de commande de la traction de référence")
for i, (title, sub) in enumerate([("Carte UNO R3", "Sens et rapport cyclique"), ("Pilote de puissance", "Alimentation et pont en H"), ("Entraînement", "Moteur, transmission, roue")]):
    xx = X + i * 175
    c.setFillColor("#EFF5F4"); c.setStrokeColor(TEAL); c.roundRect(xx, y-38, 149, 38, 4, fill=1)
    c.setFillColor(INK); c.setFont("Bold", 9); c.drawCentredString(xx+74.5,y-15,title)
    c.setFont("Regular", 7.6); c.drawCentredString(xx+74.5,y-29,sub)
    if i < 2:
        c.line(xx+150,y-19,xx+172,y-19)
        c.line(xx+168,y-16,xx+172,y-19); c.line(xx+168,y-22,xx+172,y-19)
y -= 52
y = topic(y,"Ordre d’intégration pour reconstruire ou réviser le montage")
for line in [
"1. Monter les roues et les supports sur la base. Faire tourner chaque roue à la main et vérifier la trajectoire des fils près des essieux.",
"2. Positionner le réservoir puis présenter le tuyau jusqu’à l’avant. Comparer la tenue du véhicule à vide et avec une quantité d’eau connue. Un changement de charge à l’arrière peut modifier l’adhérence et le comportement au freinage.",
"3. Fixer les cartes et repérer les liaisons. Pour chaque câble, consigner le connecteur de départ, le terminal d’arrivée, la fonction et la tension attendue. Relever les masses communes et le trajet de retour des charges.",
"4. Contrôler le trajet d’eau séparément de l’électronique alimentée. Une fois les raccordements contrôlés, valider la propulsion et la distribution séparément avant un essai combiné."
]:y=write(y,line)
y = write(y,"Le guide de montage DFRobot [4] illustre la fixation de motoréducteurs sur une plateforme à quatre roues. La photographie en page 3 fait foi pour l’implantation du projet GALAXIA.",size=9,color=MUTED)
finish(y)

y = page("Arduino, brochage et logique de commande", 5)
y = write(y,"Configuration de référence : Arduino UNO R3 et Motor Shield Rev3 [1–3]. Elle fournit un exemple complet pour lire un brochage, comprendre le rôle du pont en H et préparer un essai. Les références des cartes et le câblage exact du prototype de 2022 restent à confirmer sur les connecteurs.")
y = table(y,["Signal du shield","Canal A","Canal B","Interprétation"],[
 ("Direction","D12","D13","Choix du sens électrique du moteur."),
 ("Commande PWM","D3","D11","Rapport cyclique de commande de chaque canal."),
 ("Frein","D9","D8","Commande de freinage du canal."),
 ("Mesure de courant","A0","A1","Retour analogique de l’étage de puissance.")
], [.23,.14,.14,.49])
y = topic(y,"De la consigne au mouvement")
y = write(y,"La carte calcule une consigne de sens et de vitesse. L’étage de puissance applique la polarité et la commande modulée à la charge. La PWM fixe un rapport cyclique ; la vitesse réelle dépend aussi de la tension, de la charge et des frottements. L’association canal–côté du véhicule se vérifie par un essai roue par roue.")
y = topic(y,"Séquence logicielle proposée pour un banc d’intégration")
y = table(y,["État","Sorties attendues","Condition de transition"],[
 ("Initialisation","Commande de traction nulle ; demande de distribution inactive.","Affectations et état des entrées vérifiés."),
 ("Déplacement","Consignes gauche/droite appliquées par le pilote moteur.","Ordre d’arrêt ou de préparation de la distribution."),
 ("Distribution","Traction arrêtée ; commande de distribution seulement si l’interface réelle a été identifiée.","Fin de demande ou ordre d’arrêt."),
 ("Retour au repos","Annuler les demandes et maintenir l’état de repos.","Nouvelle commande explicite.")
], [.22,.43,.35])
y = write(y,"Cette séquence décrit une implémentation de référence. Le sketch historique, le type de commande utilisateur et la présence éventuelle d’une détection de flamme ne se déduisent pas de la photo.",size=9,color=MUTED)
finish(y)

y = page("Vérification et mesures de réception", 6)
y = write(y,"Le tableau décrit des essais à exécuter sur le prototype. Les valeurs à relever sont indiquées pour permettre une comparaison entre essais et éviter d’attribuer au robot des performances non mesurées.")
y = table(y,["Essai","Exécution","Critère et relevé"],[
 ("T1 · Inspection","Hors tension, suivre chaque liaison ; vérifier fixations, roues et passage du tuyau.","Table de câblage renseignée ; signaler jeu, frottement ou conducteur exposé."),
 ("T2 · Commande","Roues dégagées, appliquer séparément une consigne puis un arrêt à chaque groupe moteur.","Consigner canal, sens demandé, sens observé et réponse à l’arrêt."),
 ("T3 · Traction","Sur le même sol, parcourir une distance repérée à vide puis avec un volume d’eau connu.","Relever distance, durée, déviation latérale et incidents pour chaque charge."),
 ("T4 · Distribution","Recueillir l’eau à l’embout dans un récipient gradué pendant une durée chronométrée. Répéter trois fois.","Reporter volume et durée de chaque essai ; calculer Q = V / t, en mL/s, et l’étendue des trois valeurs."),
 ("T5 · Intégration","Enchaîner départ, déplacement, arrêt et distribution vers le récipient. Observer les cartes et le réservoir.","Relever toute réinitialisation, fuite, déconnexion ou variation de trajectoire ; identifier l’étape concernée."),
], [.20,.40,.40])
y = topic(y,"Interprétation des écarts")
y = write(y,"Un moteur inversé dès T2 oriente le diagnostic vers le sens de câblage ou la commande du pilote. Une déviation qui apparaît uniquement sous charge en T3 justifie de contrôler la répartition du poids et l’adhérence. Un débit variable en T4 conduit à examiner le trajet du tuyau et le mécanisme de distribution avant de modifier le logiciel.")
y = write(y,"Résultat historique documenté : prototype assemblé et troisième place à GALAXIA. Les essais T1 à T5 constituent le protocole de réception proposé ; leurs résultats numériques restent ouverts.",size=9,color=MUTED)
finish(y)

y = page("Livrables et références", 7)
y = write(y,"Le livrable de l’équipe était un prototype physique présenté à l’exposition. Les pièces ci-dessous permettent de relier ce résultat aux éléments techniques et au dossier de réception.")
y = table(y,["Pièce","Contenu / usage"],[
 ("Prototype et photographie","Implantation réelle du véhicule, repérage des six éléments en figure 1."),
 ("Dossier d’ingénierie","Exigences, architecture, nomenclature fonctionnelle, interfaces, brochage de référence et plan de tests."),
 ("Justificatif d’exposition","Certificat GALAXIA : Fire Fighting Robot Using Arduino, troisième place, 29 septembre 2022."),
 ("Pour reproduire à l’identique","Joindre le sketch de la version exposée, les références exactes des modules, le câblage terminal à terminal et les relevés d’essais.")
], [.33,.67])
c.drawImage(str(AWARD),X,y-111,width=157,height=111,preserveAspectRatio=True)
p=para("Figure 2. Certificat de la Computer Academy, Department of Computer Science, Kristu Jayanti College. Le titre du projet, le rang et la date y sont inscrits.",9)
_, ph=p.wrap(WIDTH-178,120);p.drawOn(c,X+178,y-ph-14)
y-=130
y=topic(y,"Documentation et pièces originales")
for title,url in [
 ("[1] Arduino · UNO R3, architecture de la carte","https://docs.arduino.cc/hardware/uno-rev3/"),
 ("[2] Arduino · Plan complet des broches UNO R3","https://docs.arduino.cc/resources/pinouts/A000066-full-pinout.pdf"),
 ("[3] Arduino · Motor Shield Rev3, correspondance des canaux","https://store.arduino.cc/products/arduino-motor-shield-rev3"),
 ("[4] DFRobot · Guide d’assemblage Pirate 4WD","https://wiki.dfrobot.com/rob0003/docs/21762"),
 ("Photographie originale du prototype","https://denoskume.github.io/portfolio/assets/portfolio-images/fire-fighting-robot.jpg"),
 ("Certificat GALAXIA en pleine résolution","https://denoskume.github.io/portfolio/assets/credentials/Fire_Fighting_Robot_GALAXIA_3rd_Place_2022.png")]:
    y=write(y,f'<link href="{url}" color="#006F72"><u>{title}</u></link>',size=8.6)
finish(y)
c.save()
