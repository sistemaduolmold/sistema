const storageKey = "duomold-demo-v3";

const maxVacationRequestDays = 11;
const annualVacationDays = 22;

const demoData = {
  activeAccount: "user:user-admin",
  companies: [
    { id: "empresa-1", name: "Metal Norte, Lda.", vat: "PT509876321", email: "geral@metalnorte.pt", phone: "+351 255 100 200", city: "Porto", sector: "Metalomecanica", address: "Rua Industrial 120, Porto", notes: "Cliente ativo para acompanhamento de molde." },
    { id: "empresa-2", name: "Plastiform Moldes", vat: "PT514223987", email: "info@plastiform.pt", phone: "+351 244 300 550", city: "Leiria", sector: "Moldes", address: "Zona Industrial, Leiria", notes: "Prospeccao iniciada este mes." }
  ],
  clients: [
    { id: "client-ana", name: "Ana Martins", companyId: "empresa-1", email: "ana@metalnorte.pt", password: "cliente123", phone: "+351 912 345 678", status: "Ativo", owner: "Admin", role: "Compras", notes: "Cliente principal para acompanhamento semanal." },
    { id: "client-carlos", name: "Carlos Silva", companyId: "empresa-2", email: "carlos@plastiform.pt", password: "cliente123", phone: "+351 934 567 210", status: "Prospecto", owner: "Admin", role: "Direcao tecnica", notes: "Aguardar validacao dos dados da empresa." }
  ],
  users: [
    { id: "user-admin", employeeNumber: "ADM-001", name: "Administrador", email: "sistemaduolmold@gmail.com", password: "Admin123!", phone: "+351 900 000 001", role: "Admin", department: "Direcao", position: "Administrador", status: "Ativo" },
    { id: "user-rh", employeeNumber: "RH-001", name: "Recursos Humanos", email: "rh@empresa.pt", password: "rh123", phone: "+351 900 000 002", role: "RH", department: "Recursos Humanos", position: "Gestor RH", status: "Ativo" },
    { id: "user-funcionario", employeeNumber: "COL-001", name: "Joao Ferreira", email: "joao@empresa.pt", password: "funcionario123", phone: "+351 900 000 003", role: "Funcionario", department: "Producao", position: "Tecnico", status: "Ativo" }
  ],
  orders: [
    { id: "order-1", clientId: "client-ana", reference: "OS-2026-001", title: "Planeamento de molde", description: "Molde técnico para nova encomenda.", status: "Em produção", progress: "45", dueDate: "2026-06-15", weeklyUpdate: "Molde em fase de planeamento e validação técnica.", tasks: "Revisão técnica; preparação MOD 54; preparação MOD 55." },
    { id: "order-2", clientId: "client-carlos", reference: "OS-2026-002", title: "Ajuste de cavidade", description: "Revisão e ajuste de molde existente.", status: "Em análise", progress: "20", dueDate: "2026-06-28", weeklyUpdate: "Equipa técnica a rever ficheiros enviados.", tasks: "Análise dimensional; contacto com cliente." }
  ],
  vacations: [],
  absences: [],
  notifications: []
};

const scheduleOperations = [
  ["Mapa de Inputs/Outputs", "Input / Output Map", ""],
  ["Preliminar do Molde", "Mold Preliminary Drawing", "DM"],
  ["AMFE/1a Revisao Projecto", "FMEA/Project Revision", "/DM"],
  ["Projecto 3D Molde", "3D Molde Project", "DM"],
  ["Aprovacao do Projecto", "Project aproval", "DM"],
  ["Requisicao de Materiais", "Raw material invoice", "DM"],
  ["Fresagem", "Milling", "DM"],
  ["Refrigeracao", "Cooling", "DM"],
  ["Maquinacao Placas", "Mould Base Machining", "DM"],
  ["Projecto Electrodos", "Electrodes Project", "DM"],
  ["Maquinacao de Electrodos", "Electrodes Machining", "DM"],
  ["Erosao", "Spark Erosion", "DM"],
  ["Polimento", "Polishing", "DM"],
  ["Rectificacao", "Grinding", "DM"],
  ["Ajuste e montagem", "Adjustment / Assembling", "DM"],
  ["1as Amostras", "1ST Samples", "DM"],
  ["Correccoes", "Corrections", "DM"],
  ["Tratamento Termico", "Heat Treatment", "DM"],
  ["2as Amostras", "2nd Samples", "DM"],
  ["Amostras finais / PPAP", "Final Samples /PPAP", "DM"],
  ["Aprovacao de molde", "Mold approval", ""]
];

const planningStatusOptions = ["Tarefa", "Dividir", "Marco", "Sumario", "Resumo de Projeto", "Tarefa Inativa", "Marco Inativo", "Resumo Inativo", "Tarefa Manual", "Apenas-duracao", "Resumo da Agregacao Manual", "Resumo Manual", "Apenas inicio", "Apenas-conclusao", "Tarefas Externas", "Marco Externo", "Prazo", "Progresso", "Progresso Manual"];

const planningBase = [
  ["Project Duration", "", "", "", "Resumo de Projeto"],
  ["PURCHASE ORDER", "", "", "", "Sumario"],
  ["Purchase Order Receipt", "", "", "", "Tarefa"],
  ["CAD", "", "", "", "Sumario"],
  ["Customer: Delivery Part and TDS", "", "", "", "Tarefa"],
  ["Mold Design: Preliminary Project", "", "", "", "Tarefa"],
  ["Customer Approval: Steels and mold concept", "", "", "", "Tarefa"],
  ["Moldflow study", "", "", "", "Tarefa"],
  ["Mold Design: Semi-Final Project", "", "", "", "Tarefa"],
  ["Customer Approval: Millings", "", "", "", "Tarefa"],
  ["Mold Design: Final Project", "", "", "", "Tarefa"],
  ["Customer Approval: Final Project", "", "", "", "Tarefa"],
  ["STEEL ORDER-RECEIVING", "", "", "", "Sumario"],
  ["Steel Order", "", "", "", "Tarefa"],
  ["Steel Receiving", "", "", "", "Tarefa"],
  ["MOLDBASE/STRUCTURE", "", "", "", "Sumario"],
  ["CNC Milling", "", "", "", "Tarefa"],
  ["Drilling", "", "", "", "Tarefa"],
  ["Grinding", "", "", "", "Tarefa"],
  ["ENGRAVING", "", "", "", "Sumario"],
  ["Core Side", "", "", "", "Sumario"],
  ["Core - 200", "", "", "", "Sumario"],
  ["Milling and Treatment", "", "", "", "Sumario"],
  ["Rough Milling", "", "", "", "Tarefa"],
  ["Pre-Finishing Milling", "", "", "", "Tarefa"],
  ["Heat Treatments", "", "", "", "Tarefa"],
  ["Finishing Milling", "", "", "", "Tarefa"],
  ["Inserts/Slides/Lifters Trimming", "", "", "", "Tarefa"],
  ["Spark Erosion", "", "", "", "Sumario"],
  ["Electrodes Definition", "", "", "", "Tarefa"],
  ["Electrodes Milling", "", "", "", "Tarefa"],
  ["Part Erosion", "", "", "", "Tarefa"],
  ["Polishing", "", "", "", "Sumario"],
  ["Cavity Side", "", "", "", "Sumario"],
  ["Cavity - 100", "", "", "", "Sumario"],
  ["Slides", "", "", "", "Sumario"],
  ["Lifters", "", "", "", "Sumario"],
  ["Inserts", "", "", "", "Sumario"],
  ["INJECTION", "", "", "", "Sumario"],
  ["Hot Runner", "", "", "", "Sumario"],
  ["Hot Runner Order", "", "", "", "Tarefa"],
  ["Mold Designer Approval", "", "", "", "Tarefa"],
  ["Hot Runner Reception", "", "", "", "Tarefa"],
  ["BENCH WORK", "", "", "", "Sumario"],
  ["Core-Cooling circuits tapping/testing", "", "", "", "Tarefa"],
  ["Cavity-Cooling circuits tapping/testing", "", "", "", "Tarefa"],
  ["Ejection Assembly", "", "", "", "Tarefa"],
  ["MOLD FITTING/SPOTTING", "", "", "", "Sumario"],
  ["Injection system assembly", "", "", "", "Tarefa"],
  ["Mold Assembly", "", "", "", "Tarefa"],
  ["Final Polishing", "", "", "", "Tarefa"],
  ["TRYOUT", "", "", "", "Sumario"],
  ["Tryout Date", "", "", "", "Marco"],
  ["Post Tryout Mold Venting", "", "", "", "Tarefa"]
].map(([nome, duracao, inicio, conclusao, tipo], index) => ({ id: index + 1, nome, duracao, inicio, conclusao, tipo, status: "0%", extras: [] }));

const vacationMapYear = 2026;
const vacationMapMonths = [
  "JANEIRO",
  "FEVEREIRO",
  "MARÇO",
  "ABRIL",
  "MAIO",
  "JUNHO",
  "JULHO",
  "AGOSTO",
  "SETEMBRO",
  "OUTUBRO",
  "NOVEMBRO",
  "DEZEMBRO"
];
const vacationWeekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
const vacationLegendItems = [
  { code: "N", label: "Feriado nacional", className: "national-holiday" },
  { code: "N", label: "Feriado municipal", className: "municipal-holiday" },
  { code: "N", label: "Fim-de-semana", className: "weekend" },
  { code: "", label: "Férias", className: "vacation" },
  { code: "", label: "Dia a não marcar", className: "blocked-day" },
  { code: "", label: "Carnaval", className: "carnival" },
  { code: "", label: "Férias do ano anterior / ano de admissão", className: "previous-year" },
  { code: "", label: "Meio-dia de férias", className: "half-day" }
];

let state = loadState();
let currentView = "adminPage";
let dialogMode = "client";
let editingId = null;
let dialogAttachments = [];
let isLoggedIn = false;
let supabaseClient = null;
let supabaseSaveTimer = null;
const orderNotificationTimers = new Map();
let applyingRemoteState = false;
let savingSupabase = false;

const views = {
  dashboard: qs("#dashboardView"),
  adminPage: qs("#adminPageView"),
  rhPage: qs("#rhPageView"),
  employeePage: qs("#employeePageView"),
  clients: qs("#clientsView"),
  companies: qs("#companiesView"),
  orders: qs("#ordersView"),
  clientPortal: qs("#clientPortalView"),
  profile: qs("#profileView"),
  users: qs("#usersView"),
  vacations: qs("#vacationsView"),
  absences: qs("#absencesView")
};

const titles = {
  dashboard: ["Painel", "Visão geral dos clientes e equipa."],
  adminPage: ["Admin", "Painel administrativo da DUOMOLD."],
  rhPage: ["RH", "Gestão de férias, faltas e colaboradores."],
  employeePage: ["Funcionario", "Área pessoal para férias e faltas."],
  clients: ["Clientes / Empresas", "Cadastro unificado de clientes, empresas e acessos."],
  companies: ["Empresas", "Dados basicos das empresas."],
  orders: ["Encomendas", "Pedidos de clientes e acompanhamento semanal."],
  clientPortal: ["Meu pedido", "Acompanhamento das suas encomendas."],
  profile: ["Perfil", "Informações do perfil atual."],
  users: ["Colaboradores", "Utilizadores Admin, RH e Funcionario."],
  vacations: ["Férias", "Marcação, pedido e validação de férias."],
  absences: ["Faltas", "Registo e validação de faltas."]
};

const forms = {
  client: [
    ["name", "Nome do cliente", "text", true],
    ["companyName", "Nome da empresa", "text", true],
    ["vat", "NIF", "text"],
    ["email", "Email de acesso", "email", true],
    ["password", "Senha do cliente", "password", true],
    ["phone", "Telefone", "tel"],
    ["city", "Cidade", "text"],
    ["sector", "Setor", "text"],
    ["status", "Estado", "select:Ativo|Prospecto|Inativo"],
    ["owner", "Responsável", "text"],
    ["role", "Função/Cargo", "text"],
    ["address", "Morada da Empresa", "textarea"],
    ["notes", "Observações", "textarea"]
  ],
  company: [
    ["name", "Nome da empresa", "text", true],
    ["vat", "NIF", "text"],
    ["email", "Email", "email"],
    ["phone", "Telefone", "tel"],
    ["city", "Cidade", "text"],
    ["sector", "Setor", "text"],
    ["address", "Morada", "textarea"],
    ["notes", "Observacoes", "textarea"]
  ],
  order: [
    ["clientId", "Cliente", "client", true],
    ["reference", "Referência/OS", "text", true],
    ["title", "Titulo", "text", true],
    ["status", "Estado", "select:Recebido|Em análise|Em produção|Aguardando 3D peça final do cliente|Aguardando nota de encomenda do cliente|Aguardando outros dados técnicos do cliente|Concluído|Entregue"],
    ["progress", "Progresso (%)", "number", true],
    ["dueDate", "Previsão de entrega", "date"],
    ["description", "Descrição", "textarea"],
    ["weeklyUpdate", "Atualização semanal para o cliente", "textarea"],
    ["tasks", "Tarefas internas", "textarea"],
    ["showPlanningToClient", "Cliente pode visualizar Planeamento", "select:Sim|Não"],
    ["showScheduleToClient", "Cliente pode visualizar Cronograma", "select:Sim|Não"]
  ],
  user: [
    ["employeeNumber", "Matrícula", "text", true],
    ["name", "Nome do colaborador", "text", true],
    ["role", "Perfil", "select:Funcionario|RH|Admin", true],
    ["email", "Email", "email", true],
    ["password", "Senha", "password", true],
    ["phone", "Telefone", "tel"],
    ["department", "Departamento", "text"],
    ["position", "Cargo", "text"],
    ["status", "Estado", "select:Ativo|Inativo"]
  ],
  profileUser: [
    ["employeeNumber", "Matrícula", "text", true],
    ["name", "Nome", "text", true],
    ["email", "Email", "email", true],
    ["phone", "Telefone", "tel"],
    ["department", "Departamento", "text"],
    ["position", "Cargo", "text"],
    ["status", "Estado", "select:Ativo|Inativo"]
  ],
  profileClient: [
    ["name", "Nome do cliente", "text", true],
    ["companyName", "Nome da empresa", "text", true],
    ["vat", "NIF", "text"],
    ["email", "Email de acesso", "email", true],
    ["phone", "Telefone", "tel"],
    ["city", "Cidade", "text"],
    ["sector", "Setor", "text"],
    ["role", "Função/Cargo", "text"],
    ["address", "Morada da Empresa", "textarea"],
    ["notes", "Observações", "textarea"]
  ],
  vacation: [
    ["userId", "Colaborador", "user", true],
    ["origin", "Origem", "select:Admin/RH|Funcionario"],
    ["mapCode", "Código do mapa", "select:F|BG|DC"],
    ["startDate", "Data inicial", "date", true],
    ["endDate", "Data final", "date", true],
    ["days", "Dias úteis calculados", "number"],
    ["status", "Estado", "select:Pendente|Aprovado|Rejeitado"],
    ["notes", "Observações", "textarea"]
  ],
  absence: [
    ["userId", "Colaborador", "user", true],
    ["date", "Data", "date", true],
    ["type", "Tipo", "select:Justificada|Injustificada|Baixa|Outro"],
    ["compensateVacation", "Compensar com 1 dia de férias", "select:Não|Sim"],
    ["status", "Estado", "select:Pendente|Aprovado|Rejeitado"],
    ["reason", "Motivo", "textarea"],
    ["attachments", "Anexos", "attachments"]
  ]
};

function qs(selector) {
  return document.querySelector(selector);
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (!saved) throw new Error("no state");
    return mergeState(saved);
  } catch {
    const fresh = structuredClone(demoData);
    fresh.vacations = [];
    fresh.absences = [];
    localStorage.setItem(storageKey, JSON.stringify(fresh));
    return fresh;
  }
}

function mergeState(saved) {
  const merged = structuredClone(demoData);
  Object.assign(merged, saved);
  ["companies", "clients", "users", "orders"].forEach((key) => {
    if (!Array.isArray(merged[key]) || !merged[key].length) merged[key] = structuredClone(demoData[key]);
  });
  if (!Array.isArray(merged.notifications)) merged.notifications = [];
  merged.users = merged.users.map((user, index) => ({ ...user, employeeNumber: user.employeeNumber || `COL-${String(index + 1).padStart(3, "0")}` }));
  // Ferias nunca sao carregadas do localStorage nem do duomold_app_state.
  // A fonte unica e a tabela public.vacations no Supabase.
  merged.vacations = [];
  // Faltas tambem usam apenas a tabela public.absences no Supabase.
  merged.absences = [];
  const adminUser = merged.users.find((user) => user.id === "user-admin");
  if (adminUser) {
    if (!adminUser.email || adminUser.email === "admin@empresa.pt") adminUser.email = "sistemaduolmold@gmail.com";
    if (!adminUser.password || adminUser.password === "admin123") adminUser.password = "Admin123!";
  }
  merged.orders = merged.orders.map(normalizeOrderText);
  if (!merged.activeAccount) merged.activeAccount = "user:user-admin";
  localStorage.setItem(storageKey, JSON.stringify(merged));
  return merged;
}

function cleanVacationRecords(vacations, users = []) {
  const removedDemoIds = new Set(["vac-1", "vac-2"]);
  const validUserIds = new Set(users.map((user) => user.id));
  return (Array.isArray(vacations) ? vacations : [])
    .filter((vacation) => vacation?.id && !removedDemoIds.has(vacation.id))
    .filter((vacation) => vacation.userId && validUserIds.has(vacation.userId))
    .map((vacation) => ({
      ...vacation,
      days: String(Math.min(Number(vacation.days || 0), maxVacationRequestDays))
    }));
}

function cleanAbsenceRecords(absences, users = []) {
  const removedDemoIds = new Set(["abs-1"]);
  const validUserIds = new Set(users.map((user) => user.id));
  return (Array.isArray(absences) ? absences : [])
    .filter((absence) => absence?.id && !removedDemoIds.has(absence.id))
    .filter((absence) => absence.userId && validUserIds.has(absence.userId));
}

function normalizeOrderText(order) {
  const statusMap = {
    "Em producao": "Em produção",
    "Em analise": "Em análise",
    Concluido: "Concluído",
    "Aguardando cliente": "Aguardando outros dados técnicos do cliente"
  };
  return {
    ...order,
    status: statusMap[order.status] || order.status,
    showPlanningToClient: order.showPlanningToClient || "Sim",
    showScheduleToClient: order.showScheduleToClient || "Sim",
    history: Array.isArray(order.history) ? order.history.map((entry) => ({
      ...entry,
      status: entry.status || "Falta"
    })).filter(isManualOrderHistoryEntry) : []
  };
}

function isManualOrderHistoryEntry(entry) {
  const details = Array.isArray(entry?.details) ? entry.details : entry?.details ? [entry.details] : [];
  if (!details.length) return false;
  return !details.some((detail) => isAutomaticOrderHistoryDetail(detail));
}

function isAutomaticOrderHistoryDetail(detail) {
  return /^(Estado|Progresso \(%\)|Previsao de entrega|Previsão de entrega|Atualizacao semanal|Atualização semanal|Tarefas internas|Titulo|Título|Descricao|Descrição|Planeamento visivel ao cliente|Planeamento visível ao cliente|Cronograma visivel ao cliente|Cronograma visível ao cliente):/i.test(String(detail || "").trim());
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
  scheduleSupabaseSave();
  render();
}

function persistStateOnly() {
  localStorage.setItem(storageKey, JSON.stringify(state));
  scheduleSupabaseSave();
}

function initSupabase() {
  const config = window.DUOMOLD_SUPABASE;
  if (!config?.url || !config?.anonKey || config.anonKey.includes("COLE_AQUI")) return;
  if (!window.supabase?.createClient) return;
  supabaseClient = window.supabase.createClient(config.url, config.anonKey);
}

async function loadStateFromSupabase() {
  if (!supabaseClient) return;
  const config = window.DUOMOLD_SUPABASE;
  try {
    const { data, error } = await supabaseClient
      .from(config.stateTable)
      .select("data")
      .eq("id", config.stateId)
      .maybeSingle();
    if (error) throw error;
    if (!data?.data) {
      state.vacations = [];
      state.absences = [];
      await loadCoreDataFromSupabase();
      await saveStateToSupabase();
      render();
      return;
    }
    applyingRemoteState = true;
    state = mergeState(data.data);
    applyingRemoteState = false;
    await loadCoreDataFromSupabase();
    render();
  } catch (error) {
    applyingRemoteState = false;
    console.warn("Supabase indisponivel. O sistema continua em modo local.", error);
  }
}

function scheduleSupabaseSave() {
  if (!supabaseClient || applyingRemoteState) return;
  clearTimeout(supabaseSaveTimer);
  supabaseSaveTimer = setTimeout(saveStateToSupabase, 600);
}

async function saveStateToSupabase() {
  if (!supabaseClient) return;
  if (savingSupabase) {
    clearTimeout(supabaseSaveTimer);
    supabaseSaveTimer = setTimeout(saveStateToSupabase, 600);
    return;
  }
  const config = window.DUOMOLD_SUPABASE;
  savingSupabase = true;
  try {
    const payload = {
      id: config.stateId,
      data: appStatePayload(),
      updated_at: new Date().toISOString()
    };
    const { error } = await supabaseClient
      .from(config.stateTable)
      .upsert(payload, { onConflict: "id" });
    if (error) console.warn("Nao foi possivel gravar o estado geral no Supabase.", error);
    await syncCoreTablesToSupabase();
  } catch (error) {
    console.warn("Nao foi possivel gravar no Supabase. Os dados ficaram guardados localmente.", error);
  } finally {
    savingSupabase = false;
  }
}

function appStatePayload() {
  return {
    ...state,
    vacations: [],
    absences: []
  };
}

