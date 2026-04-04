export type ChallengeType = "architecture" | "debug" | "complexity" | "tradeoff";
export type Difficulty = "easy" | "medium" | "hard";

export interface ChallengeData {
  id: string;
  type: ChallengeType;
  difficulty: Difficulty;
  question: string;
  context?: string;
  options: string[];
  correctAnswer: number; // index in options
  explanation: string;
  relatedSlug?: string;
  order: number;
}

export const CHALLENGES: ChallengeData[] = [
  // ─── ARCHITECTURE ────────────────────────────────────────────────────────
  {
    id: "arch-001",
    type: "architecture",
    difficulty: "medium",
    order: 1,
    question: "Um sistema de e-commerce precisa processar 50.000 pedidos/min sem perder nenhum. Qual padrão resolve melhor o pico de carga?",
    context: "Black Friday: o tráfego sobe 20x em segundos. O banco de dados não aguenta chamadas síncronas diretas.",
    options: [
      "Escalar horizontalmente a API e chamar o banco direto",
      "Usar uma fila de mensagens (Kafka/SQS) para bufferizar os pedidos",
      "Adicionar cache Redis na frente do banco",
      "Usar um CDN para reduzir as requisições",
    ],
    correctAnswer: 1,
    explanation:
      "Uma fila de mensagens desacopla o recebimento dos pedidos do processamento. A API escreve na fila (rápido, tolerante a pico) e os consumers processam no ritmo que o banco suporta — sem perda de dados. Cache e escalamento horizontal não resolvem o gargalo de escrita no banco.",
    relatedSlug: "event-driven-pipeline",
  },
  {
    id: "arch-002",
    type: "architecture",
    difficulty: "hard",
    order: 2,
    question: "Você precisa sincronizar dados entre 3 microsserviços sem acoplamento direto. Qual abordagem garante consistência eventual com menor risco de falha?",
    context: "Serviços: Orders, Inventory, Notifications. Cada um tem seu próprio banco. Transações distribuídas (2PC) foram descartadas por alta latência.",
    options: [
      "REST síncrono: Orders chama Inventory e Notifications diretamente",
      "Saga Choreography: cada serviço publica eventos que os outros consomem",
      "Saga Orchestration: um serviço coordenador chama os outros em sequência",
      "Banco de dados compartilhado entre os três serviços",
    ],
    correctAnswer: 1,
    explanation:
      "Saga Choreography usa eventos para coordenar sem um ponto central de falha. Cada serviço reage a eventos dos outros, garantindo consistência eventual. REST síncrono cria acoplamento e cascata de falhas. Banco compartilhado quebra o isolamento de microsserviços.",
    relatedSlug: "event-driven-pipeline",
  },
  {
    id: "arch-003",
    type: "architecture",
    difficulty: "easy",
    order: 3,
    question: "Uma API recebe imagens para processar com OCR. O processamento leva ~30 segundos. Como estruturar a resposta ao cliente?",
    context: "O cliente faz upload via HTTP. Bloquear a conexão por 30s causaria timeouts e má experiência.",
    options: [
      "Aumentar o timeout do servidor para 60 segundos",
      "Retornar 202 Accepted imediatamente + processar async + webhook/polling para resultado",
      "Processar em background thread e manter a conexão aberta com long-polling",
      "Dividir a imagem em partes menores para processar mais rápido",
    ],
    correctAnswer: 1,
    explanation:
      "O padrão async com 202 Accepted é a abordagem correta: responde imediatamente com um job_id, processa em background, e o cliente pode fazer polling em GET /jobs/{id} ou receber um webhook quando pronto. Manter conexões abertas por 30s é ineficiente e não escala.",
    relatedSlug: "ocr-automation",
  },
  {
    id: "arch-004",
    type: "architecture",
    difficulty: "hard",
    order: 4,
    question: "Sistema com milhões de usuários precisa de um feed de atividades em tempo real (tipo Twitter/LinkedIn). Qual estratégia de entrega do feed escala melhor?",
    context: "Usuários populares têm 1M+ seguidores. Usuários comuns têm ~200. Latência alvo: < 100ms para leitura.",
    options: [
      "Pull on Read: montar o feed na hora da leitura consultando posts de todos os seguidos",
      "Push on Write (Fan-out): ao postar, escrever no feed de cada seguidor imediatamente",
      "Híbrido: fan-out para usuários comuns + pull on read para seguir celebridades",
      "Cache global de todos os posts ordenados por timestamp",
    ],
    correctAnswer: 2,
    explanation:
      "A abordagem híbrida é usada por Twitter/LinkedIn. Fan-out funciona para usuários comuns (poucos seguidores). Para celebridades, fan-out de 1M escritas por post é inviável — então o feed é montado na leitura mesclando cache do usuário + posts recentes das celebridades seguidas.",
    relatedSlug: "system-design-url-shortener",
  },

  // ─── DEBUG ────────────────────────────────────────────────────────────────
  {
    id: "debug-001",
    type: "debug",
    difficulty: "medium",
    order: 5,
    question: "Qual é o problema neste log de aplicação Spring Boot?",
    context:
      "```\nERROR c.s.service.OrderService - Failed to process order\norg.springframework.dao.CannotAcquireLockException: \n  could not obtain lock on row in relation 'orders'\nCaused by: ERROR: deadlock detected\n  Detail: Process 47 waits for ShareLock on transaction 891;\n          blocked by process 52.\n          Process 52 waits for ShareLock on transaction 890;\n          blocked by process 47.\n```",
    options: [
      "Timeout de conexão com o banco de dados",
      "Deadlock: duas transações aguardando recursos que a outra segura",
      "Falta de índice na tabela orders causando full table scan",
      "Connection pool esgotado — sem conexões disponíveis",
    ],
    correctAnswer: 1,
    explanation:
      "O stack trace é explícito: 'deadlock detected'. Processo 47 espera pelo processo 52, que espera pelo processo 47 — ciclo de espera. A solução típica é garantir ordem consistente de lock entre transações, ou usar SELECT FOR UPDATE SKIP LOCKED para filas de processamento.",
  },
  {
    id: "debug-002",
    type: "debug",
    difficulty: "easy",
    order: 6,
    question: "O que este log indica sobre a saúde do sistema?",
    context:
      "```\nWARN  c.s.config.HikariPool - HikariPool-1 - Connection is not available,\n      request timed out after 30000ms.\nERROR c.s.api.UserController - DataAccessException: Unable to acquire JDBC Connection\nINFO  c.s.api.UserController - GET /api/users - 503 (12847ms)\n```",
    options: [
      "O banco de dados está fora do ar",
      "Connection pool esgotado — mais requisições do que conexões disponíveis",
      "Timeout de query SQL muito longo",
      "Problema de autenticação com o banco de dados",
    ],
    correctAnswer: 1,
    explanation:
      "HikariPool é o connection pool padrão do Spring Boot. 'Connection is not available, request timed out' significa que todas as conexões do pool estavam ocupadas por 30s. Pode indicar: leak de conexão (transações não fechadas), N+1 queries, ou simplesmente undersized pool para o volume de tráfego.",
  },
  {
    id: "debug-003",
    type: "debug",
    difficulty: "hard",
    order: 7,
    question: "Qual é a causa raiz deste comportamento em produção?",
    context:
      "Sistema funciona perfeitamente em dev/staging. Em produção:\n```\nINFO  Processando lote de 10.000 registros...\nINFO  Progresso: 1000/10000\nINFO  Progresso: 2000/10000\nINFO  Progresso: 3000/10000\n[... processamento cada vez mais lento ...]\nINFO  Progresso: 4000/10000  (15min elapsed)\nOOM: Java heap space\njava.lang.OutOfMemoryError: Java heap space\n```\nEm dev funciona com 1.000 registros.",
    options: [
      "Bug no algoritmo de processamento que cria loops infinitos",
      "Memory leak: objetos acumulados em memória sem serem coletados pelo GC (ex: lista crescendo em loop)",
      "Heap muito pequeno em produção — só precisa aumentar -Xmx",
      "Thread leak causando uso excessivo de memória de stack",
    ],
    correctAnswer: 1,
    explanation:
      "O padrão clássico de memory leak: funciona para volumes pequenos, mas em produção com 10k registros, alguma coleção está acumulando todos os objetos ao invés de processar em streaming/batches. A solução não é aumentar heap — é processar em chunks (ex: JPA pagination com Slice/Page) e não manter todos os objetos na memória simultaneamente.",
  },

  // ─── COMPLEXITY ──────────────────────────────────────────────────────────
  {
    id: "complexity-001",
    type: "complexity",
    difficulty: "easy",
    order: 8,
    question: "Qual é a complexidade de tempo deste algoritmo?",
    context:
      "```java\npublic boolean hasDuplicate(List<Integer> nums) {\n    Set<Integer> seen = new HashSet<>();\n    for (int n : nums) {\n        if (seen.contains(n)) return true;\n        seen.add(n);\n    }\n    return false;\n}\n```",
    options: ["O(n²)", "O(n log n)", "O(n)", "O(1)"],
    correctAnswer: 2,
    explanation:
      "O(n) — um único loop sobre n elementos. HashSet.contains() e add() são O(1) amortizado. A versão O(n²) seria comparar cada elemento com todos os outros sem o Set.",
  },
  {
    id: "complexity-002",
    type: "complexity",
    difficulty: "medium",
    order: 9,
    question: "Um código faz busca em banco de dados dentro de um loop. Qual é o problema e a complexidade resultante?",
    context:
      "```java\n// Carregar pedidos e para cada um buscar o cliente\nList<Order> orders = orderRepo.findAll(); // 1 query, retorna N pedidos\nfor (Order order : orders) {\n    Customer c = customerRepo.findById(order.getCustomerId()); // N queries\n    order.setCustomerName(c.getName());\n}\n```",
    options: [
      "O(1) — banco de dados indexado responde em tempo constante",
      "O(n) — apenas um loop",
      "O(n) queries ao banco — problema N+1, deve usar JOIN ou batch load",
      "O(n²) — dois loops aninhados",
    ],
    correctAnswer: 2,
    explanation:
      "Este é o clássico problema N+1: 1 query para buscar N pedidos + N queries para buscar os clientes = N+1 queries ao banco. Solução em JPA: usar @EntityGraph, JOIN FETCH, ou carregar todos os customers com findAllById(ids) antes do loop.",
  },
  {
    id: "complexity-003",
    type: "complexity",
    difficulty: "hard",
    order: 10,
    question: "Qual estrutura de dados tem a melhor complexidade para implementar um sistema de cache LRU (Least Recently Used)?",
    context:
      "Requisitos: get(key) O(1), put(key, value) O(1), quando cheio deve remover o item menos recentemente usado em O(1).",
    options: [
      "Array ordenado por tempo de acesso",
      "HashMap apenas",
      "HashMap + Doubly Linked List",
      "TreeMap (Red-Black Tree)",
    ],
    correctAnswer: 2,
    explanation:
      "HashMap + Doubly Linked List é a combinação clássica para LRU O(1): o HashMap permite get/put O(1), a Doubly Linked List mantém a ordem de acesso (mais recente na frente, menos recente no final) e permite remoção O(1) de qualquer nó. Array seria O(n) para reordenar. TreeMap seria O(log n).",
  },

  // ─── TRADEOFFS ────────────────────────────────────────────────────────────
  {
    id: "tradeoff-001",
    type: "tradeoff",
    difficulty: "medium",
    order: 11,
    question: "Pelo teorema CAP, em caso de partição de rede, qual sistema prioriza o quê?",
    context:
      "Um banco de dados distribuído perde conectividade entre seus nós (partição de rede). O sistema deve escolher entre continuar respondendo ou garantir dados consistentes.",
    options: [
      "CP: prioriza Consistência — nega requests para não retornar dados desatualizados",
      "AP: prioriza Disponibilidade — responde com dados possivelmente desatualizados",
      "Ambos AP e CP ao mesmo tempo — é tecnicamente possível",
      "Aguarda a rede se recuperar antes de decidir",
    ],
    correctAnswer: 0,
    explanation:
      "O CAP Theorem diz que você só pode ter 2 das 3 propriedades. Durante partição, você DEVE escolher: CP (ex: HBase, ZooKeeper) recusa requests para garantir que dados não fiquem inconsistentes. AP (ex: Cassandra, DynamoDB) continua respondendo e resolve conflitos depois (eventual consistency).",
  },
  {
    id: "tradeoff-002",
    type: "tradeoff",
    difficulty: "easy",
    order: 12,
    question: "Para um sistema de relatórios analíticos (leitura pesada, dados históricos), qual banco de dados é mais adequado?",
    context:
      "Requisitos: queries complexas com agregações em bilhões de linhas, dados escritos em batch diário, latência de escrita não é crítica, mas leitura deve ser < 5s.",
    options: [
      "PostgreSQL com índices otimizados",
      "MongoDB (document store)",
      "Redis (in-memory)",
      "Apache Cassandra ou ClickHouse (columnar store)",
    ],
    correctAnswer: 3,
    explanation:
      "Banco de dados colunar (Cassandra para distribuído, ClickHouse para analytics) armazena dados por coluna, não por linha. Para queries de agregação (SUM, COUNT, AVG em colunas específicas), lê somente as colunas necessárias — dramaticamente mais eficiente. PostgreSQL pode funcionar mas não escala para bilhões de linhas da mesma forma.",
  },
  {
    id: "tradeoff-003",
    type: "tradeoff",
    difficulty: "hard",
    order: 13,
    question: "Para um sistema financeiro de transferências entre contas, qual estratégia de consistência você escolheria?",
    context:
      "Transferência = debitar conta A + creditar conta B. Ambas operações devem acontecer ou nenhuma. Sistema distribuído com banco separado por microserviço.",
    options: [
      "Eventual consistency — aceitar que os saldos fiquem temporariamente errados",
      "Two-Phase Commit (2PC) — lock distribuído garantindo atomicidade",
      "Saga pattern com compensating transactions — rollback do débito se crédito falhar",
      "Event Sourcing — gravar eventos e recalcular saldos sob demanda",
    ],
    correctAnswer: 2,
    explanation:
      "Saga com compensating transactions é o padrão para microsserviços financeiros: debita A (sucesso), tenta creditar B (falha) → executa compensação: credita A de volta. 2PC funciona mas tem baixa disponibilidade e alto risco de locks. Eventual consistency é inaceitável para sistemas financeiros onde não pode haver dinheiro 'no ar'.",
    relatedSlug: "modular-monolith",
  },
];
