const portfolioItems = [
  {
    id: "voice-assistant",
    src: "web-assets/portfolio-02.jpg",
    title: "情感语音助手",
    note: "界面设计",
    intro: "围绕情绪识别、陪伴反馈与轻量化交互展开的界面方案。",
    description: "项目强调信息层级、语音交互状态和情绪反馈的可读性，适合作为后续补充用户旅程、界面流程与动效说明的项目入口。",
    tags: ["UI", "情绪交互", "信息架构"],
    facts: [["项目类型", "界面设计"], ["展示内容", "主视觉页面"], ["后续可补充", "流程图、交互原型、用户研究"]],
    details: []
  },
  {
    id: "shuttle-robot",
    src: "web-assets/portfolio-03.jpg",
    title: "共享单车摆渡机器人",
    note: "3D 模型",
    intro: "面向共享单车调度场景的摆渡机器人概念设计，关注搬运效率、路径适应与设备维护。",
    description: "该方案以校园与城市慢行系统中的共享单车潮汐分布为背景，尝试用自动化设备完成单车聚拢、搬运和摆放。二级页面整合了渲染图、爆炸图与白模细节，用于展示从整体形态到结构关系的推演过程。",
    tags: ["3D 建模", "服务机器人", "机械结构", "场景调度"],
    facts: [["项目阶段", "概念设计 / 3D 模型"], ["核心问题", "共享单车分布不均与人工调度成本"], ["细节材料", "渲染图、爆炸图、白模多角度"], ["动画文件", "工作动画.avi 已归档，建议后续转为 MP4"]],
    details: [
      ["web-assets/shuttle-detail-render.jpg", "渲染图：整体造型与使用场景"],
      ["web-assets/shuttle-detail-exploded.jpg", "爆炸图：模块拆解与结构关系"],
      ["web-assets/shuttle-detail-model-01.jpg", "白模细节 01：主体比例与轮廓"],
      ["web-assets/shuttle-detail-model-02.jpg", "白模细节 02：机构侧向关系"],
      ["web-assets/shuttle-detail-model-03.jpg", "白模细节 03：尾部与承载结构"]
    ]
  },
  {
    id: "cleaning-boat",
    src: "web-assets/portfolio-04.jpg",
    title: "水陆两栖多功能清洁船",
    note: "3D 模型",
    intro: "面向水域垃圾清理与岸线转运的两栖清洁设备设计。",
    description: "项目关注复杂场地中的移动方式、收集机构和设备维护。当前展示主图，后续可补充机构细节、作业流程和使用场景。",
    tags: ["3D 建模", "环境清洁", "功能整合"],
    facts: [["项目类型", "产品概念 / 3D 模型"], ["场景", "水域与岸线清洁"], ["后续可补充", "结构拆解、作业动线"]],
    details: []
  },
  {
    id: "creative-paint-01",
    src: "web-assets/portfolio-05.jpg",
    title: "创意无限拼涂",
    note: "产品概念",
    intro: "围绕儿童创意表达与模块拼搭体验展开的产品方案。",
    description: "项目可继续扩展玩法机制、材料说明和用户场景，让产品从造型展示进一步走向体验展示。",
    tags: ["产品概念", "儿童体验", "模块化"],
    facts: [["项目类型", "产品概念"], ["关键词", "拼搭、涂绘、创造力"], ["后续可补充", "玩法流程、组件说明"]],
    details: []
  },
  {
    id: "creative-paint-02",
    src: "web-assets/portfolio-06.jpg",
    title: "创意无限拼涂延展",
    note: "产品概念",
    intro: "对创意拼涂方案的造型、组合方式和视觉呈现进行延展。",
    description: "当前作为同一产品方向的补充页面，后续可合并进完整项目页，形成从概念到系列化设计的叙事。",
    tags: ["产品概念", "系列化", "视觉延展"],
    facts: [["项目类型", "产品概念延展"], ["展示重点", "形态变化与组合"], ["后续可补充", "系列规范"]],
    details: []
  },
  {
    id: "pet-cup",
    src: "web-assets/portfolio-07.jpg",
    title: "宠物随行杯",
    note: "产品设计",
    intro: "面向外出遛宠场景的便携饮水产品设计。",
    description: "项目适合补充使用流程、结构剖面和人宠交互细节，强化产品可用性和工程落地感。",
    tags: ["产品设计", "便携", "人宠场景"],
    facts: [["项目类型", "产品设计"], ["场景", "户外遛宠"], ["后续可补充", "结构细节、材料选择"]],
    details: []
  },
  {
    id: "iron",
    src: "web-assets/portfolio-08.jpg",
    title: "电熨斗",
    note: "产品设计",
    intro: "日用家电方向的产品造型与功能关系练习。",
    description: "当前展示基础造型，可继续补充握持分析、按键布局和制造工艺说明。",
    tags: ["产品设计", "家电", "造型"],
    facts: [["项目类型", "产品设计"], ["展示重点", "形态与功能布局"], ["后续可补充", "CMF、工艺说明"]],
    details: []
  }
];

