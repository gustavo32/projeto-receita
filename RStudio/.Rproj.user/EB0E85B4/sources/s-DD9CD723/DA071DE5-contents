install.packages("NLP")
install.packages("tm")
install.packages("stringr")
install.packages("wordcloud")
library("NLP")
library("tm")
library("stringr")
library("wordcloud")

receitas <- read.csv("~/Documentos/Semestre_6/Oficina/RStudio/receitas.csv", stringsAsFactors = F)

corpus <- Corpus(VectorSource(receitas$ingredientes))
corpus <- tm_map(corpus, content_transformer(tolower))
corpus <- tm_map(corpus, content_transformer(removeNumbers))
corpus <- tm_map(corpus, content_transformer(removePunctuation), preserve_intra_word_dashes = TRUE)
corpus <- tm_map(corpus, content_transformer(removeWords), c(stopwords("portuguese"),
  "sopa", "picada", "picado", "picados", "picadas", "unidade", "unidades", "dente", "dentes", "esmagados", 
  "esmagadas","esmagado", "esmagada", "gosto", "kg", "kilogramas", "preferência","preferencia", "gr","grama", "g",
  "gramas", "chá", "cha", "rodelas", "socados", "socadas", "magro", "magra", "ralado", "ralada", "raladas", 
  "ralados", "lata", "latas", "ml", "gema","gemas", "fresco", "fresca", "frescos", "frescas", "xícara", 
  "xícaras", "xicara", "xicaras", "xic", "suco", "sucos", "pau","paus", "mistura", "misturas","litro","litros", 
  "colheres","colher", "folhas","folha","moídas", "moídos", "moída", "moído", "moidas", "moidos", "moida", 
  "moido", "desidratado", "desidratada", "copo", "copos", "média", "médias", "médio", "médios","media", 
  "medias", "medio", "medios", "maduro", "madura", "maduros", "maduras", "grande", "grandes", "pequeno", "peq",
  "pequena", "pequenos", "pequenas", "grão", "grãos", "grao", "graos", "picadinho", "picadinha", "picadinhos", 
  "picadinhas", "amassado", "amassada", "amassadas", "amassados", "tablete", "tabletes", "dissolvido", 
  "dissolvidos", "dissolvida", "dissolvidas", "diluído", "diluída", "diluídos", "diluídas", "diluido", 
  "diluida", "diluidos", "diluidas", "desnatado", "desnatada", "desnatados", "desnatadas", "sobremesa", 
  "sobremesas", "espremido", "espremida", "espremidos", "espremidas", "esprimido", "esprimida", "esprimidos", 
  "esprimidas", "cabeça", "cabeças", "pele", "peles", "cubo", "cubos", "cubinho", "cubinhos", "pitada", "pitadas",
  "aproximadamente", "poupa", "poupas", "seco", "seca", "secos", "secas", "molhado", "molhada", "molhados", 
  "molhadas", "refogado", "refogados", "refogar", "caixa", "caixas", "marinho", "marinhos", "gelado", "gelada", "gelados",
  "geladas", "integral", "integrais", "fervente", "ferventes", "envelope", "finamente", "raso", "rasa", "rasos",
  "rasas", "tempero", "temperos", "pó", "pós", "po", "pos", "maço", "maços", "cozido", "cozida", "cozidos",
  "cozidas", "passarinho", "passarinhos", "fatiado", "fatiados", "fatiada", "fatiadas",  "pedaço", "pedaços", "bem", "limpos", "limpo", 
  "cortado", "cortada", "cortados", "cortadas", "anéis", "anél", "anel", "aneis", "massa", "massas", "socado", 
  "socada", "socados", "socadas", "cheia", "cheio", "cheias", "cheios", "grego", "tirado", "tirada", "tirados", 
  "tiradas", "assado", "assada", "assados", "assadas", "caixinha", "caixinhas", "café", "cafés", "cafe", "cafes", 
  "ccafé", "frio", "fria", "frios", "frias", "opcional", "fina", "fino", "finas", "finas", "pacote", "pacotes", 
  "melhorar", "tom", "tons", "avermelhado", "alimentício", "alimenticio", "descascado", "descascada", "descascados", 
  "descascadas", "pacote", "pacotes", "dificuldade", "dificuldades", "fácil", "fáceis", "facil", "faceis", 
  "derretido", "derretida", "derretidos", "derretidas", "cálice", "calice", "cálices", "calices", "condimento", 
  "condimentos", "base", "bases", "dijon", "passata", "lembrando", "salgado", "ingredientes", "ingrediente", 
  "metade", "metades", "integra", "integras", "casca", "cascas", "confit", "dl", "ramo", "ramos", "hora", "horas", 
  "necessário", "necessários", "necessario", "necessarios", "tipo", "bola", "bolas", "acompanhar", "escolha", "ale", 
  "clara", "miolo", "pausterizar", "pauterizados", "pauterizada", "pausterizadas", "pauterizado", "vidro", "vidros", 
  "blog", "receita", "receitas", "melhor", "pior", "é", "marca", "natural", "life", "pessoa", "pessoas", "bom", "mal",
  "diversos", "seguir", "fatia", "fatias", "grosso", "grossa", "grossos", "grossas", "americano", "aqui",
  "ali", "gota", "gotas", "faca", "facas", "básica", "básico", "básicas", "básicos", "basica", "basico", "basicas", 
  "basicos", "resto", "leve", "raíz", "raízes", "raiz", "raizes", "raspa", "raspas", "semente", "sementes", 
  "grosseiramente", "morna", "morno", "mornas", "mornos", "sabor", "pote", "potes", "outro", "outra", "outros", "outras",
  "frutas", "congelada", "congelado", "congeladas", "congelados", "forte", "fortes", "fraco", "fracos", "molhar", "ficam",
  "ficar", "dose", "doses", "suficiente", "suficientes", "bons", "maus", "falta", "faltar", "use", "usar", "copinho",
  "copinhos", "plástico", "plásticos", "plastico", "plasticos", "batido", "batida", "batidos", "batidas", "neve", "neves",
  "peneira", "peneiras", "peneiradas", "peneirados", "peneirada", "peneirado", "tirar", "fervido", "fervida", "fervidos",
  "fervidas", "barra", "barras", "coberto", "coberta", "cobertos", "cobertas","cobertura","coberturas", "meia", "quente",
  "quentes", "triturada", "triturado", "trituradas", "triturados", "polvilhar", "decorar", "light", "firme", "firmes",
  "temperatura","temperaturas",  "ambadiiente","ambientes", "meio", "sumo", "reservar", "colh", "inteira", "inteiro",
  "inteiras", "inteiros", "caroço", "caroços", "conservar", "conserva", "conservas", "torrado", "torrados", "s", "r", "vc",
  "tudo", "coloque", "colocar", "assadeira", "untada", "polvilhada", "polvilhado", "polvilhadas", "polvilhados", "rolo",
  "forno", "forma", "formas", "pré", "pre", "aquecido", "aquecida", "aquecidos", "aquecidas", "misture", "misturar",
  "homogênea", "abra", "assar", "ñ", "deixe", "deixar", "geladeira", "lightg", "ºc", "ºC", "mix", "bater", "nível", 
  "nivel", "etapas", "etapa", "¹", "²", "³", "h", "fita", "blusa", "m", "idem", "gráu", "grau", "gráus", "graus", "fica",
  "º", "liga", "dourar", "final", "à", "á", "bata", "veja", "serve", "esfrie", "qs", "qb", "nova", "ebola", "macis",
  "macil", "feira", "cm", "to", "i", "I", "duro", "dura", "duros", "duras", "mole", "moles", "etc", "algo", "sa", "assim",
  "opções", "opcoes", "opção", "opcao", "grs", "ana", "quase", "alto", "baixo", "add", "x", "ª", "co", "h", "dia", "c",
  "sala", "serve", "sirva", "servir", "rende", "porções", "porcoes", "porção", "porcao", "regar", "medida", "sim", "mexer", 
  "mexa", "bastante", "pouco", "muito", "livro", "figuras", "figura", "cada", "fechar", "site", "revista", "pobre",
  "rico", "tempo", "mês", "dia", "ano", "semana", "minuto", "segundo", "meses", "dias", "anos", "semanas", "minutos", 
  "segundos", "mes", "tomar", "modo", "modos", "preparar", "preparo", "espuma", "anjo", "anjos", "tes", "tais", "avo",
  "avó", "avô", "avós", "avôs", "avos", "dede", "agosto", "já", "ainda", "assado", "hmin", "peça", "cura", "tóxico",
  "toxico", "b", "d", "brick", "casa", "curta", "daphne", "flip", "graças", "gracas", "animal", "careca", "sprite",
  "viola", "duas", "três", "tres", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "des", "onze", "onse",
  "doze", "treze", "trese", "quatorze", "catorze", "quatorse", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove",
  "vinte", "açúc", "nota", " oeuf", "grupo", "grupos", "p", "crua", "menos", "mais", "ei", "luz", "adoce", "fazer", "fez",
  "faz", "fiz", "email", "má", "boa", "amor", "sol", "total", "untar", "ótimo", "horrível", "horrivel", "parte", "cada",
  "cadas", "mixer", "úmido", "umidecido", "cs", "polpesfa", "talo", "talos", "fritar", "precisar", "pétalas", "petalas", 
  "petala", "petalas", "bate", "al", "luciana", "escreveu", "nao", "sei", "fogo", "uht", "xíc", "aprox", "mesma", 
  "simplificar", "pct", "isopor", "placa", "quilo", "quilos", "kilo", "kilos", "gdes", "cru", "bocado", "bocados",
  "recheio", "bicho", "pé", "pe", "pés", "pes", "mesma ", "tb", "também", "tambem", "entrada", "entradas", "col",
  "ingrdientespara", "ingrediente", "ingredientes", "quarto", "terço", "quinto", "sexto", "sétimo", "taça", "taças",
  "xc", "bor", "coado", "coada", "coados", "coadas", "gaveta", "gavetas", "fracionado", "fracionada", "fracionados",
  "fracionadas", "clh", "sp", "sadia", "proteína", "proteina", "proteínas", "proteinas", "çã", "ii", "usei", "pacotinho",
  "pacotinhos", "diet", "manhã", "tarde", "kcal", "quentepara", "banhar", "desejar", "ltr", "tirinha", "tirinhas", "tira",
  "tiras", "doçura", "doçurinha", "doçuras", "doçurinhas", "ligth", "gde", "opçao", "opçoes", "circulos", "faça", "calor",
  "frio", "regule", "grudando", "ponto", "pegue", "pegar", "mão", "mãos", "mao", "maos", "bemmexendo", "pode", "obs", 
  "dependendo", "obsdependendo", "torno", "ia", "alguns ", "tampa", "tampas", "inox", "±", "uso", "lasca", 
  "lascas", "químico", "quimico", "químicos", "quimicos", "essência", "essencia", "essências", "essencias", "biológico",
  "biológicos", "biológica", "biológicas", "desfiado","desfiada", "desfiados", "desfiadas", "incolor", "incolores",
  "prato", "pratos", "moça", "dedo", "dedos", "gordura", "gorduras", "extra", "extras", "defumado", "defumada", 
  "defumados", "defumadas", "pincelar", "flocos", "floco", "ser", "cerca", "panela", "panelas", "escorrido", "escorridos",
  "juntar", "junte", "desossado", "posta", "posto", "postas", "postos", "palha", "palhas", "temperado", "garrafa", "garrafas",
  "dar", "ligeiramente", "acrescente", "reserve", "quanto", "papel", "papeis", "papéis", "corte", "cortes", "lavado", 
  "lavada", "lavados", "lavadas", "todos", "todo", "decoração", "concentrado", "cozinhar", "cozir", "separado", "separada",
  "separados", "separadas", "folhada", "folhado", "folhadas", "folhados", "retire", "retirar", "cima", "fundo", "fundos",
  "completo", "completos", "completa", "completas", "cozimento", "escorrida", "escorridas", "pelado", "pelada", 
  "pelados", "peladas", "cobrir", "qualidade", "qualidades", "gomo", "gomos", "pedacinho", "pedacinhos", "palitos",
  "palito", "especial", "enfeitar", "montagem", "montar", "pronto", "pronta", "prontos", "prontas", "solúvel",
  "solúveis", "tempere", "levemente", "tigela", "tigela", "partes", "comprimento", "comprimentos", "crespo", "crespa",
  "crespos", "crespas", "seguido", "seguidos", "seguida", "seguidas", "mini", "um", "dois", "três", "quatro", "cinco",
  "obter", "padrão", "adicione", "temperar", "passado", "passada", "passados", "passadas", "passe", "passar", "mexendo",
  "vez", "vezes", "união", "esfarelado", "esfarelada", "esfarelados", "esfareladas", "colheressopa", "passar", 
  "demolhado", "demolhada", "demolhados", "demolhada", "farelo", "farelos", "min", "conforme", "escorra", "frite",
  "cup", "porcões", "lavar", "lave", "crocante", "crocantes", "demais", "pois", "diâmetro", "diametro", "microondas",
  "colhersopa", "engrossar", "acrescentar", "punhado", "polvilhe", "industrializado", "esfarinhar", "restante", "separar",
  "espalhe", "feito", "feita", "feitos", "feitas", "dentro", "somente", "formar", "pressão", "pressao", "chester",
  "mineral", "pedras", "pedra", "uns", "fervura", "medidas", "medidos", "medidas", "medido", "rechear", "recheio", "quadrinhos",
  "•", "descansar", "descanse", "espessura", "filtrada", "vontade", "ponha", "preparado", "dissolver", "fique", "vá", "va",
  "último", "asse", "então", "melado", "moto", "estrelado", "enrolar", "cabelo", "calorias", "processado", "processada",
  "processados", "processadas", "despeje", "despejar", "primeira", "segunda", "gratinar", "novamente", "regue", "xícarachá",
  "próprio", "próprios", "sendo", "camadas", "variadas", "feita", "iguais", "primeiro", "segundo", "terceiro", "quarto",
  "quinto", "cola", "endívia", "iguais", "escorrer", "comparado", "sabores", "mesa", "tostado", "tostada", "tostados", "tostadas",
  "namorado", "namorada", "recheado", "desligue", "simples", "complexo", "saquinho", "gordo", "gorda", "gordo", "gorda",
  "afermenhtadas", "decore", "normal", "semi", "raminho", "raminha", "raminhos", "raminhas", "utilize", "impalpável", "unte",
  "aferventado", "colocado", "coloridos", "capa", "capas", "recheie", "cortar", "especiarias", "alimentos", "mirin", 
  "delicadamente", "churrasco", "segestões", "empregue", "brando", "ficou", "adicionar", "passado", "travessa", "produtos",
  "utilizar", "recipiente", "folhinha", "folhinhas", "prepare", "marinada", "marinado", "marinadas", "marinados", "miúdo",
  "miudo", "coloca", "categoria", "categorias", "pontas", "derreta", "fonte", "suave", "curado", "rapidamente", "após",
  "apos", "redondo", "quadrado", "finilizar", "dourado", "superfície", "temperadas", "rodela", "hidratar", "toda", "melado",
  "xícarachá"
))
corpus <- tm_map(corpus, content_transformer(stripWhitespace))

corpus <- Corpus(VectorSource(corpus))
matrix <- DocumentTermMatrix(corpus)
matrix <- as.matrix(matrix)

frequency <- colSums(matrix)
frequency <- sort(frequency, decreasing = TRUE)

words <- names(frequency)
wordcloud(words[1:100], frequency[1:100])

write.csv(ingredientes, file="~/Documentos/Semestre_6/Oficina/RStudio/data.csv", row.names=FALSE, na="")
write.csv(dictionary, file="~/Documentos/Semestre_6/Oficina/RStudio/oldDictionary.csv", row.names=FALSE, na="")

Newdictionary <- read.csv("~/Documentos/Semestre_6/Oficina/RStudio/dictionary.csv", stringsAsFactors = F)

