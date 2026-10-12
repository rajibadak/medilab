const pageNav = document.body.dataset.nav || "";

function navClass(id) {
  return pageNav === id ? "active" : "";
}

const headerMount = document.getElementById("site-header");
if (headerMount) {
  headerMount.innerHTML = `
  <div class="scroll-progress" id="scrollProgress"></div>
  <div class="topbar">
    <div class="container topbar-inner">
      <div class="topbar-left">
        <span class="dot-green">Trusted Diagnostic Care in Egra</span>
        <span>Accurate Reports</span>
        <span>Home Sample Collection</span>
        <span>Patient Support</span>
      </div>
      <div class="topbar-right">
        <span><i class="ri-phone-fill"></i> Call Us: +91 98765 43210</span>
        <span><i class="ri-time-fill"></i> Mon - Sat: 7:00 AM - 8:00 PM</span>
      </div>
    </div>
  </div>
  <header class="site-header">
    <div class="container header-inner">
      <a class="logo" href="index.html">
        <img src="images/logo.png" alt="EGRA Medilab Diagnosis Pvt. Ltd." />
      </a>
      <nav class="nav" id="nav">
        <a class="${navClass("home")}" href="index.html">Home</a>
        <a class="${navClass("diagnostics")}" href="diagnostics.html">Diagnostics</a>
        <a class="${navClass("services")}" href="services.html">Services</a>
        <a class="${navClass("doctors")}" href="doctors.html">Doctors</a>
        <a class="${navClass("about")}" href="about.html">About</a>
        <a class="${navClass("contact")}" href="contact.html">Contact</a>
        <a class="btn btn-primary nav-book js-book" data-book="appointment" href="#book">Book Appointment</a>
      </nav>
      <div class="header-actions">
        <button class="search-btn" id="searchToggle" type="button" aria-label="Search"><i class="ri-search-line"></i></button>
        <a class="btn btn-primary js-book" data-book="appointment" href="#book">Book Appointment</a>
        <button class="menu-toggle" id="menuToggle" type="button" aria-label="Open menu"><i class="ri-menu-line"></i></button>
      </div>
    </div>
    <form class="search-panel" id="searchPanel" role="search">
      <input id="siteSearch" type="search" placeholder="Search tests, doctors, services..." />
    </form>
  </header>`;
}

const footerMount = document.getElementById("site-footer");
if (footerMount) {
  footerMount.innerHTML = `
  <footer class="footer" id="contact">
    <div class="container footer-grid">
      <div class="footer-brand">
        <a class="logo" href="index.html">
          <img src="images/logo.png" alt="EGRA Medilab Diagnosis Pvt. Ltd." />
        </a>
        <p>Trusted diagnostic care in Egra with accurate reports, home collection and specialist support.</p>
        <div class="socials">
          <a href="#" aria-label="Facebook"><i class="ri-facebook-fill"></i></a>
          <a href="#" aria-label="Instagram"><i class="ri-instagram-line"></i></a>
          <a href="#" aria-label="YouTube"><i class="ri-youtube-fill"></i></a>
          <a href="#" aria-label="LinkedIn"><i class="ri-linkedin-fill"></i></a>
        </div>
      </div>
      <div>
        <h4>Quick Links</h4>
        <ul class="footer-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="doctors.html">Doctors</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Patient Care</h4>
        <ul class="footer-links">
          <li><a href="home-collection.html">Home Collection</a></li>
          <li><a href="reports.html">Download Reports</a></li>
          <li><a href="facilities.html">Facilities</a></li>
          <li><a href="insights.html">Health Insights</a></li>
          <li><a href="testimonials.html">Patient Stories</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul class="contact-list">
          <li><i class="ri-map-pin-2-fill"></i> Egra, Purba Medinipur, West Bengal</li>
          <li><i class="ri-phone-fill"></i> <a href="tel:+919876543210">+91 98765 43210</a></li>
          <li><i class="ri-mail-fill"></i> <a href="mailto:info@egramedilabdiagnosis.com">info@egramedilabdiagnosis.com</a></li>
          <li><i class="ri-time-fill"></i> Mon - Sat: 7:00 AM - 8:00 PM</li>
        </ul>
        <form class="subscribe" id="subscribeForm">
          <input type="email" required placeholder="Enter your email" />
          <button type="submit" aria-label="Subscribe"><i class="ri-send-plane-fill"></i></button>
        </form>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container legal">
        <div>© 2025 EGRA Medilab Diagnosis. All Rights Reserved.</div>
        <div class="legal-links">
          <a href="privacy.html">Privacy Policy</a>
          <a href="terms.html">Terms &amp; Conditions</a>
          <a href="sitemap.html">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>
  <div class="toast" id="toast" role="status"></div>
  <div class="modal" id="bookModal">
    <div class="modal-card">
      <button class="modal-close" type="button" data-close aria-label="Close">&times;</button>
      <h3 id="bookTitle">Book an Appointment</h3>
      <p id="bookLead">Choose a doctor from the list. This form does not ask for a test.</p>
      <form class="form book-form" id="bookForm">
        <input type="hidden" name="booking" id="bookKind" value="appointment" />
        <input name="name" required placeholder="Patient name" />
        <input name="phone" required placeholder="Phone number" />
        <label class="field" data-show="appointment doctor">
          <span>Doctor</span>
          <select name="doctorChoice" id="bookDoctorChoice" required>
            <option value="">Select a doctor</option>
            <option>Dr. Arindam Ghosh — General Medicine</option>
            <option>Dr. Priyanka Sen — General Medicine</option>
            <option>Dr. Suman Das — Cardiology</option>
            <option>Dr. Rituparna Pal — Radiology</option>
            <option>Dr. Abhishek Roy — Neurology</option>
            <option>Dr. Moumita Dey — Gastroenterology</option>
          </select>
        </label>
        <label class="field" data-show="test collection report" style="display:none">
          <span id="subjectLabel">Test name</span>
          <input name="subject" id="bookSubject" />
        </label>
        <label class="field" data-show="collection" style="display:none">
          <span>Collection address</span>
          <textarea name="address" id="bookAddress" rows="2" placeholder="House, street and area"></textarea>
        </label>
        <label class="field" data-show="report" style="display:none">
          <span>Date of the visit</span>
          <input name="visitDate" id="bookVisit" type="date" />
        </label>
        <label class="field" data-show="appointment doctor test collection">
          <span>Preferred day</span>
          <input name="day" id="bookDay" type="date" required />
        </label>
        <textarea name="note" id="bookNote" rows="3" placeholder="Reason for the visit"></textarea>
        <button class="btn btn-primary" id="bookSubmit" type="submit">Request Appointment</button>
      </form>
    </div>
  </div>`;
}

