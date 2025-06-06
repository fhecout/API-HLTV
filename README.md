# HLTV API

API REST para obter dados de partidas, resultados, ranking de times e transferências do site HLTV.org usando Node.js, Express e Puppeteer.

## 📋 Funcionalidades
- **/matches**: Lista as próximas partidas
- **/matches/date**: Lista partidas de uma data específica
- **/results**: Lista os últimos resultados de partidas
- **/ranking**: Ranking atual dos times
- **/transfers**: Lista as últimas transferências de jogadores

## 🚀 Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd <nome-da-pasta>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   node app.js
   ```

A API estará disponível em `http://localhost:3000`

## 📡 Endpoints

### 1. Próximas Partidas
```http
GET /matches
```
Retorna todas as próximas partidas agendadas.

**Exemplo de Resposta:**
```json
[
  {
    "team1": "Team Spirit",
    "team2": "Natus Vincere",
    "time": "2024-03-20T15:00:00Z",
    "event": "ESL Pro League Season 19",
    "link": "https://www.hltv.org/matches/..."
  }
]
```

### 2. Partidas por Data
```http
GET /matches/date?date=YYYY-MM-DD
```
Retorna partidas de uma data específica.

**Parâmetros:**
- `date` (obrigatório): Data no formato YYYY-MM-DD

**Exemplo de Uso:**
```bash
curl "http://localhost:3000/matches/date?date=2024-03-20"
```

**Exemplo de Resposta:**
```json
[
  {
    "team1": "FaZe Clan",
    "team2": "G2 Esports",
    "time": "2024-03-20T15:00:00Z",
    "event": "ESL Pro League Season 19",
    "link": "https://www.hltv.org/matches/..."
  }
]
```

### 3. Resultados Recentes
```http
GET /results
```
Retorna os últimos resultados de partidas.

**Exemplo de Resposta:**
```json
[
  {
    "team1": {
      "name": "Team Spirit",
      "score": 2
    },
    "team2": {
      "name": "Natus Vincere",
      "score": 0
    },
    "event": "ESL Pro League Season 19",
    "link": "https://www.hltv.org/matches/..."
  }
]
```

### 4. Ranking de Times
```http
GET /ranking
```
Retorna o ranking atual dos times.

**Exemplo de Resposta:**
```json
[
  {
    "position": 1,
    "name": "Team Spirit",
    "logo": "https://img-cdn.hltv.org/teamlogo/xxxx.png",
    "points": 1000,
    "country": "Russia"
  },
  {
    "position": 2,
    "name": "FaZe Clan",
    "logo": "https://img-cdn.hltv.org/teamlogo/yyyy.png",
    "points": 950,
    "country": "International"
  }
]
```

### 5. Transferências
```http
GET /transfers
```
Retorna as últimas transferências de jogadores.

**Parâmetros Opcionais:**
- `ranking` (opcional): Filtrar por ranking específico

**Exemplo de Uso:**
```bash
curl "http://localhost:3000/transfers?ranking=top20"
```

**Exemplo de Resposta:**
```json
[
  {
    "player": "donk",
    "from": "Team Spirit",
    "to": "Natus Vincere",
    "date": "2024-03-15",
    "link": "https://www.hltv.org/transfers/..."
  }
]
```

## ⚠️ Dicas e Observações

1. **Proteção contra Bloqueio:**
   - O HLTV pode bloquear scrapers
   - Se receber erro 403, rode o Puppeteer em modo visível:
   ```javascript
   // Em qualquer arquivo scraper
   const browser = await puppeteer.launch({ headless: false });
   ```

2. **Performance:**
   - O scraping pode demorar 3-5 segundos por requisição
   - Considere implementar cache para endpoints populares

3. **Limitações:**
   - Não abuse das requisições (máximo 1 por segundo)
   - Evite múltiplas requisições simultâneas

## 🛠️ Requisitos
- Node.js 18+
- npm
- Conexão estável com a internet

## 📁 Estrutura de Pastas
```
├── app.js
├── scraping/
│   ├── matchesScraper.js
│   ├── resultsScraper.js
│   ├── rankingScraper.js
│   └── transfScraper.js
├── package.json
└── README.md
```

## 🔧 Troubleshooting

1. **Erro 403 Forbidden:**
   - Verifique se o HLTV não bloqueou seu IP
   - Tente usar um proxy
   - Rode em modo visível para resolver captchas

2. **Erro 500 Internal Server Error:**
   - Verifique a conexão com a internet
   - Confirme se o HLTV está online
   - Verifique os logs do servidor

3. **Dados não atualizados:**
   - O HLTV pode ter mudado sua estrutura HTML
   - Atualize os seletores nos arquivos scraper

## 📝 Licença
MIT 

## ⚡ Performance e Limitações

### Rate Limiting
A API implementa rate limiting para proteger contra abusos:
- Máximo de 60 requisições por minuto
- Bloqueio temporário após exceder o limite
- Headers de resposta incluem informações sobre limites:
  ```
  X-RateLimit-Limit: 60
  X-RateLimit-Remaining: 59
  X-RateLimit-Reset: 1617235200
  ```

### Cache
Para melhorar a performance, a API implementa cache:
- Cache de 5 minutos para endpoints populares
- Headers de cache incluídos nas respostas:
  ```
  Cache-Control: public, max-age=300
  ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
  ```

## 📚 Exemplos de Uso

### JavaScript (Fetch)
```javascript
// Buscar próximas partidas
const response = await fetch('http://localhost:3000/matches');
const matches = await response.json();

// Buscar partidas por data
const date = '2024-03-20';
const response = await fetch(`http://localhost:3000/matches/date?date=${date}`);
const matches = await response.json();
```

### Python (Requests)
```python
import requests

# Buscar ranking
response = requests.get('http://localhost:3000/ranking')
ranking = response.json()

# Buscar transferências
params = {'ranking': 'top20'}
response = requests.get('http://localhost:3000/transfers', params=params)
transfers = response.json()
```

### PHP (cURL)
```php
<?php
// Buscar resultados
$ch = curl_init('http://localhost:3000/results');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$results = json_decode(curl_exec($ch), true);
curl_close($ch);
``` 