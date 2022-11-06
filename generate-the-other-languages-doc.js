const fs = require("fs");

const argNamesKw = {
    "[0]": {
        "guid": "000000010BE1",
        "en-US": "[%1$s]"
    },
    "{0}": {
        "guid": "00000000BF50",
        "en-US": "{0}"
    },
    "{1}": {
        "guid": "00000000BF53",
        "en-US": "{1}"
    },
    "{2}": {
        "guid": "00000000BF55",
        "en-US": "{2}"
    },
    "Alpha": {
        "guid": "000000011DA6",
        "en-US": "Alpha",
        "es-ES": "Alfa",
        "es-MX": "Alfa",
        "it-IT": "Alfa",
        "ja-JP": "アルファ",
        "pl-PL": "Alfa",
        "pt-BR": "Alfa",
        "ru-RU": "Альфа",
        "zh-CN": "不透明度"
    },
    "Ammo": {
        "guid": "0000000110E8",
        "en-US": "Ammo",
        "es-ES": "Munición",
        "es-MX": "Munición",
        "fr-FR": "Munitions",
        "ja-JP": "弾薬数",
        "pt-BR": "Munição",
        "zh-CN": "弹药"
    },
    "Amount": {
        "guid": "00000000B22C",
        "en-US": "Amount",
        "es-ES": "Cantidad",
        "es-MX": "Cantidad",
        "fr-FR": "Montant",
        "it-IT": "Quantità",
        "ja-JP": "ダメージ量",
        "pl-PL": "Ilość",
        "pt-BR": "Quantidade",
        "ru-RU": "Объем",
        "zh-CN": "伤害量"
    },
    "Angle": {
        "guid": "00000000B283",
        "en-US": "Angle",
        "es-ES": "Ángulo",
        "es-MX": "Ángulo",
        "it-IT": "Angolo",
        "ja-JP": "角度",
        "pl-PL": "Kąt",
        "pt-BR": "Ângulo",
        "ru-RU": "Угол",
        "zh-CN": "角度"
    },
    "Array": {
        "guid": "00000000B52C",
        "en-US": "Array",
        "es-ES": "Matriz",
        "es-MX": "Matriz",
        "fr-FR": "Tableau",
        "ja-JP": "配列",
        "pl-PL": "Tabela",
        "pt-BR": "Matriz",
        "ru-RU": "Массив",
        "zh-CN": "数组"
    },
    "Assist ID": {
        "guid": "0000000121FE",
        "en-US": "Assist ID",
        "es-ES": "ID de asistencia",
        "es-MX": "ID de asistente",
        "fr-FR": "Identifiant de soutien",
        "it-IT": "ID Assist",
        "ja-JP": "アシストID",
        "pl-PL": "Identyfikator asysty",
        "pt-BR": "ID de Assistência",
        "ru-RU": "ID содействия",
        "zh-CN": "助攻ID"
    },
    "Assister": {
        "guid": "00000000B58C",
        "en-US": "Assister",
        "es-ES": "Asistente",
        "es-MX": "Asistente",
        "fr-FR": "Soutien",
        "it-IT": "Assistente",
        "ja-JP": "アシスター",
        "pl-PL": "Asystujący",
        "pt-BR": "Assistente",
        "ru-RU": "Содействующий",
        "zh-CN": "助攻者"
    },
    "Assisters": {
        "guid": "000000012202",
        "en-US": "Assisters",
        "es-ES": "Asistentes",
        "es-MX": "Asistentes",
        "fr-FR": "Soutiens",
        "it-IT": "Assistenti",
        "ja-JP": "アシスター（複数）",
        "pl-PL": "Asystujący",
        "pt-BR": "Assistentes",
        "ru-RU": "Содействующие",
        "zh-CN": "助攻者"
    },
    "Barriers": {
        "guid": "00000000B1F0",
        "en-US": "BARRIERS",
        "es-ES": "BARRERAS",
        "es-MX": "BARRERAS",
        "fr-FR": "Barrières",
        "it-IT": "BARRIERE",
        "ja-JP": "バリア",
        "pl-PL": "BARIERY",
        "pt-BR": "BARREIRAS",
        "ru-RU": "БАРЬЕРЫ",
        "zh-CN": "屏障"
    },
    "Behavior": {
        "guid": "00000000CEB5",
        "en-US": "Behavior",
        "es-ES": "Comportamiento",
        "es-MX": "Comportamiento",
        "fr-FR": "Comportement",
        "it-IT": "Comportamento",
        "ja-JP": "動作",
        "pl-PL": "Zachowanie",
        "pt-BR": "Comportamento",
        "ru-RU": "Поведение",
        "zh-CN": "行为"
    },
    "Blend Speed": {
        "guid": "00000000C3BB",
        "en-US": "Blend Speed",
        "es-ES": "Velocidad de mezcla",
        "es-MX": "Velocidad de transición",
        "fr-FR": "Vitesse de fusion",
        "it-IT": "Interpola Velocità",
        "ja-JP": "ブレンド速度",
        "pl-PL": "Szybkość komponowania",
        "pt-BR": "Velocidade da Transição",
        "ru-RU": "Скорость перехода",
        "zh-CN": "转动速度"
    },
    "Blue": {
        "guid": "000000011E41",
        "en-US": "Blue",
        "es-ES": "Azul",
        "es-MX": "Azul",
        "fr-FR": "Bleu",
        "it-IT": "Blu",
        "ja-JP": "青",
        "pl-PL": "Niebieski",
        "pt-BR": "Azul",
        "ru-RU": "Синий",
        "zh-CN": "蓝色"
    },
    "Button": {
        "guid": "00000000B2F4",
        "en-US": "Button",
        "es-ES": "Botón",
        "es-MX": "Botón",
        "fr-FR": "Bouton",
        "it-IT": "Tasto",
        "ja-JP": "ボタン",
        "pl-PL": "Przycisk",
        "pt-BR": "Botão",
        "ru-RU": "Кнопка",
        "zh-CN": "按钮"
    },
    "Category": {
        "guid": "00000001136F",
        "en-US": "Category",
        "es-ES": "Categoría",
        "es-MX": "Categoría",
        "fr-FR": "Catégorie",
        "it-IT": "Categoria",
        "ja-JP": "カテゴリー",
        "pl-PL": "Kategoria",
        "pt-BR": "Categoria",
        "ru-RU": "Категория",
        "zh-CN": "类别"
    },
    "Center": {
        "guid": "00000000B232",
        "en-US": "Center",
        "es-ES": "Centro",
        "es-MX": "Centro",
        "fr-FR": "Centre",
        "it-IT": "Centro",
        "ja-JP": "中心",
        "pl-PL": "Środek",
        "pt-BR": "Centro",
        "ru-RU": "Центр",
        "zh-CN": "中间"
    },
    "Character": {
        "guid": "000000012D68",
        "en-US": "Character",
        "es-ES": "Carácter",
        "es-MX": "Personaje",
        "fr-FR": "Caractère",
        "it-IT": "Carattere",
        "ja-JP": "キャラクター",
        "pl-PL": "Znak",
        "pt-BR": "Caractere",
        "ru-RU": "Символ",
        "zh-CN": "字符"
    },
    "Charge Count": {
        "guid": "000000011213",
        "en-US": "Charge Count",
        "es-ES": "Número de cargas",
        "es-MX": "Conteo de carga",
        "fr-FR": "Nombre de charges",
        "it-IT": "Conteggio Carica",
        "ja-JP": "チャージ量",
        "pl-PL": "Liczba ładunków",
        "pt-BR": "Número de Cargas",
        "ru-RU": "Количество зарядов",
        "zh-CN": "充能计数"
    },
    "Charge Percent": {
        "guid": "00000000BB1D",
        "en-US": "Charge Percent",
        "es-ES": "Porcentaje de carga",
        "es-MX": "Porcentaje de carga",
        "fr-FR": "Pourcentage de charge",
        "it-IT": "Percentuale Carica",
        "ja-JP": "チャージのパーセンテージ",
        "pl-PL": "Procentowe naładowanie",
        "pt-BR": "Percentual de Carga",
        "ru-RU": "Процент заряда",
        "zh-CN": "充能百分比"
    },
    "Child": {
        "guid": "000000010E51",
        "en-US": "Child",
        "es-ES": "Elemento secundario",
        "es-MX": "Hijo",
        "fr-FR": "Enfant",
        "it-IT": "Figlio",
        "ja-JP": "子プレイヤー",
        "pl-PL": "Potomny",
        "pt-BR": "Filho",
        "ru-RU": "Ведомый",
        "zh-CN": "子玩家"
    },
    "Children": {
        "guid": "000000010E53",
        "en-US": "Children",
        "es-ES": "Elementos secundarios",
        "es-MX": "Hijos",
        "fr-FR": "Enfants",
        "it-IT": "Figli",
        "ja-JP": "子プレイヤー（複数）",
        "pl-PL": "Potomne",
        "pt-BR": "Filhos",
        "ru-RU": "Ведомые",
        "zh-CN": "儿童"
    },
    "Clip": {
        "guid": "0000000110EE",
        "en-US": "Clip",
        "es-ES": "Cargador",
        "es-MX": "Cargador",
        "fr-FR": "Chargeur",
        "it-IT": "Caricatore",
        "ja-JP": "クリップ",
        "pl-PL": "Magazynek",
        "pt-BR": "Carregador",
        "ru-RU": "Боекомплект",
        "zh-CN": "弹夹"
    },
    "Clipping": {
        "guid": "00000000BAF3",
        "en-US": "Clipping",
        "es-ES": "Recorte",
        "es-MX": "Atravesamiento",
        "fr-FR": "Masquage",
        "it-IT": "Visibilità Oggetto",
        "ja-JP": "クリッピング",
        "pl-PL": "Przenikanie",
        "pt-BR": "Corte",
        "ru-RU": "Пересечение",
        "zh-CN": "截取"
    },
    "Color": {
        "guid": "000000011D42",
        "en-US": "Color",
        "fr-FR": "Couleur",
        "ja-JP": "色",
        "pt-BR": "Cor",
        "zh-CN": "颜色"
    },
    "Comparison": {
        "guid": "0000000081C6",
        "en-US": "Comparison",
        "es-MX": "Comparación",
        "fr-FR": "Comparaison",
        "ja-JP": "比較",
        "pt-BR": "Comparação",
        "zh-CN": "比较"
    },
    "Condition": {
        "guid": "00000000B5B8",
        "en-US": "Condition",
        "es-ES": "Condición",
        "es-MX": "Condición",
        "it-IT": "Condizione",
        "ja-JP": "条件",
        "pl-PL": "Warunek",
        "pt-BR": "Condição",
        "ru-RU": "Условие",
        "zh-CN": "条件"
    },
    "Continue Condition": {
        "guid": "0000000121C4",
        "en-US": "Continue Condition",
        "es-ES": "Continuar condición",
        "es-MX": "Condición Continuar",
        "fr-FR": "Condition Continuer",
        "it-IT": "Continua Condizione",
        "ja-JP": "継続条件",
        "pl-PL": "Kontynuuj warunek",
        "pt-BR": "Condição de Continuação",
        "ru-RU": "Условие продолжения",
        "zh-CN": "继续条件"
    },
    "Control Player": {
        "guid": "00000000FFD1",
        "en-US": "Control Player",
        "es-ES": "Jugador de control",
        "es-MX": "Jugador de control",
        "fr-FR": "Joueur de contrôle",
        "it-IT": "Giocatore di controllo",
        "ja-JP": "コントロールプレイヤー",
        "pl-PL": "Kontroluj gracza",
        "pt-BR": "Controlar jogador",
        "ru-RU": "Контрольный игрок",
        "zh-CN": "控制玩家"
    },
    "Control Variable": {
        "guid": "00000000FB42",
        "en-US": "Control Variable",
        "es-ES": "Variable de control",
        "es-MX": "Variable de control",
        "fr-FR": "Variable de contrôle",
        "it-IT": "Variabile di Controllo",
        "ja-JP": "コントロール変数",
        "pt-BR": "Variável de controle",
        "ru-RU": "Управляющая переменная",
        "zh-CN": "控制变量"
    },
    "Cooldown": {
        "guid": "0000000109BB",
        "en-US": "Cooldown",
        "es-ES": "Tiempo de reutilización",
        "es-MX": "Tiempo de reutilización",
        "fr-FR": "Temps de recharge",
        "ja-JP": "クールダウン",
        "pl-PL": "Czas odnowienia",
        "pt-BR": "Tempo de Recarga",
        "ru-RU": "Время восстановления",
        "zh-CN": "冷却时间"
    },
    "Count": {
        "guid": "00000000B5A1",
        "en-US": "Count",
        "es-ES": "Recuento",
        "es-MX": "Conteo",
        "fr-FR": "Décompte",
        "it-IT": "Contatore",
        "ja-JP": "カウント",
        "pl-PL": "Liczba",
        "pt-BR": "Contagem",
        "ru-RU": "Число",
        "zh-CN": "计数"
    },
    "Damage Dealt Percent": {
        "guid": "00000000B9AC",
        "en-US": "Damage Dealt Percent",
        "es-ES": "Porcentaje de daño infligido",
        "es-MX": "Porcentaje de daño infligido",
        "fr-FR": "Pourcentage de dégâts infligés",
        "it-IT": "Percentuale Danni Inflitti",
        "ja-JP": "与えるダメージのパーセンテージ",
        "pl-PL": "Procentowe zadane obrażenia",
        "pt-BR": "Percentual de Dano Causado",
        "ru-RU": "Процент нанесенного урона",
        "zh-CN": "造成伤害百分比"
    },
    "Damage Modification ID": {
        "guid": "00000000C64D",
        "en-US": "Damage Modification ID",
        "es-MX": "ID de modificación de daño",
        "fr-FR": "Identifiant de modification de dégâts",
        "it-IT": "ID Modifica Danni",
        "ja-JP": "ダメージ変更ID",
        "pl-PL": "Identyfikator modyfikacji obrażeń",
        "pt-BR": "ID de Modificação de Dano",
        "ru-RU": "Идентификатор изменения урона",
        "zh-CN": "伤害调整ID"
    },
    "Damage Over Time ID": {
        "guid": "00000000B9CB",
        "en-US": "Damage Over Time ID",
        "es-ES": "Id de daño en el tiempo",
        "es-MX": "ID de daño con el tiempo",
        "fr-FR": "Identifiant de dégâts sur la durée",
        "it-IT": "ID Danni Periodici",
        "ja-JP": "継続ダメージID",
        "pl-PL": "Identyfikator obrażeń z upływem czasu",
        "pt-BR": "ID de Dano ao Longo do Tempo",
        "ru-RU": "ID периодического урона",
        "zh-CN": "持续伤害ID"
    },
    "Damage Per Second": {
        "guid": "00000000B9C8",
        "en-US": "Damage Per Second",
        "es-ES": "Daño por segundo",
        "es-MX": "Daño por segundo",
        "fr-FR": "Dégâts par seconde",
        "it-IT": "Danni al Secondo",
        "ja-JP": "秒ごとのダメージ",
        "pl-PL": "Obrażenia na sekundę",
        "pt-BR": "Dano por Segundo",
        "ru-RU": "Урон в секунду",
        "zh-CN": "每秒伤害"
    },
    "Damage Percent": {
        "guid": "00000000C63C",
        "en-US": "Damage Percent",
        "es-ES": "Porcentaje de daño",
        "es-MX": "Porcentaje de daño",
        "fr-FR": "Pourcentage de dégâts",
        "it-IT": "Percentuale Danni",
        "ja-JP": "ダメージのパーセンテージ",
        "pl-PL": "Procentowe obrażenia",
        "pt-BR": "Percentual de Dano",
        "ru-RU": "Процент урона",
        "zh-CN": "伤害百分比"
    },
    "Damage Received Percent": {
        "guid": "00000000B9AD",
        "en-US": "Damage Received Percent",
        "es-ES": "Porcentaje de daño recibido",
        "es-MX": "Porcentaje de daño recibido",
        "fr-FR": "Pourcentage de dégâts subis",
        "it-IT": "Percentuale Danni Subiti",
        "ja-JP": "受けるダメージのパーセンテージ",
        "pl-PL": "Procentowe otrzymane obrażenia",
        "pt-BR": "Percentual de Dano Recebido",
        "ru-RU": "Процент полученного урона",
        "zh-CN": "受到伤害百分比"
    },
    "Damager": {
        "guid": "00000000B58F",
        "en-US": "Damager",
        "es-ES": "Dañador",
        "es-MX": "Dañador",
        "fr-FR": "Agresseur",
        "it-IT": "Attaccante",
        "ja-JP": "ダメージャー",
        "pl-PL": "Raniący",
        "pt-BR": "Danificador",
        "ru-RU": "Источник урона",
        "zh-CN": "伤害者"
    },
    "Damagers": {
        "guid": "00000000C63D",
        "en-US": "Damagers",
        "es-ES": "Dañadores",
        "es-MX": "Infligidores de daño",
        "fr-FR": "Émetteurs de dégâts",
        "it-IT": "Attaccanti",
        "ja-JP": "ダメージャー（複数）",
        "pl-PL": "Raniący",
        "pt-BR": "Danificadores",
        "ru-RU": "Наносящие урон",
        "zh-CN": "伤害者"
    },
    "Default": {
        "guid": "000000011372",
        "en-US": "Default",
        "es-ES": "Por defecto",
        "es-MX": "Predeterminado",
        "fr-FR": "Par défaut",
        "it-IT": "Predefinito",
        "ja-JP": "デフォルト",
        "pl-PL": "Domyślna",
        "pt-BR": "Padrão",
        "ru-RU": "По умолчанию",
        "zh-CN": "默认"
    },
    "Denominator": {
        "guid": "00000000C80D",
        "en-US": "Denominator",
        "es-ES": "Denominador",
        "es-MX": "Denominador",
        "fr-FR": "Dénominateur",
        "it-IT": "Denominatore",
        "ja-JP": "分母",
        "pt-BR": "Denominador",
        "ru-RU": "Знаменатель",
        "zh-CN": "分母"
    },
    "Destination": {
        "guid": "00000000B932",
        "en-US": "Destination",
        "es-ES": "Destino",
        "es-MX": "Destino",
        "it-IT": "Destinazione",
        "ja-JP": "目的",
        "pl-PL": "Miejsce docelowe",
        "pt-BR": "Destino",
        "ru-RU": "Цель",
        "zh-CN": "最终值"
    },
    "Direction": {
        "guid": "00000000B25B",
        "en-US": "Direction",
        "es-ES": "Dirección",
        "es-MX": "Dirección",
        "it-IT": "Direzione",
        "ja-JP": "方向",
        "pl-PL": "Kierunek",
        "pt-BR": "Direção",
        "ru-RU": "Направление",
        "zh-CN": "方向"
    },
    "Group Voice Chat": {
        "guid": "000000012BC2",
        "en-US": "Group Voice Chat",
        "es-ES": "Chat de voz de escuadrón",
        "es-MX": "Chat de voz del grupo",
        "fr-FR": "Discussion d’escouade",
        "it-IT": "Chat Vocale di Formazione",
        "ja-JP": "グループ・ボイスチャット",
        "pl-PL": "Czat głosowy z ekipą",
        "pt-BR": "Bate-papo de Voz em Grupo",
        "ru-RU": "Голосовой чат группы",
        "zh-CN": "小队语音聊天"
    },
    "Match Voice Chat": {
        "guid": "000000012BC0",
        "en-US": "Match Voice Chat",
        "es-ES": "Chat de voz en partida",
        "es-MX": "Chat de voz de partida",
        "fr-FR": "Discussion audio de partie",
        "it-IT": "Chat Vocale della Partita",
        "ja-JP": "マッチ・ボイスチャット",
        "pl-PL": "Czat głosowy meczu",
        "pt-BR": "Bate-papo de Voz da Partida",
        "ru-RU": "Голосовой чат матча",
        "zh-CN": "比赛语音聊天"
    },
    "Team Voice Chat": {
        "guid": "000000012BBF",
        "en-US": "Team Voice Chat",
        "es-ES": "Chat de voz de equipo",
        "es-MX": "Chat de voz de equipo",
        "fr-FR": "Discussion d’équipe",
        "it-IT": "Chat Vocale di Squadra",
        "ja-JP": "チーム・ボイスチャット",
        "pl-PL": "Drużynowy czat głosowy",
        "pt-BR": "Bate-papo de Voz de Equipe",
        "ru-RU": "Голосовой чат команды",
        "zh-CN": "队伍语音聊天"
    },
    "Duration": {
        "guid": "00000000B589",
        "en-US": "Duration",
        "es-ES": "Duración",
        "es-MX": "Duración",
        "fr-FR": "Durée",
        "it-IT": "Durata",
        "ja-JP": "期間",
        "pl-PL": "Czas trwania",
        "pt-BR": "Duração",
        "ru-RU": "Длительность",
        "zh-CN": "持续时间"
    },
    "Else": {
        "guid": "000000010BCD",
        "en-US": "Else",
        "es-MX": "Si no",
        "fr-FR": "Sinon",
        "ja-JP": "ELSE",
        "pl-PL": "Inaczej",
        "ru-RU": "В противном случае"
    },
    "Enabled": {
        "guid": "00000000B9B9",
        "en-US": "Enabled",
        "es-ES": "Habilitada",
        "es-MX": "Habilitado",
        "fr-FR": "Activé",
        "it-IT": "Attivo",
        "ja-JP": "有効",
        "pl-PL": "Włączono",
        "pt-BR": "Ativada",
        "ru-RU": "Вкл.",
        "zh-CN": "启用"
    },
    "End Pos": {
        "guid": "00000000B1E9",
        "en-US": "End Pos",
        "es-ES": "Pos. final",
        "es-MX": "Posición final",
        "fr-FR": "Position de fin",
        "it-IT": "Posizione Finale",
        "ja-JP": "終了位置",
        "pl-PL": "Pozycja końcowa",
        "pt-BR": "Pos. Final",
        "ru-RU": "Конечная позиция",
        "zh-CN": "结束位置"
    },
    "End Position": {
        "guid": "00000000CE83",
        "en-US": "End Position",
        "es-ES": "Posición final",
        "es-MX": "Posición final",
        "fr-FR": "Position de fin",
        "it-IT": "Posizione finale",
        "ja-JP": "終了位置",
        "pl-PL": "Pozycja końcowa",
        "pt-BR": "Posição Final",
        "ru-RU": "Конечная позиция",
        "zh-CN": "结束位置"
    },
    "Entity": {
        "guid": "00000000C194",
        "en-US": "Entity",
        "es-ES": "Entidad",
        "es-MX": "Entidad",
        "fr-FR": "Entité",
        "it-IT": "Entità",
        "ja-JP": "エンティティ",
        "pl-PL": "Encja",
        "pt-BR": "Entidade",
        "ru-RU": "Объект",
        "zh-CN": "实体"
    },
    "Environment Credit Player": {
        "guid": "000000011C0B",
        "en-US": "Environment Credit Player",
        "es-ES": "Atribución del entorno al jugador",
        "es-MX": "Jugador de crédito por entorno",
        "fr-FR": "Auteur en cas de mort due à l’environnement",
        "it-IT": "Giocatore Credito Ambientale",
        "ja-JP": "環境要因プレイヤー",
        "pl-PL": "Element otoczenia - zasługa gracza",
        "pt-BR": "Jogador de Crédito de Ambiente",
        "ru-RU": "Присуждение убийства с помощью окружения",
        "zh-CN": "地形消灭者玩家"
    },
    "Eye Position": {
        "guid": "00000000C397",
        "en-US": "Eye Position",
        "es-ES": "Posición de los ojos",
        "es-MX": "Posición de la vista",
        "fr-FR": "Position des yeux",
        "it-IT": "Posizione Occhio",
        "ja-JP": "目の位置",
        "pl-PL": "Pozycja oka",
        "pt-BR": "Posição do Olho",
        "ru-RU": "Положение камеры",
        "zh-CN": "眼睛位置"
    },
    "Facing": {
        "guid": "00000000CB0B",
        "en-US": "Facing",
        "es-ES": "Mirando a",
        "es-MX": "Mirando",
        "fr-FR": "Orientation",
        "it-IT": "Direzione",
        "ja-JP": "対面",
        "pl-PL": "Skierowanie",
        "pt-BR": "Encarando",
        "ru-RU": "Направление поворота",
        "zh-CN": "方向"
    },
    "Game Mode": {
        "guid": "00000000F161",
        "en-US": "Game Mode",
        "es-MX": "Modo de juego",
        "fr-FR": "Mode de jeu",
        "ja-JP": "ゲーム・モード",
        "pt-BR": "Modo de jogo",
        "zh-CN": "游戏模式"
    },
    "Gravity Percent": {
        "guid": "00000000B99A",
        "en-US": "Gravity Percent",
        "es-ES": "Porcentaje de gravedad",
        "es-MX": "Porcentaje de gravedad",
        "fr-FR": "Pourcentage de gravité",
        "it-IT": "Percentuale Gravità",
        "ja-JP": "重力のパーセンテージ",
        "pl-PL": "Procentowa grawitacja",
        "pt-BR": "Percentual da Gravidade",
        "ru-RU": "Процент силы гравитации",
        "zh-CN": "引力百分比"
    },
    "Green": {
        "guid": "000000011E3E",
        "en-US": "Green",
        "es-ES": "Verde",
        "es-MX": "Verde",
        "fr-FR": "Vert",
        "it-IT": "Verde",
        "ja-JP": "緑",
        "pl-PL": "Zielony",
        "pt-BR": "Verde",
        "ru-RU": "Зеленый",
        "zh-CN": "绿色"
    },
    "Header Color": {
        "guid": "00000000C2AB",
        "en-US": "Header Color",
        "es-ES": "Color del título",
        "es-MX": "Color de encabezado",
        "fr-FR": "Couleur du titre",
        "it-IT": "Colore Titolo",
        "ja-JP": "ヘッダーの色",
        "pl-PL": "Kolor nagłówka",
        "pt-BR": "Cor do Cabeçalho",
        "ru-RU": "Цвет заголовка",
        "zh-CN": "标题颜色"
    },
    "Header": {
        "guid": "00000000BA89",
        "en-US": "Header",
        "es-ES": "Título",
        "es-MX": "Encabezado",
        "fr-FR": "Titre",
        "it-IT": "Titolo",
        "ja-JP": "ヘッダー",
        "pl-PL": "Nagłówek",
        "pt-BR": "Cabeçalho",
        "ru-RU": "Заголовок",
        "zh-CN": "标题"
    },
    "Heal Over Time ID": {
        "guid": "00000000B9CC",
        "en-US": "Heal Over Time ID",
        "es-ES": "Id de sanación en el tiempo",
        "es-MX": "ID de sanación con el tiempo",
        "fr-FR": "Identifiant de soins sur la durée",
        "it-IT": "ID Cure Periodiche",
        "ja-JP": "継続回復ID",
        "pl-PL": "Identyfikator leczenia z upływem czasu",
        "pt-BR": "ID de Cura ao Longo do Tempo",
        "ru-RU": "ID периодического исцеления",
        "zh-CN": "持续治疗ID"
    },
    "Healer": {
        "guid": "00000000B58E",
        "en-US": "Healer",
        "es-ES": "Sanador",
        "es-MX": "Sanador",
        "fr-FR": "Soigneur",
        "it-IT": "Guaritore",
        "ja-JP": "ヒーラー",
        "pl-PL": "Leczący",
        "pt-BR": "Curandeiro",
        "ru-RU": "Источник исцеления",
        "zh-CN": "治疗者"
    },
    "Healers": {
        "guid": "00000000FD45",
        "en-US": "Healers",
        "es-ES": "Sanadores",
        "es-MX": "Sanadores",
        "fr-FR": "Soigneurs",
        "it-IT": "Guaritori",
        "ja-JP": "ヒーラー（複数）",
        "pl-PL": "Leczący",
        "pt-BR": "Curandeiros",
        "ru-RU": "Источники исцеления",
        "zh-CN": "治疗者"
    },
    "Healing Dealt Percent": {
        "guid": "00000000B992",
        "en-US": "Healing Dealt Percent",
        "es-ES": "Porcentaje de sanación realizada",
        "es-MX": "Porcentaje de sanación realizada",
        "fr-FR": "Pourcentage de soins prodigués",
        "it-IT": "Percentuale Cure Fornite",
        "ja-JP": "与える回復のパーセンテージ",
        "pl-PL": "Procentowe wyleczone obrażenia",
        "pt-BR": "Percentual de Cura Realizada",
        "ru-RU": "Процент исходящего исцеления",
        "zh-CN": "造成治疗百分比"
    },
    "Healing Modification ID": {
        "guid": "00000000FD39",
        "en-US": "Healing Modification ID",
        "es-MX": "ID de modificación de sanación",
        "fr-FR": "Identifiant de modification de soins",
        "it-IT": "ID Modifica Cure",
        "ja-JP": "回復変更ID",
        "pl-PL": "Identyfikator modyfikacji leczenia",
        "pt-BR": "ID de modificação de cura",
        "ru-RU": "Идентификатор модификации исцеления",
        "zh-CN": "治疗调整ID"
    },
    "Healing Per Second": {
        "guid": "00000000B9C9",
        "en-US": "Healing Per Second",
        "es-ES": "Sanación por segundo",
        "es-MX": "Sanación por segundo",
        "fr-FR": "Soins par seconde",
        "it-IT": "Cure al Secondo",
        "ja-JP": "秒ごとの回復量",
        "pl-PL": "Leczenie na sekundę",
        "pt-BR": "Cura por Segundo",
        "ru-RU": "Исцеление в секунду",
        "zh-CN": "每秒治疗"
    },
    "Healing Percent": {
        "guid": "00000000FD47",
        "en-US": "Healing Percent",
        "es-ES": "Porcentaje de sanación",
        "es-MX": "Porcentaje de sanación",
        "fr-FR": "Pourcentage de soins",
        "it-IT": "Percentuale Cure",
        "ja-JP": "回復量のパーセンテージ",
        "pl-PL": "Procentowe leczenie",
        "pt-BR": "Percentual de cura",
        "ru-RU": "Процент исцеления",
        "zh-CN": "治疗百分比"
    },
    "Healing Received Percent": {
        "guid": "00000000B994",
        "en-US": "Healing Received Percent",
        "es-ES": "Porcentaje de sanación recibida",
        "es-MX": "Porcentaje de sanación recibida",
        "fr-FR": "Pourcentage de soins reçus",
        "it-IT": "Percentuale Cure Ricevute",
        "ja-JP": "受ける回復量のパーセンテージ",
        "pl-PL": "Procentowe otrzymane leczenie",
        "pt-BR": "Percentual da Cura Recebida",
        "ru-RU": "Процент входящего исцеления",
        "zh-CN": "受到治疗百分比"
    },
    "Health Percent": {
        "guid": "00000000B22B",
        "en-US": "Health Percent",
        "es-ES": "Porcentaje de salud",
        "es-MX": "Porcentaje de salud",
        "fr-FR": "Pourcentage de points de vie",
        "it-IT": "Percentuale Salute",
        "ja-JP": "ライフのパーセンテージ",
        "pl-PL": "Procentowe zdrowie",
        "pt-BR": "Percentual de Vida",
        "ru-RU": "Процент здоровья",
        "zh-CN": "生命百分比"
    },
    "Health Type": {
        "guid": "000000011429",
        "en-US": "Health Type",
        "es-ES": "Tipo de salud",
        "es-MX": "Tipo de salud",
        "fr-FR": "Type de points de vie",
        "it-IT": "Tipo Salute",
        "ja-JP": "ライフタイプ",
        "pl-PL": "Typ zdrowia",
        "pt-BR": "Tipo de Vida",
        "ru-RU": "Тип здоровья",
        "zh-CN": "生命值类型"
    },
    "Health": {
        "guid": "000000011449",
        "en-US": "Health",
        "es-MX": "Salud",
        "fr-FR": "Vie",
        "ja-JP": "ライフ",
        "pt-BR": "Vida",
        "zh-CN": "生命值"
    },
    "Hero": {
        "guid": "00000000B293",
        "en-US": "Hero",
        "es-ES": "Héroe",
        "es-MX": "Héroe",
        "fr-FR": "Héros",
        "it-IT": "Eroe",
        "ja-JP": "ヒーロー",
        "pl-PL": "Bohater",
        "pt-BR": "Herói",
        "ru-RU": "Герой",
        "zh-CN": "英雄"
    },
    "Horizontal Angle": {
        "guid": "00000000BB2E",
        "en-US": "Horizontal Angle",
        "es-ES": "Ángulo horizontal",
        "es-MX": "Ángulo horizontal",
        "fr-FR": "Angle horizontal",
        "it-IT": "Angolo Orizzontale",
        "ja-JP": "水平角",
        "pl-PL": "Kąt poziomy",
        "pt-BR": "Ângulo Horizontal",
        "ru-RU": "Горизонтальный угол",
        "zh-CN": "水平角度"
    },
    "Icon Color": {
        "guid": "00000000C2F2",
        "en-US": "Icon Color",
        "es-ES": "Color del icono",
        "es-MX": "Color de ícono",
        "fr-FR": "Couleur de l’icône",
        "it-IT": "Colore Icona",
        "ja-JP": "アイコンの色",
        "pl-PL": "Kolor symbolu",
        "pt-BR": "Cor do Ícone",
        "ru-RU": "Цвет значка",
        "zh-CN": "图标颜色"
    },
    "Icon": {
        "guid": "00000000B61B",
        "en-US": "Icon",
        "es-ES": "Icono",
        "es-MX": "Ícono",
        "fr-FR": "Icône",
        "it-IT": "Icona",
        "ja-JP": "アイコン",
        "ko-KR": "아이콘",
        "pl-PL": "Symbol",
        "pt-BR": "Ícone",
        "ru-RU": "Символ",
        "zh-CN": "图标",
        "zh-TW": "頭像"
    },
    "Health Pool ID": {
        "guid": "000000011437",
        "en-US": "Health Pool ID",
        "es-ES": "ID de reserva de salud",
        "es-MX": "ID de cantidad de salud",
        "fr-FR": "Identifiant de réserve de points de vie",
        "it-IT": "ID Riserva Salute",
        "ja-JP": "ライフプールID",
        "pl-PL": "ID puli zdrowia",
        "pt-BR": "ID de Reserva de Vida",
        "ru-RU": "ID запаса здоровья",
        "zh-CN": "生命池ID"
    },
    "If Already Executing": {
        "guid": "00000001002A",
        "en-US": "If Already Executing",
        "es-ES": "Si ya se está ejecutando",
        "es-MX": "Ya en ejecución",
        "fr-FR": "Si déjà en cours d’exécution",
        "it-IT": "Se già in esecuzione",
        "ja-JP": "既に実行中の場合",
        "pt-BR": "Se já em execução",
        "ru-RU": "Если уже выполняется",
        "zh-CN": "是否正在执行"
    },
    "If": {
        "guid": "000000010BC9",
        "en-US": "If",
        "es-MX": "Si",
        "fr-FR": "Si",
        "ja-JP": "IF",
        "pl-PL": "Jeśli",
        "ru-RU": "Если"
    },
    "Include Floors": {
        "guid": "000000011335",
        "en-US": "Include Floors",
        "es-ES": "Incluir suelo",
        "es-MX": "Incluir suelos",
        "fr-FR": "Inclut le sol",
        "it-IT": "Includi Pavimenti",
        "ja-JP": "床を含む",
        "pl-PL": "Uwzględnij podłoża",
        "pt-BR": "Incluir Chão",
        "ru-RU": "Учитывать пол",
        "zh-CN": "包括地面"
    },
    "Include Player Owned Objects": {
        "guid": "00000000C5A7",
        "en-US": "Include player owned objects",
        "es-MX": "Incluir objetos que le pertenecen al jugador",
        "fr-FR": "Inclure les objets appartenant aux joueurs",
        "it-IT": "Include gli oggetti posseduti dal giocatore",
        "ja-JP": "プレイヤーの所有するオブジェクトを含む",
        "pl-PL": "Uwzględnij obiekty należące do gracza",
        "pt-BR": "Incluir objetos de propriedade do jogador",
        "ru-RU": "Включать объекты, принадлежащие игроку",
        "zh-CN": "包括玩家拥有的物体"
    },
    "Index": {
        "guid": "00000000B52B",
        "en-US": "Index",
        "es-ES": "Índice",
        "es-MX": "Índice",
        "it-IT": "Indice",
        "ja-JP": "インデックス",
        "pl-PL": "Indeks",
        "pt-BR": "Índice",
        "ru-RU": "Индекс",
        "zh-CN": "索引"
    },
    "Input Value": {
        "guid": "00000001232E",
        "en-US": "Input Value",
        "es-ES": "Valor de entrada",
        "es-MX": "Valor de entrada",
        "fr-FR": "Valeur d’entrée",
        "it-IT": "Valore Input",
        "ja-JP": "入力値",
        "pl-PL": "Wartość wejściowa",
        "pt-BR": "Valor de Entrada",
        "ru-RU": "Значение ввода",
        "zh-CN": "输入值"
    },
    "Invisible To": {
        "guid": "00000000B9EE",
        "en-US": "Invisible To",
        "es-ES": "Invisible para",
        "es-MX": "Invisible para",
        "fr-FR": "Invisible pour",
        "it-IT": "Invisibile a",
        "ja-JP": "目視不可能: ",
        "pl-PL": "Niewidzialne dla",
        "pt-BR": "Invisível para",
        "ru-RU": "Невидимость для",
        "zh-CN": "不可见"
    },
    "Is Recoverable": {
        "guid": "00000001142F",
        "en-US": "Recoverable",
        "es-ES": "Recuperable",
        "es-MX": "Recuperable",
        "fr-FR": "Récupérable",
        "it-IT": "Recuperabile",
        "ja-JP": "復元可能",
        "pl-PL": "Regenerowalna",
        "pt-BR": "Regenerável",
        "ru-RU": "Восполнение",
        "zh-CN": "可恢复"
    },
    "Jump Vertical Speed Percent": {
        "guid": "000000011230",
        "en-US": "Jump Vertical Speed Percent",
        "es-ES": "Porcentaje de velocidad de salto vertical",
        "es-MX": "Porcentaje de velocidad vertical de salto",
        "fr-FR": "Pourcentage de vitesse de saut verticale",
        "it-IT": "Percentuale Velocità Verticale di Salto",
        "ja-JP": "ジャンプ垂直速度のパーセンテージ",
        "pl-PL": "Procentowa wertykalna szybkość skoku",
        "pt-BR": "Percentual de Velocidade Vertical do Salto",
        "ru-RU": "Процент вертикальной скорости прыжка",
        "zh-CN": "垂直跳跃速度百分比"
    },
    "Killer": {
        "guid": "00000000B590",
        "en-US": "Killer",
        "es-ES": "Asesino",
        "es-MX": "Asesino",
        "fr-FR": "Tueur",
        "it-IT": "Uccisore",
        "ja-JP": "キラー",
        "pl-PL": "Zabójca",
        "pt-BR": "Matador",
        "ru-RU": "Убийца",
        "zh-CN": "击杀者"
    },
    "Knockback Dealt Percent": {
        "guid": "000000011FAE",
        "en-US": "Knockback Dealt Percent",
        "es-ES": "Porcentaje de repulsión realizada",
        "es-MX": "Porcentaje de derribos infligidos",
        "fr-FR": "Pourcentage de recul infligé",
        "it-IT": "Percentuale Respinta Inflitta",
        "ja-JP": "与えるノックバックのパーセンテージ",
        "pl-PL": "Procentowa wartość powodowanego odrzucenia",
        "pt-BR": "Porcentagem de Repulsão Causada",
        "ru-RU": "Процент произведенного отбрасывания",
        "zh-CN": "造成击退百分比"
    },
    "Knockback Received Percent": {
        "guid": "000000011FB1",
        "en-US": "Knockback Received Percent",
        "es-ES": "Porcentaje de repulsión recibida",
        "es-MX": "Porcentaje de derribos recibidos",
        "fr-FR": "Pourcentage de recul subi",
        "it-IT": "Percentuale Respinta Subita",
        "ja-JP": "受けるノックバックのパーセンテージ",
        "pl-PL": "Procentowa wartość otrzymanego odrzucenia",
        "pt-BR": "Porcentagem de Repulsão Recebida",
        "ru-RU": "Процент получаемого отбрасывания",
        "zh-CN": "受到击退百分比"
    },
    "Local Vector": {
        "guid": "00000000B33F",
        "en-US": "Local Vector",
        "es-ES": "Vector local",
        "es-MX": "Vector local",
        "fr-FR": "Vecteur local",
        "it-IT": "Vettore Locale",
        "ja-JP": "ローカルのベクトル",
        "pl-PL": "Lokalny wektor",
        "pt-BR": "Vetor Local",
        "ru-RU": "Локальный вектор",
        "zh-CN": "本地矢量"
    },
    "Location": {
        "guid": "00000000BAF9",
        "en-US": "Location",
        "es-ES": "Ubicación",
        "es-MX": "Ubicación",
        "fr-FR": "Lieu",
        "it-IT": "Luogo",
        "ja-JP": "場所",
        "pl-PL": "Lokalizacja",
        "pt-BR": "Local",
        "ru-RU": "Местоположение",
        "zh-CN": "坐标"
    },
    "Look At Position": {
        "guid": "00000000C399",
        "en-US": "Look at Position",
        "es-ES": "Mirar a posición",
        "es-MX": "Mirar a la posición",
        "fr-FR": "Regarder la position",
        "it-IT": "Osserva Posizione",
        "ja-JP": "位置を見る",
        "pl-PL": "Pozycja patrzenia",
        "pt-BR": "Olhar para Posição",
        "ru-RU": "Позиция в кадре",
        "zh-CN": "望向位置"
    },
    "Los Check": {
        "guid": "00000000B1E6",
        "en-US": "LOS Check",
        "es-ES": "Comprobación de línea de visión",
        "es-MX": "Verificación de LDV",
        "fr-FR": "Vérification de la ligne de vue",
        "it-IT": "Controllo Linea di Tiro",
        "ja-JP": "射線チェック",
        "pl-PL": "Sprawdzenie pola widzenia",
        "pt-BR": "Verificação de LdV",
        "ru-RU": "Проверка видимости",
        "zh-CN": "视线检测"
    },
    "Magnitude": {
        "guid": "00000000CEAE",
        "en-US": "Magnitude",
        "es-ES": "Magnitud",
        "es-MX": "Magnitud",
        "fr-FR": "Ampleur",
        "it-IT": "Entità",
        "ja-JP": "変化の大きさ",
        "pl-PL": "Wielkość",
        "ru-RU": "Сила",
        "zh-CN": "幅度"
    },
    "Map": {
        "guid": "00000000D415",
        "en-US": "Map",
        "es-MX": "Mapa",
        "fr-FR": "Carte",
        "ja-JP": "マップ",
        "pt-BR": "Mapa",
        "zh-CN": "地图"
    },
    "Max Backward": {
        "guid": "00000000BB14",
        "en-US": "Max Backward",
        "es-ES": "Máx. hacia atrás",
        "es-MX": "Movimiento máximo hacia atrás",
        "fr-FR": "Maximum en arrière",
        "it-IT": "Massimo Indietro",
        "ja-JP": "後方最大",
        "pl-PL": "Maksimum do tyłu",
        "pt-BR": "Máx. para Trás",
        "ru-RU": "Макс. назад",
        "zh-CN": "向后最大"
    },
    "Max Forward": {
        "guid": "00000000BB11",
        "en-US": "Max Forward",
        "es-ES": "Máx. hacia adelante",
        "es-MX": "Movimiento máximo hacia adelante",
        "fr-FR": "Maximum en avant",
        "it-IT": "Massimo Avanti",
        "ja-JP": "前方最大",
        "pl-PL": "Maksimum do przodu",
        "pt-BR": "Máx. Frontal",
        "ru-RU": "Макс. вперед",
        "zh-CN": "向前最大"
    },
    "Max Health": {
        "guid": "00000001142D",
        "en-US": "Max Health",
        "es-ES": "Salud máxima",
        "es-MX": "Salud máxima",
        "fr-FR": "Points de vie maximum",
        "it-IT": "Salute Massima",
        "ja-JP": "最大ライフ",
        "pl-PL": "Maksimum zdrowia",
        "pt-BR": "Vida Máxima",
        "ru-RU": "Максимальный запас здоровья",
        "zh-CN": "最大生命值"
    },
    "Max Sideways": {
        "guid": "00000000BB12",
        "en-US": "Max Sideways",
        "es-ES": "Máx. de lado",
        "es-MX": "Movimiento máximo hacia los lados",
        "fr-FR": "Maximum latéral",
        "it-IT": "Massimo Laterale",
        "ja-JP": "横方向最大",
        "pl-PL": "Maksimum na boki",
        "pt-BR": "Máx. Lateral",
        "ru-RU": "Макс. в сторону",
        "zh-CN": "侧向最大"
    },
    "Max Speed": {
        "guid": "00000000BB17",
        "en-US": "Max Speed",
        "es-ES": "Velocidad máxima",
        "es-MX": "Velocidad máxima",
        "fr-FR": "Vitesse maximum",
        "it-IT": "Velocità Non Direzionale Massima",
        "ja-JP": "最大の速さ",
        "pl-PL": "Szybkość maksymalna",
        "pt-BR": "Velocidade Máx.",
        "ru-RU": "Максимальная скорость",
        "zh-CN": "最大速度"
    },
    "Max": {
        "guid": "000000011379",
        "en-US": "Max",
        "es-ES": "Máx",
        "es-MX": "Máximo",
        "fr-FR": "Maximum",
        "ja-JP": "最大",
        "pl-PL": "Maksimum",
        "pt-BR": "Máx.",
        "ru-RU": "Макс.",
        "zh-CN": "最大"
    },
    "Min Backward": {
        "guid": "00000000BB15",
        "en-US": "Min Backward",
        "es-ES": "Mín. hacia atrás",
        "es-MX": "Movimiento mínimo hacia atrás",
        "fr-FR": "Minimum en arrière",
        "it-IT": "Minimo Indietro",
        "ja-JP": "後方最小",
        "pl-PL": "Minimum do tyłu",
        "pt-BR": "Mín. para Trás",
        "ru-RU": "Мин. назад",
        "zh-CN": "向后最小"
    },
    "Min Forward": {
        "guid": "00000000BB10",
        "en-US": "Min Forward",
        "es-ES": "Mín. hacia adelante",
        "es-MX": "Movimiento mínimo hacia adelante",
        "fr-FR": "Minimum en avant",
        "it-IT": "Minimo Avanti",
        "ja-JP": "前方最小",
        "pl-PL": "Minimum do przodu",
        "pt-BR": "Mín. Frontal",
        "ru-RU": "Мин. вперед",
        "zh-CN": "向前最小"
    },
    "Min Sideways": {
        "guid": "00000000BB13",
        "en-US": "Min Sideways",
        "es-ES": "Mín. de lado",
        "es-MX": "Movimiento mínimo hacia los lados",
        "fr-FR": "Minimum latéral",
        "it-IT": "Minimo Laterale",
        "ja-JP": "横方向最小",
        "pl-PL": "Minimum na boki",
        "pt-BR": "Mín. Lateral",
        "ru-RU": "Мин. в сторону",
        "zh-CN": "侧向最小"
    },
    "Min": {
        "guid": "000000011377",
        "en-US": "Min",
        "es-ES": "Mín",
        "es-MX": "Mínimo",
        "fr-FR": "Minimum",
        "ja-JP": "最小",
        "pl-PL": "Minimum",
        "pt-BR": "Mín.",
        "ru-RU": "Мин.",
        "zh-CN": "最小"
    },
    "Motion": {
        "guid": "00000000B522",
        "en-US": "Motion",
        "es-ES": "Movimiento",
        "es-MX": "Movimiento",
        "fr-FR": "Mouvement",
        "it-IT": "Movimento",
        "ja-JP": "モーション",
        "pl-PL": "Ruch",
        "pt-BR": "Deslocamento",
        "ru-RU": "Движение",
        "zh-CN": "运动"
    },
    "Move Speed Percent": {
        "guid": "00000000B996",
        "en-US": "Move Speed Percent",
        "es-ES": "Porcentaje de velocidad de movimiento",
        "es-MX": "Porcentaje de velocidad de movimiento",
        "fr-FR": "Pourcentage de vitesse de déplacement",
        "it-IT": "Percentuale Velocità di Movimento Non Direzionale",
        "ja-JP": "移動速度パーセンテージ",
        "pl-PL": "Procentowa szybkość ruchu",
        "pt-BR": "Percentual da Velocidade de Movimento",
        "ru-RU": "Процент скорости передвижения",
        "zh-CN": "移动速度百分比"
    },
    "Name": {
        "guid": "000000011371",
        "en-US": "Name",
        "es-ES": "Nombre",
        "es-MX": "Nombre",
        "fr-FR": "Nom",
        "it-IT": "Nome",
        "ja-JP": "名前",
        "pl-PL": "Nazwa",
        "pt-BR": "Nome",
        "ru-RU": "Название",
        "zh-CN": "名称"
    },
    "Non-Team Spectators": {
        "guid": "00000000CE58",
        "en-US": "Non-Team Spectators",
        "de-DE": "Teamlose Zuschauer",
        "es-ES": "Observadores fuera del equipo",
        "es-MX": "Espectadores que no pertenecen al equipo",
        "fr-FR": "Spectateurs neutres",
        "it-IT": "Spettatori esterni",
        "ja-JP": "非チーム視点の観戦者",
        "pl-PL": "Obserwatorzy spoza drużyny",
        "pt-BR": "Espectadores fora do time",
        "ru-RU": "Внекомандные зрители",
        "zh-CN": "无队伍观战者"
    },
    "Number Of Actions": {
        "guid": "00000000BB08",
        "en-US": "Number of Actions",
        "es-ES": "Número de acciones",
        "es-MX": "Cantidad de acciones",
        "fr-FR": "Nombre d’actions",
        "it-IT": "Numero Azioni",
        "ja-JP": "アクションの数",
        "pl-PL": "Liczba działań",
        "pt-BR": "Número de Ações",
        "ru-RU": "Количество действий",
        "zh-CN": "动作数量"
    },
    "Number": {
        "guid": "00000000B219",
        "en-US": "Number",
        "es-ES": "Cifra",
        "es-MX": "Número",
        "fr-FR": "Nombre",
        "it-IT": "Numero",
        "ja-JP": "番号",
        "pl-PL": "Liczba",
        "pt-BR": "Número",
        "ru-RU": "Число",
        "zh-CN": "数字"
    },
    "Numerator": {
        "guid": "00000000C80C",
        "en-US": "Numerator",
        "es-ES": "Numerador",
        "es-MX": "Numerador",
        "fr-FR": "Numérateur",
        "it-IT": "Numeratore",
        "ja-JP": "分子",
        "pt-BR": "Numerador",
        "ru-RU": "Числитель",
        "zh-CN": "分子"
    },
    "Offset": {
        "guid": "000000010E55",
        "en-US": "Offset",
        "es-ES": "Compensar",
        "es-MX": "Compensación",
        "fr-FR": "Décalage",
        "it-IT": "Compensazione",
        "ja-JP": "オフセット",
        "pl-PL": "Wyrównanie",
        "pt-BR": "Deslocamento",
        "ru-RU": "Смещение",
        "zh-CN": "偏移"
    },
    "Operation": {
        "guid": "00000000B16E",
        "en-US": "Operation",
        "es-ES": "Operación",
        "es-MX": "Operación",
        "fr-FR": "Opération",
        "it-IT": "Operazione",
        "ja-JP": "演算",
        "pl-PL": "Operacja",
        "pt-BR": "Operação",
        "ru-RU": "Операция",
        "zh-CN": "操作"
    },
    "Options": {
        "guid": "000000011CC2",
        "en-US": "Options",
        "es-ES": "Opciones",
        "es-MX": "Opciones",
        "it-IT": "Opzioni",
        "ja-JP": "オプション",
        "pl-PL": "Opcje",
        "pt-BR": "Opções",
        "ru-RU": "Настройки",
        "zh-CN": "选项"
    },
    "Parent": {
        "guid": "000000010E50",
        "en-US": "Parent",
        "es-ES": "Elemento primario",
        "es-MX": "Padre",
        "it-IT": "Genitore",
        "ja-JP": "親プレイヤー",
        "pl-PL": "Nadrzędny",
        "pt-BR": "Pai",
        "ru-RU": "Ведущий",
        "zh-CN": "父玩家"
    },
    "Pattern": {
        "guid": "000000012D70",
        "en-US": "Pattern",
        "es-ES": "Patrón",
        "es-MX": "Patrón",
        "fr-FR": "Motif",
        "it-IT": "Schema",
        "ja-JP": "パターン",
        "pl-PL": "Wzorzec",
        "pt-BR": "Padrão",
        "ru-RU": "Шаблон",
        "zh-CN": "模式"
    },
    "Pitch Scalar": {
        "guid": "0000000113C5",
        "en-US": "Pitch Scalar",
        "es-ES": "Tono",
        "es-MX": "Escala de tono",
        "fr-FR": "Timbre de la voix",
        "it-IT": "Scalare del Pitch",
        "ja-JP": "ピッチスカラー",
        "pl-PL": "Współczynnik skalowania wysokości głosu",
        "pt-BR": "Escalar do Tom",
        "ru-RU": "Скалярное значение высоты звука",
        "zh-CN": "音调调整"
    },
    "Player": {
        "guid": "00000000B1F3",
        "en-US": "Player",
        "es-ES": "Jugador",
        "es-MX": "Jugador",
        "fr-FR": "Joueur",
        "it-IT": "Giocatore",
        "ja-JP": "プレイヤー",
        "pl-PL": "Gracz",
        "pt-BR": "Jogador",
        "ru-RU": "Игрок",
        "zh-CN": "玩家"
    },
    "Players To Exclude": {
        "guid": "00000000C605",
        "en-US": "Players to Exclude",
        "es-MX": "Jugadores para excluir",
        "fr-FR": "Joueurs à exclure",
        "it-IT": "Giocatori da Escludere",
        "ja-JP": "除外するプレイヤー",
        "pl-PL": "Gracze do wykluczenia",
        "pt-BR": "Jogadores a Excluir",
        "ru-RU": "Незатрагиваемые игроки",
        "zh-CN": "不包括玩家"
    },
    "Players To Include": {
        "guid": "00000000C5A6",
        "en-US": "Players to Include",
        "es-MX": "Jugadores para incluir",
        "fr-FR": "Joueurs à inclure",
        "it-IT": "Giocatori da includere",
        "ja-JP": "含まれるプレイヤー",
        "pl-PL": "Gracze do uwzględnienia",
        "pt-BR": "Jogadores a Incluir",
        "ru-RU": "Затрагиваемые игроки",
        "zh-CN": "包括玩家"
    },
    "Players": {
        "guid": "00000000B879",
        "en-US": "Players",
        "es-ES": "Jugadores",
        "es-MX": "Jugadores",
        "fr-FR": "Joueurs",
        "it-IT": "Giocatori",
        "ja-JP": "プレイヤー（複数）",
        "pl-PL": "Gracze",
        "pt-BR": "Jogadores",
        "ru-RU": "Игроки",
        "zh-CN": "玩家"
    },
    "Position": {
        "guid": "00000000B218",
        "en-US": "Position",
        "es-ES": "Posición",
        "es-MX": "Posición",
        "it-IT": "Posizione",
        "ja-JP": "位置",
        "pl-PL": "Pozycja",
        "pt-BR": "Posição",
        "ru-RU": "Положение",
        "zh-CN": "位置"
    },
    "Progress Bar Color": {
        "guid": "0000000122EA",
        "en-US": "Progress Bar Color",
        "es-ES": "Color de la barra de progreso",
        "es-MX": "Color de la barra de progreso",
        "fr-FR": "Couleur de barre de progression",
        "it-IT": "Colore Progress Bar",
        "ja-JP": "進行バーの色",
        "pl-PL": "Kolor paska postępu",
        "pt-BR": "Cor da Barra de Progresso",
        "ru-RU": "Цвет шкалы прогресса",
        "zh-CN": "进度条颜色"
    },
    "Projectile Gravity Percent": {
        "guid": "00000000B99C",
        "en-US": "Projectile Gravity Percent",
        "es-ES": "Porcentaje de gravedad de proyectil",
        "es-MX": "Porcentaje de gravedad del proyectil",
        "fr-FR": "Pourcentage de gravité des projectiles",
        "it-IT": "Percentuale Gravità Proiettili",
        "ja-JP": "弾の重力パーセンテージ",
        "pl-PL": "Procentowa grawitacji pocisków",
        "pt-BR": "Percentual da Gravidade de Projétil",
        "ru-RU": "Процент гравитации для снарядов",
        "zh-CN": "弹道引力百分比"
    },
    "Projectile Speed Percent": {
        "guid": "00000000B99E",
        "en-US": "Projectile Speed Percent",
        "es-ES": "Porcentaje de velocidad de proyectil",
        "es-MX": "Porcentaje de velocidad del proyectil",
        "fr-FR": "Pourcentage de vitesse des projectiles",
        "it-IT": "Percentuale Velocità Proiettili Non Direzionale",
        "ja-JP": "弾速パーセンテージ",
        "pl-PL": "Procentowa szybkość pocisków",
        "pt-BR": "Percentual da Velocidade de Projétil",
        "ru-RU": "Процент скорости снарядов",
        "zh-CN": "弹道速度百分比"
    },
    "Radius": {
        "guid": "00000000B237",
        "en-US": "Radius",
        "es-ES": "Radio",
        "es-MX": "Radio",
        "fr-FR": "Rayon",
        "it-IT": "Raggio",
        "ja-JP": "範囲",
        "pl-PL": "Promień",
        "pt-BR": "Raio",
        "ru-RU": "Радиус",
        "zh-CN": "半径"
    },
    "Range Start": {
        "guid": "00000000FB47",
        "en-US": "Range Start",
        "es-ES": "Inicio de intervalo",
        "es-MX": "Inicio de rango",
        "fr-FR": "Début de l’intervalle",
        "it-IT": "Avvio Portata",
        "ja-JP": "開始値",
        "pt-BR": "Início do intervalo",
        "ru-RU": "Начало диапазона",
        "zh-CN": "起始值"
    },
    "Range Stop": {
        "guid": "00000000FB45",
        "en-US": "Range Stop",
        "es-ES": "Detención de intervalo",
        "es-MX": "Fin de rango",
        "fr-FR": "Fin de l’intervalle",
        "it-IT": "Interruzione Portata",
        "ja-JP": "終了値",
        "pt-BR": "Fim do intervalo",
        "ru-RU": "Конец диапазона",
        "zh-CN": "终止值"
    },
    "Rate": {
        "guid": "00000000B844",
        "en-US": "Rate",
        "es-ES": "Ritmo",
        "es-MX": "Aceleración",
        "fr-FR": "Cadence",
        "it-IT": "Frequenza",
        "ja-JP": "レート",
        "pl-PL": "Tempo",
        "pt-BR": "Taxa",
        "ru-RU": "Шаг",
        "zh-CN": "频率"
    },
    "Receivers": {
        "guid": "00000000C641",
        "en-US": "Receivers",
        "es-ES": "Receptores",
        "es-MX": "Receptores",
        "fr-FR": "Récepteurs de dégâts",
        "it-IT": "Ricevitori",
        "ja-JP": "レシーバー",
        "pl-PL": "Odbiorcy",
        "pt-BR": "Receptores",
        "ru-RU": "Получающие урон",
        "zh-CN": "受伤害者"
    },
    "Red": {
        "guid": "000000011DA7",
        "en-US": "Red",
        "es-ES": "Rojo",
        "es-MX": "Rojo",
        "fr-FR": "Rouge",
        "it-IT": "Rosso",
        "ja-JP": "赤",
        "pl-PL": "Czerwony",
        "pt-BR": "Vermelho",
        "ru-RU": "Красный",
        "zh-CN": "红色"
    },
    "Reevaluate": {
        "guid": "000000010E87",
        "en-US": "Reevaluation",
        "es-ES": "Revaluación",
        "es-MX": "Reevaluación",
        "fr-FR": "Réévaluation",
        "it-IT": "Rivalutazione",
        "ja-JP": "再評価",
        "pl-PL": "Ponowne oszacowanie",
        "pt-BR": "Reavaliação",
        "ru-RU": "Пересчет",
        "zh-CN": "重新赋值"
    },
    "Reevaluation": {
        "guid": "0000000113C9",
        "en-US": "Reevaluation",
        "es-ES": "Revaluación",
        "es-MX": "Reevaluación",
        "fr-FR": "Réévaluation",
        "it-IT": "Rivalutazione",
        "ja-JP": "再評価",
        "pl-PL": "Ponowne oszacowanie",
        "pt-BR": "Recálculo",
        "ru-RU": "Пересчет",
        "zh-CN": "重新赋值"
    },
    "Relative Direction": {
        "guid": "00000000CC2B",
        "en-US": "Relative Direction",
        "es-ES": "Dirección relativa",
        "es-MX": "Dirección relativa",
        "fr-FR": "Direction relative",
        "it-IT": "Direzione Relativa",
        "ja-JP": "相対方向",
        "pl-PL": "Kierunek względny",
        "pt-BR": "Direção Relativa",
        "ru-RU": "Относительное направление",
        "zh-CN": "相对方向"
    },
    "Relative Player": {
        "guid": "00000000B340",
        "en-US": "Relative Player",
        "es-ES": "Jugador relativo",
        "es-MX": "Jugador relativo",
        "fr-FR": "Joueur relatif",
        "it-IT": "Giocatore Relativo",
        "ja-JP": "プレイヤー相対",
        "pl-PL": "Względny gracz",
        "pt-BR": "Jogador Relativo",
        "ru-RU": "Игрок",
        "zh-CN": "相对玩家"
    },
    "Relative": {
        "guid": "00000000B174",
        "en-US": "Relative",
        "es-ES": "Relativo",
        "es-MX": "Relativo",
        "fr-FR": "Relatif",
        "it-IT": "Relativo",
        "ja-JP": "相対",
        "pl-PL": "Względnie",
        "pt-BR": "Relativo",
        "ru-RU": "Система координат",
        "zh-CN": "相对"
    },
    "Replacement": {
        "guid": "000000012D72",
        "en-US": "Replacement",
        "es-ES": "Reemplazo",
        "es-MX": "Reemplazo",
        "fr-FR": "Remplacement",
        "it-IT": "Sostituzione",
        "ja-JP": "置換",
        "pl-PL": "Zamiennik",
        "pt-BR": "Substituição",
        "ru-RU": "Замена",
        "zh-CN": "替换"
    },
    "Resource Percent": {
        "guid": "000000011214",
        "en-US": "Resource Percent",
        "es-ES": "Porcentaje de recursos",
        "es-MX": "Porcentaje de recurso",
        "fr-FR": "Pourcentage de ressource",
        "it-IT": "Percentuale Risorse",
        "ja-JP": "リソースのパーセンテージ",
        "pl-PL": "Procent zasobu",
        "pt-BR": "Porcentagem de Recurso",
        "ru-RU": "Процент ресурса",
        "zh-CN": "资源百分比"
    },
    "Room": {
        "guid": "00000000B578",
        "en-US": "Room",
        "es-ES": "Sala",
        "es-MX": "Cuarto",
        "fr-FR": "Salle",
        "it-IT": "Stanza",
        "ja-JP": "ルーム",
        "pl-PL": "Pomieszczenie",
        "pt-BR": "Sala",
        "ru-RU": "Комната",
        "zh-CN": "室内"
    },
    "Round Winning Team": {
        "guid": "00000000BF95",
        "en-US": "Round winning team",
        "de-DE": "Das Team, das die Runde gewonnen hat.",
        "es-ES": "Equipo ganador de la ronda.",
        "es-MX": "Equipo ganador de la ronda",
        "fr-FR": "Équipe vainqueur de la manche",
        "it-IT": "Squadra vincitrice del round",
        "ja-JP": "ラウンドに勝利したチーム",
        "ko-KR": "라운드에서 승리한 팀입니다.",
        "pl-PL": "Drużyna wygrywająca rundę",
        "pt-BR": "Equipe vencedora da rodada",
        "ru-RU": "Команда-победитель раунда.",
        "zh-CN": "本回合获胜队伍"
    },
    "Rounding Type": {
        "guid": "00000000C350",
        "en-US": "Rounding Type",
        "es-ES": "Tipo de redondeo",
        "es-MX": "Tipo de redondeo",
        "fr-FR": "Type d’arrondi",
        "it-IT": "Tipo Arrotondamento",
        "ja-JP": "四捨五入のタイプ",
        "pl-PL": "Typ zaokrąglenia",
        "pt-BR": "Tipo de Arredondamento",
        "ru-RU": "Тип округления",
        "zh-CN": "取整方式"
    },
    "Scale": {
        "guid": "000000011310",
        "en-US": "Scale",
        "es-ES": "Escala",
        "es-MX": "Escalar",
        "fr-FR": "Échelle",
        "it-IT": "Scala",
        "ja-JP": "スケール",
        "pl-PL": "Skala",
        "pt-BR": "Escala",
        "ru-RU": "Масштаб",
        "zh-CN": "大小"
    },
    "Score": {
        "guid": "00000000B22E",
        "en-US": "Score",
        "es-ES": "Puntuación",
        "es-MX": "Puntuación",
        "fr-FR": "Points",
        "it-IT": "Punteggio",
        "ja-JP": "スコア",
        "pl-PL": "Wynik",
        "pt-BR": "Pontuação",
        "ru-RU": "Счет",
        "zh-CN": "得分"
    },
    "Separator": {
        "guid": "000000012D6D",
        "en-US": "Separator",
        "es-ES": "Separador",
        "es-MX": "Separador",
        "fr-FR": "Séparateur",
        "it-IT": "Separatore",
        "ja-JP": "分割",
        "pt-BR": "Separador",
        "ru-RU": "Разделитель",
        "zh-CN": "分隔符"
    },
    "Show When Offscreen": {
        "guid": "00000000C374",
        "en-US": "Show When Offscreen",
        "es-ES": "Mostrar al estar fuera de pantalla",
        "es-MX": "Mostrar cuando está fuera de pantalla",
        "fr-FR": "Affichage hors champ",
        "it-IT": "Mostra Se Fuori Schermo",
        "ja-JP": "オフスクリーン時に表示する",
        "pl-PL": "Pokaż, kiedy poza ekranem",
        "pt-BR": "Mostrar Quando Fora da Tela",
        "ru-RU": "Показывать вне экрана",
        "zh-CN": "离开屏幕后显示"
    },
    "Slot": {
        "guid": "00000000B337",
        "en-US": "Slot",
        "es-ES": "Ranura",
        "es-MX": "Puesto",
        "fr-FR": "Emplacement",
        "ja-JP": "スロット",
        "pl-PL": "Miejsce",
        "pt-BR": "Espaço",
        "ru-RU": "Ячейка",
        "zh-CN": "栏位"
    },
    "Sort Order": {
        "guid": "000000011C94",
        "en-US": "Sort Order",
        "es-ES": "Orden",
        "es-MX": "Orden de vista",
        "fr-FR": "Tri",
        "it-IT": "Ordinamento",
        "ja-JP": "ソート順",
        "pl-PL": "Kolejność sortowania",
        "pt-BR": "Ordem de Classificação",
        "ru-RU": "Порядок сортировки",
        "zh-CN": "排序"
    },
    "Spectators": {
        "guid": "00000000CE58",
        "en-US": "Non-Team Spectators",
        "de-DE": "Teamlose Zuschauer",
        "es-ES": "Observadores fuera del equipo",
        "es-MX": "Espectadores que no pertenecen al equipo",
        "fr-FR": "Spectateurs neutres",
        "it-IT": "Spettatori esterni",
        "ja-JP": "非チーム視点の観戦者",
        "pl-PL": "Obserwatorzy spoza drużyny",
        "pt-BR": "Espectadores fora do time",
        "ru-RU": "Внекомандные зрители",
        "zh-CN": "无队伍观战者"
    },
    "Speed Percent": {
        "guid": "00000000B9F3",
        "en-US": "Speed Percent",
        "es-ES": "Porcentaje de velocidad",
        "es-MX": "Porcentaje de velocidad",
        "fr-FR": "Pourcentage de vitesse",
        "it-IT": "Percentuale Velocità Non Direzionale",
        "ja-JP": "速さのパーセンテージ",
        "pl-PL": "Procentowa szybkość",
        "pt-BR": "Percentual de Velocidade",
        "ru-RU": "Процент скорости",
        "zh-CN": "速度百分比"
    },
    "Speed": {
        "guid": "00000000B173",
        "en-US": "Speed",
        "es-ES": "Velocidad",
        "es-MX": "Velocidad",
        "fr-FR": "Vitesse",
        "it-IT": "Velocità Non Direzionale",
        "ja-JP": "速さ",
        "pl-PL": "Szybkość",
        "pt-BR": "Velocidade",
        "ru-RU": "Скорость",
        "zh-CN": "速度"
    },
    "Start Index": {
        "guid": "00000000B5A0",
        "en-US": "Start Index",
        "es-ES": "Índice inicial",
        "es-MX": "Comenzar índice",
        "fr-FR": "Index de début",
        "it-IT": "Indice d'Avvio",
        "ja-JP": "インデックスを開始",
        "pl-PL": "Indeks początkowy",
        "pt-BR": "Começar Índice",
        "ru-RU": "Начальный индекс",
        "zh-CN": "开始索引"
    },
    "Start Pos": {
        "guid": "00000000B1E8",
        "en-US": "Start Pos",
        "es-ES": "Pos. inicial",
        "es-MX": "Posición inicial",
        "fr-FR": "Position de début",
        "it-IT": "Posizione Iniziale",
        "ja-JP": "開始位置",
        "pl-PL": "Pozycja początkowa",
        "pt-BR": "Pos. Inicial",
        "ru-RU": "Начальная позиция",
        "zh-CN": "开始位置"
    },
    "Start Position": {
        "guid": "00000000CE82",
        "en-US": "Start Position",
        "es-ES": "Posición inicial",
        "es-MX": "Posición inicial",
        "fr-FR": "Position de début",
        "it-IT": "Posizione iniziale",
        "ja-JP": "開始位置",
        "pl-PL": "Pozycja początkowa",
        "pt-BR": "Posição Inicial",
        "ru-RU": "Начальная позиция",
        "zh-CN": "开始位置"
    },
    "Stat": {
        "guid": "00000001250A",
        "en-US": "Stat",
        "es-ES": "Estadística",
        "es-MX": "Estadísticas",
        "fr-FR": "Stats",
        "it-IT": "Statistica",
        "ja-JP": "統計",
        "pl-PL": "Statystyka",
        "pt-BR": "Estatística",
        "ru-RU": "Показатель",
        "zh-CN": "数据"
    },
    "Statistic": {
        "guid": "00000001250A",
        "en-US": "Stat",
        "es-ES": "Estadística",
        "es-MX": "Estadísticas",
        "fr-FR": "Stats",
        "it-IT": "Statistica",
        "ja-JP": "統計",
        "pl-PL": "Statystyka",
        "pt-BR": "Estatística",
        "ru-RU": "Показатель",
        "zh-CN": "数据"
    },
    "Status": {
        "guid": "00000000B587",
        "en-US": "Status",
        "es-ES": "Estado",
        "es-MX": "Estado",
        "fr-FR": "Statut",
        "it-IT": "Stato",
        "ja-JP": "ステータス",
        "ru-RU": "Статус",
        "zh-CN": "状态"
    },
    "Step": {
        "guid": "00000000FB40",
        "en-US": "Step",
        "es-ES": "Paso",
        "es-MX": "Paso",
        "fr-FR": "Étape",
        "ja-JP": "ステップ",
        "pl-PL": "Krok",
        "pt-BR": "Etapa",
        "ru-RU": "Шаг",
        "zh-CN": "步长"
    },
    "String": {
        "guid": "0000000124A4",
        "en-US": "String",
        "es-ES": "Cadena",
        "es-MX": "Cadena",
        "fr-FR": "Chaîne de texte",
        "it-IT": "Stringa",
        "ja-JP": "文字列",
        "pl-PL": "Ciąg",
        "ru-RU": "Строка",
        "zh-CN": "字符串"
    },
    "SubHeader Color": {
        "guid": "00000000C2C1",
        "en-US": "SubHeader Color",
        "es-ES": "Color del subtítulo",
        "es-MX": "Color de subtítulo",
        "fr-FR": "Couleur du sous-titre",
        "it-IT": "Colore Sottotitolo",
        "ja-JP": "サブヘッダーの色",
        "pl-PL": "Kolor podnagłówka",
        "pt-BR": "Cor do Subcabeçalho",
        "ru-RU": "Цвет подзаголовка",
        "zh-CN": "子标题颜色"
    },
    "SubHeader": {
        "guid": "00000000C202",
        "en-US": "Subheader",
        "es-ES": "Subtítulo",
        "es-MX": "Subtítulo",
        "fr-FR": "Sous-titre",
        "it-IT": "Sottotitolo",
        "ja-JP": "サブヘッダー",
        "pl-PL": "Podnagłówek",
        "pt-BR": "Subcabeçalho",
        "ru-RU": "Подзаголовок",
        "zh-CN": "子标题"
    },
    "Subroutine": {
        "guid": "00000001001F",
        "en-US": "Subroutine",
        "es-MX": "Subrutina",
        "fr-FR": "Sous-programme",
        "ja-JP": "サブルーチン",
        "pl-PL": "Podprogram",
        "pt-BR": "Sub-rotina",
        "ru-RU": "Подпрограмма",
        "zh-CN": "子程序"
    },
    "Substring Length": {
        "guid": "0000000124A2",
        "en-US": "String Length",
        "es-MX": "Longitud de la cadena",
        "fr-FR": "Longueur de la chaîne",
        "ja-JP": "文字列の長さ",
        "pt-BR": "Tamanho da String",
        "zh-CN": "字符串长度"
    },
    "Substring Start Index": {
        "guid": "0000000124A9",
        "en-US": "Start Character Index",
        "es-ES": "Índice de caracteres inicial",
        "es-MX": "Comenzar índice de caracteres",
        "fr-FR": "Index du caractère de début",
        "it-IT": "Indice Carattere d'Avvio",
        "ja-JP": "開始文字インデックス",
        "pl-PL": "Indeks postaci startowej",
        "pt-BR": "Índice do Caractere Inicial",
        "ru-RU": "Индекс первого символа",
        "zh-CN": "开始字符索引"
    },
    "Substring": {
        "guid": "0000000124A4",
        "en-US": "String",
        "es-ES": "Cadena",
        "es-MX": "Cadena",
        "fr-FR": "Chaîne de texte",
        "it-IT": "Stringa",
        "ja-JP": "文字列",
        "pl-PL": "Ciąg",
        "ru-RU": "Строка",
        "zh-CN": "字符串"
    },
    "Target": {
        "guid": "000000007801",
        "en-US": "Target",
        "es-ES": "Objetivo",
        "es-MX": "Objetivo",
        "fr-FR": "Cible",
        "it-IT": "Bersaglio",
        "ja-JP": "ターゲット",
        "pl-PL": "Cel",
        "pt-BR": "Alvo",
        "ru-RU": "Цель",
        "zh-CN": "目标"
    },
    "Targets": {
        "guid": "000000012204",
        "en-US": "Targets",
        "es-ES": "Objetivos",
        "es-MX": "Objetivos",
        "fr-FR": "Cibles",
        "it-IT": "Bersagli",
        "ja-JP": "ターゲット（複数）",
        "pl-PL": "Cele",
        "pt-BR": "Alvos",
        "ru-RU": "Цели",
        "zh-CN": "目标"
    },
    "Team": {
        "guid": "00000000B238",
        "en-US": "Team",
        "es-ES": "Equipo",
        "es-MX": "Equipo",
        "fr-FR": "Équipe",
        "it-IT": "Squadra",
        "ja-JP": "チーム",
        "pl-PL": "Drużyna",
        "pt-BR": "Equipe",
        "ru-RU": "Команда",
        "zh-CN": "队伍"
    },
    "Text Color": {
        "guid": "00000000C2C3",
        "en-US": "Text Color",
        "es-ES": "Color del texto",
        "es-MX": "Color de texto",
        "fr-FR": "Couleur du texte",
        "it-IT": "Colore Testo",
        "ja-JP": "テキストの色",
        "pl-PL": "Kolor tekstu",
        "pt-BR": "Cor do Texto",
        "ru-RU": "Цвет текста",
        "zh-CN": "文本颜色"
    },
    "Text ID": {
        "guid": "00000000BD4C",
        "en-US": "Text ID",
        "es-ES": "Id de texto",
        "es-MX": "ID de texto",
        "fr-FR": "Identifiant de texte",
        "it-IT": "ID Testo",
        "ja-JP": "テキストID",
        "pl-PL": "Identyfikator tekstu",
        "pt-BR": "ID de Texto",
        "ru-RU": "ID текста",
        "zh-CN": "文本ID"
    },
    "Text": {
        "guid": "00000001244A",
        "en-US": "Text",
        "es-ES": "Texto",
        "es-MX": "Texto",
        "fr-FR": "Texte",
        "it-IT": "Testo",
        "ja-JP": "テキスト",
        "pl-PL": "Tekst",
        "pt-BR": "Texto",
        "ru-RU": "Текст",
        "zh-CN": "文本"
    },
    "Then": {
        "guid": "000000010BCB",
        "en-US": "Then",
        "fr-FR": "Alors",
        "ja-JP": "THEN",
        "pl-PL": "Wtedy",
        "ru-RU": "То"
    },
    "Time": {
        "guid": "00000000B19B",
        "en-US": "Time",
        "es-ES": "Tiempo",
        "es-MX": "Tiempo",
        "fr-FR": "Temps",
        "it-IT": "Tempo",
        "ja-JP": "時間",
        "pl-PL": "Czas",
        "pt-BR": "Tempo",
        "ru-RU": "Время",
        "zh-CN": "时间"
    },
    "Timeout": {
        "guid": "0000000121CB",
        "en-US": "Timeout",
        "es-ES": "Tiempo de espera",
        "es-MX": "Tiempo de espera",
        "fr-FR": "Délai d’attente",
        "it-IT": "Scadenza",
        "ja-JP": "タイムアウト",
        "pl-PL": "Przekroczony czas oczekiwania",
        "pt-BR": "Tempo Limite",
        "ru-RU": "Время ожидания",
        "zh-CN": "超时"
    },
    "Transformation": {
        "guid": "00000000B341",
        "en-US": "Transformation",
        "es-ES": "Transformación",
        "es-MX": "Transformación",
        "it-IT": "Trasformazione",
        "ja-JP": "変化",
        "pl-PL": "Transformacja",
        "pt-BR": "Transformação",
        "ru-RU": "Трансформация",
        "zh-CN": "转换"
    },
    "Turn Rate": {
        "guid": "00000000BB1E",
        "en-US": "Turn Rate",
        "es-ES": "Frecuencia de giro",
        "es-MX": "Velocidad de giro",
        "fr-FR": "Taux de rotation",
        "it-IT": "Frequenza Rotazione",
        "ja-JP": "回転レート",
        "pl-PL": "Tempo obrotu",
        "pt-BR": "Taxa de Giro",
        "ru-RU": "Скорость поворота",
        "zh-CN": "角速率"
    },
    "Turn Speed Percent": {
        "guid": "00000000C367",
        "en-US": "Turn Speed Percent",
        "es-ES": "Porcentaje de velocidad de giro",
        "es-MX": "Porcentaje de velocidad de giro",
        "fr-FR": "Pourcentage de vitesse de rotation",
        "it-IT": "Percentuale Velocità di Rotazione",
        "ja-JP": "回転速度のパーセンテージ",
        "pl-PL": "Procentowa szybkość obrotu",
        "pt-BR": "Percentual da Velocidade de Giro",
        "ru-RU": "Процент скорости повторота",
        "zh-CN": "转向速度百分比"
    },
    "Type": {
        "guid": "00000000B8B0",
        "en-US": "Type",
        "es-ES": "Tipo",
        "es-MX": "Tipo",
        "it-IT": "Tipo",
        "ja-JP": "タイプ",
        "pl-PL": "Typ",
        "pt-BR": "Tipo",
        "ru-RU": "Тип",
        "zh-CN": "类型"
    },
    "Value Rank": {
        "guid": "00000000B5BF",
        "en-US": "Value Rank",
        "es-ES": "Rango de valor",
        "es-MX": "Clasificación de valores",
        "fr-FR": "Rang de la valeur",
        "it-IT": "Grado Valore",
        "ja-JP": "値のランク",
        "pl-PL": "Wartość rangi",
        "pt-BR": "Ranque de Valor",
        "ru-RU": "Ранг значения",
        "zh-CN": "数值排序"
    },
    "Value": {
        "guid": "00000000C335",
        "en-US": "Value",
        "es-ES": "Valor",
        "es-MX": "Valor",
        "fr-FR": "Valeur",
        "it-IT": "Valore",
        "ja-JP": "値",
        "pl-PL": "Wartość",
        "pt-BR": "Valor",
        "ru-RU": "Значение",
        "zh-CN": "值"
    },
    "Variable": {
        "guid": "00000000B228",
        "en-US": "Variable",
        "it-IT": "Variabile",
        "ja-JP": "記号",
        "pl-PL": "Zmienna",
        "pt-BR": "Variável",
        "ru-RU": "Переменная",
        "zh-CN": "变量"
    },
    "Vector": {
        "guid": "00000000C815",
        "en-US": "Vector",
        "fr-FR": "Vecteur",
        "it-IT": "Vettore",
        "ja-JP": "ベクトル",
        "pt-BR": "Vetor",
        "ru-RU": "Вектор",
        "zh-CN": "矢量"
    },
    "Vertical Angle": {
        "guid": "00000000BB2F",
        "en-US": "Vertical Angle",
        "es-ES": "Ángulo vertical",
        "es-MX": "Ángulo vertical",
        "fr-FR": "Angle vertical",
        "it-IT": "Angolo Verticale",
        "ja-JP": "頂角",
        "pl-PL": "Kąt pionowy",
        "pt-BR": "Ângulo Vertical",
        "ru-RU": "Вертикальный угол",
        "zh-CN": "垂直角度"
    },
    "View Angle": {
        "guid": "00000000BF80",
        "en-US": "View Angle",
        "es-ES": "Ángulo de visión",
        "es-MX": "Ángulo de vista",
        "fr-FR": "Champ de vision",
        "it-IT": "Angolo di Visuale",
        "ja-JP": "視角範囲",
        "pl-PL": "Kąt widzenia",
        "pt-BR": "Ângulo de Visão",
        "ru-RU": "Угол обзора",
        "zh-CN": "视角"
    },
    "Viewed Players": {
        "guid": "00000001125D",
        "en-US": "Viewed Players",
        "es-ES": "Jugadores observados",
        "es-MX": "Jugadores observados",
        "fr-FR": "Joueurs observés",
        "it-IT": "Giocatori Osservati",
        "ja-JP": "表示対象プレイヤー",
        "pl-PL": "Obserwowani gracze",
        "pt-BR": "Jogadores Observados",
        "ru-RU": "Наблюдаемые игроки",
        "zh-CN": "被观察的玩家"
    },
    "Viewing Players": {
        "guid": "00000001125A",
        "en-US": "Viewing Players",
        "es-ES": "Jugadores observadores",
        "es-MX": "Jugadores que observan",
        "fr-FR": "Joueurs spectateurs",
        "it-IT": "Giocatori Osservatori",
        "ja-JP": "表示側プレイヤー",
        "pl-PL": "Obserwujący gracze",
        "pt-BR": "Jogadores Observadores",
        "ru-RU": "Наблюдающие игроки",
        "zh-CN": "观察玩家"
    },
    "Visibility": {
        "guid": "00000000B8C4",
        "en-US": "Visible To",
        "es-MX": "Visible para",
        "fr-FR": "Visible pour",
        "ja-JP": "目視可能: ",
        "pt-BR": "Visível para",
        "zh-CN": "可见"
    },
    "Visible To": {
        "guid": "00000000B8C4",
        "en-US": "Visible To",
        "es-MX": "Visible para",
        "fr-FR": "Visible pour",
        "ja-JP": "目視可能: ",
        "pt-BR": "Visível para",
        "zh-CN": "可见"
    },
    "Visible": {
        "guid": "000000011301",
        "en-US": "Visible",
        "it-IT": "Visibile",
        "ja-JP": "表示",
        "pl-PL": "Widoczne",
        "pt-BR": "Visível",
        "ru-RU": "Видимость",
        "zh-CN": "可见"
    },
    "Wait Behavior": {
        "guid": "00000000B22F",
        "en-US": "Wait Behavior",
        "es-ES": "Comportamiento en espera",
        "es-MX": "Comportamiento de espera",
        "fr-FR": "Comportement d’attente",
        "it-IT": "Comportamento di Attesa",
        "ja-JP": "待機動作",
        "pl-PL": "Oczekiwanie",
        "pt-BR": "Comportamento de espera",
        "ru-RU": "Поведение при ожидании",
        "zh-CN": "等待行为"
    },
    "Weapon": {
        "guid": "000000011059",
        "en-US": "Weapon",
        "es-MX": "Arma",
        "fr-FR": "Arme",
        "ja-JP": "武器",
        "pt-BR": "Arma",
        "zh-CN": "武器"
    },
    "World Vector": {
        "guid": "00000000B343",
        "en-US": "World Vector",
        "es-ES": "Vector del mundo",
        "es-MX": "Vector global",
        "fr-FR": "Vecteur mondial",
        "it-IT": "Vettore Globale",
        "ja-JP": "ワールドのベクトル",
        "pl-PL": "Wektor świata",
        "pt-BR": "Vetor do Mundo",
        "ru-RU": "Вектор в игровом мире",
        "zh-CN": "地图矢量"
    },
    "X Axis Scalar": {
        "guid": "00000000CC2D",
        "en-US": "X Axis Scalar",
        "es-ES": "Escala del eje X",
        "es-MX": "Escala de eje X",
        "fr-FR": "Scalaire axe X",
        "it-IT": "Scalare Asse X",
        "ja-JP": "X軸スカラー",
        "pl-PL": "Skalar osi Y",
        "pt-BR": "Escalar do Eixo X",
        "ru-RU": "Значение по оси X",
        "zh-CN": "X轴缩放"
    },
    "X": {
        "guid": "00000000B2CB",
        "en-US": "X"
    },
    "Y Axis Scalar": {
        "guid": "00000000CC2E",
        "en-US": "Y Axis Scalar",
        "es-ES": "Escala del eje Y",
        "es-MX": "Escala de eje Y",
        "fr-FR": "Scalaire axe Y",
        "it-IT": "Scalare Asse Y",
        "ja-JP": "Y軸スカラー",
        "pl-PL": "Skalar osi Y",
        "pt-BR": "Escalar do Eixo Y",
        "ru-RU": "Значение по оси Y",
        "zh-CN": "Y轴缩放"
    },
    "Y": {
        "guid": "00000000B2CC",
        "en-US": "Y"
    },
    "Z": {
        "guid": "00000000B2CD",
        "en-US": "Z"
    }
}

