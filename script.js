const dataSets = {
  collection: {
    title: "Collection Admission / V.O.A",
    summary: "Track admissions, revenue, and value of admissions across branches.",
    metrics: ["Admissions", "Revenue", "V.O.A"],
  },
  course: {
    title: "Course Data",
    summary: "Monitor course demand, batch strength, and completion performance.",
    metrics: ["Top Course", "Active Batches", "Completion Rate"],
  },
  learner: {
    title: "Per Learner Details",
    summary: "Review learner engagement, assessments, and placement readiness.",
    metrics: ["Active Learners", "Assessments", "Placement Ready"],
  },
};

const branchNames = [
  "All Branches",
  "Rambaug",
  "Samrat Chowk",
  "Chakki Naka",
  "Gupte Road",
  "Khadakpada",
  "Kongaon",
  "Ramnagar",
  "Thane (Lokamanya Nagar)",
  "Star Colony",
  "Tilak Chowk",
  "Vartak Nagar",
  "Devi Chowk",
  "DB Chowk",
  "Badlapur",
  "Kongaon 2",
];

const tabButtons = document.querySelectorAll(".tab");
const panelTitle = document.getElementById("panel-title");
const panelSummary = document.getElementById("panel-summary");
const branchList = document.getElementById("branch-list");
const branchDetail = document.getElementById("branch-detail");
const detailCards = document.getElementById("detail-cards");

const randomValue = (min, max, suffix = "") =>
  `${Math.floor(Math.random() * (max - min + 1)) + min}${suffix}`;

const branchData = (category) => {
  if (category === "collection") {
    return {
      Admissions: randomValue(120, 240, "+"),
      Revenue: `₹${randomValue(18, 42)}L`,
      "V.O.A": `${randomValue(6, 14)}%`,
    };
  }
  if (category === "course") {
    return {
      "Top Course": "Advanced Tally + GST",
      "Active Batches": randomValue(8, 16),
      "Completion Rate": `${randomValue(88, 97)}%`,
    };
  }
  return {
    "Active Learners": randomValue(180, 320, "+"),
    Assessments: `${randomValue(6, 12)} / month`,
    "Placement Ready": `${randomValue(78, 92)}%`,
  };
};

const overallData = (category) => {
  if (category === "collection") {
    return {
      Admissions: randomValue(2800, 4200, "+"),
      Revenue: `₹${randomValue(380, 520)}L`,
      "V.O.A": `${randomValue(10, 18)}%`,
    };
  }
  if (category === "course") {
    return {
      "Top Course": "Full-Stack + Cloud Track",
      "Active Batches": randomValue(90, 140),
      "Completion Rate": `${randomValue(91, 97)}%`,
    };
  }
  return {
    "Active Learners": randomValue(5200, 7800, "+"),
    Assessments: `${randomValue(180, 260)} / month`,
    "Placement Ready": `${randomValue(84, 94)}%`,
  };
};

const renderBranches = (activeCategory) => {
  branchList.innerHTML = "";
  branchNames.forEach((branch, index) => {
    const button = document.createElement("button");
    button.textContent = branch;
    button.dataset.branch = branch;
    if (index === 0) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".branch-list button")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      updateBranchDetails(branch, activeCategory);
    });
    branchList.appendChild(button);
  });
};

const updateBranchDetails = (branch, category) => {
  branchDetail.classList.add("fade");
  setTimeout(() => {
    branchDetail.querySelector("h4").textContent =
      branch === "All Branches" ? "All Branches Overview" : `${branch} Insights`;
    detailCards.innerHTML = "";
    const metrics = branch === "All Branches" ? overallData(category) : branchData(category);
    Object.entries(metrics).forEach(([label, value]) => {
      const card = document.createElement("div");
      card.className = "detail-card";
      card.innerHTML = `<h5>${label}</h5><span>${value}</span>`;
      detailCards.appendChild(card);
    });
    branchDetail.classList.remove("fade");
  }, 200);
};

const setActiveTab = (category) => {
  const data = dataSets[category];
  panelTitle.textContent = data.title;
  panelSummary.textContent = data.summary;
  tabButtons.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === category);
  });
  renderBranches(category);
  updateBranchDetails(branchNames[0], category);
};

tabButtons.forEach((tab) => {
  tab.addEventListener("click", () => setActiveTab(tab.dataset.tab));
});

setActiveTab("collection");