const posterItems = [
  ["web-assets/poster-01.jpg", "2024 元旦祝福", "节庆视觉"],
  ["web-assets/poster-06.jpg", "2024 龙年新春", "节庆视觉"],
  ["web-assets/poster-10.jpg", "聚焦全国两会", "专题宣传"],
  ["web-assets/poster-13.jpg", "强国先强农", "周年专题"],
  ["web-assets/poster-15.jpg", "党纪学习教育", "专题宣传"],
  ["web-assets/poster-11.jpg", "绿色 1+1 行动 20 周年", "专题宣传"],
  ["web-assets/poster-07.jpg", "120 周年校庆公告", "校庆视觉"],
  ["web-assets/poster-05.jpg", "月满中秋", "节庆视觉"],
  ["web-assets/poster-04.jpg", "2025 元旦", "节庆视觉"],
  ["web-assets/poster-03.jpg", "新年贺词", "节庆视觉"],
  ["web-assets/poster-02.jpg", "2025 除夕", "节庆视觉"],
  ["web-assets/poster-12.jpg", "你好，新学期", "校园视觉"],
  ["web-assets/poster-14.jpg", "新闻发布厅", "栏目视觉"],
  ["web-assets/poster-08.jpg", "百廿传薪", "校友故事"],
  ["web-assets/poster-09.jpg", "躬耕双甲 强国兴农", "校庆视觉"]
];

const photoItems = [
  ["web-assets/photo-07.jpg", "冷嘎措"],
  ["web-assets/photo-08.jpg", "那拉提草原"],
  ["web-assets/photo-09.jpg", "新疆天山天池"],
  ["web-assets/photo-01.jpg", "巴音郭楞蒙古自治州 · 巩乃斯"],
  ["web-assets/photo-02.jpg", "巴音郭楞蒙古自治州 · 巩乃斯"],
  ["web-assets/photo-03.jpg", "成都 · 青城山"],
  ["web-assets/photo-04.jpg", "吉林 · 京剧出科博物馆"],
  ["web-assets/photo-05.jpg", "冷嘎措"],
  ["web-assets/photo-06.jpg", "冷嘎措"]
];

const honorItems = [
  ["web-assets/honor-05.jpg", "2025 年全国大学生工业设计大赛北京市二等奖", "工业设计竞赛", "2025"],
  ["荣誉奖项/25工业设计大赛获奖名单.docx", "2025 工业设计大赛获奖名单", "文档材料", "2025"],
  ["web-assets/honor-04.jpg", "2024 年全国大学生广告艺术大赛北京市二等奖", "设计竞赛", "2024"],
  ["web-assets/honor-03.jpg", "2023 年北京市大学生文创设计大赛三等奖", "设计竞赛", "2023"],
  ["web-assets/honor-02.jpg", "2022-2023 学年中国农业大学三等奖学金", "奖学金", "2022-2023"],
  ["web-assets/honor-01.jpg", "2021-2022 学年中国农业大学二等奖学金", "奖学金", "2021-2022"]
];

const localKey = "personalSiteLocalItems";
let localItems = JSON.parse(localStorage.getItem(localKey) || "[]");
let posterIndex = 0;
let posterTimer;
let activeProject = portfolioItems[1];
let activeDetailIndex = 0;

function makeCard(item) {
  const { src, title, note, intro } = normalizePortfolioItem(item);
  const article = document.createElement("button");
  article.className = "work-card";
  article.type = "button";
  article.innerHTML = `
    <img src="${src}" alt="${title}" loading="lazy">
    <div class="card-copy">
      <span class="card-kicker">${note || ""}</span>
      <h3>${title}</h3>
      <p>${intro || "点击查看项目详情、设计说明和更多材料。"}</p>
      <strong class="card-link">查看项目详情</strong>
    </div>
  `;
  article.addEventListener("click", () => openProjectDetail(item));
  return article;
}