async function syncCoreTablesToSupabase() {
  await safeUpsertRows("companies", state.companies.map(companyToSupabase));
  await safeUpsertRows("clients", state.clients.map(clientToSupabase));
  await safeUpsertRows("users", state.users.map(userToSupabase));
  await safeUpsertRows("orders", state.orders.map(orderToSupabase));
  await safeUpsertRows("vacations", state.vacations.map(vacationToSupabase));
  await safeUpsertRows("absences", state.absences.map(absenceToSupabase));
  await safeUpsertRows("notifications", state.notifications.map(notificationToSupabase));
}

async function safeUpsertRows(tableName, rows, attempt = 0) {
  if (!supabaseClient || !rows.length) return;
  const { error } = await supabaseClient.from(tableName).upsert(rows, { onConflict: "id" });
  if (!error) return;
  const message = String(error.message || "");
  const missingColumn = message.match(/column "([^"]+)" .*does not exist/i)?.[1]
    || message.match(/Could not find the '([^']+)' column/i)?.[1];
  if (missingColumn && attempt < 8) {
    await safeUpsertRows(tableName, rows.map((row) => {
      const copy = { ...row };
      delete copy[missingColumn];
      return copy;
    }), attempt + 1);
    return;
  }
  console.warn(`Nao foi possivel sincronizar a tabela ${tableName}.`, error);
}

async function deleteSupabaseRecord(tableName, id) {
  if (!supabaseClient || !tableName || !id) return;
  const { error } = await supabaseClient.from(tableName).delete().eq("id", id);
  if (error) console.warn(`Nao foi possivel apagar ${id} em ${tableName}.`, error);
}

function account() {
  const [type, id] = state.activeAccount.split(":");
  return { type, id };
}

function currentUser() {
  const current = account();
  return current.type === "user" ? state.users.find((user) => user.id === current.id) : null;
}

function currentClient() {
  const current = account();
  return current.type === "client" ? state.clients.find((client) => client.id === current.id) : null;
}

function currentAccountRecord() {
  return isClient() ? currentClient() : currentUser();
}

function isClient() {
  return account().type === "client";
}

function role() {
  return currentUser()?.role || "Cliente";
}

function allowedViews() {
  if (isClient()) return ["clientPortal", "profile"];
  if (role() === "Admin") return ["adminPage", "dashboard", "profile", "clients", "orders", "users", "vacations", "absences"];
  if (role() === "RH") return ["rhPage", "profile", "users", "vacations", "absences"];
  return ["employeePage", "profile", "users", "vacations", "absences"];
}

function defaultView() {
  if (isClient()) return "clientPortal";
  if (role() === "Admin") return "adminPage";
  if (role() === "RH") return "rhPage";
  return "employeePage";
}

function setView(view) {
  currentView = allowedViews().includes(view) ? view : defaultView();
  Object.entries(views).forEach(([name, element]) => element?.classList.toggle("active", name === currentView));
  qsa(".nav-item").forEach((button) => {
    const roleLimit = button.dataset.roles ? button.dataset.roles.split(",").map((item) => item.trim()).filter(Boolean) : [];
    const roleAllowed = !roleLimit.length || roleLimit.includes(role());
    button.hidden = !allowedViews().includes(button.dataset.view) || !roleAllowed;
    button.classList.toggle("active", button.dataset.view === currentView);
  });
  qs("#pageTitle").textContent = titles[currentView][0];
  qs("#pageSubtitle").textContent = titles[currentView][1];
  qs("#newRecordButton").textContent = actionLabel();
  qs("#newRecordButton").hidden = !canCreateHere();
}

function qsa(selector, scope = document) {
  return [...scope.querySelectorAll(selector)];
}

function actionLabel() {
  return {
    adminPage: "Nova encomenda",
    dashboard: "Novo cliente / empresa",
    clients: "Novo cliente / empresa",
    companies: "Nova empresa",
    orders: "Nova encomenda",
    users: "Novo colaborador",
    rhPage: "Adicionar férias",
    employeePage: "Pedir férias",
    vacations: "Adicionar férias",
    absences: "Registar falta"
  }[currentView] || "Novo";
}

function canCreateHere() {
  if (isClient()) return false;
  if (role() === "Admin") return ["adminPage", "dashboard", "clients", "orders", "users", "vacations", "absences"].includes(currentView);
  if (role() === "RH") return ["rhPage", "vacations", "absences"].includes(currentView);
  return ["employeePage", "vacations", "absences"].includes(currentView);
}

function canManageUsers() {
  return ["Admin", "RH"].includes(role());
}

function modeFromView() {
  return { adminPage: "order", dashboard: "client", clients: "client", orders: "order", users: "user", rhPage: "vacation", employeePage: "vacation", vacations: "vacation", absences: "absence" }[currentView] || "client";
}

function render() {
  qs("#loginScreen").hidden = isLoggedIn;
  qs("#appShell").hidden = !isLoggedIn;
  if (!isLoggedIn) return;
  renderAccountSelector();
  renderDashboard();
  renderRolePages();
  renderNotifications();
  renderClients();
  renderCompanies();
  renderOrders();
  renderClientPortal();
  renderProfile();
  renderUsers();
  renderVacations();
  renderAbsences();
  setView(currentView);
}

function renderAccountSelector() {
  const accountSwitcher = qs(".account-switcher");
  if (accountSwitcher) accountSwitcher.hidden = role() !== "Admin";
  const options = [
    ...state.users.map((user) => ({ value: `user:${user.id}`, label: `${user.name} - ${user.role}` })),
    ...state.clients.map((client) => ({ value: `client:${client.id}`, label: `${client.name} - Cliente` }))
  ];
  qs("#demoAccountSelect").innerHTML = options.map((option) => `<option value="${option.value}" ${state.activeAccount === option.value ? "selected" : ""}>${esc(option.label)}</option>`).join("");
  qs("#currentSessionName").textContent = isClient() ? `${currentClient()?.name || "Cliente"} - Cliente` : `${currentUser()?.name || "Utilizador"} - ${role()}`;
  qs("#sessionHint").textContent = isClient() ? "Pode acompanhar as suas encomendas" : role() === "Funcionario" ? "Pode pedir férias e registar faltas" : "Pode gerir e validar informacao";
}

async function loginWithCredentials(event) {
  event.preventDefault();
  const email = qs("#loginEmail").value.trim().toLowerCase();
  const password = qs("#loginPassword").value;
  qs("#loginAlert").textContent = "A validar acesso...";

  const supabaseLogin = await findSupabaseLogin(email, password);
  if (supabaseLogin?.type === "error") {
    qs("#loginAlert").textContent = supabaseLogin.message;
    return;
  }

  const user = supabaseLogin?.type === "user"
    ? supabaseLogin.record
    : state.users.find((item) => item.email.toLowerCase() === email && item.password === password);
  const client = supabaseLogin?.type === "client"
    ? supabaseLogin.record
    : state.clients.find((item) => item.email.toLowerCase() === email && item.password === password);

  if (!user && !client) {
    qs("#loginAlert").textContent = "Email ou senha incorretos.";
    return;
  }
  if (supabaseLogin) await loadCoreDataFromSupabase();
  state.activeAccount = user ? `user:${user.id}` : `client:${client.id}`;
  persistStateOnly();
  isLoggedIn = true;
  qs("#loginAlert").textContent = "";
  qs("#loginForm").reset();
  currentView = defaultView();
  render();
}

function logout() {
  isLoggedIn = false;
  qsa("dialog[open]").forEach((dialog) => dialog.close());
  render();
}

async function findSupabaseLogin(email, password) {
  if (!supabaseClient) return null;
  try {
    const { data: userRow, error: userError } = await supabaseClient
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .maybeSingle();
    if (userError) throw userError;
    if (userRow) return { type: "user", record: importSupabaseUser(userRow) };

    const { data: clientRow, error: clientError } = await supabaseClient
      .from("clients")
      .select("*, companies(*)")
      .eq("email", email)
      .eq("password", password)
      .maybeSingle();
    if (clientError) throw clientError;
    if (clientRow) return { type: "client", record: importSupabaseClient(clientRow) };

    return null;
  } catch (error) {
    console.warn("Erro no login Supabase", error);
    return {
      type: "error",
      message: "Não foi possível validar no Supabase. Confirme se executou o SQL completo e se a chave está correta."
    };
  }
}

function importSupabaseUser(row) {
  const record = {
    id: row.id,
    employeeNumber: row.employee_number || row.employeeNumber || "",
    name: row.name || "",
    email: row.email || "",
    password: row.password || "",
    phone: row.phone || "",
    role: row.profile || row.role || "Funcionario",
    department: row.department || "",
    position: row.position || "",
    status: row.status || "Ativo"
  };
  upsertById(state.users, record);
  return record;
}

function importSupabaseClient(row) {
  const companyRow = row.companies || {};
  const companyId = row.company_id || row.companyId || companyRow.id || `empresa-${row.id}`;
  if (companyRow.id || row.company_id) {
    upsertById(state.companies, {
      id: companyId,
      name: companyRow.name || "",
      vat: companyRow.vat || "",
      email: companyRow.email || "",
      phone: companyRow.phone || "",
      city: companyRow.city || "",
      sector: companyRow.sector || "",
      address: companyRow.address || "",
      notes: companyRow.notes || "",
      status: companyRow.status || "Ativo"
    });
  }
  const record = {
    id: row.id,
    companyId,
    name: row.name || "",
    email: row.email || "",
    password: row.password || "",
    phone: row.phone || "",
    role: row.role || "",
    owner: row.owner || "Admin",
    status: row.status || "Ativo",
    notes: row.notes || ""
  };
  upsertById(state.clients, record);
  return record;
}

function upsertById(list, record) {
  const index = list.findIndex((item) => item.id === record.id);
  if (index >= 0) list[index] = { ...list[index], ...record };
  else list.push(record);
}

async function loadCoreDataFromSupabase() {
  if (!supabaseClient) return;
  try {
    const [companies, clients, users, orders, vacations, absences, notifications] = await Promise.all([
      supabaseClient.from("companies").select("*").order("created_at", { ascending: true }),
      supabaseClient.from("clients").select("*").order("created_at", { ascending: true }),
      supabaseClient.from("users").select("*").order("created_at", { ascending: true }),
      supabaseClient.from("orders").select("*").order("created_at", { ascending: true }),
      supabaseClient.from("vacations").select("*").order("created_at", { ascending: true }),
      supabaseClient.from("absences").select("*").order("created_at", { ascending: true }),
      supabaseClient.from("notifications").select("*").order("created_at", { ascending: false })
    ]);
    if (companies.error) console.warn("Nao foi possivel carregar companies.", companies.error);
    else state.companies = mergeSupabaseCollection(state.companies, companies.data.map(mapCompanyFromSupabase));

    if (clients.error) console.warn("Nao foi possivel carregar clients.", clients.error);
    else state.clients = mergeSupabaseCollection(state.clients, clients.data.map(mapClientFromSupabase));

    if (users.error) console.warn("Nao foi possivel carregar users.", users.error);
    else state.users = mergeSupabaseCollection(state.users, users.data.map(mapUserFromSupabase));

    if (orders.error) console.warn("Nao foi possivel carregar orders.", orders.error);
    else state.orders = mergeSupabaseCollection(state.orders, orders.data.map(mapOrderFromSupabase));

    if (vacations.error) console.warn("Nao foi possivel carregar vacations.", vacations.error);
    else state.vacations = cleanVacationRecords(vacations.data.map(mapVacationFromSupabase), state.users);

    if (absences.error) console.warn("Nao foi possivel carregar absences.", absences.error);
    else state.absences = cleanAbsenceRecords(absences.data.map(mapAbsenceFromSupabase), state.users);

    if (notifications.error) console.warn("Nao foi possivel carregar notifications.", notifications.error);
    else state.notifications = mergeSupabaseCollection(state.notifications, notifications.data.map(mapNotificationFromSupabase));
    persistStateOnly();
  } catch (error) {
    console.warn("Nao foi possivel carregar tabelas principais do Supabase.", error);
  }
}

function mergeSupabaseCollection(existingRows = [], supabaseRows = []) {
  const byId = new Map(existingRows.map((item) => [item.id, item]));
  supabaseRows.forEach((item) => {
    const cleanItem = Object.fromEntries(Object.entries(item).filter(([, value]) => value !== undefined));
    byId.set(item.id, { ...(byId.get(item.id) || {}), ...cleanItem });
  });
  return [...byId.values()];
}

function mapCompanyFromSupabase(row) {
  return {
    id: row.id,
    name: row.name || "",
    vat: row.vat || "",
    email: row.email || "",
    phone: row.phone || "",
    city: row.city || "",
    sector: row.sector || "",
    address: row.address || "",
    notes: row.notes || "",
    status: row.status || "Ativo"
  };
}

function mapClientFromSupabase(row) {
  return {
    id: row.id,
    companyId: row.company_id || "",
    name: row.name || "",
    email: row.email || "",
    password: row.password || "",
    phone: row.phone || "",
    role: row.role || "",
    owner: row.owner || "Admin",
    status: row.status || "Ativo",
    notes: row.notes || ""
  };
}

function mapUserFromSupabase(row) {
  return {
    id: row.id,
    employeeNumber: row.employee_number || "",
    name: row.name || "",
    email: row.email || "",
    password: row.password || "",
    phone: row.phone || "",
    role: row.profile || row.role || "Funcionario",
    department: row.department || "",
    position: row.position || "",
    status: row.status || "Ativo"
  };
}

function mapOrderFromSupabase(row) {
  const hasPlanningFlag = Object.prototype.hasOwnProperty.call(row, "show_planning_to_client");
  const hasScheduleFlag = Object.prototype.hasOwnProperty.call(row, "show_schedule_to_client");
  const hasHistory = Object.prototype.hasOwnProperty.call(row, "history");
  const mapped = normalizeOrderText({
    id: row.id,
    clientId: row.client_id || "",
    reference: row.reference || "",
    title: row.title || "",
    description: row.description || "",
    status: row.status || "Recebido",
    progress: String(row.progress ?? 0),
    dueDate: row.due_date || "",
    weeklyUpdate: row.weekly_update || "",
    tasks: row.tasks || "",
    showPlanningToClient: hasPlanningFlag ? row.show_planning_to_client ? "Sim" : "Não" : undefined,
    showScheduleToClient: hasScheduleFlag ? row.show_schedule_to_client ? "Sim" : "Não" : undefined,
    history: Array.isArray(row.history) ? row.history : undefined,
    schedule: row.schedule || undefined,
    planning: row.planning || undefined,
    moldPhotos: Array.isArray(row.mold_photos) ? row.mold_photos : undefined
  });
  if (!hasPlanningFlag) delete mapped.showPlanningToClient;
  if (!hasScheduleFlag) delete mapped.showScheduleToClient;
  if (!hasHistory) delete mapped.history;
  return mapped;
}

function mapVacationFromSupabase(row) {
  return {
    id: row.id,
    userId: row.user_id || "",
    startDate: row.start_date || "",
    endDate: row.end_date || "",
    days: String(row.days ?? 0),
    origin: row.origin || "Funcionario",
    mapCode: row.map_code || row.mapCode || deriveVacationCode(row),
    status: row.status || "Pendente",
    notes: row.notes || "",
    decidedBy: row.decided_by || userName(row.approved_by) || "",
    decidedById: row.approved_by || "",
    decidedAt: row.approved_at || "",
    linkedAbsenceId: row.linked_absence_id || ""
  };
}

function mapAbsenceFromSupabase(row) {
  return {
    id: row.id,
    userId: row.user_id || "",
    date: row.date || "",
    type: row.type || "Justificada",
    compensateVacation: row.compensate_vacation ? "Sim" : "Não",
    status: row.status || "Pendente",
    reason: row.reason || "",
    decidedBy: row.decided_by || "",
    attachments: Array.isArray(row.attachments) ? row.attachments : undefined
  };
}

function mapNotificationFromSupabase(row) {
  const target = row.target || (row.user_id ? `user:${row.user_id}` : "");
  return normalizeNotificationText({
    id: row.id,
    to: target,
    title: row.title || "",
    message: row.message || "",
    page: row.page || "",
    link: row.page || "",
    recordType: row.record_type || "",
    recordId: row.record_id || "",
    read: Boolean(row.is_read ?? row.read),
    createdAt: row.created_at || new Date().toISOString()
  });
}

function companyToSupabase(company) {
  return {
    id: company.id,
    name: company.name || "",
    vat: company.vat || "",
    email: company.email || "",
    phone: company.phone || "",
    city: company.city || "",
    sector: company.sector || "",
    address: company.address || "",
    notes: company.notes || "",
    status: company.status || "Ativo"
  };
}

function clientToSupabase(client) {
  return {
    id: client.id,
    company_id: client.companyId || "",
    name: client.name || "",
    email: client.email || "",
    password: client.password || "",
    phone: client.phone || "",
    role: client.role || "",
    owner: client.owner || "Admin",
    status: client.status || "Ativo",
    notes: client.notes || ""
  };
}

function userToSupabase(user) {
  return {
    id: user.id,
    employee_number: user.employeeNumber || "",
    name: user.name || "",
    email: user.email || "",
    password: user.password || "",
    phone: user.phone || "",
    profile: user.role || "Funcionario",
    role: user.role || "Funcionario",
    department: user.department || "",
    position: user.position || "",
    status: user.status || "Ativo"
  };
}

function orderToSupabase(order) {
  return {
    id: order.id,
    client_id: order.clientId || "",
    reference: order.reference || "",
    title: order.title || "",
    description: order.description || "",
    status: order.status || "Recebido",
    progress: Number(order.progress || 0),
    due_date: order.dueDate || null,
    weekly_update: order.weeklyUpdate || "",
    tasks: order.tasks || "",
    show_planning_to_client: (order.showPlanningToClient || "Sim") === "Sim",
    show_schedule_to_client: (order.showScheduleToClient || "Sim") === "Sim",
    history: Array.isArray(order.history) ? order.history : [],
    schedule: order.schedule || {},
    planning: order.planning || null,
    mold_photos: Array.isArray(order.moldPhotos) ? order.moldPhotos : []
  };
}

function vacationToSupabase(vacation) {
  return {
    id: vacation.id,
    user_id: vacation.userId || "",
    start_date: vacation.startDate || null,
    end_date: vacation.endDate || null,
    days: Number(vacation.days || 0),
    origin: vacation.origin || "Funcionario",
    map_code: vacationCode(vacation),
    status: vacation.status || "Pendente",
    notes: vacation.notes || "",
    decided_by: vacation.decidedBy || "",
    linked_absence_id: vacation.linkedAbsenceId || null,
    approved_by: vacation.decidedById || null,
    approved_at: vacation.decidedAt || null
  };
}

function absenceToSupabase(absence) {
  return {
    id: absence.id,
    user_id: absence.userId || "",
    date: absence.date || null,
    type: absence.type || "Justificada",
    compensate_vacation: absence.compensateVacation === "Sim",
    status: absence.status || "Pendente",
    reason: absence.reason || "",
    decided_by: absence.decidedBy || "",
    attachments: Array.isArray(absence.attachments) ? absence.attachments : []
  };
}

function notificationToSupabase(notification) {
  const normalized = normalizeNotificationText(notification);
  return {
    id: normalized.id,
    target: normalized.to || "",
    title: normalized.title || "",
    message: normalized.message || "",
    page: normalized.link || normalized.page || "",
    record_type: normalized.recordType || "",
    record_id: normalized.recordId || "",
    is_read: Boolean(normalized.read),
    created_at: normalized.createdAt || new Date().toISOString()
  };
}

function normalizeNotificationText(notification) {
  if (notification?.recordType !== "order") return notification;
  return {
    ...notification,
    title: "Encomenda atualizada",
    message: String(notification.message || "").split(":")[0].trim() || notification.message || ""
  };
}

function renderDashboard() {
  text("#totalClients", state.clients.length);
  text("#totalCompanies", state.clients.length);
  text("#totalUsers", state.users.length);
  text("#pendingVacations", state.vacations.filter((item) => item.status === "Pendente").length);
  compact("#recentClients", state.clients.slice(0, 4), (client) => ({ title: client.name, meta: `${companyName(client.companyId)} - ${client.email}`, badge: client.status }));
  compact("#pendingVacationList", state.vacations.filter((item) => item.status === "Pendente"), (item) => ({ title: userName(item.userId), meta: `${date(item.startDate)} a ${date(item.endDate)} - ${item.days} dias`, badge: item.origin }));
}

function renderRolePages() {
  const openOrders = state.orders.filter((order) => !["Concluido", "Entregue"].includes(order.status));
  text("#adminOpenOrders", openOrders.length);
  text("#adminClientLogins", state.clients.filter((client) => client.email && client.password).length);
  text("#adminPendingVacations", state.vacations.filter((item) => item.status === "Pendente").length);
  text("#adminPendingAbsences", state.absences.filter((item) => item.status === "Pendente").length);
  compact("#adminOrdersList", openOrders, (order) => ({ title: `${order.reference} - ${clientName(order.clientId)}`, meta: `${order.status} - ${order.progress}%`, badge: date(order.dueDate) }));
  compact("#rhVacationsList", state.vacations.filter((item) => item.status === "Pendente"), (item) => ({ title: userName(item.userId), meta: `${date(item.startDate)} a ${date(item.endDate)}`, badge: `${item.days} dias` }));
  compact("#rhAbsencesList", state.absences.filter((item) => item.status === "Pendente"), (item) => ({ title: userName(item.userId), meta: item.reason || "Sem motivo", badge: item.type }));
  const employeeId = currentUser()?.id || "user-funcionario";
  const vacations = state.vacations.filter((item) => item.userId === employeeId);
  const approved = sum(vacations.filter((item) => item.status === "Aprovado" && item.origin === "Funcionario"));
  const pending = sum(vacations.filter((item) => item.status === "Pendente" && item.origin === "Funcionario"));
  text("#employeeApprovedDays", approved);
  text("#employeePendingDays", pending);
  text("#employeeAvailableDays", Math.max(annualVacationDays - approved - pending, 0));
  text("#employeePendingAbsences", state.absences.filter((item) => item.userId === employeeId && item.status === "Pendente").length);
  compact("#employeeVacationsList", vacations, (item) => ({ title: `${date(item.startDate)} a ${date(item.endDate)}`, meta: `${item.days} dias - ${item.origin}`, badge: item.status }));
  compact("#employeeAbsencesList", state.absences.filter((item) => item.userId === employeeId), (item) => ({ title: date(item.date), meta: item.reason, badge: item.status }));
}

