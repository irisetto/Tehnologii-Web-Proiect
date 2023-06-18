CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone_number VARCHAR(20) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  occupied_position VARCHAR(100),
  profile_picture BYTEA,
  is_admin BOOLEAN DEFAULT false,
  mode_preference VARCHAR(10) NOT NULL DEFAULT 'light',
  language_setting VARCHAR(50) DEFAULT 'English',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

--select * from users;

CREATE TABLE animals (
  id SERIAL PRIMARY KEY,
  animal_class VARCHAR(100),
  common_name VARCHAR(100),
  scientific_name VARCHAR(100),
  habitat VARCHAR(100),
  lifestyle VARCHAR(100),
  diet VARCHAR(100),
  weight FLOAT,
  height FLOAT,
  region VARCHAR(100),
  lifespan INTEGER,
  skin_type VARCHAR(100),
  animal_status VARCHAR(100),
  fun_fact1 TEXT,
  fun_fact2 TEXT,
  about_text TEXT
);


--select * from animals;

CREATE TABLE animal_images (
  id SERIAL PRIMARY KEY,
  animal_id INTEGER REFERENCES animals(id),
  image1 BYTEA,
  image2 BYTEA,
  image3 BYTEA
);

CREATE TABLE tickets (
  id SERIAL PRIMARY KEY,
  zoo_section VARCHAR(100),
  manager VARCHAR(100),
  description TEXT,
  id_user INT
);

CREATE TABLE frenchTexts (
  id SERIAL PRIMARY KEY,
  animal_id INT,
  about_text TEXT,
  fun_fact1 TEXT,
  fun_fact2 TEXT
);

CREATE TABLE spanishTexts (
  id SERIAL PRIMARY KEY,
  animal_id INT,
  about_text TEXT,
  fun_fact1 TEXT,
  fun_fact2 TEXT
);

CREATE TABLE chineseTexts (
  id SERIAL PRIMARY KEY,
  animal_id INT,
  about_text TEXT,
  fun_fact1 TEXT,
  fun_fact2 TEXT
);

----------------------------------------------------------------
INSERT INTO
  frenchTexts (animal_id, about_text, fun_fact1, fun_fact2)
VALUES
  (
    1,
    'L''éléphant est le plus grand mammifère terrestre. Il a une longue trompe qui est utilisée pour diverses tâches telles que la recherche de nourriture, la consommation d''eau et la communication. Les éléphants sont connus pour leurs liens sociaux solides et leur intelligence impressionnante. Ils manifestent des émotions complexes et ont été observés faisant preuve de compassion et d''empathie envers d''autres éléphants et même d''autres espèces. Les éléphants jouent également un rôle crucial dans le maintien de leurs écosystèmes en créant des points d''eau et en dispersant des graines grâce à leurs excréments. Malheureusement, les éléphants font face à des menaces importantes telles que le braconnage et la perte d''habitat, ce qui rend les efforts de conservation vitaux pour leur survie.',
    'Les éléphants peuvent communiquer entre eux en utilisant des infrasons, qui sont en dessous de la plage de l''ouïe humaine.',
    'Les éléphants ont une mémoire très développée et peuvent se souvenir de lieux et d''individus spécifiques pendant de nombreuses années.'
  );

INSERT INTO
  frenchTexts (animal_id, about_text, fun_fact1, fun_fact2)
VALUES
  (
    2,
    'Les moineaux sont de petits oiseaux dodus. Ils sont connus pour leur chant joyeux et on les trouve dans les zones urbaines du monde entier. Les moineaux ont une alimentation diversifiée et se nourrissent principalement de graines et dinsectes. Ces oiseaux sont très adaptables et se sont bien adaptés aux environnements modifiés par lhomme. Ils construisent leurs nids dans divers endroits, y compris les cavités darbres, les bâtiments et même les paniers suspendus. Les moineaux sont des oiseaux sociaux et se regroupent souvent en bandes, ce qui leur offre sécurité et compagnie. Malgré leur présence commune, certaines espèces de moineaux ont connu un déclin de population ces dernières années, ce qui souligne limportance de préserver leurs habitats et de mettre en œuvre des mesures de conservation.',
    'Les moineaux sont dexcellents volants et peuvent atteindre des vitesses allant jusquà 24 miles per hour.',
    'Les mâles moineaux participent souvent à des concours de chant pour établir leur territoire et attirer des partenaires.'
  );

INSERT INTO
  frenchTexts (animal_id, about_text, fun_fact1, fun_fact2)
