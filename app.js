const storageKey = "duomold-demo-v3";

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
  vacations: [
    { id: "vac-1", userId: "user-funcionario", startDate: "2026-07-01", endDate: "2026-07-15", days: "15", origin: "Admin/RH", status: "Aprovado", notes: "Periodo definido pela administracao.", decidedBy: "Administrador" },
    { id: "vac-2", userId: "user-funcionario", startDate: "2026-08-10", endDate: "2026-08-14", days: "5", origin: "Funcionario", status: "Pendente", notes: "Pedido do funcionario.", decidedBy: "" }
  ],
  absences: [
    { id: "abs-1", userId: "user-funcionario", date: "2026-05-20", type: "Justificada", status: "Pendente", reason: "Consulta medica", decidedBy: "" }
  ],
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

let state = loadState();
let currentView = "adminPage";
let dialogMode = "client";
let editingId = null;
let isLoggedIn = false;
let supabaseClient = null;
let supabaseSaveTimer = null;
let applyingRemoteState = false;

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
  rhPage: ["RH", "Gestao de férias, faltas e colaboradores."],
  employeePage: ["Funcionario", "Area pessoal para férias e faltas."],
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
    ["status", "Estado", "select:Recebido|Em análise|Em produção|Aguardando cliente|Concluído|Entregue"],
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
    ["employeeNumber", "MatrÃ­cula", "text", true],
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
    ["role", "FunÃ§Ã£o/Cargo", "text"],
    ["address", "Morada da Empresa", "textarea"],
    ["notes", "ObservaÃ§Ãµes", "textarea"]
  ],
  vacation: [
    ["userId", "Colaborador", "user", true],
    ["origin", "Origem", "select:Admin/RH|Funcionario"],
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
    ["reason", "Motivo", "textarea"]
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
    localStorage.setItem(storageKey, JSON.stringify(fresh));
    return fresh;
  }
}

function mergeState(saved) {
  const merged = structuredClone(demoData);
  Object.assign(merged, saved);
  ["companies", "clients", "users", "orders", "vacations", "absences"].forEach((key) => {
    if (!Array.isArray(merged[key]) || !merged[key].length) merged[key] = structuredClone(demoData[key]);
  });
  if (!Array.isArray(merged.notifications)) merged.notifications = [];
  merged.users = merged.users.map((user, index) => ({ ...user, employeeNumber: user.employeeNumber || `COL-${String(index + 1).padStart(3, "0")}` }));
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

function normalizeOrderText(order) {
  const statusMap = {
    "Em producao": "Em produção",
    "Em analise": "Em análise",
    Concluido: "Concluído"
  };
  return {
    ...order,
    status: statusMap[order.status] || order.status,
    showPlanningToClient: order.showPlanningToClient || "Sim",
    showScheduleToClient: order.showScheduleToClient || "Sim"
  };
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
  scheduleSupabaseSave();
  render();
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
      await saveStateToSupabase();
      return;
    }
    applyingRemoteState = true;
    state = mergeState(data.data);
    applyingRemoteState = false;
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
  const config = window.DUOMOLD_SUPABASE;
  try {
    const payload = {
      id: config.stateId,
      data: state,
      updated_at: new Date().toISOString()
    };
    const { error } = await supabaseClient
      .from(config.stateTable)
      .upsert(payload, { onConflict: "id" });
    if (error) throw error;
  } catch (error) {
    console.warn("Nao foi possivel gravar no Supabase. Os dados ficaram guardados localmente.", error);
  }
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
    button.hidden = !allowedViews().includes(button.dataset.view);
    button.classList.toggle("active", button.dataset.view === currentView);
  });
  qs("#pageTitle").textContent = titles[currentView][0];
  qs("#pageSubtitle").textContent = titles[currentView][1];
  qs("#newRecordButton").textContent = actionLabel();
  qs("#newRecordButton").hidden = !canCreateHere();
}

function qsa(selector) {
  return [...document.querySelectorAll(selector)];
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
  localStorage.setItem(storageKey, JSON.stringify(state));
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
      message: "NÃ£o foi possÃ­vel validar no Supabase. Confirme se executou o SQL completo e se a chave estÃ¡ correta."
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
    [companies, clients, users, orders, vacations, absences, notifications].forEach((result) => {
      if (result.error) throw result.error;
    });
    state.companies = companies.data.map(mapCompanyFromSupabase);
    state.clients = clients.data.map(mapClientFromSupabase);
    state.users = users.data.map(mapUserFromSupabase);
    state.orders = orders.data.map(mapOrderFromSupabase);
    state.vacations = vacations.data.map(mapVacationFromSupabase);
    state.absences = absences.data.map(mapAbsenceFromSupabase);
    state.notifications = notifications.data.map(mapNotificationFromSupabase);
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch (error) {
    console.warn("Nao foi possivel carregar tabelas principais do Supabase.", error);
  }
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
    role: row.profile || "Funcionario",
    department: row.department || "",
    position: row.position || "",
    status: row.status || "Ativo"
  };
}