function renderClients() {
  const query = value("#clientSearch");
  const rows = state.clients.filter((client) => {
    const company = companyForClient(client);
    return search([client.name, client.email, client.phone, client.status, client.role, company.name, company.vat, company.city, company.sector], query);
  });
  table("#clientsTable", rows, (client) => {
    const company = companyForClient(client);
    return `
      <tr>
        <td><strong>${esc(client.name)}</strong><small>${esc(company.name || "Sem empresa")} - ${esc(client.role || "Sem cargo")}</small></td>
        <td>${esc(company.vat || "Sem NIF")}</td>
        <td><strong>${esc(client.email)}</strong><small>${esc(client.phone || company.phone || "Sem telefone")}</small></td>
        <td><strong>${esc(company.city || "Sem cidade")}</strong><small>${esc(company.sector || "Sem setor")}</small></td>
        <td><span class="status ${cls(client.status)}">${esc(client.status)}</span></td>
        <td><div class="row-actions"><button class="row-action" data-edit-client="${client.id}">Editar</button><button class="row-action" data-new-client-order="${client.id}">Nova encomenda</button><button class="row-action delete" data-delete-client="${client.id}">Apagar</button></div></td>
      </tr>`;
  });
}

function renderCompanies() {
  const query = value("#companySearch");
  const rows = state.companies.filter((company) => search([company.name, company.vat, company.email, company.city, company.sector], query));
  table("#companiesTable", rows, (company) => `
    <tr>
      <td><strong>${esc(company.name)}</strong><small>${esc(company.address || "Sem morada")}</small></td>
      <td>${esc(company.vat || "Sem NIF")}</td>
      <td><strong>${esc(company.email || "Sem email")}</strong><small>${esc(company.phone || "Sem telefone")}</small></td>
      <td>${esc(company.city || "Sem cidade")}</td>
      <td>${esc(company.sector || "Sem setor")}</td>
      <td><div class="row-actions"><button class="row-action" data-edit-company="${company.id}">Editar</button><button class="row-action delete" data-delete-company="${company.id}">Apagar</button></div></td>
    </tr>`);
}

function renderOrders() {
  const query = value("#orderSearch");
  const rows = state.orders.filter((order) => search([order.reference, order.title, order.status, clientName(order.clientId), order.weeklyUpdate], query));
  table("#ordersTable", rows, (order) => `
    <tr>
      <td><strong>${esc(order.reference)}</strong><small>${esc(order.title)}</small></td>
      <td>${esc(clientName(order.clientId))}</td>
      <td><span class="status ${cls(order.status)}">${esc(order.status)}</span></td>
      <td><strong>${esc(order.progress)}%</strong><small>Previsão: ${date(order.dueDate)}</small></td>
      <td>${esc(order.weeklyUpdate || "Sem atualização")}</td>
      <td><div class="row-actions"><button class="row-action" data-edit-order="${order.id}">Editar</button><button class="row-action" data-planning-order="${order.id}">Planeamento</button><button class="row-action" data-schedule-order="${order.id}">Cronograma</button><button class="row-action delete" data-delete-order="${order.id}">Apagar</button></div></td>
    </tr>`);
}

function renderClientPortal() {
  const clientId = currentClient()?.id;
  const rows = state.orders.filter((order) => order.clientId === clientId);
  table("#clientOrdersTable", rows, (order) => `
    <tr>
      <td><strong>${esc(order.reference)}</strong><small>${esc(order.title)}</small></td>
      <td><span class="status ${cls(order.status)}">${esc(order.status)}</span></td>
      <td><strong>${esc(order.progress)}%</strong><small>${esc(order.description || "")}</small></td>
      <td>${date(order.dueDate)}</td>
      <td>${esc(order.weeklyUpdate || "Sem atualização semanal")}</td>
      <td><div class="row-actions">${clientDocumentButtons(order)}</div></td>
    </tr>`);
}

function renderProfile() {
  const record = currentAccountRecord();
  if (!record) return;
  const company = isClient() ? companyForClient(record) : {};
  const profileLabel = isClient() ? "Cliente" : role();
  text("#profileInitial", (record.name || profileLabel || "D").trim().slice(0, 1).toUpperCase());
  text("#profileRole", profileLabel);
  text("#profileName", record.name || "Sem nome");
  text("#profileEmail", record.email || "Sem email");

  const items = isClient()
    ? [
        ["Nome do cliente", record.name],
        ["Empresa", company.name],
        ["NIF", company.vat],
        ["Email", record.email],
        ["Telefone", record.phone || company.phone],
        ["Cargo/Função", record.role],
        ["Cidade", company.city],
        ["Setor", company.sector],
        ["Morada", company.address],
        ["Estado", record.status]
      ]
    : [
        ["Nome", record.name],
        ["Matrícula", record.employeeNumber],
        ["Perfil", record.role],
        ["Email", record.email],
        ["Telefone", record.phone],
        ["Departamento", record.department],
        ["Cargo", record.position],
        ["Estado", record.status]
      ];
  const visibleItems = items.filter(([, valueText]) => String(valueText || "").trim());
  qs("#profileInfoGrid").innerHTML = visibleItems.map(([labelText, valueText]) => `
    <article class="profile-info-item">
      <span>${esc(labelText)}</span>
      <strong>${esc(valueText)}</strong>
    </article>
  `).join("");
}

function notificationTargetsForCurrentAccount() {
  const current = account();
  const targets = [`${current.type}:${current.id}`];
  if (!isClient() && role() === "Admin") targets.push("role:Admin");
  if (!isClient() && role() === "RH") targets.push("role:RH");
  return targets;
}

function visibleNotifications() {
  const targets = notificationTargetsForCurrentAccount();
  return state.notifications
    .filter((item) => targets.includes(item.to))
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
}

function renderNotifications() {
  const items = visibleNotifications();
  const unread = items.filter((item) => !item.read).length;
  const count = qs("#notificationCount");
  count.hidden = unread === 0;
  count.textContent = unread;
  qs("#notificationList").innerHTML = items.length ? items.slice(0, 12).map((item) => `
    <button class="notification-item ${item.read ? "" : "unread"}" data-notification-open="${item.id}" type="button">
      <strong>${esc(item.title)}</strong>
      <p>${esc(item.message)}</p>
      <small>${dateTime(item.createdAt)}</small>
    </button>
  `).join("") : `<div class="empty-state small">Sem notificações.</div>`;
}

function addNotification({ to, title, message, link = "", recordType = "", recordId = "" }) {
  if (!to) return;
  state.notifications.unshift({
    id: `notif-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    to,
    title,
    message,
    link,
    recordType,
    recordId,
    read: false,
    createdAt: new Date().toISOString()
  });
}

function notifyMany(targets, payload) {
  [...new Set(targets.filter(Boolean))].forEach((to) => addNotification({ ...payload, to }));
}

function managerNotificationTargets(requestUserId = "") {
  const requester = state.users.find((user) => user.id === requestUserId);
  const requesterRole = requester?.role;
  if (requesterRole === "Admin") return ["role:RH"];
  if (requesterRole === "RH") return ["role:Admin"];
  return ["role:Admin", "role:RH"];
}

function markNotificationsRead() {
  const ids = new Set(visibleNotifications().map((item) => item.id));
  state.notifications.forEach((item) => {
    if (ids.has(item.id)) item.read = true;
  });
  persistStateOnly();
  renderNotifications();
}

function openNotification(id) {
  const item = state.notifications.find((notification) => notification.id === id);
  if (!item) return;
  item.read = true;
  persistStateOnly();
  qs("#notificationPanel").hidden = true;
  setView(notificationTargetView(item));
  renderNotifications();
}

function notificationTargetView(notification) {
  if (notification.link && allowedViews().includes(notification.link)) return notification.link;
  const title = `${notification.title} ${notification.message}`.toLowerCase();
  if (title.includes("férias") && allowedViews().includes("vacations")) return "vacations";
  if (title.includes("falta") && allowedViews().includes("absences")) return "absences";
  if ((title.includes("encomenda") || title.includes("pedido")) && allowedViews().includes("orders")) return "orders";
  if (allowedViews().includes("clientPortal")) return "clientPortal";
  return defaultView();
}

function clientDocumentButtons(order) {
  const buttons = [];
  if ((order.showPlanningToClient || "Sim") === "Sim") buttons.push(`<button class="row-action" data-planning-order="${order.id}">Planeamento</button>`);
  if ((order.showScheduleToClient || "Sim") === "Sim") buttons.push(`<button class="row-action" data-schedule-order="${order.id}">Cronograma</button>`);
  return buttons.length ? buttons.join("") : `<span class="muted-cell">Sem documentos liberados</span>`;
}

function renderUsers() {
  const query = value("#userSearch");
  const rows = (role() === "Funcionario" ? state.users.filter((user) => user.id === currentUser()?.id) : state.users).filter((user) => search([user.name, user.email, user.role, user.department], query));
  const addButton = qs("#addUserButton");
  if (addButton) addButton.hidden = !canManageUsers();
  table("#usersTable", rows, (user) => {
    const total = sum(state.vacations.filter((item) => item.userId === user.id && item.status !== "Rejeitado"));
    return `<tr>
      <td><strong>${esc(user.name)}</strong><small>${esc(user.position || "Sem cargo")}</small></td>
      <td><strong>${esc(user.employeeNumber || "Sem matrícula")}</strong></td>
      <td><span class="status ${cls(user.role)}">${esc(user.role)}</span></td>
      <td><strong>${esc(user.email)}</strong><small>${esc(user.phone || "Sem telefone")}</small></td>
      <td>${esc(user.department || "Sem departamento")}</td>
      <td><strong>${total}/${annualVacationDays} dias</strong><small>Limite anual</small></td>
      <td><div class="row-actions">${role() === "Admin" ? `<button class="row-action" data-edit-user="${user.id}">Editar</button><button class="row-action delete" data-delete-user="${user.id}">Apagar</button>` : ""}</div></td>
    </tr>`;
  });
}

function renderVacations() {
  const query = value("#vacationSearch");
  const rows = state.vacations.filter((item) => role() !== "Funcionario" || item.userId === currentUser()?.id).filter((item) => search([userName(item.userId), item.origin, item.status, item.notes], query));
  table("#vacationsTable", rows, (item) => `
    <tr>
      <td><strong>${esc(userName(item.userId))}</strong><small>${esc(item.notes || "Sem observacoes")}</small></td>
      <td><strong>${date(item.startDate)} a ${date(item.endDate)}</strong><small>Validado por: ${esc(item.decidedBy || "pendente")}</small></td>
      <td>${esc(item.days)}</td>
      <td>${esc(item.origin)}</td>
      <td><span class="status ${cls(item.status)}">${esc(item.status)}</span></td>
      <td><div class="row-actions">${role() !== "Funcionario" ? `<button class="row-action" data-edit-vacation="${item.id}">Editar</button><button class="row-action approve" data-approve-vacation="${item.id}">Aprovar</button><button class="row-action delete" data-reject-vacation="${item.id}">Rejeitar</button>` : ""}</div></td>
    </tr>`);
  renderVacationMap();
}

function renderAbsences() {
  const query = value("#absenceSearch");
  const rows = state.absences.filter((item) => role() !== "Funcionario" || item.userId === currentUser()?.id).filter((item) => search([userName(item.userId), item.type, item.status, item.reason], query));
  table("#absencesTable", rows, (item) => `
    <tr>
      <td>${esc(userName(item.userId))}</td>
      <td>${date(item.date)}</td>
      <td>${esc(item.type)}</td>
      <td><span class="status ${cls(item.status)}">${esc(item.status)}</span></td>
      <td><strong>${esc(item.compensateVacation === "Sim" ? "Compensada com férias" : "Sem compensação")}</strong><small>${esc(item.reason || "Sem motivo")}</small></td>
      <td><div class="row-actions">${role() !== "Funcionario" ? `<button class="row-action" data-edit-absence="${item.id}">Editar</button><button class="row-action approve" data-approve-absence="${item.id}">Validar</button><button class="row-action delete" data-reject-absence="${item.id}">Rejeitar</button>` : ""}</div></td>
    </tr>`);
}

function renderVacationMap() {
  const dialog = qs("#vacationMapDialog");
  const openButton = qs("#openVacationMapButton");
  const host = qs("#vacationMap");
  if (openButton) openButton.hidden = !(!isClient() && ["Admin", "RH"].includes(role()));
  if (!dialog || !host) return;
  const visible = !isClient() && ["Admin", "RH"].includes(role());
  if (!visible) {
    host.innerHTML = "";
    return;
  }
  const teamFilter = qs("#vacationMapTeamFilter");
  if (teamFilter) {
    const currentValue = teamFilter.value;
    const teams = vacationMapTeams();
    teamFilter.innerHTML = `<option value="">Todas as equipas</option>${teams.map((team) => `<option value="${esc(team)}" ${currentValue === team ? "selected" : ""}>${esc(team)}</option>`).join("")}`;
  }
  host.innerHTML = buildVacationMapHtml();
}

function buildVacationMapHtml() {
  const records = vacationMapRecords(vacationMapFilters());

  return `
    <div class="vacation-map-card">
      <div class="vacation-map-header">
        <div class="vacation-map-meta">
          <strong>Duomold - Fábrica de Moldes, Lda.</strong>
          <small>Rua do Sobral, 585 - Pavilhão 1 - 3720-602 Oliveira de Azeméis</small>
          <small>Local trabalho: Global</small>
        </div>
      </div>
      ${buildVacationLegendHtml()}
      <div class="vacation-map-grid">
        ${vacationMapMonths.map((monthName, monthIndex) => buildVacationMonthHtml(monthName, monthIndex, records)).join("")}
      </div>
    </div>
  `;
}

function buildVacationLegendHtml() {
  return `
    <div class="vacation-excel-legend" aria-label="Legenda do mapa de férias">
      <div class="vacation-excel-legend-title">Legenda:</div>
      ${vacationLegendItems.map((item) => `
        <div class="vacation-excel-legend-code ${item.className}">${esc(item.code)}</div>
        <div class="vacation-excel-legend-label">${esc(item.label)}</div>
      `).join("")}
    </div>
  `;
}

function buildVacationMonthHtml(monthName, monthIndex, records) {
  const daysInMonth = new Date(vacationMapYear, monthIndex + 1, 0).getDate();
  const monthStart = isoDate(vacationMapYear, monthIndex + 1, 1);
  const monthEnd = isoDate(vacationMapYear, monthIndex + 1, daysInMonth);
  const monthRecords = records.filter((item) => String(item.startDate).localeCompare(monthEnd) <= 0 && String(item.endDate).localeCompare(monthStart) >= 0);

  return `
    <section class="vacation-month-card">
      <div class="vacation-map-scroll">
        ${buildVacationExcelMonthTable(monthName, monthIndex, records)}
      </div>
    </section>
  `;
}

function vacationMapPeople(filters = vacationMapFilters(), records = []) {
  const recordUserIds = new Set(records.map((item) => item.userId));
  return state.users
    .filter((user) => user.status !== "Inativo")
    .filter((user) => user.role === "Funcionario" || recordUserIds.has(user.id))
    .filter((user) => !filters.team || (user.department || "Sem equipa") === filters.team)
    .filter((user) => {
      if (!filters.query) return true;
      const userText = [user.name, user.department, user.position, user.employeeNumber, user.role].join(" ").toLowerCase();
      const recordText = records
        .filter((item) => item.userId === user.id)
        .map((item) => [item.origin, item.status, item.notes, vacationCode(item)].join(" "))
        .join(" ")
        .toLowerCase();
      return `${userText} ${recordText}`.includes(filters.query);
    })
    .sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), "pt"));
}

function vacationMapCellInfo(userId, iso, monthRecords) {
  const item = monthRecords.find((record) => record.userId === userId && iso >= record.startDate && iso <= record.endDate);
  if (item) {
    const code = vacationCode(item);
    return {
      value: code,
      className: `code-${String(code).toLowerCase()}`,
      title: `${userName(userId)} - ${date(iso)} - ${vacationCodeLabel(code)}`
    };
  }
  if (isWeekend(iso)) {
    return {
      value: "N",
      className: "weekend",
      title: `${userName(userId)} - ${date(iso)} - Fim-de-semana`
    };
  }
  return { value: "", className: "", title: `${userName(userId)} - ${date(iso)}` };
}

function buildVacationExcelMonthTable(monthName, monthIndex, records, options = {}) {
  const filters = vacationMapFilters();
  const daysInMonth = new Date(vacationMapYear, monthIndex + 1, 0).getDate();
  const monthStart = isoDate(vacationMapYear, monthIndex + 1, 1);
  const monthEnd = isoDate(vacationMapYear, monthIndex + 1, daysInMonth);
  const monthRecords = records.filter((item) => String(item.startDate).localeCompare(monthEnd) <= 0 && String(item.endDate).localeCompare(monthStart) >= 0);
  const people = vacationMapPeople(filters, records);
  const weekdays = Array.from({ length: daysInMonth }, (_, index) => {
    const iso = isoDate(vacationMapYear, monthIndex + 1, index + 1);
    return `<th class="excel-weekday ${isWeekend(iso) ? "weekend" : ""}">${esc(vacationWeekdayLabel(iso))}</th>`;
  }).join("");
  const dayHeaders = Array.from({ length: daysInMonth }, (_, index) => {
    const iso = isoDate(vacationMapYear, monthIndex + 1, index + 1);
    return `<th class="excel-day-head ${isWeekend(iso) ? "weekend" : ""}">${index + 1}</th>`;
  }).join("");
  const rows = people.map((user) => {
    const cells = Array.from({ length: daysInMonth }, (_, index) => {
      const iso = isoDate(vacationMapYear, monthIndex + 1, index + 1);
      const cell = vacationMapCellInfo(user.id, iso, monthRecords);
      const label = cell.value === "N" ? "N" : index + 1;
      return `<td class="excel-day-cell ${cell.className}" title="${esc(cell.title)}">${esc(label)}</td>`;
    }).join("");
    return `
      <tr>
        <td class="excel-person-cell">${esc(user.name || "Sem colaborador")}</td>
        ${cells}
      </tr>
    `;
  }).join("");
  const monthRowspan = people.length ? people.length + 2 : 3;

  return `
    <table class="vacation-excel-month ${options.printable ? "printable" : ""}">
      <colgroup>
        <col class="excel-month-col">
        <col class="excel-person-col">
        ${Array.from({ length: daysInMonth }, () => `<col class="excel-day-col">`).join("")}
      </colgroup>
      <tbody>
        <tr>
          <th class="excel-month-cell" rowspan="${monthRowspan}">${esc(monthName)}</th>
          <th class="excel-workplace-cell">Local trabalho:</th>
          ${weekdays}
        </tr>
        <tr>
          <th class="excel-filter-cell"><span></span></th>
          ${dayHeaders}
        </tr>
        ${rows || `<tr><td class="excel-person-cell empty" colspan="${daysInMonth + 1}">Sem colaboradores.</td></tr>`}
      </tbody>
    </table>
  `;
}

function vacationMapFilters() {
  const queryRaw = qs("#vacationMapSearch")?.value || "";
  return {
    queryRaw,
    query: queryRaw.trim().toLowerCase(),
    team: qs("#vacationMapTeamFilter")?.value || "",
    code: qs("#vacationMapCodeFilter")?.value || ""
  };
}

function vacationMapRecords(filters = {}) {
  return state.vacations
    .filter((item) => item.status === "Aprovado")
    .filter((item) => item.startDate && item.endDate)
    .filter((item) => overlapsVacationYear(item))
    .filter((item) => {
      const team = vacationTeamName(item.userId);
      if (filters.team && team !== filters.team) return false;
      const code = vacationCode(item);
      if (filters.code && code !== filters.code) return false;
      if (!filters.query) return true;
      const haystack = [userName(item.userId), team, item.origin, item.status, item.notes, code, item.days].join(" ").toLowerCase();
      return haystack.includes(filters.query);
    })
    .sort((a, b) => String(a.startDate).localeCompare(String(b.startDate)) || userName(a.userId).localeCompare(userName(b.userId)));
}

function vacationTeamName(userId) {
  return state.users.find((user) => user.id === userId)?.department || "Sem equipa";
}

function vacationCode(item) {
  return deriveVacationCode(item);
}

function vacationCodeLabel(code) {
  return { F: "F - Férias", BG: "BG - Banco de Horas", DC: "DC - Descanso Compensatório" }[code] || code;
}

function vacationMapTeams() {
  return [...new Set(state.users.map((user) => user.department || "").filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt"));
}

function vacationMapSummary(records) {
  return {
    total: records.length,
    f: records.filter((item) => vacationCode(item) === "F").length,
    bg: records.filter((item) => vacationCode(item) === "BG").length,
    dc: records.filter((item) => vacationCode(item) === "DC").length,
    days: records.reduce((total, item) => total + Number(item.days || 0), 0)
  };
}

function overlapsVacationYear(item) {
  const start = String(item.startDate || "");
  const end = String(item.endDate || "");
  const yearStart = isoDate(vacationMapYear, 1, 1);
  const yearEnd = isoDate(vacationMapYear, 12, 31);
  return start <= yearEnd && end >= yearStart;
}

function isoDate(year, month, day) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function maxIso(a, b) {
  return String(a || "").localeCompare(String(b || "")) >= 0 ? String(a || "") : String(b || "");
}

function minIso(a, b) {
  return String(a || "").localeCompare(String(b || "")) <= 0 ? String(a || "") : String(b || "");
}

function isWeekend(iso) {
  const day = new Date(`${iso}T00:00:00`).getDay();
  return day === 0 || day === 6;
}

function vacationWeekdayLabel(iso) {
  return vacationWeekdays[new Date(`${iso}T00:00:00`).getDay()];
}

function statusClass(status) {
  if (status === "Aprovado") return "approved";
  if (status === "Pendente") return "pending";
  return "rejected";
}

function openDialog(mode, id = null, defaults = {}) {
  if (mode === "user" && !canManageUsers()) return;
  dialogMode = mode;
  editingId = id;
  const sourceMode = mode === "profileUser" ? "user" : mode === "profileClient" ? "client" : mode;
  const baseRecord = id ? collection(sourceMode).find((item) => item.id === id) : { ...defaultRecord(sourceMode), ...defaults };
  const record = ["client", "profileClient"].includes(mode) ? clientFormRecord(baseRecord || {}) : baseRecord;
  dialogAttachments = mode === "absence" ? cloneAttachments(record?.attachments) : [];
  qs("#dialogTitle").textContent = dialogTitle(mode, Boolean(id));
  qs("#dialogSubtitle").textContent = dialogSubtitle(mode);
  qs("#formAlert").textContent = "";
  const fieldsHtml = forms[mode].map((field) => fieldHtml(field, record || {})).join("");
  qs("#formFields").innerHTML = mode === "order" ? `${fieldsHtml}${orderHistoryField(record || {})}` : fieldsHtml;
  qs("#recordDialog").showModal();
  setupDialogRules(mode);
}

function dialogTitle(mode, editing) {
  if (mode === "profileUser" || mode === "profileClient") return "Editar perfil";
  if (mode === "vacation") return editing ? "Editar pedido de férias" : "Novo pedido de férias";
  if (mode === "absence") return editing ? "Editar falta" : "Nova falta";
  return `${editing ? "Editar" : "Novo"} ${label(mode)}`;
}

function dialogSubtitle(mode) {
  if (mode === "profileUser" || mode === "profileClient") return "Atualize as informações do perfil atual.";
  if (mode === "client") return "Preencha os dados do cliente e da empresa na mesma ficha.";
  if (mode === "vacation") return `Escolha as datas. O sistema calcula os dias úteis e limita cada pedido a ${maxVacationRequestDays} dias.`;
  if (mode === "absence") return "Registe a falta e indique se ela deve ser compensada com 1 dia de férias.";
  return "Preencha os dados principais.";
}

function fieldHtml([name, labelText, type, required], record) {
  const valueText = name === "mapCode" && dialogMode === "vacation" && !record[name] ? "F" : record[name] || "";
  const req = required ? "required" : "";
  if (type === "textarea") return `<label class="field full"><span>${labelText}</span><textarea name="${name}" ${req}>${esc(valueText)}</textarea></label>`;
  if (type === "company") return selectField(name, labelText, state.companies.map((item) => [item.id, item.name]), valueText, req);
  if (type === "client") return selectField(name, labelText, state.clients.map((item) => [item.id, item.name]), valueText, req);
  if (type === "user") {
    const users = role() === "Funcionario" && ["vacation", "absence"].includes(dialogMode) ? state.users.filter((item) => item.id === currentUser()?.id) : state.users;
    return selectField(name, labelText, users.map((item) => [item.id, item.name]), valueText, req);
  }
  if (name === "origin" && dialogMode === "vacation" && role() === "Funcionario") {
    return `<label class="field"><span>${labelText}</span><select name="${name}" disabled><option value="Funcionario" selected>Funcionario</option></select><input type="hidden" name="${name}" value="Funcionario"></label>`;
  }
  if (type === "attachments" && dialogMode === "absence") return absenceAttachmentsField();
  if (type.startsWith("select:")) return selectField(name, labelText, type.replace("select:", "").split("|").map((item) => [item, item]), valueText, req);
  return `<label class="field"><span>${labelText}</span><input name="${name}" type="${type}" value="${esc(valueText)}" ${req}></label>`;
}

function orderHistoryField(record) {
  const history = Array.isArray(record.history) ? record.history : [];
  return `
    <section class="field full order-history-block">
      <div class="order-history-header">
        <div>
          <span>Historico da encomenda</span>
          <small>Regista apenas as observacoes inseridas pelo Admin.</small>
        </div>
      </div>
      <div class="order-history-inputs">
        <label class="field">
          <span>Data do registo</span>
          <input name="historyDate" type="date" value="${today()}">
        </label>
        <label class="field full">
          <span>Nova observacao para o historico</span>
          <textarea name="historyNote" placeholder="Ex: Cliente ficou de enviar o 3D peca final em 21-05-2026."></textarea>
        </label>
      </div>
      <div class="order-history-list" id="orderHistoryList">
        ${history.length ? history.map((entry) => orderHistoryItemHtml(entry, record.id)).join("") : `<p class="photo-empty">Ainda sem historico registado.</p>`}
      </div>
    </section>`;
}

function orderHistoryItemHtml(entry, orderId = "") {
  const details = Array.isArray(entry.details) ? entry.details : entry.details ? [entry.details] : [];
  return `
    <article class="order-history-item">
      <div class="order-history-top">
        <strong>${esc(date(entry.at || entry.date || today()))}</strong>
        <span class="status ${cls(entry.status || "Falta")} order-history-status">${esc(entry.status || "Falta")}</span>
        <span>${esc(entry.by || "Sistema")}</span>
      </div>
      <div class="order-history-body">
        <div class="order-history-summary">${esc(entry.summary || "Registo")}</div>
        <label class="order-history-check-option">
          <input data-order-history-toggle data-order-id="${esc(orderId || entry.orderId || "")}" data-history-id="${esc(entry.id || "")}" type="checkbox" ${String(entry.status || "Falta") === "Entregue" ? "checked" : ""}>
          <span>Marcado como Entregue</span>
        </label>
      </div>
      ${details.length ? `<ul>${details.map((detail) => `<li>${esc(detail)}</li>`).join("")}</ul>` : ""}
    </article>`;
}

function refreshOrderHistoryList(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) return;
  const list = qs("#orderHistoryList");
  if (!list) return;
  const history = Array.isArray(order.history) ? order.history : [];
  list.innerHTML = history.length ? history.map((entry) => orderHistoryItemHtml(entry, order.id)).join("") : `<p class="photo-empty">Ainda sem historico registado.</p>`;
}

function toggleOrderHistoryStatus(orderId, historyId, delivered) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order || !Array.isArray(order.history)) return;
  const entry = order.history.find((item) => item.id === historyId);
  if (!entry) return;
  entry.status = delivered ? "Entregue" : "Falta";
  saveState();
  refreshOrderHistoryList(orderId);
}

function selectField(name, labelText, options, valueText, req) {
  return `<label class="field"><span>${labelText}</span><select name="${name}" ${req}>${options.map(([valueOption, labelOption]) => `<option value="${esc(valueOption)}" ${valueText === valueOption ? "selected" : ""}>${esc(labelOption)}</option>`).join("")}</select></label>`;
}

function absenceAttachmentsField() {
  return `
    <section class="field full record-attachments">
      <div class="record-attachments-header">
        <div>
          <span>Anexos</span>
          <small>Fotos, PDFs e documentos de apoio à falta.</small>
        </div>
        <label class="photo-upload-button">
          Adicionar anexos
          <input data-absence-attachment-upload type="file" accept="image/png,image/jpeg,image/webp,application/pdf,.pdf,.doc,.docx" multiple hidden>
        </label>
      </div>
      <div class="record-attachment-grid" id="absenceAttachmentGrid">${absenceAttachmentsHtml()}</div>
    </section>`;
}

function absenceAttachmentsHtml() {
  if (!dialogAttachments.length) return `<p class="photo-empty">Ainda sem anexos.</p>`;
  return dialogAttachments.map((attachment) => {
    const isImage = isImageAttachment(attachment);
    return `
      <article class="record-attachment-card" data-absence-attachment-id="${attachment.id}">
        ${isImage ? `<img src="${esc(attachment.src)}" alt="${esc(attachment.name)}" class="record-attachment-thumb">` : `<div class="record-attachment-thumb record-attachment-file">${attachmentLabel(attachment)}</div>`}
        <div class="record-attachment-meta">
          <strong>${esc(attachment.name)}</strong>
          <small>${esc(attachment.typeLabel || attachment.type || "Ficheiro")}</small>
          <a class="text-button" href="${esc(attachment.src)}" download="${esc(attachment.name)}" target="_blank" rel="noreferrer">Abrir / descarregar</a>
        </div>
        <button class="planning-mini red" data-absence-attachment-delete="${attachment.id}" type="button">X</button>
      </article>`;
  }).join("");
}

function cloneAttachments(list) {
  return Array.isArray(list) ? list.map((item) => ({ ...item })) : [];
}

function isImageAttachment(attachment) {
  return Boolean(attachment?.type?.startsWith("image/") || attachment?.typeLabel === "Imagem");
}

function attachmentLabel(attachment) {
  if (isImageAttachment(attachment)) return "IMG";
  const ext = String(attachment?.name || "").split(".").pop().slice(0, 4).toUpperCase();
  return ext || "DOC";
}

function handleAbsenceAttachmentUpload(input) {
  if (!input.files?.length) return;
  const files = [...input.files];
  Promise.all(files.map(readAttachmentFile)).then((items) => {
    dialogAttachments.push(...items.filter(Boolean));
    input.value = "";
    refreshAbsenceAttachmentArea();
  });
}

function readAttachmentFile(file) {
  return new Promise((resolve) => {
    if (!isAllowedAttachment(file)) {
      resolve(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        id: `attachment-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        name: file.name,
        type: file.type || guessAttachmentType(file.name),
        typeLabel: isImageFile(file) ? "Imagem" : "Documento",
        src: reader.result
      });
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}