VALUES
  (
    3,
    'Les anolis verts sont des lézards courants dans le sud-est des États-Unis. Ils sont connus pour leur capacité à changer de couleur, ce qui les aide à réguler leur température corporelle et à communiquer avec dautres anolis. Ces lézards sont de bons grimpeurs et on les trouve souvent sur les arbres et les arbustes. Les anolis verts sont insectivores et se nourrissent dune variété de petits invertébrés. Ils sont également répandus en tant quanimaux de compagnie en raison de leur apparence attrayante et de leurs comportements intéressants. Les anolis mâles ont une caractéristique distinctive appelée fanon, quils déploient lorsquils cherchent à attirer des partenaires ou à défendre leur territoire.',
    'Les anolis verts peuvent changer de couleur pour exprimer leur humeur, leur niveau de stress ou pour communiquer avec dautres lézards.',
    'Ces lézards ont une capacité de régénération impressionnante et peuvent repousser leur queue en cas de perte ou de blessure.'
  );

INSERT INTO
  frenchTexts (animal_id, about_text, fun_fact1, fun_fact2)
VALUES
  (
    4,
    'Le poisson-clown est un poisson coloré qui habite les récifs coralliens. Il forme une relation symbiotique avec les anémones de mer, bénéficiant de leur protection tandis que lanémone bénéficie de la présence du poisson-clown. Ces poissons sont également connus pour leur capacité unique à changer de sexe. Les poissons-clowns ont une structure sociale hiérarchique où une femelle et un mâle dominants dirigent le groupe. Si la femelle meurt, le mâle dominant se transforme en femelle pour maintenir l''ordre social. Les poissons-clowns sont omnivores et se nourrissent d''algues, de plancton et de petits invertébrés. Ces poissons fascinants ajoutent non seulement des couleurs vives à l''écosystème des récifs coralliens, mais jouent également un rôle crucial dans son équilibre et sa santé.',
    'Les poissons-clowns sont immunisés contre les tentacules toxiques des anémones de mer, ce qui leur offre un endroit sûr pour se cacher.',
    'Dans un groupe de poissons-clowns, lorsque la femelle dominante meurt, le mâle dominant se transforme en femelle pour maintenir la structure sociale.'
  );

  INSERT INTO frenchTexts (animal_id, about_text, fun_fact1, fun_fact2)
VALUES
(5, 'La grenouille aux yeux rouges est connue pour ses couleurs vives et ses grands yeux rouges. Elle est originaire des forêts tropicales d''Amérique centrale. Ces grenouilles possèdent des coussinets adhésifs sur leurs pattes, ce qui leur permet de grimper facilement aux arbres et aux feuilles. La grenouille aux yeux rouges est principalement nocturne et devient active la nuit pour chasser les insectes et autres petites proies. Pendant la saison de reproduction, les mâles émettent des vocalisations uniques et aiguës pour attirer les femelles dans un chœur caractéristique. Les femelles pondent leurs œufs sur des feuilles au-dessus des plans d''eau, et à l''éclosion, les têtards tombent dans l''eau en dessous.',
'La grenouille aux yeux rouges possède un mécanisme de défense unique. Lorsqu''elle est menacée, elle peut ouvrir soudainement ses yeux et révéler sa couleur rouge vif, ce qui effraie les prédateurs.',
'Ces grenouilles pondent leurs œufs sur des feuilles qui surplombent l''eau, et à l''éclosion, les têtards tombent dans l''eau en dessous.');


  INSERT INTO frenchTexts (animal_id, about_text, fun_fact1, fun_fact2)
VALUES
(6, 'Le panda géant est le plus grand mammifère terrestre. Il a un régime alimentaire unique composé presque exclusivement de pousses, de feuilles et de tiges de bambou. Les pandas géants possèdent un os en forme de pouce spécialisé appelé "pouce pseudo" qui les aide à saisir les tiges de bambou et à en retirer les feuilles. Ils passent la majeure partie de leur temps à se nourrir et peuvent consommer de grandes quantités de bambou chaque jour. Les pandas géants sont des animaux solitaires et ont un taux de reproduction lent. Ils sont classés comme une espèce en voie de disparition, principalement en raison de la perte d''habitat et des activités humaines. Les efforts de conservation ont réussi à protéger ces ours emblématiques, mais des mesures de conservation continues sont essentielles pour assurer leur survie à long terme.',
'Les pandas géants possèdent un os spécialisé au niveau du poignet appelé "pouce pseudo" qui les aide à saisir les tiges de bambou.',
'Malgré leur grande taille, les pandas géants ont un métabolisme relativement lent, ce qui leur permet de conserver leur énergie.');


