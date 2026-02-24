document.addEventListener("DOMContentLoaded", () => {
  const initialJobs = [
    {
      id: 1,
      companyName: "Mobile First Corp",
      position: "React Native Developer",
      location: "Remote • United States",
      type: "Full-time",
      salary: "$110,000 – $135,000",
      description:
        "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
      status: "none",
    },
    {
      id: 2,
      companyName: "WebFlow Agency",
      position: "Web Designer & Developer",
      location: "Los Angeles, CA",
      type: "Hybrid",
      salary: "$80,000 – $100,000",
      description:
        "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.",
      status: "none",
    },
    {
      id: 3,
      companyName: "DataViz Solutions",
      position: "Data Visualization Specialist",
      location: "Boston, MA",
      type: "On-site",
      salary: "$95,000 – $125,000",
      description:
        "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.",
      status: "none",
    },
    {
      id: 4,
      companyName: "CloudFirst Inc",
      position: "Backend Developer",
      location: "Remote • Europe",
      type: "Contract",
      salary: "$90,000 – $120,000",
      description:
        "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.",
      status: "none",
    },
    {
      id: 5,
      companyName: "Innovation Labs",
      position: "UX/UI Engineer",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$105,000 – $140,000",
      description:
        "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.",
      status: "none",
    },
    {
      id: 6,
      companyName: "MegaCorp Solutions",
      position: "JavaScript Developer",
      location: "New York, NY",
      type: "Hybrid",
      salary: "$115,000 – $145,000",
      description:
        "Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation, health insurance, and professional development opportunities.",
      status: "none",
    },
    {
      id: 7,
      companyName: "StartupXYZ",
      position: "Full Stack Engineer",
      location: "Remote",
      type: "Full-time",
      salary: "$120,000 – $150,000 + equity",
      description:
        "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity package included.",
      status: "none",
    },
    {
      id: 8,
      companyName: "TechCorp Industries",
      position: "Senior Frontend Engineer",
      location: "San Francisco, CA",
      type: "On-site",
      salary: "$140,000 – $175,000",
      description:
        "We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team on cutting-edge projects.",
      status: "none",
    },
  ];

  const state = {
    jobs: initialJobs,
    currentTab: "all", // 'all' | 'interview' | 'rejected'
  };

  // DOM elements
  const totalCountEl = document.getElementById("total-count");
  const interviewCountEl = document.getElementById("interview-count");
  const rejectedCountEl = document.getElementById("rejected-count");
  const jobsCountEl = document.getElementById("jobs-count");
  const jobsListEl = document.getElementById("jobs-list");
  const emptyStateEl = document.getElementById("empty-state");
  const tabButtons = document.querySelectorAll("[data-tab]");

  // Tab style helper
  const tabActiveClasses =
    "bg-blue-600 text-white border-blue-600 shadow-sm".split(" ");
  const tabInactiveClasses =
    "bg-slate-100 text-slate-700 border-slate-200 shadow-none".split(" ");

  function updateTabStyles() {
    tabButtons.forEach((btn) => {
      const isActive = btn.dataset.tab === state.currentTab;
      btn.classList.remove(...tabActiveClasses, ...tabInactiveClasses);
      if (isActive) {
        btn.classList.add(...tabActiveClasses);
      } else {
        btn.classList.add(...tabInactiveClasses);
      }
    });
  }

  // Handle tab switching
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextTab = button.dataset.tab;
      if (!nextTab || nextTab === state.currentTab) return;

      state.currentTab = nextTab;
      updateTabStyles();
      render();
    });
  });

  // Event delegation for job card buttons
  jobsListEl.addEventListener("click", (event) => {
    const target = event.target;
    const cardEl = target.closest("[data-job-id]");
    if (!cardEl) return;

    const jobId = Number(cardEl.dataset.jobId);
    if (Number.isNaN(jobId)) return;

    if (target.closest(".interview-btn")) {
      updateJobStatus(jobId, "interview");
    } else if (target.closest(".rejected-btn")) {
      updateJobStatus(jobId, "rejected");
    } else if (target.closest(".delete-btn")) {
      deleteJob(jobId);
    }
  });

  function updateJobStatus(id, newStatus) {
    const job = state.jobs.find((j) => j.id === id);
    if (!job || job.status === newStatus) return;

    job.status = newStatus;
    render();
  }

  function deleteJob(id) {
    state.jobs = state.jobs.filter((job) => job.id !== id);
    render();
  }

  function getCounts() {
    const total = state.jobs.length;
    let interview = 0;
    let rejected = 0;

    state.jobs.forEach((job) => {
      if (job.status === "interview") interview += 1;
      else if (job.status === "rejected") rejected += 1;
    });

    return { total, interview, rejected };
  }

  function getJobsForCurrentTab() {
    if (state.currentTab === "interview") {
      return state.jobs.filter((job) => job.status === "interview");
    }
    if (state.currentTab === "rejected") {
      return state.jobs.filter((job) => job.status === "rejected");
    }
    // 'all'
    return state.jobs;
  }

  function createJobCardHTML(job) {
    const statusLabel =
      job.status === "interview"
        ? "Interview"
        : job.status === "rejected"
        ? "Rejected"
        : "Not applied";

    const statusColorClasses =
      job.status === "interview"
        ? "bg-emerald-100 text-emerald-700"
        : job.status === "rejected"
        ? "bg-rose-100 text-rose-700"
        : "bg-slate-100 text-slate-600";

    const interviewBtnStateClasses =
      job.status === "interview"
        ? "bg-emerald-600 border-emerald-600 text-white shadow-sm hover:bg-emerald-700 hover:border-emerald-700"
        : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300";

    const rejectedBtnStateClasses =
      job.status === "rejected"
        ? "bg-rose-600 border-rose-600 text-white shadow-sm hover:bg-rose-700 hover:border-rose-700"
        : "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:border-rose-300";

    return `
      <article
        class="job-card bg-white rounded-xl shadow-md p-4 sm:p-5"
        data-job-id="${job.id}">
        
        <header class="flex items-start justify-between gap-3 sm:gap-4 mb-1">
          <div>
            <h3
              class="text-[0.7rem] font-semibold tracking-[0.18em] text-slate-400 uppercase"
            >
              ${job.companyName}
            </h3>
            <p class="text-sm sm:text-base font-semibold text-slate-900">
              ${job.position}
            </p>
          </div>
          <button
            class="delete-btn inline-flex items-center justify-center rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            type="button"
            aria-label="Remove job">
            <svg
              viewBox="0 0 16 16"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <path
                d="M3.2 3.2l9.6 9.6M12.8 3.2l-9.6 9.6"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"/>
            </svg>
          </button>
        </header>

        <p
          class="mt-1 text-[0.72rem] sm:text-xs text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>${job.location}</span>
          <span class="text-slate-300">•</span>
          <span>${job.type}</span>
          <span class="text-slate-300">•</span>
          <span class="font-semibold text-slate-700">${job.salary}</span>
        </p>

        <div class="mt-3 mb-2">
          <span
            class="inline-flex items-center px-3 py-1 rounded-full text-[0.68rem] font-semibold tracking-wide uppercase ${statusColorClasses}">
            ${statusLabel}
          </span>
        </div>

        <p class="text-xs sm:text-sm text-slate-600 mb-3">
          ${job.description}
        </p>

        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            class="interview-btn inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold border transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500 ${interviewBtnStateClasses}">
            Interview
          </button>
          <button
           type="button"
          class="rejected-btn inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold border transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-rose-500 ${rejectedBtnStateClasses}">
            Rejected
          </button>
        </div>
      </article>
    `;}

  function render() {
    const counts = getCounts();

    // Dashboard summary
    totalCountEl.textContent = counts.total;
    interviewCountEl.textContent = counts.interview;
    rejectedCountEl.textContent = counts.rejected;

    // Jobs for current tab
    const jobsForTab = getJobsForCurrentTab();
    const countForTab =
      state.currentTab === "all"
        ? counts.total
        : state.currentTab === "interview"
        ? counts.interview
        : counts.rejected;

    jobsCountEl.textContent = `${countForTab} job${
      countForTab === 1 ? "" : "s"
    }`;

    if (jobsForTab.length === 0) {
      jobsListEl.innerHTML = "";
      emptyStateEl.classList.remove("hidden");
    } else {
      emptyStateEl.classList.add("hidden");
      jobsListEl.innerHTML = jobsForTab.map(createJobCardHTML).join("");
    }
  }

  // Initial render
  render();
});