function guessAttachmentType(fileName) {
  const ext = String(fileName || "").split(".").pop().toLowerCase();
  if (["png", "jpg", "jpeg", "webp", "gif"].includes(ext)) return `image/${ext === "jpg" ? "jpeg" : ext}`;
  if (ext === "pdf") return "application/pdf";
  return ext ? `application/${ext}` : "application/octet-stream";
}

function isImageFile(file) {
  const type = String(file?.type || "").toLowerCase();
  if (type.startsWith("image/")) return true;
  const ext = String(file?.name || "").split(".").pop().toLowerCase();
  return ["png", "jpg", "jpeg", "webp", "gif"].includes(ext);
}

function isAllowedAttachment(file) {
  const type = String(file?.type || "").toLowerCase();
  const ext = String(file?.name || "").split(".").pop().toLowerCase();
  if (isImageFile(file)) return true;
  if (type === "application/pdf" || ext === "pdf") return true;
  if (["doc", "docx"].includes(ext)) return true;
  return false;
}

function refreshAbsenceAttachmentArea() {
  const grid = qs("#absenceAttachmentGrid");
  if (!grid) return;
  grid.innerHTML = absenceAttachmentsHtml();
}

function removeAbsenceAttachment(id) {
  dialogAttachments = dialogAttachments.filter((item) => item.id !== id);
  refreshAbsenceAttachmentArea();
}

function handleSubmit(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  if (dialogMode === "client") {
    saveClientWithCompany(data);
    qs("#recordDialog").close();
    saveState();
    return;
  }
  if (dialogMode === "profileClient") {
    const previousId = editingId;
    editingId = currentClient()?.id || previousId;
    saveClientWithCompany(data);
    editingId = previousId;
    qs("#recordDialog").close();
    saveState();
    return;
  }
  if (dialogMode === "profileUser") {
    const current = currentUser();
    if (current) Object.assign(current, data);
    qs("#recordDialog").close();
    saveState();
    return;
  }
  if (dialogMode === "vacation") {
    if (role() === "Funcionario") data.origin = "Funcionario";
    if (!editingId && ["Admin", "RH"].includes(role()) && data.userId === currentUser()?.id) data.status = "Pendente";
    data.mapCode = deriveVacationCode(data);
    const validation = validateVacation(data);
    if (!validation.ok) {
      qs("#formAlert").textContent = validation.message;
      return;
    }
    data.days = String(validation.days);
    if (data.status !== "Pendente") {
      data.decidedBy = currentUser()?.name || "Admin/RH";
      data.decidedById = currentUser()?.id || "";
      data.decidedAt = new Date().toISOString();
    }
  }
  if (dialogMode === "absence") {
    const wasEditingAbsence = Boolean(editingId);
    data.attachments = cloneAttachments(dialogAttachments);
    const existingCompensation = editingId && state.vacations.some((item) => item.linkedAbsenceId === editingId);
    const usedForCompensation = vacationDaysUsed(data.userId) - (existingCompensation ? 1 : 0);
    if (data.compensateVacation === "Sim" && data.status !== "Rejeitado" && usedForCompensation + 1 > annualVacationDays) {
      qs("#formAlert").textContent = "Não é possível compensar com férias porque o colaborador já atingiu o limite anual de 22 dias.";
      return;
    }
    const savedAbsence = saveAbsenceWithCompensation(data);
    if (!wasEditingAbsence) notifyAbsenceRequest(savedAbsence);
    qs("#recordDialog").close();
    saveState();
    return;
  }
  const target = collection(dialogMode);
  let savedRecord = null;
  const previousRecord = editingId ? structuredClone(target.find((item) => item.id === editingId) || null) : null;
  const wasEditing = Boolean(editingId);
  if (editingId) {
    const index = target.findIndex((item) => item.id === editingId);
    target[index] = { ...target[index], ...data };
    savedRecord = target[index];
  } else {
    savedRecord = { id: `${dialogMode}-${Date.now()}`, ...data };
    target.push(savedRecord);
  }
  if (dialogMode === "order") {
    applyOrderHistory(savedRecord, previousRecord, data.historyDate || today(), String(data.historyNote || "").trim(), wasEditing);
    delete savedRecord.historyDate;
    delete savedRecord.historyNote;
  }
  if (dialogMode === "order") notifyOrderChange(savedRecord, wasEditing);
  if (dialogMode === "vacation" && !wasEditing) notifyVacationRequest(savedRecord);
  qs("#recordDialog").close();
  saveState();
}

