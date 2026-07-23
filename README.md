# Sparsh Setu 🤝🌐

> **Bridging the Digital Divide Through School Community Outreach**  
> *An Interactive Digital Literacy & Social Impact Web Platform Built for Internship Presentations.*

---

## 📌 Project Overview

**Sparsh Setu** (meaning *"The Touch of Connection"*) is a comprehensive web platform and digital initiative developed to showcase a social internship drive aimed at bringing foundational computer literacy, internet safety, and digital empowerment to school students in underserved communities.

The platform includes a modern frontend layout, dynamic interactive visual components, submission validation workflows, and an integrated **Rule-Based AI Assistant ("Sparsh Assist")** running natively on Python/Flask.

---

## ✨ Key Features

* 📱 **Fully Responsive Layout:** Optimized for mobile, tablet, and desktop viewing.
* 🌗 **Dark / Light Theme Toggle:** Instant client-side theme switching with `localStorage` persistence.
* 🤖 **Sparsh Assist AI Engine:** Rule-based Flask NLP engine providing instant responses without external API tokens.
* 🖼️ **Interactive Gallery & Filtering:** Categorized filter tabs for school visits, poster drives, and workshops.
* 📝 **Interactive Forms:** Client-side validation for volunteer registration and contact inquiries.
* 📊 **Dynamic Animated Counters & Timeline:** Visual display of key operational milestones and impact stats.

---

## 🛠️ Project Structure & Tech Stack

```text
sparsh-setu/
├── app.py                     # Flask application routes and chatbot engine
├── requirements.txt           # Dependency requirements
├── static/
│   ├── css/
│   │   ├── style.css          # Core CSS styling & theme variables
│   │   ├── animations.css     # CSS Keyframe animation library
│   │   └── responsive.css     # Responsive media queries
│   └── js/
│       ├── main.js            # General UI interactions & form validations
│       └── chatbot.js         # Chatbot client-side logic & AJAX handler
└── templates/
    ├── base.html              # Base layout master template
    ├── index.html             # Homepage
    ├── about.html             # About Us & Internship Timeline
    ├── activities.html        # Detailed Internship Initiatives
    ├── gallery.html           # Media Gallery with live filter
    ├── volunteer.html         # Volunteer Sign-Up Page
    ├── contact.html           # Contact Page
    └── chatbot.html           # Dedicated AI Chatbot Interface