window.SITE_PAGES = [
  { title: "Home", href: "index.html", keys: "home medilab egra" },
  { title: "Diagnostics", href: "diagnostics.html", keys: "tests catalogue cbc ecg ultrasound ct scan" },
  { title: "Services", href: "services.html", keys: "services departments" },
  { title: "Pathology", href: "service-pathology.html", keys: "pathology blood urine cbc thyroid lft kft hba1c lipid" },
  { title: "Radiology", href: "service-radiology.html", keys: "radiology xray x-ray ultrasound usg ct scan imaging" },
  { title: "Cardiology", href: "service-cardiology.html", keys: "cardiology heart ecg echo lipid" },
  { title: "Neurology", href: "service-neurology.html", keys: "neurology eeg brain nerve" },
  { title: "Gastroenterology", href: "service-gastroenterology.html", keys: "gastro liver digestion stool abdomen" },
  { title: "General Diagnostics", href: "service-general.html", keys: "general checkup fever vitamin preventive" },
  { title: "Doctors", href: "doctors.html", keys: "doctors specialists" },
  { title: "Dr. Arindam Ghosh", href: "doctor-arindam-ghosh.html", keys: "arindam ghosh general medicine" },
  { title: "Dr. Priyanka Sen", href: "doctor-priyanka-sen.html", keys: "priyanka sen general medicine" },
  { title: "Dr. Suman Das", href: "doctor-suman-das.html", keys: "suman das cardiology heart" },
  { title: "Dr. Rituparna Pal", href: "doctor-rituparna-pal.html", keys: "rituparna pal radiology imaging" },
  { title: "Dr. Abhishek Roy", href: "doctor-abhishek-roy.html", keys: "abhishek roy neurology" },
  { title: "Dr. Moumita Dey", href: "doctor-moumita-dey.html", keys: "moumita dey gastroenterology" },
  { title: "About", href: "about.html", keys: "about centre why egra" },
  { title: "Contact", href: "contact.html", keys: "contact phone address email book" },
  { title: "Home Sample Collection", href: "home-collection.html", keys: "home collection sample visit" },
  { title: "Download Reports", href: "reports.html", keys: "reports download login digital" },
  { title: "Facilities", href: "facilities.html", keys: "facilities lab reception photos" },
  { title: "Health Insights", href: "insights.html", keys: "blog articles tips" },
  { title: "Why Regular Health Checkups Are Important", href: "article-health-checkups.html", keys: "checkup prevention article" },
  { title: "Understanding Diabetes", href: "article-diabetes.html", keys: "diabetes article manage sugar" },
  { title: "Tips for a Healthy Heart", href: "article-healthy-heart.html", keys: "heart article tips" },
  { title: "Patient Stories", href: "testimonials.html", keys: "reviews testimonials patients" }
];