function mapOrderFromSupabase(row) {
  return normalizeOrderText({
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
    showPlanningToClient: row.show_planning_to_client ? "Sim" : "NÃ£o",
    showScheduleToClient: row.show_schedule_to_client ? "Sim" : "NÃ£o"
  });
}

function mapVacationFromSupabase(row) {
  return {
    id: row.id,
    userId: row.user_id || "",
    startDate: row.start_date || "",
    endDate: row.end_date || "",
    days: String(row.days ?? 0),
    origin: row.origin || "Funcionario",
    status: row.status || "Pendente",
    notes: row.notes || "",
    decidedBy: row.decided_by || "",
    linkedAbsenceId: row.linked_absence_id || ""
  };
}

function mapAbsenceFromSupabase(row) {
  return {
    id: row.id,
    userId: row.user_id || "",
    date: row.date || "",
    type: row.type || "Justificada",
    compensateVacation: row.compensate_vacation ? "Sim" : "NÃ£o",
    status: row.status || "Pendente",
    reason: row.reason || "",
    decidedBy: row.decided_by || ""
  };
}

function mapNotificationFromSupabase(row) {
  return {
    id: row.id,
    to: row.target || "",
    title: row.title || "",
    message: row.message || "",
    page: row.page || "",
    recordType: row.record_type || "",
    recordId: row.record_id || "",
    read: Boolean(row.is_read),
    createdAt: row.created_at || new Date().toISOString()
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
  text("#employeeAvailableDays", Math.max(15 - approved - pending, 0));
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
  qs("#profileInfoGrid").innerHTML = items.map(([labelText, valueText]) => `
    <article class="profile-info-item">
      <span>${esc(labelText)}</span>
      <strong>${esc(valueText || "Não preenchido")}</strong>
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

function addNotification({ to, title, message, link = "" }) {
  state.notifications.unshift({
    id: `notif-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    to,
    title,
    message,
    link,
    read: false,
    createdAt: new Date().toISOString()
  });
}

function notifyWithAdminCopy({ to, title, message, link = "" }) {
  addNotification({ to, title, message, link });
  if (to !== "role:Admin") addNotification({ to: "role:Admin", title, message, link });
}

function markNotificationsRead() {
  const ids = new Set(visibleNotifications().map((item) => item.id));
  state.notifications.forEach((item) => {
    if (ids.has(item.id)) item.read = true;
  });
  localStorage.setItem(storageKey, JSON.stringify(state));
  renderNotifications();
}

