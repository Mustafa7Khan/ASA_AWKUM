const news = [
  {
    title: 'Annual Election Schedule Announced',
    date: 'March 15, 2026',
    body: 'Nomination starts from March 20, and voting will be held on April 12 in the central auditorium.',
  },
  {
    title: 'Cabinet Introduces Teacher Welfare Cell',
    date: 'February 28, 2026',
    body: 'A dedicated committee was launched to support emergency and legal assistance for faculty members.',
  },
  {
    title: 'Seminar on Academic Freedom',
    date: 'January 10, 2026',
    body: 'The union hosted a cross-department seminar focused on protecting academic freedom and dignity at work.',
  },
];

const currentCabinet = [
  {
    name: 'Dr. Ayesha Rahman',
    designation: 'President',
    department: 'Department of Economics',
    image: 'https://placehold.co/600x600?text=President',
  },
  {
    name: 'Prof. Karim Hassan',
    designation: 'General Secretary',
    department: 'Department of Physics',
    image: 'https://placehold.co/600x600?text=Secretary',
  },
  {
    name: 'Dr. Sanaul Islam',
    designation: 'Treasurer',
    department: 'Department of Mathematics',
    image: 'https://placehold.co/600x600?text=Treasurer',
  },
  {
    name: 'Prof. Nadia Chowdhury',
    designation: 'Joint Secretary',
    department: 'Department of English',
    image: 'https://placehold.co/600x600?text=Joint+Secretary',
  },
];

const previousCabinets = [
  {
    year: '2024–2025',
    members: [
      {
        name: 'Dr. Rezaul Kabir',
        designation: 'President',
        department: 'Department of History',
      },
      {
        name: 'Prof. Samira Alam',
        designation: 'General Secretary',
        department: 'Department of Chemistry',
      },
    ],
  },
  {
    year: '2023–2024',
    members: [
      {
        name: 'Prof. Tanvir Hossain',
        designation: 'President',
        department: 'Department of Sociology',
      },
      {
        name: 'Dr. Farhana Sultana',
        designation: 'General Secretary',
        department: 'Department of Law',
      },
    ],
  },
];

const struggles = [
  {
    year: '2018',
    text: 'Organized a campus-wide movement for timely promotion policy and transparent recruitment standards.',
  },
  {
    year: '2020',
    text: 'Led negotiations to ensure health coverage and emergency support during the pandemic.',
  },
  {
    year: '2022',
    text: 'Successfully pushed for improved research grant disbursement and fair workload distribution.',
  },
  {
    year: '2025',
    text: 'Conducted policy dialogue on pension reform and long-term faculty welfare.',
  },
];

function renderNews() {
  const root = document.getElementById('news-list');
  root.innerHTML = news
    .map(
      (item) => `
      <article class="card">
        <p class="meta">${item.date}</p>
        <h4>${item.title}</h4>
        <p>${item.body}</p>
      </article>
    `
    )
    .join('');
}

function renderCurrentCabinet() {
  const root = document.getElementById('current-cabinet-list');
  root.innerHTML = currentCabinet
    .map(
      (member) => `
      <article class="card">
        <img src="${member.image}" alt="${member.name}" loading="lazy" />
        <h4>${member.name}</h4>
        <p class="meta">${member.designation}</p>
        <p>${member.department}</p>
      </article>
    `
    )
    .join('');
}

function renderPreviousCabinets() {
  const root = document.getElementById('previous-cabinets-list');
  root.innerHTML = previousCabinets
    .map(
      (cabinet) => `
      <details>
        <summary>${cabinet.year} Cabinet</summary>
        <div class="cards">
          ${cabinet.members
            .map(
              (member) => `
              <article class="card">
                <h5>${member.name}</h5>
                <p class="meta">${member.designation}</p>
                <p>${member.department}</p>
              </article>
          `
            )
            .join('')}
        </div>
      </details>
    `
    )
    .join('');
}

function renderStruggles() {
  const root = document.getElementById('struggle-list');
  root.innerHTML = struggles
    .map(
      (event) => `
      <li>
        <strong>${event.year}</strong>
        <p>${event.text}</p>
      </li>
    `
    )
    .join('');
}

function renderYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}

renderNews();
renderCurrentCabinet();
renderPreviousCabinets();
renderStruggles();
renderYear();