for (var key in argNamesKw) {
    argNamesKw[key.toLowerCase()] = argNamesKw[key];
}


var languages = ["en-US", "de-DE", "es-ES", "es-MX", "fr-FR", "it-IT", "ja-JP", "ko-KR", "pl-PL", "pt-BR", "ru-RU", "zh-CN", "zh-TW"]
var docFolder = "./src/data/"
var docFiles = ["actions.js", "constants.js", "keywords.js", "stringKw.js", "values.js"]

var datatoolPath = "C:\\Users\\Zezombye\\Downloads\\toolchain-release\\DataTool.exe"
var overwatchPath = "C:\\Program Files\\Overwatch"
var outputFolder = "strings"
var guids = {};
var removeParentheses = true;

async function generateStringFiles() {
    const { execSync } = require('child_process');
    for (var language of languages) {
        var command = "\""+datatoolPath+"\" \""+overwatchPath+"\" Dump-strings -L="+language.replace("-", "")+" -T="+language.replace("-", "")+" > "+outputFolder+"/strings-"+language+".txt";
        console.log("Executing command for language "+language);
        console.log(command);
        execSync(command, (err, stdout, stderr) => {
            if (err) {
                // node couldn't execute the command
                console.log("Could not execute command")
                return;
            }
        });
        sleep(5000)
        
    }
}