INSERT INTO frenchTexts (animal_id, about_text, fun_fact1, fun_fact2)
VALUES
(7, 'Les manchots empereurs sont les plus grands et les plus lourds des manchots. Ils habitent la région antarctique et sont adaptés pour résister à des températures extrêmement froides. Ces manchots ont un comportement de reproduction unique, où les mâles incubent les œufs pendant que les femelles chassent la nourriture. Les manchots empereurs forment de grandes colonies pendant la saison de reproduction, ce qui leur procure chaleur et protection contre les conditions environnementales difficiles. Ces oiseaux remarquables peuvent plonger à de grandes profondeurs à la recherche de poissons et d''autres créatures marines. Malgré leur résilience, les manchots empereurs sont vulnérables au changement climatique et aux modifications de leur habitat antarctique. Les efforts de conservation visent à protéger leurs sites de reproduction et à assurer leur survie face aux défis environnementaux actuels.',
'Les manchots empereurs peuvent plonger à des profondeurs de plus de 500 mètres (1 640 pieds) à la recherche de nourriture.',
'Pour survivre à l''hiver antarctique rigoureux, les manchots empereurs se regroupent en grandes colonies pour conserver la chaleur.');

INSERT INTO frenchTexts (animal_id, about_text, fun_fact1, fun_fact2)
VALUES
(8, 'La tortue luth est la plus grande espèce de tortue. Elle possède une carapace unique en cuir et est connue pour ses migrations à travers les océans. Ces tortues se nourrissent principalement de méduses, jouant un rôle important dans le maintien des écosystèmes marins. Les tortues luth sont d''excellents plongeurs et peuvent atteindre des profondeurs impressionnantes à la recherche de nourriture. Elles sont également connues pour leurs longues migrations, parcourant des milliers de kilomètres entre leurs sites de reproduction et leurs aires d''alimentation. Malheureusement, les tortues luth sont confrontées à de nombreux dangers, tels que la pêche accidentelle, la pollution marine et la destruction de leurs habitats de nidification. Des efforts de conservation sont déployés pour protéger ces tortues majestueuses et préserver leur existence pour les générations futures.',
'La tortue luth se nourrit principalement de méduses, ce qui l''aide à maintenir l''équilibre des populations de méduses dans les océans.',
'Les tortues luth peuvent effectuer des migrations épiques sur de longues distances, parcourant des milliers de kilomètres entre leurs sites de reproduction et leurs zones d''alimentation.');



INSERT INTO frenchTexts (animal_id, about_text, fun_fact1, fun_fact2)
VALUES
(9, 'Le grand requin blanc est l''un des plus grands prédateurs marins. Il se trouve dans les océans du monde entier et est réputé pour sa puissance et sa dentition impressionnante. Ces requins sont des chasseurs redoutables, se nourrissant principalement de phoques, de poissons et d''autres mammifères marins. Ils ont une réputation exagérée de prédateurs agressifs envers les humains, mais les attaques sont extrêmement rares. Les grands requins blancs jouent un rôle essentiel dans les écosystèmes marins en régulant les populations d''autres espèces. Cependant, ils sont confrontés à des menaces importantes telles que la surpêche et la destruction de leur habitat. La conservation des grands requins blancs est cruciale pour maintenir l''équilibre des océans et préserver ces prédateurs emblématiques.',
'Le grand requin blanc peut atteindre une vitesse de nage allant jusqu''à 40 kilomètres par heure (25 miles par heure).',
'Les grands requins blancs ont une dentition remarquable, avec des dents tranchantes et dentelées parfaitement adaptées à la capture de proies.');

INSERT INTO frenchTexts (id, about_text, fun_fact1, fun_fact2)
VALUES
(10, 'L''axolotl est une espèce d''amphibiens originaire du Mexique. Ces créatures uniques sont connues pour leur capacité à régénérer leurs membres et d''autres parties de leur corps. L''axolotl peut même régénérer une partie de son cerveau et de sa moelle épinière. Ces amphibiens vivent principalement dans l''eau douce, dans des systèmes de lacs et de canaux. Ils sont adaptés à un mode de vie entièrement aquatique et respirent principalement par des branchies. L''axolotl possède une apparence distincte avec des branchies externes et une queue touffue. Malheureusement, l''axolotl est une espèce en voie de disparition en raison de la pollution, de la perte d''habitat et du commerce illégal. Des programmes de conservation sont en place pour sauvegarder cette espèce fascinante et unique.',
'L''axolotl est capable de régénérer des membres perdus, y compris des parties de son cerveau et de sa moelle épinière.',
'L''axolotl est souvent appelé monstre d''eau en raison de son apparence étrange et de ses capacités de régénération étonnantes.');