function applyOrderHistory(order, previousRecord, historyDate, manualNote, wasEditing) {
  if (!order) return;
  if (!Array.isArray(order.history)) order.history = [];
  if (!manualNote) return;

  order.history.unshift({
    id: `order-history-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    orderId: order.id,
    at: historyDate || today(),
    by: currentUser()?.name || "Sistema",
    status: "Falta",
    summary: "Observação da encomenda",
    details: [manualNote]
  });
}

function clientFormRecord(client) {
  const company = companyForClient(client);
  return {
    ...client,
    companyName: company.name || "",
    vat: company.vat || "",
    city: company.city || "",
    sector: company.sector || "",
    address: company.address || ""
  };
}

function saveClientWithCompany(data) {
  const companyData = {
    name: data.companyName || data.name,
    vat: data.vat || "",
    email: data.email || "",
    phone: data.phone || "",
    city: data.city || "",
    sector: data.sector || "",
    address: data.address || "",
    notes: data.notes || ""
  };
  const existingClient = editingId ? state.clients.find((client) => client.id === editingId) : null;
  const companyId = existingClient?.companyId || `empresa-${Date.now()}`;
  const companyIndex = state.companies.findIndex((company) => company.id === companyId);
  if (companyIndex >= 0) state.companies[companyIndex] = { ...state.companies[companyIndex], ...companyData, id: companyId };
  else state.companies.push({ id: companyId, ...companyData });

  const clientData = {
    name: data.name,
    companyId,
    email: data.email,
    password: data.password || existingClient?.password || "cliente123",
    phone: data.phone,
    status: data.status || existingClient?.status || "Ativo",
    owner: data.owner || existingClient?.owner || "Admin",
    role: data.role,
    notes: data.notes
  };
  if (existingClient) Object.assign(existingClient, clientData);
  else state.clients.push({ id: `client-${Date.now()}`, ...clientData });
}

function openPasswordDialog() {
  const record = currentAccountRecord();
  if (!record) return;
  qs("#passwordDialogSubtitle").textContent = `Atualizar senha de ${record.name || "perfil atual"}.`;
  qs("#passwordAlert").textContent = "";
  qs("#passwordForm").reset();
  qs("#passwordDialog").showModal();
}

function openProfileDialog() {
  if (isClient()) {
    const client = currentClient();
    if (client) openDialog("profileClient", client.id);
    return;
  }
  const user = currentUser();
  if (user) openDialog("profileUser", user.id);
}

function handlePasswordSubmit(event) {
  event.preventDefault();
  const record = currentAccountRecord();
  if (!record) return;
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  if (data.currentPassword !== record.password) {
    qs("#passwordAlert").textContent = "A senha atual não está correta.";
    return;
  }
  if (data.newPassword !== data.confirmPassword) {
    qs("#passwordAlert").textContent = "A confirmação não corresponde à nova senha.";
    return;
  }
  if (String(data.newPassword || "").length < 4) {
    qs("#passwordAlert").textContent = "A nova senha deve ter pelo menos 4 caracteres.";
    return;
  }
  record.password = data.newPassword;
  saveState();
  qs("#passwordDialog").close();
  alert("Senha alterada com sucesso.");
}

function notifyVacationRequest(vacation) {
  if (!vacation || vacation.status !== "Pendente") return;
  const employee = userName(vacation.userId);
  notifyMany(managerNotificationTargets(vacation.userId), {
    title: "Novo pedido de férias",
    message: `${employee} pediu férias de ${date(vacation.startDate)} a ${date(vacation.endDate)}.`,
    link: "vacations",
    recordType: "vacation",
    recordId: vacation.id
  });
  const recipients = state.users
    .filter((user) => managerNotificationTargets(vacation.userId).includes(`role:${user.role}`) && user.email)
    .map((user) => user.email);
  if (!recipients.length) return;
  const subject = `Pedido de férias pendente - ${employee}`;
  const body = [
    "Olá,",
    "",
    "Existe um novo pedido de férias pendente no sistema DUOMOLD.",
    "",
    `Colaborador: ${employee}`,
    `Período: ${date(vacation.startDate)} a ${date(vacation.endDate)}`,
    `Dias úteis: ${vacation.days}`,
    `Estado: ${vacation.status}`,
    vacation.notes ? `Observações: ${vacation.notes}` : "",
    "",
    "Por favor, aceda ao sistema para validar o pedido em Férias.",
    "",
    "Sistema DUOMOLD"
  ].filter(Boolean).join("\n");
  const mailto = `mailto:${recipients.join(",")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  setTimeout(() => {
    window.location.href = mailto;
  }, 150);
}

function notifyAbsenceRequest(absence) {
  if (!absence || absence.status !== "Pendente") return;
  const employee = userName(absence.userId);
  notifyMany(managerNotificationTargets(absence.userId), {
    title: "Nova falta pendente",
    message: `${employee} registou falta em ${date(absence.date)}.`,
    link: "absences",
    recordType: "absence",
    recordId: absence.id
  });
}

function notifyOrderChange(order, wasEditing) {
  if (!order?.clientId) return;
  addNotification({
    to: `client:${order.clientId}`,
    title: "Encomenda atualizada",
    message: order.reference || "Sem número de encomenda",
    link: "clientPortal",
    recordType: "order",
    recordId: order.id
  });
}

function scheduleOrderClientNotification(order) {
  if (!order?.id || !order.clientId || isClient()) return;
  clearTimeout(orderNotificationTimers.get(order.id));
  orderNotificationTimers.set(order.id, setTimeout(() => {
    orderNotificationTimers.delete(order.id);
    notifyOrderChange(order, true);
    persistStateOnly();
    renderNotifications();
  }, 1200));
}

function setupDialogRules(mode) {
  if (mode !== "vacation") return;
  const form = qs("#recordForm");
  const start = form.elements.startDate;
  const end = form.elements.endDate;
  const days = form.elements.days;
  const user = form.elements.userId;
  days.readOnly = true;
  days.required = false;
  days.parentElement.insertAdjacentHTML("beforeend", `<small class="field-hint" id="vacationDayHint"></small>`);
  const update = () => updateVacationCalculation();
  [start, end, user].forEach((field) => field?.addEventListener("change", update));
  update();
}

function updateVacationCalculation() {
  const form = qs("#recordForm");
  if (dialogMode !== "vacation" || !form) return;
  const start = form.elements.startDate;
  const end = form.elements.endDate;
  const days = form.elements.days;
  const hint = qs("#vacationDayHint");
  if (!start.value) {
    days.value = "";
    if (hint) hint.textContent = "Preencha a data inicial para calcular os dias.";
    return;
  }
  end.min = start.value;
  end.max = addDays(start.value, maxVacationRequestDays - 1);
  if (!end.value || end.value < start.value) end.value = start.value;
  if (end.value > end.max) end.value = end.max;
  let total = businessDays(start.value, end.value);
  while (total > maxVacationRequestDays) {
    end.value = addDays(end.value, -1);
    total = businessDays(start.value, end.value);
  }
  days.value = total || "";
  const used = vacationDaysUsed(form.elements.userId.value, editingId);
  const remaining = Math.max(annualVacationDays - used - total, 0);
  if (hint) hint.textContent = `Total deste pedido: ${total} dias úteis. Já usados/pendentes: ${used}/${annualVacationDays}. Restam após este pedido: ${remaining}.`;
}

function validateVacation(data) {
  const days = businessDays(data.startDate, data.endDate);
  if (!data.startDate || !data.endDate) return { ok: false, message: "Preencha a data inicial e a data final." };
  if (new Date(data.endDate) < new Date(data.startDate)) return { ok: false, message: "A data final não pode ser anterior à data inicial." };
  if (data.endDate > addDays(data.startDate, maxVacationRequestDays - 1)) return { ok: false, message: `A data final pode ir apenas até ${maxVacationRequestDays} dias corridos a partir da data inicial.` };
  if (days < 1) return { ok: false, message: "O período precisa ter pelo menos 1 dia útil." };
  if (days > maxVacationRequestDays) return { ok: false, message: `Cada pedido de férias pode ter no máximo ${maxVacationRequestDays} dias úteis a partir da data inicial.` };
  const used = vacationDaysUsed(data.userId, editingId);
  if (used + days > annualVacationDays) return { ok: false, message: `Este colaborador já tem ${used} dias usados/pendentes. O limite anual é ${annualVacationDays} dias.` };
  return { ok: true, days };
}

function deriveVacationCode(data = {}) {
  const candidate = String(data.mapCode || data.code || "").toUpperCase().trim();
  if (["F", "BG", "DC"].includes(candidate)) return candidate;
  if (String(data.origin || "").toLowerCase().includes("compensa")) return "DC";
  if (String(data.origin || "").toLowerCase().includes("banco")) return "BG";
  if (String(data.notes || "").toLowerCase().includes("compensa")) return "DC";
  if (String(data.notes || "").toLowerCase().includes("banco")) return "BG";
  return "F";
}

function vacationDaysUsed(userId, ignoreId = null) {
  return state.vacations
    .filter((item) => item.userId === userId && item.id !== ignoreId && item.status !== "Rejeitado")
    .reduce((total, item) => total + Number(item.days || 0), 0);
}

function businessDays(startValue, endValue) {
  if (!startValue || !endValue) return 0;
  const start = new Date(`${startValue}T00:00:00`);
  const end = new Date(`${endValue}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) return 0;
  let total = 0;
  const current = new Date(start);
  while (current <= end) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) total += 1;
    current.setDate(current.getDate() + 1);
  }
  return total;
}

function addDays(valueText, amount) {
  const dateValue = new Date(`${valueText}T00:00:00`);
  dateValue.setDate(dateValue.getDate() + amount);
  const month = String(dateValue.getMonth() + 1).padStart(2, "0");
  const day = String(dateValue.getDate()).padStart(2, "0");
  return `${dateValue.getFullYear()}-${month}-${day}`;
}

function saveAbsenceWithCompensation(data) {
  const target = state.absences;
  const id = editingId || `absence-${Date.now()}`;
  const record = { id, ...data };
  const index = target.findIndex((item) => item.id === id);
  if (index >= 0) target[index] = { ...target[index], ...record };
  else target.push(record);

  syncAbsenceCompensation(record);
  return record;
}

function syncAbsenceCompensation(absence) {
  const removed = state.vacations.filter((item) => item.linkedAbsenceId === absence.id);
  state.vacations = state.vacations.filter((item) => item.linkedAbsenceId !== absence.id);
  removed.forEach((item) => void deleteSupabaseRecord("vacations", item.id));
  if (absence.compensateVacation !== "Sim" || absence.status === "Rejeitado") return;
  const status = absence.status === "Aprovado" ? "Aprovado" : "Pendente";
  state.vacations.push({
    id: `vac-comp-${absence.id}`,
    userId: absence.userId,
    startDate: absence.date,
    endDate: absence.date,
    days: "1",
    origin: "Compensação de falta",
    status,
    notes: `Compensação da falta de ${date(absence.date)} para evitar desconto.`,
    decidedBy: status === "Aprovado" ? currentUser()?.name || "Admin/RH" : "",
    linkedAbsenceId: absence.id
  });
}

function collection(mode) {
  return { client: state.clients, company: state.companies, order: state.orders, user: state.users, vacation: state.vacations, absence: state.absences }[mode];
}

function defaultRecord(mode) {
  if (mode === "order") return { clientId: state.clients[0]?.id, status: "Recebido", progress: "0", showPlanningToClient: "Sim", showScheduleToClient: "Sim", history: [] };
  if (mode === "vacation") return { userId: currentUser()?.id || "user-funcionario", origin: role() === "Funcionario" ? "Funcionario" : "Admin/RH", status: role() === "Funcionario" ? "Pendente" : "Aprovado" };
  if (mode === "absence") return { userId: currentUser()?.id || "user-funcionario", type: "Justificada", compensateVacation: "Não", status: "Pendente" };
  if (mode === "user") return { employeeNumber: `COL-${String(state.users.length + 1).padStart(3, "0")}`, role: "Funcionario", status: "Ativo" };
  if (mode === "client") return { companyName: "", status: "Ativo", password: "cliente123" };
  return {};
}

function label(mode) {
  return { client: "cliente / empresa", company: "empresa", order: "encomenda", user: "colaborador", vacation: "férias", absence: "falta" }[mode];
}

function deleteRecord(mode, id) {
  if (!confirm(`Apagar ${label(mode)}?`)) return;
  const key = { client: "clients", company: "companies", order: "orders", user: "users", vacation: "vacations", absence: "absences" }[mode];
  state[key] = state[key].filter((item) => item.id !== id);
  if (mode === "absence") state.vacations = state.vacations.filter((item) => item.linkedAbsenceId !== id);
  const tableName = { client: "clients", company: "companies", order: "orders", user: "users", vacation: "vacations", absence: "absences" }[mode];
  void deleteSupabaseRecord(tableName, id);
  saveState();
}

function approve(mode, id, status) {
  const item = collection(mode).find((record) => record.id === id);
  if (!item) return;
  item.status = status;
  item.decidedBy = currentUser()?.name || "Admin";
  item.decidedById = currentUser()?.id || "";
  item.decidedAt = new Date().toISOString();
  if (mode === "absence") syncAbsenceCompensation(item);
  if (mode === "vacation") addNotification({
    to: `user:${item.userId}`,
    title: `Pedido de férias ${status.toLowerCase()}`,
    message: `${userName(item.userId)}, o seu pedido de ${date(item.startDate)} a ${date(item.endDate)} foi ${status.toLowerCase()} por ${currentUser()?.name || "Admin/RH"}.`,
    link: "vacations",
    recordType: "vacation",
    recordId: item.id
  });
  if (mode === "absence") addNotification({
    to: `user:${item.userId}`,
    title: `Falta ${status.toLowerCase()}`,
    message: `${userName(item.userId)}, a sua falta de ${date(item.date)} foi ${status.toLowerCase()} por ${currentUser()?.name || "Admin/RH"}.`,
    link: "absences",
    recordType: "absence",
    recordId: item.id
  });
  saveState();
}

function openVacationMapDialog() {
  if (isClient() || !["Admin", "RH"].includes(role())) return;
  renderVacationMap();
  qs("#vacationMapDialog")?.showModal();
}

function printVacationMap() {
  if (isClient() || !["Admin", "RH"].includes(role())) return;
  renderVacationMap();
  const dialog = qs("#vacationMapDialog");
  if (dialog && !dialog.open) dialog.showModal();
  document.body.classList.add("printing-vacation-map");
  setTimeout(() => {
    window.print();
    setTimeout(() => document.body.classList.remove("printing-vacation-map"), 250);
  }, 50);
}

function exportVacationMapExcel() {
  const records = vacationMapRecords(vacationMapFilters());
  const html = buildVacationMapExcelHtml(records);
  const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `mapa-ferias-${vacationMapYear}.xls`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

function exportVacationMapPdf() {
  downloadVacationMapPdf();
}

async function exportCurrentViewPdf() {
  const { jsPDF } = window.jspdf || {};
  const activeView = qs(".view.active");
  if (typeof window.html2canvas !== "function" || !jsPDF || !activeView) {
    alert("Não foi possível gerar o PDF nesta página.");
    return;
  }

  const button = qs("#exportButton");
  const previousText = button.textContent;
  button.disabled = true;
  button.textContent = "A gerar PDF...";

  const source = document.createElement("section");
  source.className = "pdf-export-sheet";
  source.innerHTML = `
    <header class="pdf-export-header">
      <strong>DUOMOLD</strong>
      <h1>${esc(titles[currentView]?.[0] || "Documento")}</h1>
      <p>${esc(titles[currentView]?.[1] || "")}</p>
      <small>Exportado em ${dateTime(new Date().toISOString())}</small>
    </header>
    <div class="pdf-export-body">${activeView.cloneNode(true).outerHTML}</div>
  `;
  document.body.appendChild(source);

  try {
    const canvas = await window.html2canvas(source, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      windowWidth: Math.max(source.scrollWidth, 1200)
    });
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let remainingHeight = imgHeight;
    let position = 0;
    const imageData = canvas.toDataURL("image/png");

    doc.addImage(imageData, "PNG", 0, position, imgWidth, imgHeight);
    remainingHeight -= pageHeight;
    while (remainingHeight > 0) {
      position -= pageHeight;
      doc.addPage();
      doc.addImage(imageData, "PNG", 0, position, imgWidth, imgHeight);
      remainingHeight -= pageHeight;
    }
    doc.save(`${slugify(titles[currentView]?.[0] || "pagina")}.pdf`);
  } catch (error) {
    console.warn("Nao foi possivel exportar PDF.", error);
    alert("Não foi possível gerar o PDF desta página.");
  } finally {
    source.remove();
    button.disabled = false;
    button.textContent = previousText;
  }
}

function slugify(value) {
  return String(value || "documento")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "documento";
}

function openVacationMapPrintableDocument() {
  openVacationMapDialog();
}

async function downloadVacationMapPdf() {
  if (isClient() || !["Admin", "RH"].includes(role())) return;
  const { jsPDF } = window.jspdf || {};
  if (typeof window.html2canvas !== "function" || !jsPDF) {
    alert("As bibliotecas de PDF não carregaram corretamente.");
    return;
  }
  const records = vacationMapRecords(vacationMapFilters());
  const frame = document.createElement("iframe");
  frame.setAttribute("aria-hidden", "true");
  frame.style.position = "fixed";
  frame.style.left = "-10000px";
  frame.style.top = "0";
  frame.style.width = "1600px";
  frame.style.height = "1200px";
  frame.style.border = "0";
  frame.srcdoc = buildVacationMapPrintableHtml(records);
  document.body.appendChild(frame);

  try {
    await new Promise((resolve, reject) => {
      frame.addEventListener("load", resolve, { once: true });
      frame.addEventListener("error", reject, { once: true });
    });

    const source = frame.contentDocument?.querySelector(".sheet") || frame.contentDocument?.body;
    if (!source) throw new Error("Documento de impressão indisponível.");

    const canvas = await window.html2canvas(source, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      windowWidth: 1600,
      windowHeight: Math.max(source.scrollHeight, 1200)
    });

    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });
    const margin = 6;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const usableWidth = pageWidth - margin * 2;
    const usableHeight = pageHeight - margin * 2;
    const imgHeight = (canvas.height * usableWidth) / canvas.width;
    const imgData = canvas.toDataURL("image/png");

    let heightLeft = imgHeight;
    let position = margin;
    doc.addImage(imgData, "PNG", margin, position, usableWidth, imgHeight);
    heightLeft -= usableHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight + margin;
      doc.addPage();
      doc.addImage(imgData, "PNG", margin, position, usableWidth, imgHeight);
      heightLeft -= usableHeight;
    }

    doc.save(`mapa-ferias-${vacationMapYear}.pdf`);
  } catch (error) {
    console.error(error);
    alert("Não foi possível gerar o PDF do mapa de férias.");
  } finally {
    frame.remove();
  }
}

function buildVacationMapExcelHtml(records) {
  const teams = vacationMapTeams();
  const months = vacationMapMonths.map((monthName, monthIndex) => buildVacationMapExcelMonth(monthName, monthIndex, records)).join("");
  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; color: #111; }
        h1 { margin: 0 0 8px; }
        h2 { margin: 24px 0 8px; }
        table { border-collapse: collapse; width: 100%; margin-bottom: 18px; }
        th, td { border: 1px solid #333; padding: 6px 8px; font-size: 11px; }
        th { background: #f1f1f1; }
        .code-f { background: #00b0f0; }
        .code-bg { background: #dbeafe; }
        .code-dc { background: #dcfce7; }
        .weekend { background: #ffffff; font-weight: 700; text-align: center; }
        .vacation-excel-legend { display: grid; grid-template-columns: 76px repeat(8, 28px minmax(112px, 1fr)); margin-bottom: 12px; border: 0; font-family: Calibri, Arial, sans-serif; font-size: 12px; }
        .vacation-excel-legend-title, .vacation-excel-legend-code, .vacation-excel-legend-label { min-height: 18px; border-right: 1px solid #d9d9d9; border-bottom: 1px solid #d9d9d9; display: grid; align-items: center; }
        .vacation-excel-legend-title { align-items: center; font-size: 13px; font-weight: 700; }
        .vacation-excel-legend-code { justify-content: center; font-weight: 700; text-align: center; }
        .vacation-excel-legend-label { justify-content: center; text-align: center; padding: 0 6px; }
        .vacation-excel-legend-code.national-holiday { background: #b8cce4; }
        .vacation-excel-legend-code.municipal-holiday { background: #c2d69b; }
        .vacation-excel-legend-code.weekend { background: #ffffff; }
        .vacation-excel-legend-code.vacation { background: #00b0f0; }
        .vacation-excel-legend-code.blocked-day { background: #ff0000; }
        .vacation-excel-legend-code.carnival { background: #ccc0d9; }
        .vacation-excel-legend-code.previous-year { background: #e36d09; }
        .vacation-excel-legend-code.half-day { background: #92cddc; }
        .vacation-excel-month { width: max-content; min-width: 100%; border-collapse: collapse; table-layout: fixed; color: #000; font-family: Calibri, Arial, sans-serif; font-size: 11px; line-height: 1; }
        .vacation-excel-month th, .vacation-excel-month td { height: 17px; min-height: 17px; border: 1px solid #2f75b5; padding: 0 3px; text-align: center; vertical-align: middle; font-weight: 700; color: #000; }
        .vacation-excel-month .excel-month-col { width: 74px; }
        .vacation-excel-month .excel-person-col { width: 194px; }
        .vacation-excel-month .excel-day-col { width: 45px; }
        .vacation-excel-month .excel-month-cell { background: #dbe5f1; font-weight: 400; text-transform: uppercase; }
        .vacation-excel-month .excel-workplace-cell { border-color: #00b050; border-bottom-color: #2f75b5; background: #ffffff; text-align: left; font-weight: 400; }
        .vacation-excel-month .excel-filter-cell { border-color: #00b050; border-top-color: #2f75b5; background: #f2f2f2; }
        .vacation-excel-month .excel-weekday { background: #ffffff; font-size: 12px; font-weight: 700; }
        .vacation-excel-month .excel-day-head, .vacation-excel-month .excel-day-cell { background: #ffffff; font-size: 12px; font-weight: 700; }
        .vacation-excel-month .excel-person-cell { color: #c00000; background: #ffffff; text-align: center; font-weight: 400; }
        .vacation-excel-month .excel-day-cell.code-f { background: #00b0f0; }
        .vacation-excel-month .excel-day-cell.code-bg { background: #92cddc; }
        .vacation-excel-month .excel-day-cell.code-dc { background: #e36d09; }
        .vacation-excel-month .excel-day-cell.weekend { background: #ffffff; }
      </style>
    </head>
    <body>
      <h1>Mapa Férias ${vacationMapYear} - Global</h1>
      <p>Empresa: Duomold - Fábrica de Moldes, Lda.</p>
      <p>Equipas: ${esc(teams.join(", ") || "Sem equipas")}</p>
      ${buildVacationLegendHtml()}
      ${months}
    </body>
  </html>`;
}

function buildVacationMapPrintableHtml(records) {
  const teams = vacationMapTeams();
  const months = vacationMapMonths.map((monthName, monthIndex) => buildVacationMapPrintableMonth(monthName, monthIndex, records)).join("");
  return `<!doctype html>
  <html lang="pt">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Mapa de Férias ${vacationMapYear}</title>
      <style>
        :root {
          color-scheme: light;
          --ink: #101828;
          --muted: #5b6575;
          --line: #2b3648;
          --head: #e8edf5;
          --sheet: #ffffff;
          --soft: #f7f9fc;
          --approved: #dfeee2;
          --pending: #fff0c9;
          --f: #00b0f0;
          --bg: #dce9ff;
          --dc: #dff4e2;
          --weekend: #ffffff;
        }

        @page {
          size: A4 landscape;
          margin: 6mm;
        }

        html, body {
          margin: 0;
          padding: 0;
          background: #fff;
          color: var(--ink);
          font-family: Calibri, Arial, sans-serif;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        body {
          font-size: 11px;
        }

        .sheet {
          padding: 8px 10px 12px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 18px;
          margin-bottom: 10px;
        }

        .header h1 {
          margin: 0;
          font-size: 20px;
          line-height: 1.1;
          letter-spacing: 0.4px;
        }

        .header p,
        .header small {
          display: block;
          margin: 2px 0 0;
          color: var(--muted);
          line-height: 1.35;
        }

        .header .meta {
          text-align: right;
          max-width: 420px;
        }

        .summary {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 8px;
          margin-bottom: 10px;
        }

        .summary article {
          border: 1px solid var(--line);
          background: var(--soft);
          padding: 6px 8px;
        }

        .summary span {
          display: block;
          color: var(--muted);
          font-size: 10px;
          line-height: 1.2;
        }

        .summary strong {
          display: block;
          margin-top: 2px;
          font-size: 15px;
          line-height: 1.1;
        }

        .vacation-excel-legend {
          display: grid;
          grid-template-columns: 76px repeat(8, 28px minmax(112px, 1fr));
          align-items: stretch;
          margin-bottom: 10px;
          border: 0;
          background: #ffffff;
          color: #111111;
          font-family: Calibri, Arial, sans-serif;
          font-size: 10px;
        }

        .vacation-excel-legend-title,
        .vacation-excel-legend-code,
        .vacation-excel-legend-label {
          min-height: 16px;
          border-right: 1px solid #d9d9d9;
          border-bottom: 1px solid #d9d9d9;
          display: grid;
          align-items: center;
        }

        .vacation-excel-legend-title {
          align-items: center;
          font-size: 11px;
          font-weight: 700;
        }

        .vacation-excel-legend-code {
          justify-content: center;
          font-weight: 700;
          text-align: center;
        }

        .vacation-excel-legend-label {
          justify-content: center;
          text-align: center;
          padding: 0 4px;
        }

        .vacation-excel-legend-code.national-holiday {
          background: #b8cce4;
        }

        .vacation-excel-legend-code.municipal-holiday {
          background: #c2d69b;
        }

        .vacation-excel-legend-code.weekend {
          background: #ffffff;
        }

        .vacation-excel-legend-code.vacation {
          background: #00b0f0;
        }

        .vacation-excel-legend-code.blocked-day {
          background: #ff0000;
        }

        .vacation-excel-legend-code.carnival {
          background: #ccc0d9;
        }

        .vacation-excel-legend-code.previous-year {
          background: #e36d09;
        }

        .vacation-excel-legend-code.half-day {
          background: #92cddc;
        }

        .month {
          break-after: page;
          page-break-after: always;
          margin-bottom: 10px;
        }

        .month:last-child {
          break-after: auto;
          page-break-after: auto;
        }

        .month-head {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: baseline;
          margin: 0 0 6px;
        }

        .month-head strong {
          font-size: 14px;
          letter-spacing: 0.3px;
        }

        .month-head small {
          color: var(--muted);
        }

        .table-wrap {
          border: 1px solid var(--line);
          overflow: hidden;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
          background: var(--sheet);
          font-size: 9px;
        }

        .vacation-excel-month {
          width: max-content;
          min-width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
          color: #000000;
          font-family: Calibri, Arial, sans-serif;
          font-size: 9px;
          line-height: 1;
        }

        .vacation-excel-month th,
        .vacation-excel-month td {
          height: 13px;
          min-height: 13px;
          border: 1px solid #2f75b5;
          padding: 0 2px;
          text-align: center;
          vertical-align: middle;
          font-weight: 700;
          color: #000000;
        }

        .vacation-excel-month .excel-month-col { width: 54px; }
        .vacation-excel-month .excel-person-col { width: 138px; }
        .vacation-excel-month .excel-day-col { width: 25px; }
        .vacation-excel-month .excel-month-cell {
          background: #dbe5f1;
          font-weight: 400;
          text-transform: uppercase;
        }
        .vacation-excel-month .excel-workplace-cell {
          border-color: #00b050;
          border-bottom-color: #2f75b5;
          background: #ffffff;
          text-align: left;
          font-weight: 400;
        }
        .vacation-excel-month .excel-filter-cell {
          position: relative;
          border-color: #00b050;
          border-top-color: #2f75b5;
          background: #f2f2f2;
        }
        .vacation-excel-month .excel-filter-cell span::after {
          content: "";
          position: absolute;
          right: 4px;
          top: 4px;
          width: 0;
          height: 0;
          border-left: 3px solid transparent;
          border-right: 3px solid transparent;
          border-top: 5px solid #6aa84f;
        }
        .vacation-excel-month .excel-weekday,
        .vacation-excel-month .excel-day-head,
        .vacation-excel-month .excel-day-cell {
          width: 25px;
        }
        .vacation-excel-month .excel-weekday {
          height: 13px;
          background: #ffffff;
          font-size: 9px;
          font-weight: 700;
        }
        .vacation-excel-month .excel-day-head,
        .vacation-excel-month .excel-day-cell {
          background: #ffffff;
          font-size: 9px;
          font-weight: 700;
        }
        .vacation-excel-month .excel-person-cell {
          color: #c00000;
          background: #ffffff;
          text-align: center;
          font-weight: 400;
        }
        .vacation-excel-month .excel-day-cell.code-f { background: #00b0f0; }
        .vacation-excel-month .excel-day-cell.code-bg { background: #92cddc; }
        .vacation-excel-month .excel-day-cell.code-dc { background: #e36d09; }
        .vacation-excel-month .excel-day-cell.weekend { background: #ffffff; }

        col.person { width: 140px; }
        col.team { width: 96px; }
        col.code { width: 48px; }
        col.period { width: 112px; }
        col.status { width: 68px; }
        col.days { width: 34px; }
        col.day { width: 15px; }

        thead th {
          border: 1px solid var(--line);
          background: var(--head);
          padding: 4px 2px;
          text-align: center;
          vertical-align: middle;
          line-height: 1.05;
          font-size: 8px;
          font-weight: 800;
        }

        tbody td {
          border: 1px solid var(--line);
          vertical-align: top;
          background: #fff;
          padding: 4px 3px;
        }

        tbody tr:nth-child(even) td.person-cell,
        tbody tr:nth-child(even) td.meta-cell {
          background: #fafbfd;
        }

        td.person-cell strong {
          display: block;
          font-size: 9px;
          line-height: 1.15;
          margin-bottom: 2px;
        }

        td.person-cell small,
        td.meta-cell small {
          display: block;
          color: var(--muted);
          line-height: 1.2;
        }

        td.code-cell,
        td.day-cell {
          text-align: center;
          vertical-align: middle;
          padding: 0;
        }

        td.meta-cell {
          font-size: 8px;
        }

        td.status-approved { background: var(--approved); }
        td.status-pending { background: var(--pending); }

        th.weekend,
        td.weekend {
          background: var(--weekend);
        }

        td.fill-f { background: var(--f); }
        td.fill-bg { background: var(--bg); }
        td.fill-dc { background: var(--dc); }

        .code-label {
          display: inline-block;
          font-size: 7px;
          line-height: 1;
          font-weight: 800;
          letter-spacing: 0.2px;
        }

        .empty {
          padding: 12px;
          color: var(--muted);
          text-align: center;
        }

        .footer-note {
          margin-top: 8px;
          color: var(--muted);
          font-size: 9px;
        }

        @media print {
          .sheet {
            padding: 0;
          }
        }
      </style>
    </head>
    <body>
      <main class="sheet">
        <section class="header">
          <div class="meta">
            <strong>Duomold - Fábrica de Moldes, Lda.</strong>
            <small>Rua do Sobral, 585 - Pavilhão 1 - 3720-602 Oliveira de Azeméis</small>
            <small>Equipas: ${esc(teams.join(", ") || "Sem equipas")}</small>
          </div>
        </section>

        ${buildVacationLegendHtml()}

        ${months}
        <p class="footer-note">Os dias são preenchidos automaticamente a partir dos pedidos aprovados no sistema.</p>
      </main>
    </body>
  </html>`;
}

function buildVacationMapPrintableMonth(monthName, monthIndex, records) {
  return `
    <section class="month">
      <div class="table-wrap">
        ${buildVacationExcelMonthTable(monthName, monthIndex, records, { printable: true })}
      </div>
    </section>
  `;
}

function buildVacationMapExcelMonth(monthName, monthIndex, records) {
  return `
    ${buildVacationExcelMonthTable(monthName, monthIndex, records)}
    <br>`;
}

function buildVacationMapPdfLines(records) {
  const lines = [
    `DUOMOLD - Mapa de Férias ${vacationMapYear}`,
    "Legenda: N = Feriado nacional / municipal / fim-de-semana | Azul = Férias | Vermelho = Dia a não marcar | Carnaval | Férias ano anterior / admissão | Meio-dia de férias",
    ""
  ];
  vacationMapMonths.forEach((monthName, monthIndex) => {
    const daysInMonth = new Date(vacationMapYear, monthIndex + 1, 0).getDate();
    const monthStart = isoDate(vacationMapYear, monthIndex + 1, 1);
    const monthEnd = isoDate(vacationMapYear, monthIndex + 1, daysInMonth);
    const monthRecords = records.filter((item) => String(item.startDate).localeCompare(monthEnd) <= 0 && String(item.endDate).localeCompare(monthStart) >= 0);
    lines.push(monthName);
    if (!monthRecords.length) {
      lines.push("  Sem registos");
    } else {
      monthRecords.forEach((item) => {
        const rowStart = maxIso(item.startDate, monthStart);
        const rowEnd = minIso(item.endDate, monthEnd);
        lines.push(`  ${userName(item.userId)} | ${vacationTeamName(item.userId)} | ${vacationCodeLabel(vacationCode(item))} | ${date(rowStart)} - ${date(rowEnd)} | ${item.status} | ${item.days} dias`);
      });
    }
    lines.push("");
  });
  return lines;
}

function openSchedule(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) return;
  const readonly = isClient();
  qs("#scheduleDialogTitle").textContent = `Cronograma - ${order.reference}`;
  qs("#scheduleDialogMode").textContent = readonly ? "Visualizacao do cliente" : "Edicao do admin";
  qs("#scheduleBody").innerHTML = scheduleHtml(order, readonly);
  qs("#scheduleDialog").showModal();
}

function scheduleHtml(order, readonly) {
  const data = order.schedule || {};
  const disabled = readonly ? "disabled" : "";
  const value = (key, fallback = "") => esc(Object.prototype.hasOwnProperty.call(data, key) ? data[key] : fallback);
  const checked = (key) => data[key] ? "checked" : "";
  const rows = scheduleOperations.map((op, row) => {
    const weeks = Array.from({ length: 16 }, (_, index) => {
      const key = `r${row}_w${index + 1}`;
      const plannedKey = `${key}_programado`;
      const doneKey = `${key}_realizado`;
      return `<td class="week-cell">
        <span class="week-split">
          <label title="Programado"><input data-schedule="${plannedKey}" type="checkbox" ${checked(plannedKey) || checked(key)} ${disabled}><span class="week-half planned"></span></label>
          <label title="Realizado"><input data-schedule="${doneKey}" type="checkbox" ${checked(doneKey)} ${disabled}><span class="week-half done"></span></label>
        </span>
      </td>`;
    }).join("");
    const evol = [25, 50, 75, 100].map((percent) => {
      const key = `r${row}_e${percent}`;
      return `<td class="evol"><input data-schedule="${key}" name="evol${row}" type="radio" value="${percent}" ${checked(key)} ${disabled}></td>`;
    }).join("");
    return `<tr><td class="op-pt">${esc(op[0])}</td><td class="op-en">${esc(op[1])}</td><td class="resp"><input class="resp-input" data-schedule="r${row}_resp" value="${value(`r${row}_resp`, op[2])}" ${disabled}></td>${weeks}${evol}</tr>`;
  }).join("");
  const weekHeader = Array.from({ length: 16 }, (_, index) => {
    const key = `weekHeader${index + 1}`;
    return `<th class="week-head-cell"><input class="week-head-input" data-schedule="${key}" type="text" value="${value(key, index + 1)}" ${disabled}></th>`;
  }).join("");

  return `
    <div class="schedule-page" data-order-id="${order.id}" data-readonly="${readonly}">
      <header class="schedule-header">
        <div><div class="schedule-logo"><span>D</span> DUOMOLD</div><div class="schedule-subtitle">Mold Infinity</div></div>
        <div><div class="schedule-title">Cronograma Construcao de Molde<small>(Progress Report / Tool identification and property)</small></div><div class="page-no">Pagina 1 de 1</div></div>
      </header>

      <section class="schedule-top-grid">
        <div><label>N. Molde:<small>Mold number:</small><input data-schedule="moldNumber" value="${value("moldNumber", order.reference)}" ${disabled}></label></div>
        <div><label>No Molde Cliente:<small>Customer mold number:</small><input data-schedule="customerMoldNumber" value="${value("customerMoldNumber")}" ${disabled}></label></div>
        <div><label>Week:<input data-schedule="week" value="${value("week")}" ${disabled}></label></div>
        <div><label>Progressao do projeto:<input value="${esc(order.progress || "0")}% " disabled></label></div>
      </section>

      <table class="schedule-table">
        <colgroup><col style="width:19%"><col style="width:19%"><col style="width:5.3%"><col span="16" style="width:2.85%"><col span="4" style="width:3.8%"></colgroup>
        <thead>
          <tr><th colspan="2" rowspan="2">Operacoes / Operations</th><th rowspan="2">Resp.</th><th colspan="16">Semana / Week</th><th colspan="4">Evolucao (%)</th></tr>
          <tr>${weekHeader}${[25, 50, 75, 100].map((item) => `<th>${item}</th>`).join("")}</tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="schedule-legend">
        <span><i class="legend-box planned"></i>Programado</span>
        <span><i class="legend-box done"></i>Realizado</span>
      </div>

      <div class="schedule-section-title">Outras caracteristicas:<small>Other characteristics:</small></div>
      <div class="schedule-chars">
        <div>Ref. Peca:<small>Part reference:</small><input data-schedule="partReference" value="${value("partReference")}" ${disabled}></div>
        <div>Peso Moldacao (g):<small>Injection weight (g):</small><input data-schedule="injectionWeight" value="${value("injectionWeight")}" ${disabled}></div>
        <div>N. cavidades:<small>Number of cavities:</small><input data-schedule="cavities" value="${value("cavities")}" ${disabled}></div>
        <div>Peso Molde:<small>Tool weight:</small><input data-schedule="toolWeight" value="${value("toolWeight")}" ${disabled}></div>
        <div>Dimensoes:<small>Dimensions:</small><input data-schedule="dimensions" value="${value("dimensions")}" ${disabled}></div>
        <div>Tempo de vida (ciclos):<small>Life time:</small><input data-schedule="lifetime" value="${value("lifetime")}" ${disabled}></div>
      </div>
      <div class="schedule-remarks"><div class="remarks-title">Observacoes:<small>Remarks:</small></div><textarea data-schedule="remarks" ${disabled}>${value("remarks")}</textarea></div>

      ${moldPhotosHtml(order, readonly, "schedule")}

      <div class="signatures">
        <div class="sig"><div class="sig-title">DUOMOLD, Lda.</div><div class="line"></div><div class="date-row">Data: <input data-schedule="duoDay" value="${value("duoDay")}" ${disabled}> / <input data-schedule="duoMonth" value="${value("duoMonth")}" ${disabled}> / <input data-schedule="duoYear" value="${value("duoYear")}" ${disabled}></div></div>
        <div class="sig"><div class="sig-title">Cliente</div><div class="line"></div><div class="date-row">Data: <input data-schedule="clientDay" value="${value("clientDay")}" ${disabled}> / <input data-schedule="clientMonth" value="${value("clientMonth")}" ${disabled}> / <input data-schedule="clientYear" value="${value("clientYear")}" ${disabled}></div></div>
      </div>
      <footer class="schedule-footer">MOD.55.01</footer>
    </div>`;
}

function saveSchedule() {
  const page = qs(".schedule-page");
  if (!page || page.dataset.readonly === "true") return;
  const order = state.orders.find((item) => item.id === page.dataset.orderId);
  if (!order) return;
  order.schedule = {};
  qsa("[data-schedule]", page).forEach((field) => {
    const key = field.dataset.schedule;
    order.schedule[key] = field.type === "checkbox" || field.type === "radio" ? field.checked : field.value;
  });
  if (!order.schedule.moldNumber) order.schedule.moldNumber = order.reference;
  persistStateOnly();
  scheduleOrderClientNotification(order);
}

function exportSchedule() {
  const page = qs(".schedule-page");
  if (!page) return;
  const order = state.orders.find((item) => item.id === page.dataset.orderId);
  if (!order) return;
  downloadTextPdf(`cronograma-${order.reference || "molde"}.pdf`, buildSchedulePdfLines(order));
}

function moldPhotos(order) {
  if (!Array.isArray(order.moldPhotos)) order.moldPhotos = [];
  return order.moldPhotos;
}

function moldPhotosHtml(order, readonly, context) {
  const photos = moldPhotos(order);
  const empty = readonly ? "Sem fotos adicionadas." : "Ainda sem fotos. Carregue imagens PNG ou JPEG do período de produção.";
  return `
    <section class="mold-photos" data-photo-context="${context}">
      <div class="mold-photos-header">
        <div>
          <h3>Fotos do molde</h3>
          <small>Imagens do período de produção do produto</small>
        </div>
        ${readonly ? "" : `<label class="photo-upload-button">Adicionar foto<input data-photo-upload="${context}" type="file" accept="image/png,image/jpeg" hidden></label>`}
      </div>
      ${photos.length ? `<div class="mold-photo-grid">${photos.map((photo) => moldPhotoCard(photo, readonly)).join("")}</div>` : `<p class="photo-empty">${empty}</p>`}
    </section>`;
}

function moldPhotoCard(photo, readonly) {
  return `
    <article class="mold-photo-card" data-photo-id="${photo.id}">
      <img src="${esc(photo.src)}" alt="${esc(photo.caption || "Foto do molde")}">
      <label>Descrição / Opção escrita
        <textarea data-photo-caption="${photo.id}" ${readonly ? "disabled" : ""}>${esc(photo.caption || "")}</textarea>
      </label>
      ${readonly ? "" : `<button class="planning-mini red" data-photo-delete="${photo.id}" type="button">X</button>`}
    </article>`;
}

function activeDocumentOrder(element) {
  const page = element.closest(".schedule-page, .planning-page");
  if (!page) return {};
  const order = state.orders.find((item) => item.id === page.dataset.orderId);
  return { page, order, readonly: page.dataset.readonly === "true", context: page.classList.contains("schedule-page") ? "schedule" : "planning" };
}

function refreshDocument(context, order, readonly) {
  if (context === "schedule") qs("#scheduleBody").innerHTML = scheduleHtml(order, readonly);
  if (context === "planning") qs("#planningBody").innerHTML = planningHtml(order, readonly);
}

function handlePhotoUpload(input) {
  const { order, readonly, context } = activeDocumentOrder(input);
  if (!order || readonly || !input.files?.[0]) return;
  const file = input.files[0];
  if (!["image/png", "image/jpeg"].includes(file.type)) {
    alert("Use apenas imagens PNG ou JPEG.");
    input.value = "";
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    moldPhotos(order).push({
      id: `photo-${Date.now()}`,
      name: file.name,
      type: file.type,
      src: reader.result,
      caption: ""
    });
    persistStateOnly();
    scheduleOrderClientNotification(order);
    refreshDocument(context, order, readonly);
  };
  reader.readAsDataURL(file);
}

function savePhotoCaption(target) {
  const { order, readonly } = activeDocumentOrder(target);
  if (!order || readonly) return;
  const photo = moldPhotos(order).find((item) => item.id === target.dataset.photoCaption);
  if (!photo) return;
  photo.caption = target.value;
  persistStateOnly();
  scheduleOrderClientNotification(order);
}

function deletePhoto(target) {
  const { order, readonly, context } = activeDocumentOrder(target);
  if (!order || readonly || !confirm("Remover esta foto?")) return;
  order.moldPhotos = moldPhotos(order).filter((item) => item.id !== target.dataset.photoDelete);
  persistStateOnly();
  scheduleOrderClientNotification(order);
  refreshDocument(context, order, readonly);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function defaultPlanning(order) {
  return {
    projeto: order.reference || "DMxxx",
    cliente: clientName(order.clientId),
    molde: "",
    data: today(),
    observacoes: "",
    campos: [],
    linhas: structuredClone(planningBase)
  };
}

function planningFor(order) {
  if (!order.planning) order.planning = defaultPlanning(order);
  if (!Array.isArray(order.planning.campos)) order.planning.campos = [];
  if (!Array.isArray(order.planning.linhas) || !order.planning.linhas.length) order.planning.linhas = structuredClone(planningBase);
  const planningDate = planningCurrentDate(order);
  order.planning.linhas.forEach((line, index) => {
    if (!line.id) line.id = index + 1;
    if (!line.statusByDate || typeof line.statusByDate !== "object" || Array.isArray(line.statusByDate)) {
      line.statusByDate = {};
    }
    if (!line.tipo && planningStatusOptions.includes(line.status)) {
      line.tipo = line.status;
    }
    if (!Object.keys(line.statusByDate).length && line.status !== undefined && line.status !== null && line.status !== "") {
      line.statusByDate[planningDate] = String(line.status);
    }
    if (!Array.isArray(line.extras)) line.extras = [];
    while (line.extras.length < order.planning.campos.length) line.extras.push("");
    line.status = line.statusByDate[planningDate] || "0%";
  });
  return order.planning;
}

function planningCurrentDate(order) {
  return order?.planning?.data || today();
}

function openPlanning(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) return;
  const readonly = isClient();
  qs("#planningDialogTitle").textContent = `Planeamento - ${order.reference}`;
  qs("#planningDialogMode").textContent = readonly ? "Visualizacao do cliente" : "Edicao do admin";
  qs("#planningBody").innerHTML = planningHtml(order, readonly);
  ["#renumberPlanningButton", "#addPlanningTaskButton", "#addPlanningGroupButton", "#addPlanningFieldButton", "#clearPlanningButton"].forEach((selector) => {
    qs(selector).hidden = readonly;
  });
  qs("#planningDialog").showModal();
}

function planningHtml(order, readonly) {
  const data = planningFor(order);
  const disabled = readonly ? "disabled" : "";
  const readonlyClass = readonly ? " readonly" : "";
  const field = (key) => esc(data[key] ?? "");
  const extraHeaders = data.campos.map((campo, index) => `
    <th class="planning-extra">${esc(campo.nome)}
      ${readonly ? "" : `<button class="planning-mini red" data-planning-delete-field="${index}" type="button">X</button>`}
    </th>`).join("");
  const rows = data.linhas.map((line, index) => planningRowHtml(line, index, data.campos, disabled, readonly)).join("");

  return `
    <div class="planning-page${readonlyClass}" data-order-id="${order.id}" data-readonly="${readonly}">
      <header class="planning-header">
        <div>
          <h2>Planeamento do Molde - MOD.54.01</h2>
          <p>Colunas: ID - Nome da Tarefa - Duracao - Inicio - Conclusao - Porcentagem do projeto</p>
        </div>
      </header>

      <section class="planning-card">
        <div class="planning-grid">
          <label>Projecto<input data-planning-field="projeto" value="${field("projeto")}" ${disabled}></label>
          <label>Cliente<input data-planning-field="cliente" value="${field("cliente")}" ${disabled}></label>
          <label>N. Molde<input data-planning-field="molde" value="${field("molde")}" ${disabled}></label>
          <label>Data<input data-planning-field="data" type="date" value="${field("data")}" ${disabled}></label>
        </div>
        ${readonly ? `<p class="planning-note">Visualizacao do cliente. A edicao fica disponivel apenas para Admin.</p>` : `<p class="planning-note">Os campos criados aparecem como colunas dentro da planilha.</p>`}
      </section>

      <section class="planning-table-box">
        <table class="planning-table">
          <thead>
            <tr>
              <th class="planning-id">ID</th>
              <th class="planning-name">Nome da Tarefa</th>
              <th class="planning-duration">Duracao</th>
              <th class="planning-date">Inicio</th>
              <th class="planning-date">Conclusao</th>
              <th class="planning-status">Porcentagem do projeto</th>
              ${extraHeaders}
              ${readonly ? "" : `<th class="planning-actions-col">Acoes</th>`}
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </section>

      <section class="planning-card">
        <label>Observacoes<textarea data-planning-field="observacoes" ${disabled}>${field("observacoes")}</textarea></label>
      </section>
      ${moldPhotosHtml(order, readonly, "planning")}
      <footer class="planning-footer">MOD.54.01</footer>
    </div>`;
}

function planningRowHtml(line, index, fields, disabled, readonly) {
  const extras = fields.map((_, extraIndex) => `<td><input data-planning-row="${index}" data-planning-extra="${extraIndex}" value="${esc(line.extras?.[extraIndex] || "")}" ${disabled}></td>`).join("");
  return `
    <tr class="${planningStatusClass(line.tipo || line.status)}">
      <td><input data-planning-row="${index}" data-planning-prop="id" value="${esc(line.id)}" ${disabled}></td>
      <td><input data-planning-row="${index}" data-planning-prop="nome" value="${esc(line.nome)}" ${disabled}></td>
      <td><input data-planning-row="${index}" data-planning-prop="duracao" value="${esc(line.duracao)}" placeholder="Ex.: 5 dias" ${disabled}></td>
      <td><input data-planning-row="${index}" data-planning-prop="inicio" type="date" value="${esc(line.inicio)}" ${disabled}></td>
      <td><input data-planning-row="${index}" data-planning-prop="conclusao" type="date" value="${esc(line.conclusao)}" ${disabled}></td>
      <td><input data-planning-row="${index}" data-planning-prop="status" value="${esc(line.status || "0%")}" placeholder="Ex.: 50%" ${disabled}></td>
      ${extras}
      ${readonly ? "" : `<td><button class="planning-mini red" data-planning-delete-row="${index}" type="button">X</button></td>`}
    </tr>`;
}

function planningStatusClass(status) {
  const valueText = String(status || "").toLowerCase();
  if (valueText.includes("inativ")) return "planning-inactive";
  if (valueText.includes("sumario") || valueText.includes("resumo")) return "planning-summary";
  if (valueText.includes("projeto")) return "planning-project";
  return "";
}

function activePlanning() {
  const page = qs(".planning-page");
  if (!page) return {};
  const order = state.orders.find((item) => item.id === page.dataset.orderId);
  return { page, order, data: order ? planningFor(order) : null, readonly: page.dataset.readonly === "true" };
}

function savePlanningField(target) {
  const { order, data, readonly } = activePlanning();
  if (!data || readonly) return;
  const topField = target.dataset.planningField;
  if (topField) {
    data[topField] = target.value;
    if (topField === "data") {
      persistStateOnly();
      scheduleOrderClientNotification(order);
      refreshPlanning();
      return;
    }
  }
  const rowIndex = target.dataset.planningRow;
  const prop = target.dataset.planningProp;
  if (rowIndex !== undefined && prop) {
    const line = data.linhas[rowIndex];
    line[prop] = target.value;
    if (prop === "status") {
      const planningDate = planningCurrentDate({ planning: data });
      if (!line.statusByDate || typeof line.statusByDate !== "object" || Array.isArray(line.statusByDate)) line.statusByDate = {};
      line.statusByDate[planningDate] = target.value;
    }
  }
  const extraIndex = target.dataset.planningExtra;
  if (rowIndex !== undefined && extraIndex !== undefined) data.linhas[rowIndex].extras[extraIndex] = target.value;
  persistStateOnly();
  scheduleOrderClientNotification(order);
}

function refreshPlanning() {
  const { order, readonly } = activePlanning();
  if (!order) return;
  qs("#planningBody").innerHTML = planningHtml(order, readonly);
  persistStateOnly();
  scheduleOrderClientNotification(order);
}

function addPlanningLine(type = "tarefa") {
  const { data, readonly } = activePlanning();
  if (!data || readonly) return;
  const name = prompt(type === "grupo" ? "Nome do novo grupo" : "Nome da nova tarefa");
  if (!name) return;
  const planningDate = planningCurrentDate({ planning: data });
  data.linhas.push({
    id: data.linhas.length + 1,
    nome: name,
    duracao: "",
    inicio: "",
    conclusao: "",
    tipo: type === "grupo" ? "Sumario" : "Tarefa",
    status: "0%",
    statusByDate: { [planningDate]: "0%" },
    extras: data.campos.map(() => "")
  });
  refreshPlanning();
}

function addPlanningField() {
  const { data, readonly } = activePlanning();
  if (!data || readonly) return;
  const name = prompt("Nome do novo campo");
  if (!name) return;
  const initialValue = prompt("Valor inicial nas linhas", "") || "";
  data.campos.push({ nome: name });
  data.linhas.forEach((line) => line.extras.push(initialValue));
  refreshPlanning();
}

function renumberPlanning() {
  const { data, readonly } = activePlanning();
  if (!data || readonly) return;
  data.linhas.forEach((line, index) => line.id = index + 1);
  refreshPlanning();
}

function exportPlanning() {
  const { order } = activePlanning();
  if (!order) return;
  downloadTextPdf(`planeamento-${order.reference || "molde"}.pdf`, buildPlanningPdfLines(order));
}

function resetPlanning() {
  const { order, readonly } = activePlanning();
  if (!order || readonly || !confirm("Limpar tudo e voltar ao modelo inicial?")) return;
  order.planning = defaultPlanning(order);
  refreshPlanning();
}

function compact(selector, items, mapper) {
  const element = qs(selector);
  if (!element) return;
  if (!items.length) {
    element.innerHTML = `<div class="empty-state">Sem registos.</div>`;
    return;
  }
  element.innerHTML = items.slice(0, 5).map((item) => {
    const view = mapper(item);
    return `<article class="compact-item"><div><strong>${esc(view.title)}</strong><small>${esc(view.meta)}</small></div><span class="status">${esc(view.badge)}</span></article>`;
  }).join("");
}

function table(selector, rows, mapper) {
  const tbody = qs(selector);
  if (!tbody) return;
  tbody.innerHTML = rows.length ? rows.map(mapper).join("") : qs("#emptyStateTemplate").innerHTML;
}

function text(selector, valueText) {
  const element = qs(selector);
  if (element) element.textContent = valueText;
}

function value(selector) {
  return qs(selector)?.value.trim().toLowerCase() || "";
}

function search(parts, query) {
  return parts.join(" ").toLowerCase().includes(query);
}

function sum(items) {
  return items.reduce((total, item) => total + Number(item.days || 0), 0);
}

function companyName(id) {
  return state.companies.find((item) => item.id === id)?.name || "Sem empresa";
}

function companyForClient(client) {
  return state.companies.find((item) => item.id === client?.companyId) || {};
}

function clientName(id) {
  return state.clients.find((item) => item.id === id)?.name || "Sem cliente";
}

function userName(id) {
  return state.users.find((item) => item.id === id)?.name || "Sem colaborador";
}

function date(valueText) {
  if (!valueText) return "Sem data";
  return new Intl.DateTimeFormat("pt-PT").format(new Date(`${valueText}T00:00:00`));
}

function dateTime(valueText) {
  if (!valueText) return "";
  return new Intl.DateTimeFormat("pt-PT", { dateStyle: "short", timeStyle: "short" }).format(new Date(valueText));
}

function cls(valueText) {
  return String(valueText || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\/\s]+/g, "-");
}

function esc(valueText) {
  return String(valueText ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

qsa(".nav-item").forEach((button) => button.addEventListener("click", () => {
  setView(button.dataset.view);
  if (button.dataset.scrollTarget) {
    setTimeout(() => qs(`#${button.dataset.scrollTarget}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }
}));
qsa("[data-view-jump]").forEach((button) => button.addEventListener("click", () => setView(button.dataset.viewJump)));
qs("#demoAccountSelect").addEventListener("change", (event) => {
  state.activeAccount = event.target.value;
  saveState();
  setView(defaultView());
});
qs("#newRecordButton").addEventListener("click", () => openDialog(modeFromView()));
qs("#addClientButton").addEventListener("click", () => openDialog("client"));
qs("#addCompanyButton").addEventListener("click", () => openDialog("company"));
qs("#addOrderButton").addEventListener("click", () => openDialog("order"));
qs("#addUserButton").addEventListener("click", () => {
  if (!canManageUsers()) return;
  openDialog("user");
});
qs("#addVacationButton").addEventListener("click", () => openDialog("vacation"));
qs("#addAbsenceButton").addEventListener("click", () => openDialog("absence"));
qs("#employeeVacationShortcut").addEventListener("click", () => openDialog("vacation"));
qs("#openVacationMapButton")?.addEventListener("click", openVacationMapPrintableDocument);
qs("#closeVacationMapButton")?.addEventListener("click", () => qs("#vacationMapDialog")?.close());
qs("#vacationMapSearch")?.addEventListener("input", renderVacationMap);
qs("#vacationMapTeamFilter")?.addEventListener("change", renderVacationMap);
qs("#printVacationMapButton")?.addEventListener("click", printVacationMap);
qs("#exportVacationMapPdfButton")?.addEventListener("click", exportVacationMapPdf);
qs("#exportVacationMapExcelButton")?.addEventListener("click", exportVacationMapExcel);
qs("#recordForm").addEventListener("submit", handleSubmit);
qs("#closeDialogButton").addEventListener("click", () => qs("#recordDialog").close());
qs("#cancelDialogButton").addEventListener("click", () => qs("#recordDialog").close());
qs("#loginForm").addEventListener("submit", loginWithCredentials);
qs("#logoutButton").addEventListener("click", logout);
qs("#changePasswordButton")?.addEventListener("click", openPasswordDialog);
qs("#editProfileButton").addEventListener("click", openProfileDialog);
qs("#profilePasswordButton").addEventListener("click", openPasswordDialog);
qs("#passwordForm").addEventListener("submit", handlePasswordSubmit);
qs("#closePasswordButton").addEventListener("click", () => qs("#passwordDialog").close());
qs("#cancelPasswordButton").addEventListener("click", () => qs("#passwordDialog").close());
qs("#notificationButton").addEventListener("click", () => {
  qs("#notificationPanel").hidden = !qs("#notificationPanel").hidden;
});
qs("#markNotificationsReadButton").addEventListener("click", markNotificationsRead);
qs("#exportButton").addEventListener("click", exportCurrentViewPdf);
["client", "company", "order", "user", "vacation", "absence"].forEach((name) => qs(`#${name}Search`)?.addEventListener("input", render));

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!target.closest(".notification-wrap")) qs("#notificationPanel").hidden = true;
  if (target.closest("[data-notification-open]")) {
    openNotification(target.closest("[data-notification-open]").dataset.notificationOpen);
    return;
  }
  const action = [
    ["edit-client", "client", openDialog], ["delete-client", "client", deleteRecord],
    ["edit-company", "company", openDialog], ["delete-company", "company", deleteRecord],
    ["edit-order", "order", openDialog], ["delete-order", "order", deleteRecord],
    ["edit-user", "user", openDialog], ["delete-user", "user", deleteRecord],
    ["edit-vacation", "vacation", openDialog], ["edit-absence", "absence", openDialog]
  ].find(([key]) => target.closest(`[data-${key}]`));
  if (action) {
    const [key, mode, fn] = action;
    fn(mode, target.closest(`[data-${key}]`).dataset[toDatasetKey(key)]);
  }
  if (target.closest("[data-new-client-order]")) openDialog("order", null, { clientId: target.closest("[data-new-client-order]").dataset.newClientOrder });
  if (target.closest("[data-schedule-order]")) openSchedule(target.closest("[data-schedule-order]").dataset.scheduleOrder);
  if (target.closest("[data-planning-order]")) openPlanning(target.closest("[data-planning-order]").dataset.planningOrder);
  if (target.closest("[data-planning-delete-row]")) {
    const { data, readonly } = activePlanning();
    if (data && !readonly && confirm("Eliminar esta tarefa?")) {
      data.linhas.splice(Number(target.closest("[data-planning-delete-row]").dataset.planningDeleteRow), 1);
      refreshPlanning();
    }
  }
  if (target.closest("[data-planning-delete-field]")) {
    const { data, readonly } = activePlanning();
    if (data && !readonly && confirm("Eliminar este campo?")) {
      const index = Number(target.closest("[data-planning-delete-field]").dataset.planningDeleteField);
      data.campos.splice(index, 1);
      data.linhas.forEach((line) => line.extras.splice(index, 1));
      refreshPlanning();
    }
  }
  if (target.closest("[data-photo-delete]")) deletePhoto(target.closest("[data-photo-delete]"));
  if (target.closest("[data-absence-attachment-delete]")) {
    removeAbsenceAttachment(target.closest("[data-absence-attachment-delete]").dataset.absenceAttachmentDelete);
    return;
  }
  if (target.closest("[data-approve-vacation]")) approve("vacation", target.closest("[data-approve-vacation]").dataset.approveVacation, "Aprovado");
  if (target.closest("[data-reject-vacation]")) approve("vacation", target.closest("[data-reject-vacation]").dataset.rejectVacation, "Rejeitado");
  if (target.closest("[data-approve-absence]")) approve("absence", target.closest("[data-approve-absence]").dataset.approveAbsence, "Aprovado");
  if (target.closest("[data-reject-absence]")) approve("absence", target.closest("[data-reject-absence]").dataset.rejectAbsence, "Rejeitado");
});

document.addEventListener("input", (event) => {
  if (event.target.closest("#scheduleDialog")) saveSchedule();
  if (event.target.closest("#planningDialog")) savePlanningField(event.target);
  if (event.target.matches("[data-photo-caption]")) savePhotoCaption(event.target);
});

document.addEventListener("change", (event) => {
  if (event.target.matches("[data-photo-upload]")) {
    handlePhotoUpload(event.target);
    return;
  }
  if (event.target.matches("[data-absence-attachment-upload]")) {
    handleAbsenceAttachmentUpload(event.target);
    return;
  }
  if (event.target.matches("[data-order-history-toggle]")) {
    toggleOrderHistoryStatus(event.target.dataset.orderId, event.target.dataset.historyId, event.target.checked);
    return;
  }
  if (event.target.closest("#scheduleDialog")) saveSchedule();
  if (event.target.closest("#planningDialog")) savePlanningField(event.target);
});

qs("#closeScheduleButton").addEventListener("click", () => qs("#scheduleDialog").close());
qs("#printScheduleButton").addEventListener("click", () => printDocument("schedule"));
qs("#exportScheduleButton").addEventListener("click", exportSchedule);
qs("#closePlanningButton").addEventListener("click", () => qs("#planningDialog").close());
qs("#printPlanningButton").addEventListener("click", () => printDocument("planning"));
qs("#exportPlanningButton").addEventListener("click", exportPlanning);
qs("#renumberPlanningButton").addEventListener("click", renumberPlanning);
qs("#addPlanningTaskButton").addEventListener("click", () => addPlanningLine("tarefa"));
qs("#addPlanningGroupButton").addEventListener("click", () => addPlanningLine("grupo"));
qs("#addPlanningFieldButton").addEventListener("click", addPlanningField);
qs("#clearPlanningButton").addEventListener("click", resetPlanning);

function printDocument(type) {
  document.body.classList.remove("printing-schedule", "printing-planning");
  document.body.classList.add(`printing-${type}`);
  window.print();
}

function downloadTextPdf(filename, lines) {
  const pdfBytes = createSimplePdf(lines);
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

function buildSchedulePdfLines(order) {
  const schedule = order.schedule || {};
  const lines = [
    "DUOMOLD - Cronograma",
    `Referencia: ${order.reference || ""}`,
    `Titulo: ${order.title || ""}`,
    `Cliente: ${clientName(order.clientId)}`,
    `Mold number: ${schedule.moldNumber || order.reference || ""}`,
    `Progressao: ${schedule.progress || order.progress || "0"}%`,
    "",
    "Resumo dos campos:"
  ];
  Object.entries(schedule).forEach(([key, value]) => {
    if (key.startsWith("r")) return;
    lines.push(`${key}: ${formatPdfValue(value)}`);
  });
  lines.push("", "Linhas:");
  scheduleOperations.forEach((op, index) => {
    const weekValues = Array.from({ length: 16 }, (_, weekIndex) => schedule[`r${index}_w${weekIndex + 1}`]).filter(Boolean);
    const row = [`${index + 1}. ${op[0]}`, op[1], schedule[`r${index}_resp`] || op[2], weekValues.length ? `Semanas: ${weekValues.join(", ")}` : ""].filter(Boolean).join(" | ");
    lines.push(row);
  });
  return lines;
}

function buildPlanningPdfLines(order) {
  const data = planningFor(order);
  const lines = [
    "DUOMOLD - Planeamento do Molde",
    `Projeto: ${data.projeto || ""}`,
    `Cliente: ${data.cliente || ""}`,
    `Molde: ${data.molde || ""}`,
    `Data: ${data.data || ""}`,
    "",
    "Linhas:"
  ];
  data.linhas.forEach((line) => {
    lines.push(`${line.id}. ${line.nome} | Duracao: ${line.duracao || ""} | Inicio: ${line.inicio || ""} | Conclusao: ${line.conclusao || ""} | Progresso: ${line.status || ""}`);
    if (Array.isArray(line.extras) && line.extras.length) {
      lines.push(`   Extras: ${line.extras.map((item, index) => `${data.campos[index]?.nome || `Campo ${index + 1}`}: ${item || ""}`).join(" ; ")}`);
    }
  });
  if (data.observacoes) {
    lines.push("", "Observacoes:", data.observacoes);
  }
  return lines;
}

function formatPdfValue(value) {
  if (value === true) return "Sim";
  if (value === false) return "Nao";
  if (value === undefined || value === null || value === "") return "";
  return String(value);
}

function createSimplePdf(lines) {
  const width = 595.28;
  const height = 841.89;
  const fontSize = 12;
  const lineHeight = 16;
  const marginLeft = 48;
  const marginTop = 56;
  const usableHeight = height - marginTop * 2;
  const linesPerPage = Math.max(1, Math.floor(usableHeight / lineHeight));
  const pages = [];
  for (let i = 0; i < lines.length; i += linesPerPage) pages.push(lines.slice(i, i + linesPerPage));

  const objects = [];
  const addObject = (content) => {
    objects.push(content);
    return objects.length;
  };

  const fontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const pageIds = [];
  const contentIds = [];

  pages.forEach((pageLines) => {
    const content = buildPdfContentStream(pageLines, fontSize, lineHeight, marginLeft, height - marginTop);
    contentIds.push(addObject(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`));
    pageIds.push(addObject("<< /Type /Page /Parent 0 0 R /MediaBox [0 0 " + width + " " + height + "] /Resources << /Font << /F1 " + fontId + " 0 R >> >> /Contents " + contentIds[contentIds.length - 1] + " 0 R >>"));
  });

  const pagesId = addObject("<< /Type /Pages /Kids [" + pageIds.map((id) => `${id} 0 R`).join(" ") + "] /Count " + pageIds.length + " >>");
  objects[fontId - 1] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
  pageIds.forEach((pageId, index) => {
    objects[pageId - 1] = `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentIds[index]} 0 R >>`;
  });
  const catalogId = addObject(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

  let pdf = "%PDF-1.4\n";
  const xref = ["0000000000 65535 f "];
  let offset = pdf.length;
  objects.forEach((object, index) => {
    const body = `${index + 1} 0 obj\n${object}\nendobj\n`;
    xref.push(String(offset).padStart(10, "0") + " 00000 n ");
    pdf += body;
    offset += body.length;
  });
  const xrefStart = offset;
  pdf += `xref\n0 ${objects.length + 1}\n${xref.join("\n")}\ntrailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
  return new TextEncoder().encode(pdf);
}

function buildPdfContentStream(lines, fontSize, lineHeight, marginLeft, startY) {
  const escapeText = (text) => String(text ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/[^\x20-\x7E]/g, (char) => {
      const capitalAWithTilde = String.fromCharCode(0x00C3);
      const map = { "á": "a", "à": "a", "â": "a", "ã": "a", "é": "e", "ê": "e", "í": "i", "ó": "o", "ô": "o", "õ": "o", "ú": "u", "ç": "c", "Á": "A", "À": "A", "Â": "A", [capitalAWithTilde]: "A", "É": "E", "Ê": "E", "Í": "I", "Ó": "O", "Ô": "O", "Õ": "O", "Ú": "U", "Ç": "C" };
      return map[char] || "";
    });
  const parts = ["BT", `/F1 ${fontSize} Tf`, `${marginLeft} ${startY} Td`, `${lineHeight * -1} TL`];
  lines.forEach((line, index) => {
    if (index > 0) parts.push("T*");
    parts.push(`(${escapeText(line)}) Tj`);
  });
  parts.push("ET");
  return parts.join("\n");
}

function exportSchedule() {
  const page = qs(".schedule-page");
  if (!page) return;
  const order = state.orders.find((item) => item.id === page.dataset.orderId);
  if (!order) return;
  downloadTextPdf(`cronograma-${order.reference || "molde"}.pdf`, buildSchedulePdfDocument(order));
}

function exportPlanning() {
  const { order } = activePlanning();
  if (!order) return;
  downloadTextPdf(`planeamento-${order.reference || "molde"}.pdf`, buildPlanningPdfDocument(order));
}

function downloadTextPdf(filename, documentSpec) {
  const pdfBytes = createPdfDocument(documentSpec.pages, documentSpec.width, documentSpec.height);
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

function buildSchedulePdfDocument(order) {
  const width = 842;
  const height = 595;
  const data = order.schedule || {};
  const pages = [];
  let page = makePdfPage(width, height);
  drawDocumentHeader(page, width, "DUOMOLD", "Cronograma de Molde", "Progress Report / Tool identification and property");
  let y = 86;
  y = drawScheduleSummary(page, data, order, width, y);
  y = drawScheduleTable(page, data, order, width, height, y, pages);
  const detailsPage = makePdfPage(width, height);
  drawDocumentHeader(detailsPage, width, "DUOMOLD", "Cronograma de Molde", "Progress Report / Tool identification and property");
  drawScheduleDetails(detailsPage, data, width, height, 86);
  pages.push(detailsPage.finish());
  return { pages, width, height };
}

function buildPlanningPdfDocument(order) {
  const width = 842;
  const height = 595;
  const data = planningFor(order);
  const pages = [];
  let page = makePdfPage(width, height);
  drawDocumentHeader(page, width, "DUOMOLD", "Planeamento do Molde", "Tabela de acompanhamento do projeto");
  let y = 86;
  y = drawPlanningSummary(page, data, order, width, y);
  drawPlanningTablePages(page, data, width, height, y, pages);
  return { pages, width, height };
}

function drawDocumentHeader(page, width, brand, title, subtitle) {
  page.text(24, 26, brand, { size: 18, bold: true });
  page.text(width - 24, 26, title, { size: 16, bold: true, align: "right", width: width - 48 });
  page.text(width - 24, 46, subtitle, { size: 10, bold: true, align: "right", width: width - 48 });
  page.line(24, 64, width - 24, 64, 1);
}

function drawPlanningSummary(page, data, order, width, y) {
  const cols = [
    { label: "Projeto", value: data.projeto || order.reference || "", width: 180 },
    { label: "Cliente", value: data.cliente || clientName(order.clientId), width: 260 },
    { label: "N. Molde", value: data.molde || "", width: 160 },
    { label: "Data", value: data.data || today(), width: 140 }
  ];
  return drawInfoGrid(page, cols, 22, y);
}

function drawScheduleSummary(page, data, order, width, y) {
  const cols = [
    { label: "N. Molde", value: data.moldNumber || order.reference || "", width: 180 },
    { label: "No Molde Cliente", value: data.customerMoldNumber || "", width: 180 },
    { label: "Week", value: data.week || "", width: 140 },
    { label: "Progressao do projeto", value: `${order.progress || "0"}%`, width: 180 }
  ];
  return drawInfoGrid(page, cols, 22, y);
}

function drawInfoGrid(page, cols, margin, startY) {
  let x = margin;
  const boxHeight = 50;
  cols.forEach((col) => {
    page.rect(x, startY, col.width, boxHeight, { fill: "F7F8FB", stroke: true });
    page.text(x + 6, startY + 14, col.label, { size: 9, bold: true });
    page.text(x + 6, startY + 31, col.value || "", { size: 11, bold: true, width: col.width - 12 });
    x += col.width + 8;
  });
  return startY + boxHeight + 10;
}

function drawPlanningTablePages(page, data, width, height, yStart, pages) {
  const columns = buildPlanningColumns(data);
  const margin = 22;
  const topY = yStart + 8;
  const bottomY = height - 26;
  const headerHeight = 20;
  let currentPage = page;
  let y = topY;
  let pageIndex = 0;

  const drawHeader = (targetPage, label) => {
    let x = margin;
    targetPage.text(margin, y - 16, label, { size: 12, bold: true });
    columns.forEach((col) => {
      targetPage.rect(x, y, col.width, headerHeight, { fill: "E7EAF0", stroke: true });
      targetPage.text(x + 3, y + 13, col.label, { size: 7, bold: true, width: col.width - 6, align: "center" });
      x += col.width;
    });
  };

  drawHeader(currentPage, "Planeamento do Molde - MOD.54.01");
  y += headerHeight;

  data.linhas.forEach((line, index) => {
    const values = buildPlanningRowValues(line, data);
    const rowHeight = measureTableRowHeight(columns, values, 8, 4, 18);
    if (y + rowHeight > bottomY) {
      pages.push(currentPage.finish());
      currentPage = makePdfPage(width, height);
      pageIndex += 1;
      drawDocumentHeader(currentPage, width, "DUOMOLD", "Planeamento do Molde", "Tabela de acompanhamento do projeto");
      y = 86;
      drawHeader(currentPage, `Planeamento do Molde - continuação ${pageIndex + 1}`);
      y += headerHeight;
    }
    drawTableRow(currentPage, columns, values, margin, y, rowHeight, index % 2 ? "FBFCFE" : null);
    y += rowHeight;
  });

  const notes = String(data.observacoes || "").trim();
  if (notes) {
    if (y + 46 > bottomY) {
      pages.push(currentPage.finish());
      currentPage = makePdfPage(width, height);
      drawDocumentHeader(currentPage, width, "DUOMOLD", "Planeamento do Molde", "Tabela de acompanhamento do projeto");
      y = 86;
    }
    currentPage.rect(margin, y + 4, width - margin * 2, 40, { fill: "FAFAFA", stroke: true });
    currentPage.text(margin + 6, y + 16, "Observacoes", { size: 9, bold: true });
    currentPage.text(margin + 6, y + 29, notes, { size: 9, width: width - margin * 2 - 12 });
    y += 52;
  }

  pages.push(currentPage.finish());
}

function drawScheduleTable(page, data, order, width, height, yStart, pages) {
  const columns = buildScheduleColumns();
  const margin = 22;
  const topY = yStart + 8;
  const bottomY = height - 26;
  const headerHeight = 20;
  let currentPage = page;
  let y = topY;
  let pageIndex = 0;

  const drawHeader = (targetPage, label) => {
    let x = margin;
    targetPage.text(margin, y - 16, label, { size: 12, bold: true });
    columns.forEach((col) => {
      targetPage.rect(x, y, col.width, headerHeight, { fill: "E7EAF0", stroke: true });
      targetPage.text(x + 1, y + 13, col.label, { size: 6, bold: true, width: col.width - 2, align: "center" });
      x += col.width;
    });
  };

  drawHeader(currentPage, "Operacoes / Operations");
  y += headerHeight;

  scheduleOperations.forEach((op, rowIndex) => {
    const values = buildScheduleRowValues(op, rowIndex, data);
    const rowHeight = 16;
    if (y + rowHeight > bottomY) {
      pages.push(currentPage.finish());
      currentPage = makePdfPage(width, height);
      pageIndex += 1;
      drawDocumentHeader(currentPage, width, "DUOMOLD", "Cronograma de Molde", "Progress Report / Tool identification and property");
      y = 86;
      drawScheduleSummary(currentPage, data, order, width, y);
      y = 140;
      drawHeader(currentPage, `Operacoes / Operations (cont.) ${pageIndex + 1}`);
      y += headerHeight;
    }
    drawTableRow(currentPage, columns, values, margin, y, rowHeight, rowIndex % 2 ? "FBFCFE" : null);
    y += rowHeight;
  });

  pages.push(currentPage.finish());
  return y;
}

function drawScheduleDetails(page, data, width, height, y) {
  const margin = 22;
  const boxTop = Math.max(y + 10, 408);
  const cols = [
    { label: "Ref. Peca", value: data.partReference || "", width: 130 },
    { label: "Peso Moldacao (g)", value: data.injectionWeight || "", width: 130 },
    { label: "N. cavidades", value: data.cavities || "", width: 110 },
    { label: "Peso Molde", value: data.toolWeight || "", width: 120 },
    { label: "Dimensoes", value: data.dimensions || "", width: 120 },
    { label: "Tempo de vida", value: data.lifetime || "", width: 120 }
  ];
  let x = margin;
  cols.forEach((col) => {
    page.rect(x, boxTop, col.width, 44, { fill: "FAFAFA", stroke: true });
    page.text(x + 5, boxTop + 12, col.label, { size: 8, bold: true, width: col.width - 10 });
    page.text(x + 5, boxTop + 27, col.value || "", { size: 9, width: col.width - 10 });
    x += col.width;
  });
  if (data.remarks) {
    const remarksTop = boxTop + 52;
    page.rect(margin, remarksTop, width - margin * 2, 42, { fill: "FFFFFF", stroke: true });
    page.text(margin + 6, remarksTop + 12, "Observacoes", { size: 9, bold: true });
    page.text(margin + 6, remarksTop + 26, data.remarks, { size: 9, width: width - margin * 2 - 12 });
  }
  const sigTop = boxTop + 100;
  const sigWidth = (width - margin * 2 - 8) / 2;
  page.rect(margin, sigTop, sigWidth, 54, { fill: "FFFFFF", stroke: true });
  page.rect(margin + sigWidth + 8, sigTop, sigWidth, 54, { fill: "FFFFFF", stroke: true });
  page.text(margin + 8, sigTop + 12, "DUOMOLD, Lda.", { size: 10, bold: true });
  page.text(margin + 8, sigTop + 28, "Data: ____ / ____ / ____", { size: 9 });
  page.text(margin + sigWidth + 16, sigTop + 12, "Cliente", { size: 10, bold: true });
  page.text(margin + sigWidth + 16, sigTop + 28, "Data: ____ / ____ / ____", { size: 9 });
}

function buildPlanningColumns(data) {
  const base = [
    { label: "ID", width: 30 },
    { label: "Nome da Tarefa", width: 210 },
    { label: "Duracao", width: 58 },
    { label: "Inicio", width: 72 },
    { label: "Conclusao", width: 72 },
    { label: "Porcentagem", width: 56 }
  ];
  const remaining = 796 - base.reduce((sum, col) => sum + col.width, 0);
  const extraWidth = data.campos?.length ? Math.max(54, Math.min(92, Math.floor(remaining / data.campos.length))) : 0;
  const extras = (data.campos || []).map((campo) => ({ label: campo.nome || "Campo", width: extraWidth || 60 }));
  return [...base, ...extras];
}

function buildPlanningRowValues(line, data) {
  const values = [String(line.id || ""), line.nome || "", line.duracao || "", line.inicio || "", line.conclusao || "", line.status || "0%"];
  (data.campos || []).forEach((campo, index) => {
    values.push(line.extras?.[index] || "");
  });
  return values;
}

function buildScheduleColumns() {
  return [
    { label: "ID / Operacoes", width: 180 },
    { label: "Nome / Operations", width: 180 },
    { label: "Resp.", width: 44 },
    ...Array.from({ length: 16 }, (_, index) => ({ label: String(index + 1), width: 12 })),
    { label: "25", width: 20 },
    { label: "50", width: 20 },
    { label: "75", width: 20 },
    { label: "100", width: 20 }
  ];
}

function buildScheduleRowValues(op, rowIndex, data) {
  const values = [`${rowIndex + 1}. ${op[0] || ""}`, op[1] || "", data[`r${rowIndex}_resp`] || op[2] || ""];
  for (let week = 1; week <= 16; week += 1) {
    const weekValue = data[`r${rowIndex}_w${week}`];
    const legacyValue = data[`r${rowIndex}_w${week}_programado`] || data[`r${rowIndex}_w${week}_realizado`] ? "X" : "";
    values.push(weekValue === true ? legacyValue : weekValue || legacyValue);
  }
  [25, 50, 75, 100].forEach((percent) => {
    values.push(data[`r${rowIndex}_e${percent}`] ? "X" : "");
  });
  return values;
}

function measureTableRowHeight(columns, values, fontSize, padding, minHeight) {
  let maxLines = 1;
  values.forEach((value, index) => {
    const col = columns[index];
    if (!col) return;
    const chars = Math.max(1, Math.floor((col.width - padding * 2) / (fontSize * 0.48)));
    const lines = wrapPdfText(value, chars);
    maxLines = Math.max(maxLines, lines.length);
  });
  return Math.max(minHeight, maxLines * (fontSize + 2) + padding * 2);
}

function drawTableRow(page, columns, values, startX, startY, rowHeight, fill = null) {
  let x = startX;
  values.forEach((value, index) => {
    const col = columns[index];
    if (!col) return;
    page.rect(x, startY, col.width, rowHeight, { fill: fill || "FFFFFF", stroke: true });
    const lines = wrapPdfText(value, Math.max(1, Math.floor((col.width - 8) / 4.8)));
    lines.slice(0, 3).forEach((line, lineIndex) => {
      page.text(x + 4, startY + 10 + lineIndex * 7, line, { size: 8, width: col.width - 8 });
    });
    x += col.width;
  });
}

function wrapPdfText(value, maxChars) {
  const text = sanitizePdfText(value);
  if (!text) return [""];
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";
  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars) {
      current = next;
      return;
    }
    if (current) lines.push(current);
    if (word.length > maxChars) {
      for (let i = 0; i < word.length; i += maxChars) lines.push(word.slice(i, i + maxChars));
      current = "";
      return;
    }
    current = word;
  });
  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

function sanitizePdfText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[^\x20-\x7E]/g, "");
}

function createPdfDocument(pages, width, height) {
  const objects = [];
  const addObject = (content) => {
    objects.push(content);
    return objects.length;
  };
  const fontRegular = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const fontBold = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  const pageIds = [];
  const contentIds = [];

  pages.forEach((content) => {
    const stream = String(content);
    contentIds.push(addObject(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`));
    pageIds.push(addObject(`<< /Type /Page /Parent 0 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /Font << /F1 ${fontRegular} 0 R /F2 ${fontBold} 0 R >> >> /Contents ${contentIds[contentIds.length - 1]} 0 R >>`));
  });

  const pagesId = addObject(`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`);
  pageIds.forEach((pageId, index) => {
    objects[pageId - 1] = `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /Font << /F1 ${fontRegular} 0 R /F2 ${fontBold} 0 R >> >> /Contents ${contentIds[index]} 0 R >>`;
  });
  const catalogId = addObject(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

  let pdf = "%PDF-1.4\n";
  const offsets = ["0000000000 65535 f "];
  let cursor = pdf.length;
  objects.forEach((object, index) => {
    const body = `${index + 1} 0 obj\n${object}\nendobj\n`;
    offsets.push(String(cursor).padStart(10, "0") + " 00000 n ");
    pdf += body;
    cursor += body.length;
  });
  const xrefStart = cursor;
  pdf += `xref\n0 ${objects.length + 1}\n${offsets.join("\n")}\ntrailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
  return new TextEncoder().encode(pdf);
}

function makePdfPage(width, height) {
  const commands = [];
  const pdfY = (value) => height - value;
  return {
    text(x, y, value, opts = {}) {
      const size = opts.size || 10;
      const font = opts.bold ? "/F2" : "/F1";
      const maxWidth = opts.width || 1000;
      const lines = wrapPdfText(value, Math.max(1, Math.floor(maxWidth / (size * 0.5))));
      lines.forEach((line, index) => {
        const estimatedWidth = line.length * size * 0.5;
        let tx = x;
        if (opts.align === "center") tx = x + Math.max(0, (maxWidth - estimatedWidth) / 2);
        if (opts.align === "right") tx = x + Math.max(0, maxWidth - estimatedWidth);
        commands.push(`BT ${font} ${size} Tf 1 0 0 1 ${tx.toFixed(2)} ${pdfY(y + index * (size + 2)).toFixed(2)} Tm (${escapePdfString(line)}) Tj ET`);
      });
    },
    line(x1, y1, x2, y2, lineWidth = 0.6) {
      commands.push(`${lineWidth} w ${x1.toFixed(2)} ${pdfY(y1).toFixed(2)} m ${x2.toFixed(2)} ${pdfY(y2).toFixed(2)} l S`);
    },
    rect(x, y, w, h, opts = {}) {
      const fill = opts.fill ? fillColorCode(opts.fill) : "1 1 1 rg 0 0 0 RG 0.6 w";
      commands.push(`${fill} ${x.toFixed(2)} ${pdfY(y + h).toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re ${opts.fill ? "B" : "S"}`);
    },
    finish() {
      return commands.join("\n");
    }
  };
}

function escapePdfString(value) {
  return sanitizePdfText(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function fillColorCode(fill) {
  const colors = {
    F7F8FB: "0.969 0.973 0.984 rg 0 0 0 RG 0.6 w",
    E7EAF0: "0.906 0.918 0.941 rg 0 0 0 RG 0.6 w",
    FAFAFA: "0.980 0.980 0.980 rg 0 0 0 RG 0.6 w",
    FBFCFE: "0.984 0.988 0.996 rg 0 0 0 RG 0.6 w",
    FFFFFF: "1 1 1 rg 0 0 0 RG 0.6 w"
  };
  return colors[String(fill).toUpperCase()] || colors.FFFFFF;
}

function exportSchedule() {
  const { jsPDF } = window.jspdf || {};
  if (!jsPDF || typeof jsPDF.API?.autoTable !== "function") {
    alert("A biblioteca PDF nao carregou corretamente.");
    return;
  }
  const page = qs(".schedule-page");
  if (!page) return;
  const order = state.orders.find((item) => item.id === page.dataset.orderId);
  if (!order) return;

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const data = order.schedule || {};
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;

  addPdfHeader(doc, pageWidth, "DUOMOLD", "Cronograma de Molde", "Progress Report / Tool identification and property");
  addPdfInfoRow(doc, [
    ["N. Molde", data.moldNumber || order.reference || ""],
    ["No Molde Cliente", data.customerMoldNumber || ""],
    ["Week", data.week || ""],
    ["Progressao do projeto", `${order.progress || "0"}%`]
  ], margin, 24);

  const body = scheduleOperations.map((op, rowIndex) => {
    const row = [`${rowIndex + 1}. ${op[0] || ""}`, op[1] || "", data[`r${rowIndex}_resp`] || op[2] || ""];
    for (let week = 1; week <= 16; week += 1) {
      const weekValue = data[`r${rowIndex}_w${week}`];
      const legacyValue = data[`r${rowIndex}_w${week}_programado`] || data[`r${rowIndex}_w${week}_realizado`] ? "X" : "";
      row.push(weekValue === true ? legacyValue : weekValue || legacyValue);
    }
    [25, 50, 75, 100].forEach((percent) => row.push(data[`r${rowIndex}_e${percent}`] ? "X" : ""));
    return row;
  });

  const head = [
    ["ID / Operacoes", "Nome / Operations", "Resp.", ...Array.from({ length: 16 }, (_, index) => data[`weekHeader${index + 1}`] || String(index + 1)), "25", "50", "75", "100"]
  ];
  const columnStyles = {
    0: { cellWidth: 28 },
    1: { cellWidth: 74 },
    2: { cellWidth: 12 }
  };
  for (let i = 3; i < 19; i += 1) columnStyles[i] = { cellWidth: 6.5, halign: "center" };
  columnStyles[19] = { cellWidth: 8, halign: "center" };
  columnStyles[20] = { cellWidth: 8, halign: "center" };
  columnStyles[21] = { cellWidth: 8, halign: "center" };
  columnStyles[22] = { cellWidth: 9, halign: "center" };

  doc.autoTable({
    head,
    body,
    startY: 40,
    margin: { left: margin, right: margin },
    theme: "grid",
    styles: { font: "helvetica", fontSize: 5.5, cellPadding: 1.2, valign: "middle", overflow: "linebreak" },
    headStyles: { fillColor: [231, 234, 240], textColor: 20, fontStyle: "bold" },
    columnStyles,
    didDrawPage: (hookData) => {
      if (hookData.pageNumber === 1) return;
      addPdfHeader(doc, pageWidth, "DUOMOLD", "Cronograma de Molde", "Progress Report / Tool identification and property");
    }
  });

  const afterTableY = doc.lastAutoTable?.finalY || 40;
  let y = afterTableY + 8;
  if (y > pageHeight - 70) {
    doc.addPage();
    y = 18;
  }
  addPdfInfoGrid(doc, [
    ["Ref. Peca", data.partReference || ""],
    ["Peso Moldacao (g)", data.injectionWeight || ""],
    ["N. cavidades", data.cavities || ""],
    ["Peso Molde", data.toolWeight || ""],
    ["Dimensoes", data.dimensions || ""],
    ["Tempo de vida (ciclos)", data.lifetime || ""]
  ], margin, y, pageWidth - margin * 2);

  y += 28;
  if (data.remarks) {
    const lines = doc.splitTextToSize(normalizePdfText(data.remarks), pageWidth - margin * 2 - 6);
    doc.setDrawColor(180);
    doc.rect(margin, y, pageWidth - margin * 2, Math.max(10, lines.length * 4 + 6));
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Observacoes", margin + 2, y + 4);
    doc.setFont("helvetica", "normal");
    doc.text(lines, margin + 2, y + 8);
    y += Math.max(12, lines.length * 4 + 8);
  }

  y += 4;
  const sigWidth = (pageWidth - margin * 2 - 4) / 2;
  doc.rect(margin, y, sigWidth, 20);
  doc.rect(margin + sigWidth + 4, y, sigWidth, 20);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("DUOMOLD, Lda.", margin + 2, y + 5);
  doc.text("Cliente", margin + sigWidth + 6, y + 5);
  doc.setFont("helvetica", "normal");
  doc.text("Data: ____ / ____ / ____", margin + 2, y + 12);
  doc.text("Data: ____ / ____ / ____", margin + sigWidth + 6, y + 12);

  doc.save(`cronograma-${order.reference || "molde"}.pdf`);
}

function exportPlanning() {
  const { jsPDF } = window.jspdf || {};
  if (!jsPDF || typeof jsPDF.API?.autoTable !== "function") {
    alert("A biblioteca PDF nao carregou corretamente.");
    return;
  }
  const { order } = activePlanning();
  if (!order) return;

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const data = planningFor(order);
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;

  addPdfHeader(doc, pageWidth, "DUOMOLD", "Planeamento do Molde", "Tabela de acompanhamento do projeto");
  addPdfInfoRow(doc, [
    ["Projeto", data.projeto || order.reference || ""],
    ["Cliente", data.cliente || clientName(order.clientId)],
    ["N. Molde", data.molde || ""],
    ["Data", data.data || today()]
  ], margin, 24);

  const extraLabels = (data.campos || []).map((campo) => normalizePdfText(campo.nome || "Campo"));
  const head = [["ID", "Nome da Tarefa", "Duracao", "Inicio", "Conclusao", "Porcentagem", ...extraLabels]];
  const body = data.linhas.map((line) => [
    line.id || "",
    line.nome || "",
    line.duracao || "",
    line.inicio || "",
    line.conclusao || "",
    line.status || "0%",
    ...(data.campos || []).map((_, index) => line.extras?.[index] || "")
  ]);

  const columnStyles = {
    0: { cellWidth: 10, halign: "center" },
    1: { cellWidth: 64 },
    2: { cellWidth: 18, halign: "center" },
    3: { cellWidth: 20, halign: "center" },
    4: { cellWidth: 22, halign: "center" },
    5: { cellWidth: 18, halign: "center" }
  };
  let extraWidth = extraLabels.length ? Math.max(16, Math.min(24, Math.floor((pageWidth - margin * 2 - 152) / extraLabels.length))) : 0;
  extraLabels.forEach((_, index) => {
    columnStyles[6 + index] = { cellWidth: extraWidth, halign: "center" };
  });

  doc.autoTable({
    head,
    body,
    startY: 40,
    margin: { left: margin, right: margin },
    theme: "grid",
    styles: { font: "helvetica", fontSize: 6, cellPadding: 1.1, valign: "middle", overflow: "linebreak" },
    headStyles: { fillColor: [231, 234, 240], textColor: 20, fontStyle: "bold" },
    columnStyles,
    didDrawPage: (hookData) => {
      if (hookData.pageNumber === 1) return;
      addPdfHeader(doc, pageWidth, "DUOMOLD", "Planeamento do Molde", "Tabela de acompanhamento do projeto");
    }
  });

  const afterTableY = doc.lastAutoTable?.finalY || 40;
  let y = afterTableY + 8;
  if (data.observacoes) {
    if (y > pageHeight - 50) {
      doc.addPage();
      y = 18;
    }
    const lines = doc.splitTextToSize(normalizePdfText(data.observacoes), pageWidth - margin * 2 - 6);
    doc.setDrawColor(180);
    doc.rect(margin, y, pageWidth - margin * 2, Math.max(10, lines.length * 4 + 6));
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Observacoes", margin + 2, y + 4);
    doc.setFont("helvetica", "normal");
    doc.text(lines, margin + 2, y + 8);
    y += Math.max(12, lines.length * 4 + 8);
  }

  doc.save(`planeamento-${order.reference || "molde"}.pdf`);
}

function addPdfHeader(doc, pageWidth, brand, title, subtitle) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(brand, 10, 12);
  doc.setFontSize(12);
  doc.text(title, pageWidth - 10, 12, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(subtitle, pageWidth - 10, 17, { align: "right" });
  doc.setDrawColor(120);
  doc.line(10, 20, pageWidth - 10, 20);
}

function addPdfInfoRow(doc, items, margin, y) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const gap = 2;
  const width = (pageWidth - margin * 2 - gap * (items.length - 1)) / items.length;
  let x = margin;
  items.forEach(([label, value]) => {
    doc.setDrawColor(180);
    doc.rect(x, y, width, 16);
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.text(normalizePdfText(label), x + 2, y + 5);
    doc.setFont("helvetica", "normal");
    doc.text(normalizePdfText(value), x + 2, y + 10);
    x += width + gap;
  });
}

function addPdfInfoGrid(doc, items, margin, y, availableWidth) {
  const gap = 2;
  const columns = 3;
  const width = (availableWidth - gap * (columns - 1)) / columns;
  let x = margin;
  let rowY = y;
  items.forEach(([label, value], index) => {
    if (index > 0 && index % columns === 0) {
      rowY += 18;
      x = margin;
    }
    doc.setDrawColor(180);
    doc.rect(x, rowY, width, 16);
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.text(normalizePdfText(label), x + 2, rowY + 5);
    doc.setFont("helvetica", "normal");
    doc.text(normalizePdfText(value), x + 2, rowY + 10);
    x += width + gap;
  });
}

function normalizePdfText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

window.addEventListener("beforeprint", () => {
  if (!document.body.classList.contains("printing-schedule") && !document.body.classList.contains("printing-planning") && !document.body.classList.contains("printing-vacation-map")) {
    if (qs("#planningDialog")?.open) document.body.classList.add("printing-planning");
    if (qs("#scheduleDialog")?.open) document.body.classList.add("printing-schedule");
  }
});

window.addEventListener("afterprint", () => {
  document.body.classList.remove("printing-schedule", "printing-planning", "printing-vacation-map");
});

function toDatasetKey(key) {
  return key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

initSupabase();
setView(defaultView());
render();
loadStateFromSupabase();