function openNotification(id) {
  const item = state.notifications.find((notification) => notification.id === id);
  if (!item) return;
  item.read = true;
  localStorage.setItem(storageKey, JSON.stringify(state));
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
  table("#usersTable", rows, (user) => {
    const total = sum(state.vacations.filter((item) => item.userId === user.id && item.status !== "Rejeitado"));
    return `<tr>
      <td><strong>${esc(user.name)}</strong><small>${esc(user.position || "Sem cargo")}</small></td>
      <td><strong>${esc(user.employeeNumber || "Sem matrícula")}</strong></td>
      <td><span class="status ${cls(user.role)}">${esc(user.role)}</span></td>
      <td><strong>${esc(user.email)}</strong><small>${esc(user.phone || "Sem telefone")}</small></td>
      <td>${esc(user.department || "Sem departamento")}</td>
      <td><strong>${total}/30 dias</strong><small>Limite anual</small></td>
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

function openDialog(mode, id = null, defaults = {}) {
  dialogMode = mode;
  editingId = id;
  const sourceMode = mode === "profileUser" ? "user" : mode === "profileClient" ? "client" : mode;
  const baseRecord = id ? collection(sourceMode).find((item) => item.id === id) : { ...defaultRecord(sourceMode), ...defaults };
  const record = ["client", "profileClient"].includes(mode) ? clientFormRecord(baseRecord || {}) : baseRecord;
  qs("#dialogTitle").textContent = dialogTitle(mode, Boolean(id));
  qs("#dialogSubtitle").textContent = dialogSubtitle(mode);
  qs("#formAlert").textContent = "";
  qs("#formFields").innerHTML = forms[mode].map((field) => fieldHtml(field, record || {})).join("");
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
  if (mode === "profileUser" || mode === "profileClient") return "Atualize as informaÃ§Ãµes do perfil atual.";
  if (mode === "client") return "Preencha os dados do cliente e da empresa na mesma ficha.";
  if (mode === "vacation") return "Escolha as datas. O sistema calcula os dias úteis e limita cada pedido a 15 dias.";
  if (mode === "absence") return "Registe a falta e indique se ela deve ser compensada com 1 dia de férias.";
  return "Preencha os dados principais.";
}

function fieldHtml([name, labelText, type, required], record) {
  const valueText = record[name] || "";
  const req = required ? "required" : "";
  if (type === "textarea") return `<label class="field full"><span>${labelText}</span><textarea name="${name}" ${req}>${esc(valueText)}</textarea></label>`;
  if (type === "company") return selectField(name, labelText, state.companies.map((item) => [item.id, item.name]), valueText, req);
  if (type === "client") return selectField(name, labelText, state.clients.map((item) => [item.id, item.name]), valueText, req);
  if (type === "user") {
    const users = role() === "Funcionario" && ["vacation", "absence"].includes(dialogMode) ? state.users.filter((item) => item.id === currentUser()?.id) : state.users;
    return selectField(name, labelText, users.map((item) => [item.id, item.name]), valueText, req);
  }
  if (type.startsWith("select:")) return selectField(name, labelText, type.replace("select:", "").split("|").map((item) => [item, item]), valueText, req);
  return `<label class="field"><span>${labelText}</span><input name="${name}" type="${type}" value="${esc(valueText)}" ${req}></label>`;
}

function selectField(name, labelText, options, valueText, req) {
  return `<label class="field"><span>${labelText}</span><select name="${name}" ${req}>${options.map(([valueOption, labelOption]) => `<option value="${esc(valueOption)}" ${valueText === valueOption ? "selected" : ""}>${esc(labelOption)}</option>`).join("")}</select></label>`;
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
    const validation = validateVacation(data);
    if (!validation.ok) {
      qs("#formAlert").textContent = validation.message;
      return;
    }
    data.days = String(validation.days);
  }
  if (dialogMode === "absence") {
    const existingCompensation = editingId && state.vacations.some((item) => item.linkedAbsenceId === editingId);
    const usedForCompensation = vacationDaysUsed(data.userId) - (existingCompensation ? 1 : 0);
    if (data.compensateVacation === "Sim" && data.status !== "Rejeitado" && usedForCompensation + 1 > 30) {
      qs("#formAlert").textContent = "Não é possível compensar com férias porque o colaborador já atingiu o limite anual de 30 dias.";
      return;
    }
    saveAbsenceWithCompensation(data);
    qs("#recordDialog").close();
    saveState();
    return;
  }
  const target = collection(dialogMode);
  let savedRecord = null;
  const wasEditing = Boolean(editingId);
  if (editingId) {
    const index = target.findIndex((item) => item.id === editingId);
    target[index] = { ...target[index], ...data };
    savedRecord = target[index];
  } else {
    savedRecord = { id: `${dialogMode}-${Date.now()}`, ...data };
    target.push(savedRecord);
  }
  if (dialogMode === "order") notifyOrderChange(savedRecord, wasEditing);
  if (dialogMode === "vacation") notifyVacationRequest(savedRecord);
  qs("#recordDialog").close();
  saveState();
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
  localStorage.setItem(storageKey, JSON.stringify(state));
  qs("#passwordDialog").close();
  alert("Senha alterada com sucesso.");
}

function notifyVacationRequest(vacation) {
  if (!vacation || vacation.origin !== "Funcionario" || vacation.status !== "Pendente") return;
  notifyWithAdminCopy({
    to: "role:RH",
    title: "Novo pedido de férias",
    message: `${userName(vacation.userId)} pediu férias de ${date(vacation.startDate)} a ${date(vacation.endDate)}.`,
    link: "vacations"
  });
  const recipients = state.users
    .filter((user) => ["Admin", "RH"].includes(user.role) && user.email)
    .map((user) => user.email);
  if (!recipients.length) return;
  const employee = userName(vacation.userId);
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

function notifyOrderChange(order, wasEditing) {
  if (!order?.clientId) return;
  notifyWithAdminCopy({
    to: `client:${order.clientId}`,
    title: wasEditing ? "Encomenda atualizada" : "Nova encomenda criada",
    message: `${order.reference}: ${order.weeklyUpdate || order.status || "Consulte a atualização no sistema."}`,
    link: isClient() ? "clientPortal" : "orders"
  });
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
  end.max = addDays(start.value, 14);
  if (!end.value || end.value < start.value) end.value = start.value;
  if (end.value > end.max) end.value = end.max;
  let total = businessDays(start.value, end.value);
  while (total > 15) {
    end.value = addDays(end.value, -1);
    total = businessDays(start.value, end.value);
  }
  days.value = total || "";
  const used = vacationDaysUsed(form.elements.userId.value, editingId);
  const remaining = Math.max(30 - used - total, 0);
  if (hint) hint.textContent = `Total deste pedido: ${total} dias úteis. Já usados/pendentes: ${used}/30. Restam após este pedido: ${remaining}.`;
}

function validateVacation(data) {
  const days = businessDays(data.startDate, data.endDate);
  if (!data.startDate || !data.endDate) return { ok: false, message: "Preencha a data inicial e a data final." };
  if (new Date(data.endDate) < new Date(data.startDate)) return { ok: false, message: "A data final não pode ser anterior à data inicial." };
  if (data.endDate > addDays(data.startDate, 14)) return { ok: false, message: "A data final pode ir apenas até 15 dias corridos a partir da data inicial." };
  if (days < 1) return { ok: false, message: "O período precisa ter pelo menos 1 dia útil." };
  if (days > 15) return { ok: false, message: "Cada pedido de férias pode ter no máximo 15 dias úteis a partir da data inicial." };
  const used = vacationDaysUsed(data.userId, editingId);
  if (used + days > 30) return { ok: false, message: `Este colaborador já tem ${used} dias usados/pendentes. O limite anual é 30 dias.` };
  return { ok: true, days };
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
}

function syncAbsenceCompensation(absence) {
  state.vacations = state.vacations.filter((item) => item.linkedAbsenceId !== absence.id);
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
  if (mode === "order") return { clientId: state.clients[0]?.id, status: "Recebido", progress: "0", showPlanningToClient: "Sim", showScheduleToClient: "Sim" };
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
  saveState();
}

function approve(mode, id, status) {
  const item = collection(mode).find((record) => record.id === id);
  if (!item) return;
  item.status = status;
  item.decidedBy = currentUser()?.name || "Admin";
  if (mode === "absence") syncAbsenceCompensation(item);
  if (mode === "vacation") notifyWithAdminCopy({
    to: `user:${item.userId}`,
    title: `Pedido de férias ${status.toLowerCase()}`,
    message: `O seu pedido de ${date(item.startDate)} a ${date(item.endDate)} foi ${status.toLowerCase()}.`,
    link: "vacations"
  });
  if (mode === "absence") notifyWithAdminCopy({
    to: `user:${item.userId}`,
    title: `Falta ${status.toLowerCase()}`,
    message: `A sua falta de ${date(item.date)} foi ${status.toLowerCase()}.`,
    link: "absences"
  });
  saveState();
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
  const value = (key, fallback = "") => esc(data[key] || fallback);
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
    return `<tr><td class="op-pt">${esc(op[0])}</td><td class="op-en">${esc(op[1])}</td><td class="resp">${esc(op[2])}</td>${weeks}${evol}</tr>`;
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
          <tr>${Array.from({ length: 16 }, () => "<th></th>").join("")}${[25, 50, 75, 100].map((item) => `<th>${item}</th>`).join("")}</tr>
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
  qsa("[data-schedule]").forEach((field) => {
    const key = field.dataset.schedule;
    order.schedule[key] = field.type === "checkbox" || field.type === "radio" ? field.checked : field.value;
  });
  if (!order.schedule.moldNumber) order.schedule.moldNumber = order.reference;
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function exportSchedule() {
  const page = qs(".schedule-page");
  if (!page) return;
  const order = state.orders.find((item) => item.id === page.dataset.orderId);
  const blob = new Blob([JSON.stringify(order?.schedule || {}, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `cronograma-${order?.reference || "molde"}.json`;
  link.click();
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
    localStorage.setItem(storageKey, JSON.stringify(state));
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
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function deletePhoto(target) {
  const { order, readonly, context } = activeDocumentOrder(target);
  if (!order || readonly || !confirm("Remover esta foto?")) return;
  order.moldPhotos = moldPhotos(order).filter((item) => item.id !== target.dataset.photoDelete);
  localStorage.setItem(storageKey, JSON.stringify(state));
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
  order.planning.linhas.forEach((line, index) => {
    if (!line.id) line.id = index + 1;
    if (!line.tipo && planningStatusOptions.includes(line.status)) {
      line.tipo = line.status;
      line.status = "0%";
    }
    if (!Array.isArray(line.extras)) line.extras = [];
    while (line.extras.length < order.planning.campos.length) line.extras.push("");
  });
  return order.planning;
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
  const { data, readonly } = activePlanning();
  if (!data || readonly) return;
  const topField = target.dataset.planningField;
  if (topField) data[topField] = target.value;
  const rowIndex = target.dataset.planningRow;
  const prop = target.dataset.planningProp;
  if (rowIndex !== undefined && prop) data.linhas[rowIndex][prop] = target.value;
  const extraIndex = target.dataset.planningExtra;
  if (rowIndex !== undefined && extraIndex !== undefined) data.linhas[rowIndex].extras[extraIndex] = target.value;
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function refreshPlanning() {
  const { order, readonly } = activePlanning();
  if (!order) return;
  qs("#planningBody").innerHTML = planningHtml(order, readonly);
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function addPlanningLine(type = "tarefa") {
  const { data, readonly } = activePlanning();
  if (!data || readonly) return;
  const name = prompt(type === "grupo" ? "Nome do novo grupo" : "Nome da nova tarefa");
  if (!name) return;
  data.linhas.push({
    id: data.linhas.length + 1,
    nome: name,
    duracao: "",
    inicio: "",
    conclusao: "",
    tipo: type === "grupo" ? "Sumario" : "Tarefa",
    status: "0%",
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
  const blob = new Blob([JSON.stringify(planningFor(order), null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `planeamento-${order.reference || "molde"}.json`;
  link.click();
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

qsa(".nav-item").forEach((button) => button.addEventListener("click", () => setView(button.dataset.view)));
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
qs("#addUserButton").addEventListener("click", () => openDialog("user"));
qs("#addVacationButton").addEventListener("click", () => openDialog("vacation"));
qs("#addAbsenceButton").addEventListener("click", () => openDialog("absence"));
qs("#employeeVacationShortcut").addEventListener("click", () => openDialog("vacation"));
qs("#recordForm").addEventListener("submit", handleSubmit);
qs("#closeDialogButton").addEventListener("click", () => qs("#recordDialog").close());
qs("#cancelDialogButton").addEventListener("click", () => qs("#recordDialog").close());
qs("#loginForm").addEventListener("submit", loginWithCredentials);
qs("#logoutButton").addEventListener("click", logout);
qs("#changePasswordButton").addEventListener("click", openPasswordDialog);
qs("#editProfileButton").addEventListener("click", openProfileDialog);
qs("#profilePasswordButton").addEventListener("click", openPasswordDialog);
qs("#passwordForm").addEventListener("submit", handlePasswordSubmit);
qs("#closePasswordButton").addEventListener("click", () => qs("#passwordDialog").close());
qs("#cancelPasswordButton").addEventListener("click", () => qs("#passwordDialog").close());
qs("#notificationButton").addEventListener("click", () => {
  qs("#notificationPanel").hidden = !qs("#notificationPanel").hidden;
});
qs("#markNotificationsReadButton").addEventListener("click", markNotificationsRead);
qs("#exportButton").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "duomold-demo.json";
  link.click();
});
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
  if (event.target.closest("#scheduleDialog")) saveSchedule();
  if (event.target.closest("#planningDialog")) savePlanningField(event.target);
});

qs("#closeScheduleButton").addEventListener("click", () => qs("#scheduleDialog").close());
qs("#printScheduleButton").addEventListener("click", () => printDocument("schedule"));
qs("#exportScheduleButton").addEventListener("click", () => printDocument("schedule"));
qs("#closePlanningButton").addEventListener("click", () => qs("#planningDialog").close());
qs("#printPlanningButton").addEventListener("click", () => printDocument("planning"));
qs("#exportPlanningButton").addEventListener("click", () => printDocument("planning"));
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

window.addEventListener("beforeprint", () => {
  if (!document.body.classList.contains("printing-schedule") && !document.body.classList.contains("printing-planning")) {
    if (qs("#planningDialog")?.open) document.body.classList.add("printing-planning");
    if (qs("#scheduleDialog")?.open) document.body.classList.add("printing-schedule");
  }
});

window.addEventListener("afterprint", () => {
  document.body.classList.remove("printing-schedule", "printing-planning");
});

function toDatasetKey(key) {
  return key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

initSupabase();
setView(defaultView());
render();
loadStateFromSupabase();
