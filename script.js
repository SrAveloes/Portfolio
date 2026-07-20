document.addEventListener('DOMContentLoaded', () => {
  // --- ELEMENTOS ---
  const header = document.querySelector('.header');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  
  const tabButtons = document.querySelectorAll('.tab-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const currentYearSpan = document.getElementById('current-year');

  // --- 1. ANO ATUAL AUTOMÁTICO ---
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --- 2. HEADER SCROLL & LINK ATIVO ---
  window.addEventListener('scroll', () => {
    // Efeito de rolagem do header
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Detecção de seção ativa no menu
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 180)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // --- 3. MENU MOBILE ---
  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      
      const spans = menuToggle.querySelectorAll('span');
      if (navLinksContainer.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // --- 4. FILTRAGEM DE PROJETOS ---
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transition = 'opacity 0.3s ease';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 5. FORMULÁRIO DE CONTATO PROFISSIONAL ---
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> Direcionando...';
      if (window.lucide) lucide.createIcons();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (window.lucide) lucide.createIcons();
        
        if (name && email && message) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = `<strong>Sucesso:</strong> Redirecionando para o WhatsApp Comercial para iniciar o contato...`;
          
          // Formatar o texto de contato profissional para enviar ao WhatsApp
          const serviceLabel = getServiceLabel(service);
          const formattedMessage = `Olá Gustavo,\n\nMeu nome é ${name} (${email}). Entro em contato através do portfólio referente a: *${serviceLabel}*.\n\nMensagem:\n${message}`;
          const encodedMessage = encodeURIComponent(formattedMessage);
          
          const whatsappUrl = `https://wa.me/5511995068287?text=${encodedMessage}`;
          window.open(whatsappUrl, '_blank');
          
          contactForm.reset();
        } else {
          formStatus.className = 'form-status error';
          formStatus.innerHTML = '<strong>Erro:</strong> Por favor, verifique se todos os campos obrigatórios foram preenchidos.';
        }
        
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 1200);
    });
  }

  // --- 6. PAINEL LATERAL DESLIZANTE (CASES DETAIL DRAWER) ---
  const caseDrawer = document.getElementById('case-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerClose = document.getElementById('drawer-close');
  const drawerContent = document.getElementById('drawer-content');
  const viewCaseBtns = document.querySelectorAll('.view-case-btn');

  const casesData = {
    ativos: {
      title: "Auditoria e Cadastro de Ativos Corporativos",
      title_en: "Corporate Asset Audit & Inventory System",
      tags: ["FlutterFlow", "Supabase", "Resend API", "Biometria"],
      tags_en: ["FlutterFlow", "Supabase", "Resend API", "Biometrics"],
      problem: "Auditorias e inventários manuais lentos, dependentes de planilhas locais e vulneráveis a erros de preenchimento e perda de imagens físicas.",
      problem_en: "Slow manual asset audits dependent on local spreadsheets, vulnerable to data entry errors and missing physical image proof.",
      solution: "Aplicativo mobile desenvolvido em FlutterFlow integrado ao Supabase. Apresenta autenticação biométrica (impressão digital), tela de cadastro dinâmico com fotos enviadas diretamente para o Storage do Supabase e envio de relatórios de conformidade via API do Resend.",
      solution_en: "Cross-platform mobile app built in FlutterFlow integrated with Supabase. Features biometric authentication, dynamic asset registration with photos saved to Supabase Storage, and automated compliance report emails via Resend API.",
      tech: "FlutterFlow, Supabase (Database/Storage/Auth), Resend Email API, Dart.",
      tech_en: "FlutterFlow, Supabase (Database/Storage/Auth), Resend Email API, Dart.",
      result: "Digitalização de 100% dos relatórios de auditoria, eliminação de papéis e planilhas paralelas, e rastreabilidade imediata do status de cada ativo corporativo.",
      result_en: "100% audit report digitization, complete elimination of paper forms and loose spreadsheets, and immediate asset traceability.",
      hasVideo: true,
      videoSrc: "assets/cadastro_ativos.mp4",
      images: ["assets/home_page.jpeg", "assets/cadastro_ativo.jpeg", "assets/lista_ativos.jpeg"],
      showSupabasePrint: true,
      codeSnippet: `// Custom Action no FlutterFlow para Envio de E-mail de Auditoria via Resend API
import 'package:http/http.dart' as http;
import 'dart:convert';

Future<bool> sendAssetConfirmationEmail(
  String recipientEmail,
  String assetName,
  String assetCode,
  String auditorName,
) async {
  final url = Uri.parse('https://api.resend.com/emails');
  
  try {
    final response = await http.post(
      url,
      headers: {
        'Authorization': 'Bearer re_123456789', // API Key higienizada
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'from': 'Auditoria de Ativos <auditoria@empresa.com>',
        'to': [recipientEmail],
        'subject': 'Alerta de Cadastro de Ativo: $assetCode',
        'html': '''
          <h3>Confirmação de Auditoria de Ativo</h3>
          <p>O ativo <strong>$assetName</strong> (Código: $assetCode) foi cadastrado com sucesso.</p>
          <p>Auditor responsável: $auditorName</p>
        ''',
      }),
    );
    return response.statusCode == 200;
  } catch (e) {
    return false;
  }
}`
    },
    sheets: {
      title: "Visualizador Analítico de Planilhas via Apps Script",
      title_en: "Automated Reporting Hub via Google Sheets & Apps Script",
      tags: ["FlutterFlow", "Google Sheets", "Apps Script", "REST API"],
      tags_en: ["FlutterFlow", "Google Sheets", "Apps Script", "REST API"],
      problem: "Dificuldade de equipes de campo sem computadores em acessar, cruzar e visualizar dados de andamento operacional que estavam distribuídos em várias planilhas no Google Drive.",
      problem_en: "Field teams without desktop access struggled to view and cross-reference operational progress data distributed across fragmented spreadsheets.",
      solution: "Aplicativo móvel conectado a endpoints criados via Google Apps Script (Web App), que leem as planilhas do Sheets em tempo real e as servem como JSON estruturado, apresentando visões executivas limpas por programas operacionais.",
      solution_en: "Mobile app connected to custom Google Apps Script REST endpoints, serving Google Sheets data in real time as structured JSON with clean executive dashboards per operational program.",
      tech: "FlutterFlow, Google Sheets, Google Apps Script (REST Endpoints).",
      tech_en: "FlutterFlow, Google Sheets, Google Apps Script (REST Endpoints).",
      result: "Redução do tempo de consulta de status de projetos de 15 minutos para menos de 10 segundos, com acesso mobile instantâneo e sem necessidade de licenças de ERP caras.",
      result_en: "Reduced project status query time from 15 minutes to under 10 seconds, enabling instant mobile access without expensive ERP licensing.",
      hasVideo: false,
      images: ["assets/sheets_home.png", "assets/sheets_list.png", "assets/sheets_code.png"],
      showSupabasePrint: false,
      codeSnippet: `// Google Apps Script (Web App) para servir planilhas como JSON REST
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Operacional");
  var data = sheet.getDataRange().getValues();
  var result = [];
  
  for (var i = 1; i < data.length; i++) {
    result.push({
      "id": data[i][0],
      "programa": data[i][1],
      "responsavel": data[i][2],
      "status": data[i][3],
      "progresso": parseFloat(data[i][4]) * 100
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}`
    },
    dre: {
      title: "Controladoria Gerencial e DRE Operacional",
      title_en: "Management Controlling & Operational Income Statement (P&L)",
      tags: ["Power BI", "SQL Server", "Financeiro", "DAX"],
      tags_en: ["Power BI", "SQL Server", "Finance", "DAX"],
      problem: "A equipe necessitava de uma DRE operacional estruturada para a consolidação ágil e centralizada dos resultados gerais da empresa.",
      problem_en: "The finance team required a structured operational income statement dashboard for centralized, agile financial consolidation.",
      solution: "Painel de Controladoria unificando faturamento bruto, deduções de receita, receitas operacionais líquidas e despesas administrativas por filial. Inclui análise dinâmica de margem líquida e detalhamento metodológico dos cálculos financeiros diretamente no dashboard.",
      solution_en: "Controlling Dashboard unifying gross revenue, deductions, net operational income, and administrative expenses by branch with dynamic margin analysis.",
      tech: "Power BI, DAX avançado, SQL Server, ETL, Modelagem Dimensional.",
      tech_en: "Power BI, Advanced DAX, SQL Server, ETL, Dimensional Modeling.",
      result: "Consolidação automática dos dados e fechamento financeiro imediato após os lançamentos de cada filial, simplificando a controladoria e reduzindo o tempo administrativo.",
      result_en: "Automated data consolidation and immediate branch financial closing, streamlining controlling and reducing administrative overhead.",
      hasVideo: false,
      hasEmbed: true,
      embedSrc: "https://app.powerbi.com/view?r=eyJrIjoiMjczMmNkYWYtMDNkNy00MzNkLTg4ZDYtN2M0YWUxOGRjMmJiIiwidCI6IjBjMzA1M2ViLWY4NDAtNDc0Ni05NWQ0LTQ1MDVkNmVjYzRiMiJ9",
      images: ["assets/dre_home.png", "assets/dre_executivo.png", "assets/dre_informativo.png"],
      showSupabasePrint: false
    },
    sla: {
      title: "Monitoramento de SLA de Entregas e E-commerce",
      title_en: "E-Commerce Delivery SLA Monitoring & WhatsApp Alerts",
      tags: ["Power BI", "Python", "Logística", "WhatsApp API"],
      tags_en: ["Power BI", "Python", "Logistics", "WhatsApp API"],
      problem: "Atrasos no faturamento e expedição de pedidos do e-commerce das lojas físicas, sem alertas centralizados para atuar nos pedidos críticos antes de violar o SLA de entrega.",
      problem_en: "Billing and fulfillment delays in store e-commerce orders without centralized alerts to act on critical orders before SLA breaches.",
      solution: "Painel operacional detalhando a quantidade de pedidos entregues dentro do SLA, em alerta e fora do SLA por loja (ex: Oba Asa Sul, Oba 212 Sul, etc.). O sistema é integrado a uma automação em Python que varre o banco de dados operacional a cada 10 minutos, detecta pedidos com risco iminente de expiração e notifica os gerentes de loja via WhatsApp API com o número e dados do pedido para expedição imediata.",
      solution_en: "Operational dashboard tracking SLA delivery performance per store, integrated with a Python bot scanning the database every 10 mins to dispatch urgent WhatsApp alerts with order IDs to store managers for immediate packing.",
      tech: "Power BI, Python (scripts de automação e integração com WhatsApp), SQL Server, ETL.",
      tech_en: "Power BI, Python (Automation & WhatsApp Integration), SQL Server, ETL.",
      result: "Maior controle operacional por loja (redução de atrasos severos na Black Friday e operação diária), engajando as equipes de expedição e garantindo a satisfação do cliente final.",
      result_en: "Proactive store-level fulfillment control, preventing severe shipping delays during peak seasons like Black Friday and boosting customer satisfaction.",
      hasVideo: false,
      hasEmbed: true,
      embedSrc: "https://app.powerbi.com/view?r=eyJrIjoiNTZhODk3NTctOTZhYy00MmUxLTlkNGQtMTYzZWQzMzc2ZjQ5IiwidCI6IjBjMzA1M2ViLWY4NDAtNDc0Ni05NWQ0LTQ1MDVkNmVjYzRiMiJ9",
      images: ["assets/sla_dashboard.png"],
      showSupabasePrint: false,
      isLandscape: true
    },
    apostas: {
      title: "Performance de Campanhas de Marketing & Testes A/B",
      title_en: "Marketing Campaign Analytics & A/B Testing",
      tags: ["Power BI", "Marketing Analytics", "CAC & Cohort", "Testes A/B"],
      tags_en: ["Power BI", "Marketing Analytics", "CAC & Cohort", "A/B Testing"],
      problem: "Dificuldade em mensurar a eficácia real de campanhas digitais, avaliar o retorno dos canais de aquisição de apostadores, acompanhar o Custo de Aquisição de Clientes (CAC) e avaliar o impacto de testes A/B de cupons de desconto sobre a conversão e retenção da base.",
      problem_en: "Difficulty in measuring digital marketing campaign ROI, evaluating player acquisition channels, tracking Customer Acquisition Cost (CAC), and analyzing the impact of A/B discount promo tests on player conversion and cohort retention.",
      solution: "Desenvolvimento de um painel de inteligência de marketing integrando dados transacionais e de sessões. O dashboard consolida a análise de Cohort de retenção ao longo do tempo, performance de descontos concedidos em testes A/B (ex: R$ 48k+ em cupons), taxa de conversão por tipo de usuário (novos vs. recorrentes) e ticket médio por modalidade de jogo.",
      solution_en: "Engineered a marketing intelligence dashboard integrated with transactional and session data. Consolidates time-based user Cohort retention, A/B testing discount voucher performance ($48k+ in promo discounts), conversion rates by player segment (new vs. returning), and average ticket by game type.",
      tech: "Power BI, DAX avançado, SQL Server, ETL, Análise de Cohort, Marketing Analytics.",
      tech_en: "Power BI, Advanced DAX, SQL Server, ETL, Cohort Analysis, Marketing Analytics.",
      result: "Visibilidade em tempo real do CAC (R$ 5,26/usuário) e ROI por campanha, permitindo o direcionamento estratégico do orçamento publicitário para os canais de maior conversão e retenção a longo prazo.",
      result_en: "Real-time visibility into CAC ($5.26/user) and campaign ROI, enabling strategic advertising budget allocation toward high-converting channels with maximum player LTV.",
      hasVideo: false,
      hasEmbed: true,
      embedSrc: "https://app.powerbi.com/view?r=eyJrIjoiNjQ3YWNmNDItN2NlMS00ZmY4LTk5OGMtMzIwNDI3ZjZlMGY1IiwidCI6IjBjMzA1M2ViLWY4NDAtNDc0Ni05NWQ0LTQ1MDVkNmVjYzRiMiJ9",
      images: ["assets/marketing_dashboard.png", "assets/marketing_sumario.png"],
      showSupabasePrint: false,
      isLandscape: true
    },
    monitoramento: {
      title: "Central de Monitoramento Integrada (NOC)",
      title_en: "Integrated Control Room (NOC) & Infrastructure Monitoring",
      tags: ["Grafana", "Power BI", "NOC", "Monitoramento"],
      tags_en: ["Grafana", "Power BI", "NOC", "Monitoring"],
      problem: "Ausência de centralização no monitoramento em tempo real do funcionamento de servidores, bancos de dados, fluxos de ETL e indicadores de desempenho (KPIs) do negócio.",
      problem_en: "Lack of centralized real-time monitoring for server health, database performance, ETL job execution, and core business KPIs.",
      solution: "Implementação de uma sala de controle operacional (NOC) com 6 TVs exibindo em tempo real painéis integrados do Grafana (infraestrutura de TI/ETL) e Power BI (desempenho comercial e operacional).",
      solution_en: "Implemented a 6-screen operational control room (NOC) displaying unified Grafana infrastructure metrics and Power BI commercial dashboards.",
      tech: "Grafana, Power BI, SQL Server, Jenkins (orquestração de jobs de dados), Windows Server.",
      tech_en: "Grafana, Power BI, SQL Server, Jenkins (data job orchestration), Windows Server.",
      result: "Redução no tempo de indisponibilidade de serviços (downtime), detecção proativa de falhas em jobs de banco de dados e aumento da visibilidade operacional para os tomadores de decisão.",
      result_en: "Drastic service downtime reduction, proactive failure detection in database jobs, and high operational visibility for decision makers.",
      hasVideo: true,
      videoSrc: "assets/monitor_video_2.mp4",
      images: ["assets/monitor_1.jpeg", "assets/monitor_2.jpeg", "assets/monitor_3.jpeg", "assets/monitor_5.jpeg"],
      showSupabasePrint: false,
      isLandscape: true
    }
  };

  function openDrawer(caseId) {
    const data = casesData[caseId];
    if (!data) return;

    const isEn = currentLang === 'en';
    const title = isEn && data.title_en ? data.title_en : data.title;
    const tags = isEn && data.tags_en ? data.tags_en : data.tags;
    const problem = isEn && data.problem_en ? data.problem_en : data.problem;
    const solution = isEn && data.solution_en ? data.solution_en : data.solution;
    const tech = isEn && data.tech_en ? data.tech_en : data.tech;
    const result = isEn && data.result_en ? data.result_en : data.result;

    const lblVideo = isEn ? "Control Room Recording (NOC)" : "Gravação da Sala de Controle (NOC)";
    const lblImages = isEn ? "Media & Screenshots Gallery" : "Galeria de Mídias / Capturas";
    const lblDb = isEn ? "Database Schema (Supabase)" : "Modelagem de Banco (Supabase)";
    const lblEmbed = isEn ? "Interactive Live Dashboard" : "Dashboard Interativo (Live)";
    const lblProb = isEn ? "The Problem" : "O Problema";
    const lblSol = isEn ? "The Solution" : "A Solução";
    const lblTech = isEn ? "Technologies" : "Tecnologias";
    const lblRes = isEn ? "Business Impact & Results" : "Resultado de Negócio";
    const lblImp = isEn ? "Impact:" : "Impacto:";

    let mediaHTML = '';
    if (data.hasVideo) {
      if (data.isLandscape) {
        mediaHTML = `
          <div style="margin-bottom: 20px;">
            <h4 class="detail-subtitle"><i data-lucide="video" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;"></i> ${lblVideo}</h4>
            <div style="border-radius: 8px; overflow: hidden; border: 1px solid var(--border-light); background: #000; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
              <video autoplay loop muted playsinline style="width: 100%; display: block;" id="drawer-video">
                <source src="${data.videoSrc}" type="video/mp4">
              </video>
            </div>
          </div>
        `;
      } else {
        mediaHTML = `
          <div class="phone-mockup-wrapper">
            <div class="phone-mockup">
              <video autoplay loop muted playsinline class="phone-video" id="drawer-video">
                <source src="${data.videoSrc}" type="video/mp4">
              </video>
            </div>
          </div>
        `;
      }
    }

    let imagesHTML = '';
    if (data.images && data.images.length > 0) {
      const isLandscape = data.isLandscape || false;
      const thumbStyle = isLandscape
        ? 'width: 120px; height: 68px; object-fit: cover; border-radius: 4px; border: 1px solid var(--border-light); cursor: pointer;'
        : 'width: 75px; height: 140px; object-fit: cover; border-radius: 4px; border: 1px solid var(--border-light); cursor: pointer;';

      imagesHTML = `
        <div style="margin-top: 8px;">
          <h4 class="detail-subtitle"><i data-lucide="image" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;"></i> ${lblImages}</h4>
          <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-bottom: 8px;">
            ${data.images.map(img => `
              <img src="${img}" alt="Screenshot" class="screenshot-thumbnail" style="${thumbStyle}" data-full="${img}">
            `).join('')}
          </div>
        </div>
      `;
    }

    let supabaseHTML = '';
    if (data.showSupabasePrint) {
      supabaseHTML = `
        <div class="case-detail-section">
          <h4 class="detail-subtitle"><i data-lucide="database" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;"></i> ${lblDb}</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">Relational structure and tables mapped for assets, compliance logs, and Storage image URLs:</p>
          <img src="assets/tabela_supabase.png" alt="Supabase Table Structure" class="screenshot-thumbnail" style="width: 100%; border-radius: 4px; border: 1px solid var(--border-light); cursor: pointer;" data-full="assets/tabela_supabase.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
        </div>
      `;
    }

    let embedHTML = '';
    if (data.hasEmbed) {
      embedHTML = `
        <div class="case-detail-section" style="margin-top: 12px; padding: 12px;">
          <h4 class="detail-subtitle"><i data-lucide="monitor" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;"></i> ${lblEmbed}</h4>
          <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; overflow: hidden; border-radius: 4px; border: 1px solid var(--border-light); background: #111;">
            <iframe src="${data.embedSrc}" frameborder="0" allowFullScreen="true" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
          </div>
        </div>
      `;
    }

    drawerContent.innerHTML = `
      <h3>${title}</h3>
      <div class="drawer-tags">
        ${tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
      </div>
      
      ${mediaHTML}
      ${embedHTML}
      ${imagesHTML}

      <div class="case-detail-section">
        <h4 class="detail-subtitle"><i data-lucide="alert-circle" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;"></i> ${lblProb}</h4>
        <p>${problem}</p>
      </div>

      <div class="case-detail-section">
        <h4 class="detail-subtitle"><i data-lucide="check-circle" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;"></i> ${lblSol}</h4>
        <p>${solution}</p>
      </div>

      <div class="case-detail-section">
        <h4 class="detail-subtitle"><i data-lucide="cpu" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;"></i> ${lblTech}</h4>
        <p>${tech}</p>
      </div>

      <div class="case-detail-section">
        <h4 class="detail-subtitle"><i data-lucide="trending-up" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;"></i> ${lblRes}</h4>
        <p><strong>${lblImp}</strong> ${result}</p>
      </div>

      ${supabaseHTML}
    `;

    caseDrawer.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.lucide) lucide.createIcons();
  }

  function closeDrawer() {
    const video = document.getElementById('drawer-video');
    if (video) video.pause(); // pause video on close

    caseDrawer.classList.remove('active');
    document.body.style.overflow = ''; // restore main scroll
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  if (viewCaseBtns) {
    viewCaseBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const caseId = btn.getAttribute('data-case');
        openDrawer(caseId);
      });
    });
  }

  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // --- 7. LIGHTBOX DE IMAGENS (AMAZON STYLE) ---
  const imageLightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPhoneFrame = document.getElementById('lightbox-phone-frame');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  let currentImageIndex = 0;
  let imageList = [];

  document.addEventListener('click', (e) => {
    const thumbnail = e.target.closest('.screenshot-thumbnail');
    if (thumbnail && thumbnail.hasAttribute('data-full')) {
      e.preventDefault();
      
      // Get all screenshots in the active drawer to build navigation queue
      const allThumbs = Array.from(document.querySelectorAll('.drawer-content .screenshot-thumbnail'));
      imageList = allThumbs.map(t => t.getAttribute('data-full'));
      
      const fullSrc = thumbnail.getAttribute('data-full');
      currentImageIndex = imageList.indexOf(fullSrc);
      if (currentImageIndex === -1) currentImageIndex = 0;
      
      openLightboxAtIndex(currentImageIndex);
    }
  });

  function openLightboxAtIndex(index) {
    if (index < 0 || index >= imageList.length) return;
    currentImageIndex = index;
    const fullSrc = imageList[currentImageIndex];
    
    lightboxImg.src = fullSrc;
    
    // Only show phone frame for mobile screenshots in the "Ativos" case
    const isMobileScreenshot = fullSrc.includes('home_page') || fullSrc.includes('cadastro_ativo') || fullSrc.includes('lista_ativos');
    if (lightboxPhoneFrame) {
      if (isMobileScreenshot) {
        lightboxPhoneFrame.classList.remove('no-frame');
      } else {
        lightboxPhoneFrame.classList.add('no-frame');
      }
    }
    
    imageLightbox.classList.add('active');
    updateNavButtons();
  }

  function updateNavButtons() {
    if (imageList.length <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
    } else {
      if (prevBtn) prevBtn.style.display = 'flex';
      if (nextBtn) nextBtn.style.display = 'flex';
    }
  }

  function navigateLightbox(direction) {
    if (imageList.length <= 1) return;
    let newIndex = currentImageIndex + direction;
    if (newIndex < 0) {
      newIndex = imageList.length - 1;
    } else if (newIndex >= imageList.length) {
      newIndex = 0;
    }
    openLightboxAtIndex(newIndex);
  }

  function closeLightbox() {
    imageLightbox.classList.remove('active');
    setTimeout(() => {
      lightboxImg.src = '';
    }, 250);
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (prevBtn) prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateLightbox(-1);
  });

  if (nextBtn) nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateLightbox(1);
  });

  if (imageLightbox) {
    imageLightbox.addEventListener('click', (e) => {
      // Closes if clicked on the overlay background or the wrapper outside the actual image/phone frame
      if (e.target === imageLightbox || e.target.classList.contains('lightbox-wrapper')) {
        closeLightbox();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (imageLightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowLeft') {
          navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
          navigateLightbox(1);
        }
      }
    });
  }

  function getServiceLabel(value) {
    switch (value) {
      case 'dashboards': return 'Dados & BI';
      case 'automacoes': return 'Automação de Processos';
      case 'apps': return 'Aplicativos Corporativos';
      case 'consultoria': return 'Consultoria Técnica';
      default: return 'Contato Geral';
    }
  }

  // --- 8. ANIMAÇÕES DE REVELAÇÃO AO ROLAR (SCROLL REVEAL) & CONTADORES ---
  const elementsToReveal = document.querySelectorAll(
    '.pipeline-step, .timeline-item, .project-card, .service-card, .tech-badge-card, .skills-category, .about-content, .about-bullets-card, .contact-info, .contact-form-container'
  );

  elementsToReveal.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        if (entry.target.classList.contains('metrics-strip')) {
          startCounters();
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elementsToReveal.forEach(el => revealObserver.observe(el));

  const metricsStrip = document.querySelector('.metrics-strip');
  if (metricsStrip) {
    revealObserver.observe(metricsStrip);
  }

  function startCounters() {
    const counters = document.querySelectorAll('.metric-number');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 1500; // 1.5 segundos
      const stepTime = Math.abs(Math.floor(duration / target));
      let current = 0;
      
      const timer = setInterval(() => {
        current += 1;
        counter.textContent = current;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        }
      }, stepTime);
    });
  }

  // --- 9. SUPORTE A BILINGUE (PT / EN) ---
  const translations = {
    pt: {
      nav_home: "Início",
      nav_exp: "Experiência",
      nav_cases: "Cases",
      nav_areas: "Atuação",
      nav_tech: "Tecnologias",
      nav_about: "Trajetória",
      nav_contact: "Contato",
      hero_role: "Dados • Automação • Desenvolvimento",
      hero_desc: "Oi, sou o Gustavo. Atuo simplificando a tomada de decisão e a eficiência de equipes através dos dados. Minha especialidade é estruturar a engenharia de dados de ponta a ponta (pipelines, APIs e automações) e traduzir esse fluxo em interfaces inteligentes (dashboards de BI e aplicativos corporativos sob medida) para que as empresas tomem decisões com clareza e sem tarefas manuais repetitivas.",
      hero_sectors_title: "Setores de Atuação:",
      hero_tech_title: "Tecnologias Principais:",
      sec_recic: "Reciclagem",
      sec_igaming: "Mercado de Apostas (iGaming)",
      sec_cem: "Cemitérios",
      sec_varejo: "Varejo",
      sec_auto: "Indústria Automotiva",
      sec_audit: "Auditoria em TI",
      sec_trade: "Trade Marketing",
      sec_edu: "Educação (Professor de TI)",
      btn_projects: "Ver Projetos",
      btn_contact: "Contato",
      pipe_sources: "Fontes",
      pipe_proc: "Processamento",
      pipe_bi: "BI / Insights",
      diff_tag: "Fluxo de Entrega",
      diff_title: "O que eu construo",
      diff_desc: "Estruturo soluções integradas de ponta a ponta, ligando desde a coleta na origem física ou digital até a entrega operacional.",
      step1_title: "Coleta de Dados",
      step1_desc: "Captura de informações brutas de arquivos, sensores (IoT), APIs e bancos de dados.",
      step2_title: "Integração de Sistemas",
      step2_desc: "Conexão automatizada e contínua de dados entre ERPs, planilhas e plataformas.",
      step3_title: "Processamento",
      step3_desc: "Tratamento de dados, higienização, orquestração e fluxos automáticos de ETL.",
      step4_title: "Dashboards",
      step4_desc: "Visualização analítica de indicadores executivos de negócio no Power BI.",
      step5_title: "Aplicações",
      step5_desc: "Aplicativos internos (FlutterFlow/Supabase) para agilizar a operação diária.",
      step6_title: "Monitoramento",
      step6_desc: "Acompanhamento de status de serviços, alertas e integridade dos bancos de dados.",
      exp_tag: "Minha Jornada",
      exp_title: "Experiência Profissional",
      exp_desc: "Minha caminhada profissional desenvolvendo inteligência de dados, automações de processos e sistemas corporativos sob medida.",
      exp1_role: "Analista de Dados / Dev Full Stack PL",
      exp1_comp: "Reciclagem",
      exp1_date: "2025/10 - Atual",
      exp1_b1: "Responsável pela sustentação e evolução do ambiente de dados corporativo.",
      exp1_b2: "Administração, manutenção e monitoramento de pipelines ETL utilizando Pentaho (PDI) e Jenkins.",
      exp1_b3: "Desenvolvimento de integrações e automações em Python para consumo de APIs e processamento de dados.",
      exp1_b4: "Modelagem, criação de consultas SQL e desenvolvimento de funções no Supabase/PostgreSQL.",
      exp1_b5: "Estruturação e organização de Data Lake e implementação de práticas de Delta Lake para governança e confiabilidade dos dados.",
      exp1_b6: "Desenvolvimento de dashboards e indicadores estratégicos em Power BI, utilizando modelagem dimensional e DAX.",
      exp1_b7: "Criação de aplicações internas utilizando FlutterFlow integradas ao Supabase e APIs REST.",
      exp1_b8: "Automação de processos operacionais e melhoria contínua da qualidade e disponibilidade dos dados.",
      exp1_b9: "Documentação técnica de processos, integrações e arquitetura de dados.",
      exp2_role: "Analista de Dados Pleno III",
      exp2_comp: "Cemitérios",
      exp2_date: "2025/08 - 2025/10",
      exp2_b1: "Desenvolvimento de automações em Python, incluindo integrações e consumo de APIs.",
      exp2_b2: "Análise de dados e estatística aplicada para cálculo de desvio padrão e identificação de outliers.",
      exp2_b3: "Criação e manutenção de dashboards gerenciais em Power BI e Metabase para apoio à tomada de decisão.",
      exp2_b4: "Orquestração de pipelines e fluxos de ETL usando Pentaho, Apache Airflow e armazenamento AWS em nuvem.",
      exp3_role: "Analista de Dados",
      exp3_comp: "Mercado de Apostas (iGaming)",
      exp3_date: "2023/10 - 2025/08",
      exp3_b1: "Criação de dashboards interativos no Power BI e Metabase de sorteios e KPIs de negócio.",
      exp3_b2: "Construção de processos ETL em SQL e integração com banco de dados SAP Hana.",
      exp3_b3: "Automações em Python (consumo de APIs) e orquestração de pipelines em Pentaho, Airflow e Jenkins na AWS.",
      exp3_b4: "Apoio em análises estatísticas para identificação de outliers com desvio padrão.",
      exp4_role: "Professor de Dados e Estatísticas",
      exp4_comp: "Educação (Professor de TI)",
      exp4_date: "2023/01 - 2024/01",
      exp4_b1: "Ministração de aulas e palestras sobre Cidadania Digital, TI e Estatística.",
      exp4_b2: "Ensino prático de programação básica em Python e gestão profissional de TI.",
      exp5_role: "Analista de TI",
      exp5_comp: "Varejo",
      exp5_date: "2022/08 - 2023/08",
      exp5_b1: "Implementação de soluções analíticas em bancos SQL Server e MySQL, com painéis no Metabase.",
      exp5_b2: "Desenvolvimento de automações e extração de dados com Python e Power Automate.",
      exp5_b3: "Orquestração e modelagem de pipelines de dados usando Alteryx.",
      exp6_role: "Analista de BI Jr.",
      exp6_comp: "Auditoria em TI",
      exp6_date: "2021/04 - 2022/08",
      exp6_b1: "Manipulação de bases, data mining com Python/R e relatórios no Metabase e Power BI.",
      exp6_b2: "Modelagem de dados relacionais e DDL/DML utilizando PL/SQL.",
      exp6_b3: "Gerenciamento de demandas utilizando metodologias ágeis (Scrum e Kanban).",
      exp7_role: "Estágio em Auditoria de TI",
      exp7_comp: "Montadora de Veículos (Indústria)",
      exp7_date: "2021/04 - 2022/08",
      exp7_b1: "Análise de dados e auditoria de TI utilizando Alteryx, QlikView, QlikSense e Tableau.",
      exp7_b2: "Manutenção e modelagem de bases de dados de auditoria interna em SQL Server.",
      exp8_role: "Assistente de BI",
      exp8_comp: "Trade Marketing",
      exp8_date: "2018/12 - 2020/02",
      exp8_b1: "Controle de inventário de hardware e auditoria física de aparelhos corporativos.",
      exp8_b2: "Desenvolvimento de relatórios e macros complexas em VBA Excel e modelagem no Power BI.",
      exp8_b3: "Automações de processos administrativos com Python e higienização de planilhas.",
      proj_tag: "Portfólio",
      proj_title: "Projetos em Destaque",
      proj_desc: "Uma seleção de desafios reais que resolvi, detalhando o problema de origem, a arquitetura da solução e o impacto gerado.",
      tab_all: "Todos",
      tab_apps: "Aplicativos",
      tab_dash: "Dashboards BI",
      lbl_problem: "Problema",
      lbl_solution: "Solução",
      lbl_tech: "Tecnologias",
      lbl_result: "Resultado",
      btn_details: "Ver Detalhes do Case",
      btn_dashboard: "Abrir Dashboard",
      p1_title: "Auditoria e Cadastro de Ativos Corporativos",
      p1_prob: "Auditorias e inventários manuais lentos, dependentes de planilhas locais e vulneráveis a erros e perdas de imagens.",
      p1_sol: "Aplicativo mobile com autenticação biométrica, tela de cadastro dinâmico com fotos salvas no storage do Supabase e envio de relatórios automáticos via API do Resend.",
      p1_tech: "FlutterFlow, Supabase (Autenticação/Banco de Dados/Storage), Resend Email API.",
      p1_res: "Digitalização completa do processo, auditoria de ativos em tempo real e eliminação de relatórios manuais de conferência.",
      p2_title: "Visualizador Analítico de Planilhas via Apps Script",
      p2_prob: "Dificuldade para acessar e cruzar informações de projetos que estavam distribuídos em múltiplas planilhas no Google Drive por equipes sem acesso a computadores.",
      p2_sol: "Aplicativo móvel conectado a uma API REST gerada no Google Apps Script, estruturando e demonstrando as informações setoriais de forma limpa em duas visões internas de programas.",
      p2_tech: "FlutterFlow, Google Sheets, Google Apps Script (REST Endpoint).",
      p2_res: "Acesso rápido no celular a dados de andamento operacional, reduzindo o tempo de consulta de 15 minutos para menos de 10 segundos.",
      p3_title: "Monitoramento de SLA de Entregas e E-commerce",
      p3_prob: "Dificuldade em acompanhar em tempo real o cumprimento do SLA de entregas por loja e identificar quais pedidos estavam em risco ou atrasados.",
      p3_sol: "Dashboard de monitoramento conectado ao banco de dados operacional e integrado a um script em Python que notifica automaticamente via WhatsApp as lojas com alertas de pedidos atrasando.",
      p3_tech: "Power BI, Python (Automação de Alertas WhatsApp), SQL, ETL.",
      p3_res: "Tempo de resposta imediato das equipes de loja para faturamento/separação de pedidos críticos, reduzindo o percentual de atrasos gerais.",
      p4_title: "Dashboard Executivo Comercial & Lucratividade",
      p4_prob: "Falta de clareza nas margens de contribuição das vendas por região e ausência de uma métrica automática de comissionamento comercial.",
      p4_sol: "Dashboard executivo conectando o banco relacional e unificando faturamento líquido, margens por produto, acompanhamento de metas mensais e apuração automatizada de metas.",
      p4_tech: "Power BI, DAX, SQL Server, Modelagem Dimensional.",
      p4_res: "Cálculo instantâneo de margens de lucro por produto, automatização do comissionamento da equipe e clareza na rentabilidade comercial.",
      p5_title: "Central de Monitoramento Integrada (NOC)",
      p5_prob: "Ausência de centralização no monitoramento de servidores, bancos de dados, fluxos de ETL e KPIs operacionais em tempo real.",
      p5_sol: "Estruturação de uma central de monitoramento (NOC) com 6 telas dedicadas exibindo dashboards unificados em Grafana e Power BI para infraestrutura e regras de negócios.",
      p5_tech: "Grafana, Power BI, SQL Server, Jenkins, Windows Server.",
      p5_res: "Visualização unificada de 100% da integridade de bancos, jobs e performance operacional, acelerando a detecção e correção de falhas.",
      p6_title: "Performance de Campanhas de Marketing & Testes A/B",
      p6_prob: "Dificuldade em mensurar a eficácia real de campanhas digitais, avaliar o retorno dos canais de aquisição de apostadores, acompanhar o CAC e mensurar o impacto de testes A/B de cupons.",
      p6_sol: "Painel de inteligência de marketing integrando análise de Cohort de retenção ao longo do tempo, performance de descontos em testes A/B, conversão por tipo de usuário e ticket médio por loteria.",
      p6_tech: "Power BI, DAX avançado, SQL Server, ETL, Análise de Cohort, Marketing Analytics.",
      p6_res: "Visibilidade em tempo real do CAC (R$ 5,26/usuário) e ROI por campanha, direcionando o orçamento publicitário para os canais de maior conversão e retenção a longo prazo.",
      p7_title: "Gestão Estratégica de Pessoas e People Analytics",
      p7_prob: "Falta de clareza das causas de desligamento de funcionários e incapacidade de medir o turnover setorial preventivamente.",
      p7_sol: "Painel de controle mapeando admissões, desligamentos, folha salarial e cálculo dinâmico de taxas de turnover por área corporativa.",
      p7_tech: "Power BI, Excel Avançado, SQL.",
      p7_res: "Facilidade para identificar setores com maior fadiga operacional, subsidiando planos de ação para retenção de talentos do time de RH.",
      p8_title: "Auditoria e Otimização de Giro de Estoque",
      p8_prob: "Custos de armazenamento elevados devido a insumos com baixo giro e rupturas frequentes em itens críticos de vendas.",
      p8_sol: "Dashboard integrando os níveis de inventário com alertas automáticos baseados no tempo médio de consumo diário e giro dos SKUs.",
      p8_tech: "Power BI, SQL, Pentaho Data Integration (ETL diário).",
      p8_res: "Redução no desperdício de insumos com validade curta e otimização do capital de giro empatado em estoque sobressalente.",
      areas_tag: "Especialidades",
      areas_title: "Como posso te ajudar",
      areas_desc: "Minhas frentes de atuação com foco em simplificar o seu dia a dia operacional e gerar inteligência prática.",
      srv1_title: "Dados & BI",
      srv1_desc: "Modelagem lógica e apresentação estruturada de métricas para suporte estratégico.",
      srv2_title: "Automação de Processos",
      srv2_desc: "Automatização de tarefas operacionais, scripts de carga e pipelines periódicos.",
      srv3_title: "Aplicativos Corporativos",
      srv3_desc: "Sistemas ágeis internos focados em digitalizar a operação e consolidar dados com segurança.",
      srv4_title: "Consultoria Técnica",
      srv4_desc: "Otimização estrutural, modelagem dimensional e governança de bancos relacionais.",
      srv_prob_lbl: "Problema Resolvido",
      srv_tech_lbl: "Tecnologias",
      srv_val_lbl: "Benefício Gerado",
      srv1_prob: "Relatórios descentralizados, KPIs complexos não definidos e falta de visibilidade analítica.",
      srv1_tech: "Power BI, SQL, DAX, Excel.",
      srv1_val: "Decisões tomadas com base em painéis unificados e drill-downs dinâmicos.",
      srv2_prob: "Perda de tempo operacional com coleta manual, digitação e risco de erros em planilhas.",
      srv2_tech: "Python, Pentaho (PDI), Jenkins, APIs REST, VBA.",
      srv2_val: "Eliminação de falhas manuais e liberação do time para análises estratégicas.",
      srv3_prob: "Equipes de campo ou internas sem canal direto para lançamentos e controle de processos.",
      srv3_tech: "FlutterFlow, Supabase (Autenticação/Storage), Resend.",
      srv3_val: "Captura direta de imagens e inputs na nuvem, com fluxos automáticos de auditoria.",
      srv4_prob: "Modelos de dados ineficientes, lentidão em consultas (queries SQL) e falta de estruturação.",
      srv4_tech: "PostgreSQL, SQL Server, Modelagem Dimensional.",
      srv4_val: "Bancos normalizados, queries otimizadas e arquiteturas preparadas para escala.",
      tech_tag: "Tecnologias",
      tech_title: "Tecnologias que Utilizo",
      tech_desc: "Linguagens de programação, ferramentas de banco, orquestradores e hardware aplicados no desenvolvimento.",
      skills_tag: "Competências",
      skills_title: "Habilidades de Mercado",
      skills_desc: "Divisão das competências técnicas estruturadas de acordo com as necessidades operacionais corporativas.",
      skill_cat4: "Negócios & Governança",
      sk_dax: "DAX Avançado",
      sk_excel: "Excel Gerencial",
      sk_jenkins: "Jenkins Orquestração",
      sk_dim: "Modelagem Dimensional",
      sk_api: "Consumo de APIs REST",
      sk_etl: "Processos ETL / ELT",
      sk_gov: "Governança de Dados",
      sk_jira: "Jira / Métodos Ágeis",
      sk_arima: "Estatística ARIMA/SARIMA",
      traj_tag: "A Trajetória",
      traj_title: "Trajetória Profissional",
      about_p1: "Minha jornada na tecnologia começou no lugar mais crítico de qualquer empresa: os dados que guiam as decisões estratégicas. Atuando desde 2018 com BI (Business Intelligence), aprendi a traduzir problemas operacionais complexos — seja em finanças, logística, estoque ou recursos humanos — em visões analíticas limpas e compreensíveis.",
      about_p2: "Com o tempo, percebi que desenhar gráficos bonitos não bastava se as planilhas de origem estivessem quebradas ou se a coleta dependesse de preenchimento manual lento. A transição para o desenvolvimento de software foi um passo natural: decidi ir à raiz do problema, construindo integrações robustas (APIs) e aplicativos internos eficientes para garantir que os dados nasçam corretos desde o primeiro clique.",
      about_p3: "Hoje, atuo exatamente nesse cruzamento. Sou a ponte entre a engenharia de dados invisível (ETL, orquestração e banco de dados) e o software que o usuário final adora usar.",
      chk1_t: "Experiência Real (Desde 2018)",
      chk1_d: "Atuação em BI, Dados e Desenvolvimento em projetos corporativos reais.",
      chk2_t: "Histórico de Atuação",
      chk2_d: "Vivência nos setores de iGaming, Reciclagem, Cemitérios, Varejo e Auditoria.",
      chk3_t: "Visão de Ponta a Ponta",
      chk3_d: "Desde o mapeamento de KPIs até a criação de bancos de dados e interfaces finais.",
      edu_title: "Formação Acadêmica",
      edu_t1: "MBA – Data Science e Analytics",
      edu_d1: "USP Esalq (Previsão em 2026)",
      edu_t2: "Bacharel – Ciência da Computação",
      edu_d2: "Mackenzie (2023)",
      edu_t3: "Técnico - Eletrônica",
      edu_d3: "ETEC Tereza Nunes (2016)",
      contact_tag: "Contato Profissional",
      contact_title: "Falar sobre Projetos",
      contact_desc: "Caso precise desenvolver soluções customizadas de dashboards, pipelines automatizados de dados, integrações de APIs ou aplicativos corporativos internos, entre em contato pelos canais diretos ou envie uma mensagem no formulário.",
      lbl_name: "Nome *",
      lbl_email: "E-mail *",
      lbl_interest: "Área de Interesse *",
      lbl_message: "Mensagem / Escopo da Demanda *",
      opt_dash: "Dados & BI (Power BI, Tableau)",
      opt_auto: "Automação de Processos & ETL (Python, Pentaho)",
      opt_apps: "Aplicativos Internos (FlutterFlow, Supabase)",
      opt_consult: "Consultoria Técnica / Arquitetura",
      ph_name: "Ex: Gustavo Aveloes",
      ph_email: "Ex: nome@empresa.com",
      ph_message: "Descreva o escopo da sua necessidade ou projeto...",
      btn_send: "Enviar Mensagem",
      footer_rights: "Todos os direitos reservados. Gustavo Aveloes • Soluções Integradas de Dados & Sistemas."
    },
    en: {
      nav_home: "Home",
      nav_exp: "Experience",
      nav_cases: "Projects",
      nav_areas: "Services",
      nav_tech: "Tech Stack",
      nav_about: "About Me",
      nav_contact: "Contact",
      hero_role: "Data Engineering • Automation • Full Stack Dev",
      hero_desc: "Hi, I'm Gustavo. I specialize in simplifying team decision-making and operational efficiency through data. My expertise lies in structuring end-to-end data engineering (pipelines, APIs, and automations) and translating that flow into smart interfaces (BI dashboards and custom enterprise web apps) so businesses make clear, data-driven decisions without repetitive manual work.",
      hero_sectors_title: "Industry Experience:",
      hero_tech_title: "Core Technologies:",
      sec_recic: "Recycling Industry",
      sec_igaming: "iGaming & Betting Market",
      sec_cem: "Cemetery Operations",
      sec_varejo: "Retail & Supermarkets",
      sec_auto: "Automotive Industry",
      sec_audit: "IT Audit & Assets",
      sec_trade: "Trade Marketing",
      sec_edu: "Education (IT Instructor)",
      btn_projects: "View Projects",
      btn_contact: "Contact Me",
      pipe_sources: "Data Sources",
      pipe_proc: "Processing",
      pipe_bi: "BI & Insights",
      diff_tag: "Delivery Pipeline",
      diff_title: "What I Build",
      diff_desc: "I structure end-to-end integrated solutions, connecting physical or digital data collection directly to operational delivery.",
      step1_title: "Data Collection",
      step1_desc: "Ingestion of raw data from files, IoT sensors, APIs, and databases.",
      step2_title: "System Integration",
      step2_desc: "Automated, continuous data sync between ERPs, spreadsheets, and platforms.",
      step3_title: "Data Processing",
      step3_desc: "Data transformation, cleaning, orchestration, and automated ETL pipelines.",
      step4_title: "BI Dashboards",
      step4_desc: "Analytical executive business indicators in Power BI.",
      step5_title: "Enterprise Apps",
      step5_desc: "Internal web/mobile apps to streamline daily operations.",
      step6_title: "NOC & Monitoring",
      step6_desc: "Real-time tracking of service health, alerts, and database integrity.",
      exp_tag: "Career Journey",
      exp_title: "Work Experience",
      exp_desc: "My professional background in data engineering, process automation, and custom enterprise software.",
      exp1_role: "Data Analyst / Mid-Level Full Stack Dev",
      exp1_comp: "Recycling Industry",
      exp1_date: "2025/10 - Present",
      exp1_b1: "Responsible for maintaining and expanding the enterprise data environment.",
      exp1_b2: "ETL pipeline administration, monitoring, and maintenance using Pentaho (PDI) and Jenkins.",
      exp1_b3: "Python automation and integration scripts for API consumption and data processing.",
      exp1_b4: "SQL query optimization, data modeling, and custom functions in Supabase/PostgreSQL.",
      exp1_b5: "Data Lake architecture and governance implementation for reliable enterprise data.",
      exp1_b6: "Power BI dashboards and strategic KPIs using dimensional modeling and DAX.",
      exp1_b7: "Internal enterprise apps built with FlutterFlow integrated with Supabase and REST APIs.",
      exp1_b8: "Operational process automation and continuous data quality improvements.",
      exp1_b9: "Technical documentation of data pipelines, integrations, and architecture.",
      exp2_role: "Senior Data Analyst",
      exp2_comp: "Cemetery Operations",
      exp2_date: "2025/08 - 2025/10",
      exp2_b1: "Python script automations, REST API integrations, and data consumption.",
      exp2_b2: "Applied statistical data analysis for standard deviation calculations and outlier detection.",
      exp2_b3: "Management dashboards built in Power BI and Metabase supporting executive decision-making.",
      exp2_b4: "Pipeline orchestration and ETL workflows using Pentaho, Apache Airflow, and AWS cloud storage.",
      exp3_role: "Data Analyst",
      exp3_comp: "iGaming & Betting Market",
      exp3_date: "2023/10 - 2025/08",
      exp3_b1: "Interactive Power BI and Metabase dashboards tracking gaming draws and business KPIs.",
      exp3_b2: "SQL ETL processes and database integrations with SAP Hana.",
      exp3_b3: "Python automations and pipeline orchestration using Pentaho, Airflow, and Jenkins on AWS.",
      exp3_b4: "Applied statistical analysis for anomaly and outlier detection.",
      exp4_role: "Data & Statistics Instructor",
      exp4_comp: "Education (IT Instructor)",
      exp4_date: "2023/01 - 2024/01",
      exp4_b1: "Lectures and classes covering Digital Literacy, IT, and Applied Statistics.",
      exp4_b2: "Hands-on instruction in basic Python programming and IT management.",
      exp5_role: "IT Analyst",
      exp5_comp: "Retail Industry",
      exp5_date: "2022/08 - 2023/08",
      exp5_b1: "Analytical solution deployment on SQL Server and MySQL with Metabase panels.",
      exp5_b2: "Data extraction automations built with Python and Power Automate.",
      exp5_b3: "Data pipeline orchestration and data modeling using Alteryx.",
      exp6_role: "Junior BI Analyst",
      exp6_comp: "IT Audit",
      exp6_date: "2021/04 - 2022/08",
      exp6_b1: "Database manipulation, data mining with Python/R, and Power BI/Metabase reporting.",
      exp6_b2: "Relational data modeling and DDL/DML development using PL/SQL.",
      exp6_b3: "Agile task management using Scrum and Kanban frameworks.",
      exp7_role: "IT Audit Intern",
      exp7_comp: "Automotive Industry",
      exp7_date: "2021/04 - 2022/08",
      exp7_b1: "IT data auditing utilizing Alteryx, QlikView, QlikSense, and Tableau.",
      exp7_b2: "Internal audit database modeling and maintenance in SQL Server.",
      exp8_role: "BI Assistant",
      exp8_comp: "Trade Marketing",
      exp8_date: "2018/12 - 2020/02",
      exp8_b1: "Hardware inventory management and physical IT asset auditing.",
      exp8_b2: "Advanced VBA macros, Excel reporting, and Power BI data modeling.",
      exp8_b3: "Administrative automation using Python and spreadsheet data cleansing.",
      proj_tag: "Portfolio",
      proj_title: "Featured Projects",
      proj_desc: "A curated selection of real-world challenges I solved, detailing the original problem, technical architecture, and business impact.",
      tab_all: "All Projects",
      tab_apps: "Custom Apps",
      tab_dash: "BI Dashboards",
      lbl_problem: "Problem",
      lbl_solution: "Solution",
      lbl_tech: "Tech Stack",
      lbl_result: "Impact & Result",
      btn_details: "View Case Details",
      btn_dashboard: "Open Dashboard",
      p1_title: "Corporate Asset Audit & Inventory System",
      p1_prob: "Slow manual asset audits dependent on local spreadsheets, vulnerable to data entry errors and missing photo proof.",
      p1_sol: "Cross-platform mobile app with biometric auth, dynamic photo uploads saved to Supabase Storage, and automated compliance emails via Resend API.",
      p1_tech: "FlutterFlow, Supabase (Database/Storage/Auth), Resend Email API, Dart.",
      p1_res: "100% audit report digitization, complete elimination of paper forms and loose spreadsheets, and immediate asset traceability.",
      p2_title: "Automated Reporting Hub via Google Sheets & Apps Script",
      p2_prob: "Field teams without desktop access struggled to view and cross-reference operational progress data distributed across fragmented spreadsheets.",
      p2_sol: "Mobile app connected to custom Google Apps Script REST endpoints, serving Google Sheets data in real time as structured JSON with clean executive dashboards.",
      p2_tech: "FlutterFlow, Google Sheets, Google Apps Script (REST Endpoints).",
      p2_res: "Reduced project status query time from 15 minutes to under 10 seconds, enabling instant mobile access without expensive ERP licensing.",
      p3_title: "E-Commerce Delivery SLA Monitoring & WhatsApp Alerts",
      p3_prob: "Billing and fulfillment delays in store e-commerce orders without centralized alerts to act on critical orders before SLA breaches.",
      p3_sol: "Operational dashboard tracking SLA delivery performance per store, integrated with a Python bot scanning the database every 10 mins to dispatch urgent WhatsApp alerts.",
      p3_tech: "Power BI, Python (Automation & WhatsApp Integration), SQL Server, ETL.",
      p3_res: "Proactive store-level fulfillment control, preventing severe shipping delays during peak seasons like Black Friday and boosting customer satisfaction.",
      p4_title: "Commercial & Profitability Executive Dashboard",
      p4_prob: "Lack of visibility on sales contribution margins by region and absence of automated sales commission calculations.",
      p4_sol: "Executive dashboard connecting relational DBs to unify net revenue, product margins, monthly sales targets, and automated commission payouts.",
      p4_tech: "Power BI, DAX, SQL Server, Dimensional Modeling.",
      p4_res: "Instant product margin calculations, sales team commission automation, and clear commercial profitability.",
      p5_title: "Integrated Control Room (NOC) & Infrastructure Monitoring",
      p5_prob: "Lack of centralized real-time monitoring for server health, database performance, ETL job execution, and core business KPIs.",
      p5_sol: "Implemented a 6-screen operational control room (NOC) displaying unified Grafana infrastructure metrics and Power BI commercial dashboards.",
      p5_tech: "Grafana, Power BI, SQL Server, Jenkins (data job orchestration), Windows Server.",
      p5_res: "Drastic service downtime reduction, proactive failure detection in database jobs, and high operational visibility for decision makers.",
      p6_title: "Marketing Campaign Analytics & A/B Testing",
      p6_prob: "Difficulty in measuring digital marketing campaign ROI, evaluating acquisition channels, tracking CAC, and analyzing A/B discount promo test impacts.",
      p6_sol: "Marketing intelligence dashboard consolidating time-based Cohort retention, A/B testing voucher performance, user conversion rates, and average ticket per lottery.",
      p6_tech: "Power BI, Advanced DAX, SQL Server, ETL, Cohort Analysis, Marketing Analytics.",
      p6_res: "Real-time visibility into CAC ($5.26/user) and campaign ROI, steering ad spend toward high-converting channels with maximum player LTV.",
      p7_title: "Strategic People Analytics & HR Dashboard",
      p7_prob: "Lack of insights into employee turnover causes and inability to measure department-level attrition proactively.",
      p7_sol: "Control panel tracking hires, terminations, payroll costs, and dynamic turnover rates across corporate divisions.",
      p7_tech: "Power BI, Advanced Excel, SQL.",
      p7_res: "Quick identification of high-attrition departments, empowering HR action plans for talent retention.",
      p8_title: "Inventory Turnover & Stock Optimization",
      p8_prob: "High storage costs due to slow-moving inventory and frequent stockouts on critical sales items.",
      p8_sol: "Dashboard combining inventory levels with automated alerts based on daily consumption rates and SKU turnover.",
      p8_tech: "Power BI, SQL, Pentaho Data Integration (Daily ETL).",
      p8_res: "Reduced waste of perishable supplies and optimized working capital tied up in excess stock.",
      areas_tag: "Expertise",
      areas_title: "How I Can Help You",
      areas_desc: "My core technical areas focused on streamlining daily operations and delivering actionable insights.",
      srv1_title: "Data & BI",
      srv1_desc: "Logical modeling and structured metric presentation for strategic support.",
      srv2_title: "Process Automation",
      srv2_desc: "Automating operational tasks, ETL scripts, and scheduled data pipelines.",
      srv3_title: "Enterprise Applications",
      srv3_desc: "Agile internal apps focused on digitizing operations and securely consolidating data.",
      srv4_title: "Technical Consulting",
      srv4_desc: "Structural optimization, dimensional modeling, and database governance.",
      srv_prob_lbl: "Problem Solved",
      srv_tech_lbl: "Technologies",
      srv_val_lbl: "Value Delivered",
      srv1_prob: "Decentralized reports, undefined complex KPIs, and lack of analytical visibility.",
      srv1_tech: "Power BI, SQL, DAX, Excel.",
      srv1_val: "Data-driven decisions powered by unified dashboards and dynamic drill-downs.",
      srv2_prob: "Time wasted on manual data collection, typing, and spreadsheet errors.",
      srv2_tech: "Python, Pentaho (PDI), Jenkins, REST APIs, VBA.",
      srv2_val: "Elimination of manual errors, freeing teams for strategic analysis.",
      srv3_prob: "Field or internal teams lacking direct channels for data entry and tracking.",
      srv3_tech: "FlutterFlow, Supabase (Auth/Storage), Resend API.",
      srv3_val: "Direct cloud image capture and inputs with automated audit workflows.",
      srv4_prob: "Inefficient data models, slow SQL queries, and lack of architecture.",
      srv4_tech: "PostgreSQL, SQL Server, Dimensional Modeling.",
      srv4_val: "Normalized databases, optimized queries, and scalable architecture.",
      tech_tag: "Tech Stack",
      tech_title: "Technologies I Use",
      tech_desc: "Programming languages, databases, orchestrators, and hardware applied in development.",
      skills_tag: "Core Skills",
      skills_title: "Market Skillset",
      skills_desc: "Structured technical competencies tailored to corporate operational needs.",
      skill_cat4: "Business & Governance",
      sk_dax: "Advanced DAX",
      sk_excel: "Executive Excel",
      sk_jenkins: "Jenkins Orchestration",
      sk_dim: "Dimensional Modeling",
      sk_api: "REST API Integration",
      sk_etl: "ETL / ELT Pipelines",
      sk_gov: "Data Governance",
      sk_jira: "Jira / Agile Methods",
      sk_arima: "ARIMA/SARIMA Statistics",
      traj_tag: "About Me",
      traj_title: "Professional Journey",
      about_p1: "My technology journey began at the most critical core of any company: the data guiding strategic decisions. Working with BI (Business Intelligence) since 2018, I learned to translate complex operational challenges — whether in finance, logistics, inventory, or HR — into clean, understandable analytical dashboards.",
      about_p2: "Over time, I realized that creating pretty charts was not enough if source spreadsheets were broken or data collection depended on slow manual entry. Transitioning into software development was a natural step: I decided to solve the root problem by building robust API integrations and efficient internal apps, ensuring data quality from the very first click.",
      about_p3: "Today, I work at that exact intersection. I serve as the bridge between invisible data engineering (ETL, orchestration, databases) and clean software that end-users love to use.",
      chk1_t: "Hands-on Experience (Since 2018)",
      chk1_d: "Proven track record in BI, Data Engineering, and Software Development.",
      chk2_t: "Industry Background",
      chk2_d: "Experience across iGaming, Recycling, Cemetery, Retail, and IT Audit sectors.",
      chk3_t: "End-to-End Vision",
      chk3_d: "From KPI mapping down to database architecture and user interfaces.",
      edu_title: "Academic Background",
      edu_t1: "MBA – Data Science & Analytics",
      edu_d1: "USP Esalq (Expected 2026)",
      edu_t2: "B.S. in Computer Science",
      edu_d2: "Mackenzie University (2023)",
      edu_t3: "Associate Degree – Electronics",
      edu_d3: "ETEC (2016)",
      contact_tag: "Get In Touch",
      contact_title: "Let's Work Together",
      contact_desc: "If you need custom dashboards, automated data pipelines, API integrations, or internal enterprise apps, reach out directly or send a message using the form below.",
      lbl_name: "Name *",
      lbl_email: "Email *",
      lbl_interest: "Area of Interest *",
      lbl_message: "Message / Project Scope *",
      opt_dash: "Data & BI (Power BI, Tableau)",
      opt_auto: "Process Automation & ETL (Python, Pentaho)",
      opt_apps: "Internal Apps (FlutterFlow, Supabase)",
      opt_consult: "Technical Consulting / Architecture",
      ph_name: "Ex: Gustavo Aveloes",
      ph_email: "Ex: name@company.com",
      ph_message: "Describe your project scope or requirement...",
      btn_send: "Send Message",
      footer_rights: "All rights reserved. Gustavo Aveloes • Integrated Data & Systems Solutions."
    }
  };

  const btnPt = document.getElementById('lang-pt');
  const btnEn = document.getElementById('lang-en');

  let currentLang = localStorage.getItem('portfolio_lang') || 'pt';

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('portfolio_lang', lang);

    if (lang === 'en') {
      if (btnEn) btnEn.classList.add('active');
      if (btnPt) btnPt.classList.remove('active');
    } else {
      if (btnPt) btnPt.classList.add('active');
      if (btnEn) btnEn.classList.remove('active');
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang] && translations[lang][key]) {
        el.placeholder = translations[lang][key];
      }
    });
  }

  if (btnPt && btnEn) {
    btnPt.addEventListener('click', () => setLanguage('pt'));
    btnEn.addEventListener('click', () => setLanguage('en'));
  }

  setLanguage(currentLang);
});