function getGuids() {
    for (var language of languages) {
        var content = ""+fs.readFileSync(outputFolder+"/strings-"+language+".txt");
        guids[language] = [];
        content = content.replace(/\r\n/g, "\n");
        for (var line of content.split("\n")) {
            //console.log(line);
            if (/^[\dA-F]{12}\.07C: /.test(line)) {
                var guid = line.substring(0, line.indexOf("."));
                var string = line.substring(line.indexOf(":")+2);
                guids[language].push({
                    guid: guid,
                    string: string,
                });
            }
        }
    }
    //console.log(guids["en-US"]);
}

function replaceJsonObjectsInFile(path) {
    console.log("Processing "+path)
    var content = ""+fs.readFileSync(path);
    var result = "";
    var currentJsonStr = "";
    var isInJsonObject = false;
    for (var line of content.split("\n")) {
        if (line === "//end-json") {
            isInJsonObject = false;
            tmpObj = iterateOnObject(eval("("+currentJsonStr+")"))
            result += JSON.stringify(tmpObj, null, 4)+"\n";
            currentJsonStr = "";
        }
        if (!isInJsonObject) {
            result += line+"\n";
        } else {
            currentJsonStr += line+"\n";
        }
        if (line === "//begin-json") {
            isInJsonObject = true;
        }
    }
    fs.writeFileSync(path, result.substring(0, result.length-1));
}