function renderPortfolio() {
  const grid = document.querySelector("#portfolioGrid");
  const localPortfolio = localItems.filter((item) => item.type === "portfolio").map(localToPortfolio);
  grid.replaceChildren(...[...portfolioItems, ...localPortfolio].map(makeCard));
}

function normalizePortfolioItem(item) {
  if (Array.isArray(item)) {
    return {
      id: crypto.randomUUID(),
      src: item[0],
      title: item[1],
      note: item[2],
      intro: "点击查看项目详情、设计说明和更多材料。",
      description: item[2] || "暂无补充说明。",
      tags: ["本地新增"],
      facts: [["来源", "本地上传"]],
      details: []
    };
  }
  return item;
}

function localToPortfolio(item) {
  return {
    id: item.id,
    src: item.src,
    title: item.title,
    note: item.note || "本地新增",
    intro: item.note || "本地新增作品，可继续补充详情图和设计说明。",
    description: item.note || "这个作品来自网页底部的本地上传。当前静态版本先保存主图，后续可以扩展为多图详情。",
    tags: ["本地新增"],
    facts: [["来源", "浏览器本地存储"], ["说明", "不会改动原始文件夹"]],
    details: []
  };
}

function openProjectDetail(item) {
  activeProject = normalizePortfolioItem(item);
  activeDetailIndex = 0;
  const detail = document.querySelector("#projectDetail");
  document.querySelector("#detailType").textContent = activeProject.note;
  document.querySelector("#detailTitle").textContent = activeProject.title;
  document.querySelector("#detailIntro").textContent = activeProject.intro;
  document.querySelector("#detailDescription").textContent = activeProject.description;
  document.querySelector("#detailCover").src = activeProject.src;
  document.querySelector("#detailCover").alt = activeProject.title;
  document.querySelector("#detailTags").replaceChildren(
    ...activeProject.tags.map((tag) => {
      const span = document.createElement("span");
      span.textContent = tag;
      return span;
    })
  );
  document.querySelector("#detailFacts").replaceChildren(
    ...activeProject.facts.flatMap(([term, value]) => {
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = term;
      dd.textContent = value;
      return [dt, dd];
    })
  );
  detail.hidden = false;
  renderDetailGallery();
  detail.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderDetailGallery() {
  const details = activeProject.details.length ? activeProject.details : [[activeProject.src, `${activeProject.title} 主图`]];
  const [src, caption] = details[activeDetailIndex % details.length];
  document.querySelector("#detailFocusImage").src = src;
  document.querySelector("#detailFocusImage").alt = caption;
  document.querySelector("#detailFocusCaption").textContent = caption;
  document.querySelector("#detailThumbs").replaceChildren(
    ...details.map(([thumbSrc, thumbCaption], index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = index === activeDetailIndex ? "active" : "";
      button.innerHTML = `<img src="${thumbSrc}" alt="${thumbCaption}" loading="lazy"><span>${thumbCaption}</span>`;
      button.addEventListener("click", () => {
        activeDetailIndex = index;
        renderDetailGallery();
      });
      return button;
    })
  );
}

function renderPoster() {
  const allPosters = [...posterItems, ...localItems.filter((item) => item.type === "poster").map(localToSlide)];
  const item = allPosters[posterIndex % allPosters.length];
  document.querySelector("#posterImage").src = item[0];
  document.querySelector("#posterImage").alt = item[1];
  document.querySelector("#posterTitle").textContent = item[1];
  document.querySelector("#posterCategory").textContent = item[2];

  const dots = document.querySelector("#posterDots");
  dots.replaceChildren(
    ...allPosters.map((_, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = index === posterIndex ? "active" : "";
      button.ariaLabel = `第 ${index + 1} 张海报`;
      button.addEventListener("click", () => {
        posterIndex = index;
        renderPoster();
        restartPosterTimer();
      });
      return button;
    })
  );
}

function localToSlide(item) {
  return [item.src, item.title, item.note || "本地新增"];
}

function restartPosterTimer() {
  clearInterval(posterTimer);
  posterTimer = setInterval(() => {
    const total = posterItems.length + localItems.filter((item) => item.type === "poster").length;
    posterIndex = (posterIndex + 1) % total;
    renderPoster();
  }, 4200);
}

function renderPhotos() {
  const gallery = document.querySelector("#photoImmersive");
  const localPhotos = localItems.filter((item) => item.type === "photo").map((item) => [item.src, item.title]);
  const allPhotos = [...photoItems, ...localPhotos];
  gallery.replaceChildren(
    ...allPhotos.map(([src, place]) => {
      const card = document.createElement("article");
      card.className = "photo-card";
      card.innerHTML = `
        <img src="${src}" alt="${place}" loading="lazy">
        <div class="place-tag">
          <span>拍摄地</span>
          <strong>${place}</strong>
        </div>
      `;
      return card;
    })
  );
}

function renderHonors() {
  const list = document.querySelector("#honorList");
  const localHonors = localItems.filter((item) => item.type === "honor").map(localToSlide);
  const cards = [...honorItems, ...localHonors].map(([src, title, note, year], index) => {
    const article = document.createElement("article");
    article.className = "honor-card";
    const media = src.endsWith(".docx")
      ? `<div class="honor-doc">DOCX</div>`
      : `<img src="${src}" alt="${title}" loading="lazy">`;
    article.innerHTML = `
      <div class="honor-index">${String(index + 1).padStart(2, "0")}</div>
      <div class="honor-copy">
        <span>${year || "新增"}</span>
        <h3>${title}</h3>
        <p>${note}</p>
      </div>
      <div class="honor-preview">${media}</div>
    `;
    return article;
  });
  list.replaceChildren(...cards);
}

function renderLocalItems() {
  const wrap = document.querySelector("#localItems");
  if (!localItems.length) {
    wrap.innerHTML = `<p class="empty">还没有本地新增内容。上传后的项目会出现在这里，并同步加入对应版块。</p>`;
    return;
  }
  wrap.replaceChildren(
    ...localItems.map((item) => {
      const card = document.createElement("article");
      card.className = "local-card";
      card.innerHTML = `
        <img src="${item.src}" alt="${item.title}">
        <div class="card-copy">
          <h3>${item.title}</h3>
          <p>${typeName(item.type)} · ${item.note || "无补充说明"}</p>
          <button class="delete-button" type="button">删除本地新增</button>
        </div>
      `;
      card.querySelector("button").addEventListener("click", () => {
        localItems = localItems.filter((entry) => entry.id !== item.id);
        saveAndRender();
      });
      return card;
    })
  );
}

function typeName(type) {
  return {
    portfolio: "工业设计作品集",
    poster: "平面设计海报",
    photo: "摄影照片",
    honor: "荣誉奖项"
  }[type];
}

function saveAndRender() {
  localStorage.setItem(localKey, JSON.stringify(localItems));
  renderLocalItems();
  renderPortfolio();
  renderPhotos();
  renderHonors();
  renderPoster();
}

document.querySelector("#posterPrev").addEventListener("click", () => {
  const total = posterItems.length + localItems.filter((item) => item.type === "poster").length;
  posterIndex = (posterIndex - 1 + total) % total;
  renderPoster();
  restartPosterTimer();
});

document.querySelector("#posterNext").addEventListener("click", () => {
  const total = posterItems.length + localItems.filter((item) => item.type === "poster").length;
  posterIndex = (posterIndex + 1) % total;
  renderPoster();
  restartPosterTimer();
});

document.querySelector("#detailClose").addEventListener("click", () => {
  document.querySelector("#projectDetail").hidden = true;
  document.querySelector("#portfolio").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelector("#detailPrev").addEventListener("click", () => {
  const total = activeProject.details.length || 1;
  activeDetailIndex = (activeDetailIndex - 1 + total) % total;
  renderDetailGallery();
});

document.querySelector("#detailNext").addEventListener("click", () => {
  const total = activeProject.details.length || 1;
  activeDetailIndex = (activeDetailIndex + 1) % total;
  renderDetailGallery();
});

document.querySelector("#contentForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const file = document.querySelector("#contentFile").files[0];
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    localItems.unshift({
      id: crypto.randomUUID(),
      type: document.querySelector("#contentType").value,
      title: document.querySelector("#contentTitle").value.trim(),
      note: document.querySelector("#contentNote").value.trim(),
      src: reader.result
    });
    event.target.reset();
    saveAndRender();
  });
  reader.readAsDataURL(file);
});

renderPortfolio();
renderPoster();
renderPhotos();
renderHonors();
renderLocalItems();
restartPosterTimer();