function iterateOnObject(content) {
    if (content.onlyInOw1) {
        return content;
    }
    if ("guid" in content || "en-US" in content) {
        content = addTranslations(content);
    }

    if ("name" in content) {
        content["nameLocalized"] = {guid: argNamesKw[content["name"].toLowerCase()].guid};
    }

    for (var key of Object.keys(content)) {
        if (typeof content[key] === "object" && content[key] !== null) {
            //Skip the comparison operators as they must not be translated.
            if (key !== "__Operator__" && key !== "descriptionLocalized") {
                if (key === "nameLocalized") {
                    oldRemoveParentheses = removeParentheses;
                    removeParentheses = false;
                }
                content[key] = iterateOnObject(content[key]);
                if (key === "nameLocalized") {
                    removeParentheses = oldRemoveParentheses;
                }
            }
        }
    }
    
    return content;
}

function addTranslations(content) {
    //Find the guid, if it isn't already added
    if (content.guid === "<unknown guid>") return;
    if (!("guid" in content)) {
        var matchingGuids = [];
        for (var elem of guids["en-US"]) {
            if (elem.string === content["en-US"]) {
                matchingGuids.push(elem.guid);
            }
        }
        if (matchingGuids.length === 0) {
            throw new Error("No guid found for string '"+content["en-US"]+"'");
        } else if (matchingGuids.length > 1) {
            throw new Error("Multiple guids found for string '"+content["en-US"]+"': "+JSON.stringify(matchingGuids));
        }
        content.guid = matchingGuids[0];
    }
    for (var language of languages) {
        var isGuidFound = false;
        delete content[language];
        for (var elem of guids[language]) {
            if (elem.guid === content.guid) {
                elem.string = elem.string.replace(/%%/g, "%");
                if (removeParentheses) {
                    elem.string = elem.string.replace(/[,\(\)\/]/g,"")
                }
                        
                if (elem.string !== content["en-US"]) {
                    content[language] = elem.string;
                }
                isGuidFound = true;
                break;
            }
        }
        if (!isGuidFound) {
            throw new Error("Did not find the guid '"+content.guid+"' for language '"+language+"'");
        }
    }
    return content;
}

function normalizeName(content) {
    content = content.replace(/(?<=[a-z])(?=[A-Z0-9])/g, " ");
    content = content.replace("-", " - ");
    content = content.replace(":", ": ");
    content = content.replace(/\s+/g, " ");
    var words = content.split(" ");
    words = words.map(x => x[0].toUpperCase()+x.substring(1).toLowerCase()).join(" ");
    console.log(words);
    content = words;
    return content;
}



/*generateStringFiles();*/
getGuids();
replaceJsonObjectsInFile(docFolder+"actions.js");
replaceJsonObjectsInFile(docFolder+"values.js");
//replaceJsonObjectsInFile(docFolder+"constants.js");
//replaceJsonObjectsInFile(docFolder+"heroes.js");
//replaceJsonObjectsInFile(docFolder+"maps.js");
//replaceJsonObjectsInFile(docFolder+"gamemodes.js");
//replaceJsonObjectsInFile(docFolder+"customGameSettings.js");
removeParentheses = false;
//replaceJsonObjectsInFile(docFolder+"ui.js");
//replaceJsonObjectsInFile(docFolder+"argnames.js");
//replaceJsonObjectsInFile(docFolder+"localizedStrings.js");
//replaceJsonObjectsInFile(docFolder+"other.js");

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}